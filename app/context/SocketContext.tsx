// import React, { createContext, useContext, useEffect, useState, useRef } from "react";
// import { io, Socket } from "socket.io-client";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Alert } from "react-native";

// interface GameData {
//   _id: string;
//   period: string;
//   gameDuration: number;
//   scheduledAt: string;
//   status: string;
//   winningNumber: number | null;
//   color: string[];
//   size: string | null;
//   totalBets: number;
//   totalPayouts: number;
//   systemProfit: number;
//   adminSelected: boolean;
//   createdAt: string;
//   __v: number;
// }

// interface SocketContextType {
//   socket: Socket | null;
//   isConnected: boolean;
//   balance: number | null;
//   currentRounds: GameData[];
//   updateBalance: (newBalance: number) => void;
//   refreshBalance: () => void;
//   refreshRounds: () => void;
//   onTokenChange: (token: string | null) => void;
// }

// const SocketContext = createContext<SocketContextType>({
//   socket: null,
//   isConnected: false,
//   balance: null,
//   currentRounds: [],
//   updateBalance: () => {},
//   refreshBalance: () => {},
//   refreshRounds: () => {},
//   onTokenChange: () => {},
// });

// const SOCKET_URL = "http://192.154.230.43:3000";
// const API_BASE_URL = "http://192.154.230.43:3000"; // Assuming the API base is the same for HTTP calls

// export function SocketProvider({ children }: { children: React.ReactNode }) {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [balance, setBalance] = useState<number | null>(null);
//   const [currentRounds, setCurrentRounds] = useState<GameData[]>([]);
//   const [token, setToken] = useState<string | null>(null);
//   const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   // --- Utility Functions ---

//   // Function to fetch rounds via REST/HTTP (as a fallback/manual refresh)
//   const fetchRoundsViaApi = async () => {
//     try {
//       if (!token) return;
      
//       const response = await fetch(`${API_BASE_URL}/api/game/currentRounds`, {
//         headers: { "Authorization": `Bearer ${token}` },
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         const rounds = data?.data?.rounds || [];
//         if (rounds.length > 0) {
//           console.log("⬇️ API rounds fetched:", rounds.length);
//           setCurrentRounds(rounds);
//         }
//       } else {
//         console.error("Failed to fetch rounds via API:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching rounds via API:", error);
//     }
//   };


//   // --- Context Functions ---

//   const onTokenChange = async (newToken: string | null) => {
//     setToken(newToken);
//     if (newToken) {
//       await AsyncStorage.setItem("token", newToken);
//     } else {
//       await AsyncStorage.removeItem("token");
//     }
//   };

//   const updateBalance = (newBalance: number) => {
//     console.log("💰 Manually updating balance:", newBalance);
//     setBalance(newBalance);
//   };

//   const refreshBalance = () => {
//     if (socket && isConnected) {
//       console.log("🔄 Refreshing balance via socket...");
//       socket.emit("get:balance");
//     }
//   };

//   // Fixed: Manual refresh function should call the socket event or the API
//   const refreshRounds = () => {
//     if (socket && isConnected) {
//       console.log("🔄 Manually refreshing rounds via socket...");
//       socket.emit("get:current:rounds");
//     } else {
//       // Fallback if socket is not connected (e.g., just after login)
//       console.log("🔄 Manually refreshing rounds via API (socket disconnected)...");
//       fetchRoundsViaApi(); 
//     }
//   };


//   // --- Lifecycle Effects ---

//   // Load token on mount
//   useEffect(() => {
//     const loadToken = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem("token");
//         setToken(storedToken);
//       } catch (error) {
//         console.error("Error loading token:", error);
//       }
//     };
//     loadToken();
//   }, []);

//   // Establish or disconnect socket on token change
//   useEffect(() => {
//     // 1. Disconnection logic
//     if (!token) {
//       if (socket) {
//         console.log("🔌 Disconnecting socket - no token");
//         socket.disconnect();
//         setSocket(null);
//       }
//       setIsConnected(false);
//       setBalance(null);
//       setCurrentRounds([]);
      
//       // Clear refresh interval
//       if (refreshIntervalRef.current) {
//         clearInterval(refreshIntervalRef.current);
//         refreshIntervalRef.current = null;
//       }
//       return;
//     }

//     // 2. Connection logic
//     console.log("🔌 Establishing socket connection...");
//     const socketInstance = io(SOCKET_URL, {
//       transports: ["websocket"],
//       auth: { token },
//       reconnection: true,
//       reconnectionDelay: 1000,
//       reconnectionAttempts: 5,
//     });

//     setSocket(socketInstance);

//     // 3. Socket event listeners
    
//     socketInstance.on("connect", () => {
//       console.log("✅ Socket.IO connected");
//       setIsConnected(true);
      
//       // Initial data fetch
//       socketInstance.emit("get:balance");
//       socketInstance.emit("get:current:rounds");
      
//       // Set up periodic refresh every 30 seconds for rounds
//       if (refreshIntervalRef.current) {
//         clearInterval(refreshIntervalRef.current);
//       }
//       refreshIntervalRef.current = setInterval(() => {
//         console.log("🔄 Auto-refreshing rounds...");
//         socketInstance.emit("get:current:rounds");
//       }, 30000);
//     });

//     socketInstance.on("user:balance", (data) => {
//       if (data?.balance !== undefined) {
//         console.log("💰 Balance received:", data.balance);
//         setBalance(data.balance);
//       }
//     });

//     socketInstance.on("balance:update", (data) => {
//       if (data?.balance !== undefined) {
//         console.log("💰 Balance updated:", data.balance);
//         setBalance(data.balance);
//       }
//     });

//     // Handle multiple possible round data formats (FULL LIST)
//     const handleRoundsData = (data: any) => {
//       let rounds: GameData[] = [];
      
//       if (data?.rounds && Array.isArray(data.rounds)) {
//         rounds = data.rounds;
//       } else if (data?.data?.rounds && Array.isArray(data.data.rounds)) {
//         rounds = data.data.rounds;
//       } else if (Array.isArray(data)) {
//         rounds = data;
//       }
      
//       if (rounds.length > 0) {
//         console.log("🎮 Rounds received (Full List):", rounds.length, "rounds");
//         setCurrentRounds(rounds);
//       }
//     };

//     socketInstance.on("current:rounds", handleRoundsData);
//     socketInstance.on("currentRounds", handleRoundsData);
//     socketInstance.on("game:data", handleRoundsData);

//     // --- CRITICAL FIX: Ensure real-time update logic is robust ---
//     socketInstance.on("round:created", (data: GameData) => {
//       if (data && typeof data === "object" && "period" in data && data.gameDuration === 180) {
//         console.log(`✨ NEW 3-MIN ROUND CREATED: ${data.period} - Status: ${data.status}`);
        
//         setCurrentRounds((prev) => {
//           // 1. Filter out old versions of the round being created/updated
//           const filteredPrev = prev.filter(r => r.period !== data.period);
          
//           // 2. Add the new round data
//           const newRounds = [data, ...filteredPrev];

//           // 3. Sort by period (descending) to keep the most recent/active round at the top
//           // Note: Sorting by period string should generally work for your format (e.g., 3m-20251015-1051-1)
//           newRounds.sort((a, b) => b.period.localeCompare(a.period));

//           console.log(`📝 Updated rounds state with new active round: ${data.period}`);
//           return newRounds;
//         });
//       } else if (data && typeof data === "object" && "period" in data) {
//            // For non-3-minute games, still update or add them
//            setCurrentRounds((prev) => {
//                const newRounds = [...prev];
//                const existingIndex = newRounds.findIndex((r) => r.period === data.period);
               
//                if (existingIndex >= 0) {
//                    newRounds[existingIndex] = data; // Update
//                } else {
//                    newRounds.push(data); // Add
//                }
//                // Re-sort to maintain order if necessary, but this should be mainly for active games
//                newRounds.sort((a, b) => b.period.localeCompare(a.period)); 
//                return newRounds.slice(0, 20); // Keep a reasonable amount
//            });
//       }
//     });

//     socketInstance.on("round:finalized", (data) => {
//       console.log(`🏁 Round finalized: ${data.period}`);
//       // Send a request to get the full list, which now includes the finalized result
//       // AND the newly created round (which should already be added by round:created, 
//       // but this acts as a final sync).
//       socketInstance.emit("get:current:rounds");
//       socketInstance.emit("get:balance"); // Balance is often updated after finalization
//     });
//     // --- END CRITICAL FIX ---


//     socketInstance.on("game:result", (result) => {
//       console.log("🎲 Game result received (user bet result):", result);
//       if (result.status === "won") {
//         Alert.alert(
//           "🎉 Congratulations!",
//           `You WON this Round!\nPeriod: ${result.period}\nWinnings: ₹${result.winnings}`,
//           [{ text: "OK" }]
//         );
//       } else if (result.status === "lost") {
//         Alert.alert(
//           "😔 Better luck next time",
//           `You LOST this Round.\nPeriod: ${result.period}`,
//           [{ text: "OK" }]
//         );
//       }
      
//       // Refresh balance and rounds after result
//       socketInstance.emit("get:balance");
//       socketInstance.emit("get:current:rounds");
//     });

//     socketInstance.on("disconnect", () => {
//       console.log("❌ Socket disconnected");
//       setIsConnected(false);
      
//       // Clear refresh interval
//       if (refreshIntervalRef.current) {
//         clearInterval(refreshIntervalRef.current);
//         refreshIntervalRef.current = null;
//       }
//     });

//     socketInstance.on("connect_error", async (err) => {
//       console.error("❌ Socket connection error:", err.message);

//       if (
//         err.message.includes("Invalid token") ||
//         err.message.includes("Unauthorized")
//       ) {
//         await AsyncStorage.removeItem("token");
//         setToken(null);
//         Alert.alert(
//           "Session Expired",
//           "Your session has expired. Please login again.",
//           [{ text: "OK" }]
//         );
//       }
//       setIsConnected(false);
//     });

//     // Listen for all events for debugging
//     socketInstance.onAny((eventName, ...args) => {
//       // console.log(`🔔 Socket event: ${eventName}`, args); // Comment out for production/less noise
//     });

//     // 4. Cleanup
//     return () => {
//       console.log("🔌 Cleaning up socket connection");
//       if (refreshIntervalRef.current) {
//         clearInterval(refreshIntervalRef.current);
//         refreshIntervalRef.current = null;
//       }
//       socketInstance.removeAllListeners();
//       socketInstance.disconnect();
//     };
//   }, [token]);


//   // --- Provider Render ---
//   return (
//     <SocketContext.Provider
//       value={{
//         socket,
//         isConnected,
//         balance,
//         currentRounds,
//         updateBalance,
//         refreshBalance,
//         refreshRounds,
//         onTokenChange,
//       }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// }

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error("useSocket must be used within a SocketProvider");
//   }
//   return context;
// };

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface GameData {
    _id: string;
    period: string;
    gameDuration: number;
    scheduledAt: string;
    status: string;
    winningNumber: number | null;
    color: string[];
    size: string | null;
    totalBets: number;
    totalPayouts: number;
    systemProfit: number;
    adminSelected: boolean;
    createdAt: string;
    __v: number;
}

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
    balance: number | null;
    currentRounds: GameData[];
    refreshBalance: () => Promise<void>; 
    refreshRounds: () => void;
    onTokenChange: (token: string | null) => void;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
    balance: null,
    currentRounds: [],
    refreshBalance: async () => {},
    refreshRounds: () => {},
    onTokenChange: () => {},
});

const SOCKET_URL = "http://192.154.230.43:3000";
const API_BASE_URL = "http://192.154.230.43:3000";

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [balance, setBalance] = useState<number | null>(null);
    const [currentRounds, setCurrentRounds] = useState<GameData[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


    // --- 1. CORE FETCH FUNCTIONS (HTTP/API) ---

    // Define fetchRoundsViaApi using useCallback for stability
    const fetchRoundsViaApi = useCallback(async () => {
        try {
            if (!token) return;
            
            const response = await fetch(`${API_BASE_URL}/api/game/currentRounds`, {
                headers: { "Authorization": `Bearer ${token}` },
            });
            
            if (response.ok) {
                const data = await response.json();
                const rounds = data?.data?.rounds || [];
                if (rounds.length > 0) {
                    console.log("⬇️ API rounds fetched:", rounds.length);
                    setCurrentRounds(rounds);
                }
            } else {
                console.error("Failed to fetch rounds via API:", response.status);
            }
        } catch (error) {
            console.error("Error fetching rounds via API:", error);
        }
    }, [token]);

    // Define fetchBalanceViaApi using useCallback for stability
    const fetchBalanceViaApi = useCallback(async () => {
        try {
            if (!token) return;
            
            const response = await fetch(`${API_BASE_URL}/api/wallet/balance`, {
                headers: { "Authorization": `Bearer ${token}` },
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data?.data?.balance !== undefined) {
                    const roundedBalance = Math.round(data.data.balance * 100) / 100;
                    console.log("⬇️ API balance fetched:", roundedBalance);
                    setBalance(roundedBalance);
                }
            } else {
                console.error("Failed to fetch balance via API:", response.status);
            }
        } catch (error) {
            console.error("Error fetching balance via API:", error);
        }
    }, [token]);


    // --- 2. CONTEXT FUNCTIONS (EXPOSED) ---
    
    // Unified function for components to call for a balance refresh
    const refreshBalance = useCallback(async () => {
        if (socket && isConnected) {
            console.log("🔄 Refreshing balance via socket event: get:balance");
            socket.emit("get:balance");
        } else {
            // Fallback to the API call if socket isn't connected
            console.log("🔄 Refreshing balance via API (socket disconnected)...");
            await fetchBalanceViaApi();
        }
    }, [socket, isConnected, fetchBalanceViaApi]);


    // Unified function for components to call for rounds refresh
    const refreshRounds = useCallback(() => {
        if (socket && isConnected) {
            console.log("🔄 Manually refreshing rounds via socket...");
            socket.emit("get:current:rounds");
        } else {
            // Fallback to API if socket is not connected
            console.log("🔄 Manually refreshing rounds via API (socket disconnected)...");
            fetchRoundsViaApi(); // 👈 This reference is now correctly recognized
        }
    }, [socket, isConnected, fetchRoundsViaApi]);


    // Token Change Logic
    const onTokenChange = async (newToken: string | null) => {
        setToken(newToken);
        if (newToken) {
            await AsyncStorage.setItem("token", newToken);
        } else {
            await AsyncStorage.removeItem("token");
        }
    };


    // --- 3. LIFECYCLE EFFECTS ---

    // Load token on mount
    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                setToken(storedToken);
            } catch (error) {
                console.error("Error loading token:", error);
            }
        };
        loadToken();
    }, []);

    // Establish or disconnect socket on token change
    useEffect(() => {
        
        // 1. Disconnection logic
        if (!token) {
            if (socket) {
                console.log("🔌 Disconnecting socket - no token");
                socket.disconnect();
                setSocket(null);
            }
            setIsConnected(false);
            setBalance(null);
            setCurrentRounds([]);
            
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
                refreshIntervalRef.current = null;
            }
            return;
        }

        // 2. Connection logic
        console.log("🔌 Establishing socket connection...");
        const socketInstance = io(SOCKET_URL, {
            transports: ["websocket"],
            auth: { token },
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
        });

        setSocket(socketInstance);

        // 3. Socket event listeners
        
        socketInstance.on("connect", () => {
            console.log("✅ Socket.IO connected");
            setIsConnected(true);
            
            // Initial data fetch
            socketInstance.emit("get:balance");
            socketInstance.emit("get:current:rounds");
            
            // Set up periodic refresh every 30 seconds for rounds
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
            }
            refreshIntervalRef.current = setInterval(() => {
                console.log("🔄 Auto-refreshing rounds...");
                socketInstance.emit("get:current:rounds");
            }, 30000);
        });

        // 💰 LISTENER: The server's direct response to "get:balance"
        socketInstance.on("user:balance", (data) => {
            if (data?.balance !== undefined) {
                const roundedBalance = Math.round(data.balance * 100) / 100;
                console.log("💰 Balance received (user:balance):", roundedBalance);
                setBalance(roundedBalance);
            }
        });

        // 💰 LISTENER: The server's real-time push event for any balance change (CRITICAL for real-time updates)
        socketInstance.on("balance:update", (data) => {
            if (data?.balance !== undefined) {
                const roundedBalance = Math.round(data.balance * 100) / 100;
                console.log("💰 Balance updated (balance:update):", roundedBalance);
                setBalance(roundedBalance);
            } else {
                 // Fallback if the push data is incomplete
                 fetchBalanceViaApi();
            }
        });

        const handleRoundsData = (data: any) => {
            let rounds: GameData[] = [];
            
            if (data?.rounds && Array.isArray(data.rounds)) {
                rounds = data.rounds;
            } else if (data?.data?.rounds && Array.isArray(data.data.rounds)) {
                rounds = data.data.rounds;
            } else if (Array.isArray(data)) {
                rounds = data;
            }
            
            if (rounds.length > 0) {
                console.log("🎮 Rounds received (Full List):", rounds.length, "rounds");
                setCurrentRounds(rounds);
            }
        };

        socketInstance.on("current:rounds", handleRoundsData);
        socketInstance.on("currentRounds", handleRoundsData);
        socketInstance.on("game:data", handleRoundsData);

        socketInstance.on("round:created", (data: GameData) => {
            if (data && typeof data === "object" && "period" in data) {
                console.log(`✨ NEW ROUND CREATED: ${data.period} - Status: ${data.status}`);
                
                setCurrentRounds((prev) => {
                    const filteredPrev = prev.filter(r => r.period !== data.period);
                    const newRounds = [data, ...filteredPrev];
                    newRounds.sort((a, b) => b.period.localeCompare(a.period));
                    console.log(`📝 Updated rounds state with new active round: ${data.period}`);
                    return newRounds;
                });
            }
        });

        socketInstance.on("round:finalized", (data) => {
            console.log(`🏁 Round finalized: ${data.period}`);
            socketInstance.emit("get:current:rounds");
            socketInstance.emit("get:balance");
        });
        
        socketInstance.on("game:result", (result) => {
            console.log("🎲 Game result received (user bet result):", result);
            if (result.status === "won") {
                Alert.alert(
                    "🎉 Congratulations!",
                    `You WON this Round!\nPeriod: ${result.period}\nWinnings: ₹${result.winnings}`,
                    [{ text: "OK" }]
                );
            } else if (result.status === "lost") {
                Alert.alert(
                    "😔 Better luck next time",
                    `You LOST this Round.\nPeriod: ${result.period}`,
                    [{ text: "OK" }]
                );
            }
            
            socketInstance.emit("get:balance");
            socketInstance.emit("get:current:rounds");
        });

        socketInstance.on("disconnect", () => {
            console.log("❌ Socket disconnected");
            setIsConnected(false);
            
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
                refreshIntervalRef.current = null;
            }
        });

        socketInstance.on("connect_error", async (err) => {
            console.error("❌ Socket connection error:", err.message);

            if (
                err.message.includes("Invalid token") ||
                err.message.includes("Unauthorized")
            ) {
                await AsyncStorage.removeItem("token");
                setToken(null);
                Alert.alert(
                    "Session Expired",
                    "Your session has expired. Please login again.",
                    [{ text: "OK" }]
                );
            }
            setIsConnected(false);
        });

        socketInstance.onAny((eventName, ...args) => {
            // console.log(`🔔 Socket event: ${eventName}`, args); 
        });

        // 4. Cleanup
        return () => {
            console.log("🔌 Cleaning up socket connection");
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
                refreshIntervalRef.current = null;
            }
            socketInstance.removeAllListeners();
            socketInstance.disconnect();
        };
    }, [token, fetchBalanceViaApi, fetchRoundsViaApi]); // Added fetchRoundsViaApi to dependencies


    // --- Provider Render ---
    return (
        <SocketContext.Provider
            value={{
                socket,
                isConnected,
                balance,
                currentRounds,
                refreshBalance,
                refreshRounds,
                onTokenChange,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};