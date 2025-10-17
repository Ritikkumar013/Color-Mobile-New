
// import React, { useState, useEffect, useRef } from "react";
// import BetModal from "./Betmodel";
// import Game2 from "@/Components/GameHistory/Game2";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//     View,
//     Text,
//     Image,
//     TouchableOpacity,
//     Alert,
//     ActivityIndicator,
// } from "react-native";
// import Game1 from "@/Components/GameHistory/Game1";
// import { useSocket } from "@/Components/context/SocketContext";

// const numberImages: { [key: number]: any } = {
//     0: require("../assets/images/No_images/0.png"),
//     1: require("../assets/images/No_images/1.png"),
//     2: require("../assets/images/No_images/2.png"),
//     3: require("../assets/images/No_images/3.png"),
//     4: require("../assets/images/No_images/4.png"),
//     5: require("../assets/images/No_images/5.png"),
//     6: require("../assets/images/No_images/6.png"),
//     7: require("../assets/images/No_images/7.png"),
//     8: require("../assets/images/No_images/8.png"),
//     9: require("../assets/images/No_images/9.png"),
// };

// interface GameRound {
//     _id: string;
//     period: string;
//     winningNumber: number | null;
//     color: string[];
//     size: string | null;
//     status: string;
//     scheduledAt: string;
//     gameDuration: number;
// }

// const API_BASE_URL = "https://ctbackend.crobstacle.com";

// const Min3 = () => {
//     const { socket, isConnected, currentRounds, refreshRounds } = useSocket();

//     const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [selectedAmount, setSelectedAmount] = useState("₹10");
//     const [selectedMultiplier, setSelectedMultiplier] = useState("x1");
//     const [selectedOption, setSelectedOption] = useState<{
//         type: "color" | "number" | "size";
//         value: string | number;
//     } | null>(null);
//     const [isPlacingBet, setIsPlacingBet] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(180);
//     const [currentPeriod, setCurrentPeriod] = useState<string>("");

//     const isBettingAllowed = timeLeft > 30;
//     const isInFinalSeconds = timeLeft <= 30 && timeLeft > 0;

//     const prevTimeRef = useRef<number>(180);
//     const lastPeriodRef = useRef<string>("");
//     const hasRequestedRoundsRef = useRef(false);
//     const roundEndTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//     const calculateTimeLeft = (): number => {
//         const now = new Date();
//         const currentMinute = now.getMinutes();
//         const currentSecond = now.getSeconds();
//         // Logic to find the end of the current 3-minute cycle
//         const nextGameMinute = Math.ceil((currentMinute + 1) / 3) * 3;
//         let minutesUntilNext = nextGameMinute - currentMinute;
//         if (minutesUntilNext <= 0) minutesUntilNext = 3;
//         const secondsLeft = minutesUntilNext * 60 - currentSecond;
//         return Math.max(0, Math.min(180, secondsLeft));
//     };

//     const placeBetViaAPI = async (betAmount: number): Promise<void> => {
//         try {
//             if (!selectedOption) throw new Error("Please select an option to bet.");
//             if (!currentPeriod) throw new Error("Waiting for game period. Please try again.");
//             if (!isBettingAllowed) throw new Error("Betting is closed for this round.");

//             const token = await AsyncStorage.getItem("token");
//             if (!token) throw new Error("Authentication error. Please log in again.");

//             let betType: string;
//             let betValue: string | string[]; // Allow betValue to be either a string or string array

//             if (selectedOption.type === "color") {
//                 betType = "color";
//                 // FINAL FIX for Color: Must be a single string, Title Case (e.g., "Green")
//                 betValue = selectedOption.value as string; 
//             } else if (selectedOption.type === "number") {
//                 betType = "number";
//                 // Keep Number as a string array, as this was working before (e.g., ["5"])
//                 betValue = [selectedOption.value.toString()];
//             } else if (selectedOption.type === "size") {
//                 betType = "size";
//                 // FINAL FIX for Size: Must be a single string, lowercase (e.g., "small")
//                 betValue = (selectedOption.value as string).toLowerCase();
//             } else {
//                 throw new Error("Invalid bet type.");
//             }
            
//             const betData = { period: currentPeriod, betAmount, betType, betValue };

//             console.log("➡️ Sending Bet Data (FINAL):", JSON.stringify(betData)); // Debug log for body

//             const controller = new AbortController();
//             const timeoutId = setTimeout(() => controller.abort(), 15000);

//             const response = await fetch(`${API_BASE_URL}/api/game/bet`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//                 body: JSON.stringify(betData),
//                 signal: controller.signal,
//             });

//             clearTimeout(timeoutId);
//             const responseData = await response.json();

//             if (!response.ok || responseData.status !== "success") {
//                 throw new Error(responseData.message || `Server error: ${response.status}`);
//             }
            
//             const betDetails = responseData.data;
//             Alert.alert(
//                 "✅ Bet Placed Successfully!",
//                 `Period: ${betDetails.period}\n` +
//                 `Bet: ${betDetails.betType} on ${Array.isArray(betDetails.betValue) ? betDetails.betValue.join(', ') : betDetails.betValue}\n` + // Adjust alert for clarity
//                 `Amount: ₹${betDetails.betAmount}`,
//                 [{ text: "OK", onPress: () => {
//                     setIsModalVisible(false);
//                     setSelectedOption(null);
//                     setSelectedAmount("₹10");
//                     setSelectedMultiplier("x1");
//                 }}]
//             );
            
//             refreshRounds();
//         } catch (error: any) {
//             console.error("❌ Bet API error:", error);
//             const errorMessage = error.name === 'AbortError' ? "Request timed out. Please try again." : error.message;
//             Alert.alert("Bet Failed", errorMessage);
//             throw error;
//         }
//     };

//     const placeBet = async (betAmount: number): Promise<void> => {
//         setIsPlacingBet(true);
//         try {
//             await placeBetViaAPI(betAmount);
//         } catch (error) {
//             // Error already handled
//         } finally {
//             setIsPlacingBet(false);
//         }
//     };

//     // 1. Initial rounds request
//     useEffect(() => {
//         if (socket && isConnected && !hasRequestedRoundsRef.current) {
//             console.log("📡 Initial rounds request on mount");
//             refreshRounds();
//             hasRequestedRoundsRef.current = true;
//         }
//     }, [socket, isConnected, refreshRounds]);

//     // 2. Socket event listeners (FIXED LOGIC)
//     useEffect(() => {
//         if (!socket) return;

//         const handleRoundCreated = (data: GameRound) => {
//             console.log(`🔔 Round created event: ${data.period} (${data.gameDuration}s, ${data.status})`);
            
//             // CRITICAL FIX: Look for the period ending in -2 instead of -1
//             if (data?.period && data.gameDuration === 180 && data.period.endsWith("-2")) {
                
//                 // Only update if the period is NEW (period has changed)
//                 if (data.period !== lastPeriodRef.current) {
//                     console.log(`✨ SOCKET NEW -2 ROUND DETECTED: ${lastPeriodRef.current || 'none'} → ${data.period}`);
                    
//                     // 1. Update period state and ref
//                     setCurrentPeriod(data.period);
//                     lastPeriodRef.current = data.period;

//                     // 2. Reset timer to match the start of the new round cycle
//                     const calculatedTime = calculateTimeLeft();
//                     setTimeLeft(calculatedTime);
                    
//                     // 3. Clear any pending timeout from the previous round's completion
//                     if (roundEndTimeoutRef.current) {
//                         clearTimeout(roundEndTimeoutRef.current);
//                         roundEndTimeoutRef.current = null;
//                     }
                    
//                     // 4. Clear selected bet option
//                     setSelectedOption(null);
//                 } else {
//                     console.log(`ℹ️ Received 'round:created' for existing -2 period: ${lastPeriodRef.current}`);
//                 }
//             } else if (data?.period && data.gameDuration === 180) {
//                 console.log(`⚠️ Ignoring non-betting round: ${data.period}`);
//             }
//         };

//         const handleRoundFinalized = (data: any) => {
//             console.log("🏁 Round finalized:", data);
            
//             setTimeout(() => {
//                 console.log("🔄 Requesting fresh rounds after finalization");
//                 refreshRounds();
//             }, 1500); 
//         };

//         socket.on("round:created", handleRoundCreated);
//         socket.on("round:finalized", handleRoundFinalized);

//         return () => {
//             socket.off("round:created", handleRoundCreated);
//             socket.off("round:finalized", handleRoundFinalized);
//         };
//     }, [socket, refreshRounds]);

//     // 3. Timer countdown logic
//     useEffect(() => {
//         const interval = setInterval(() => {
//             const newTime = calculateTimeLeft();
//             const prevTime = prevTimeRef.current;
//             setTimeLeft(newTime);
//             prevTimeRef.current = newTime;

//             // Detect round ending (timer going from >0 to 0)
//             if (newTime === 0 && prevTime > 0) {
//                 console.log("⏳ Round ended (timer hit 0)");
                
//                 if (roundEndTimeoutRef.current) {
//                     clearTimeout(roundEndTimeoutRef.current);
//                 }
                
//                 // Schedule IMMEDIATE round refresh
//                 roundEndTimeoutRef.current = setTimeout(() => {
//                     console.log("🔄 Round end timeout - requesting new rounds");
//                     refreshRounds();
//                 }, 300); // Only wait 300ms for new period ID
//             }
            
//             // Safety check if period is empty and timer is high
//             if (newTime > 170 && newTime <= 180 && !currentPeriod) {
//                 console.log("⚠️ No period ID at start of cycle - requesting rounds");
//                 refreshRounds();
//             }
//         }, 1000);
        
//         return () => {
//             clearInterval(interval);
//             if (roundEndTimeoutRef.current) {
//                 clearTimeout(roundEndTimeoutRef.current);
//             }
//         };
//     }, [currentPeriod, refreshRounds]);

//     // 4. Sync period from currentRounds (API fallback and history) (REFINED)
//     useEffect(() => {
//         if (!currentRounds || currentRounds.length === 0) {
//             return;
//         }

//         console.log("📊 Processing currentRounds from API/SocketContext update...");
        
//         // CRITICAL FIX: Find the current active/scheduled 3-minute game that ends in -2
//         const threeMinGame = currentRounds.find(
//             (game) => 
//             game && 
//             game.gameDuration === 180 && 
//             (game.status === "active" || game.status === "scheduled") &&
//             game.period?.endsWith("-2") // <-- Only accept -2
//         );
        
//         if (threeMinGame?.period) {
//             const newPeriod = threeMinGame.period;
//             const oldPeriod = lastPeriodRef.current;
            
//             // Update if: no current period OR the period has changed
//             if (!oldPeriod || newPeriod !== oldPeriod) {
//                 console.log(`🔄 API/CONTEXT -2 PERIOD UPDATE: ${oldPeriod || 'none'} → ${newPeriod}`);
//                 setCurrentPeriod(newPeriod);
//                 lastPeriodRef.current = newPeriod;
                
//                 // Recalculate timer for this period
//                 const calculatedTime = calculateTimeLeft();
//                 setTimeLeft(calculatedTime);
//             } else {
//                 console.log(`ℹ️ API/CONTEXT -2 period matches current: ${oldPeriod}`);
//             }
//         } else {
//             console.log("❌ No active/scheduled 3-minute game ending in -2 found");
//             setTimeLeft(calculateTimeLeft());
//         }

//         // Extract winning numbers from completed games (History logic remains)
//         const completedGames = currentRounds.filter(
//             g => g?.status === "completed" && g.winningNumber !== null && g.gameDuration === 180
//         );
        
//         const nums = completedGames
//             .sort((a, b) => b.period.localeCompare(a.period))
//             .map(g => g.winningNumber as number)
//             .slice(0, 5);
        
//         if (nums.length > 0 && JSON.stringify(nums) !== JSON.stringify(winningNumbers)) {
//             console.log("🎲 Updating winning numbers:", nums);
//             setWinningNumbers(nums);
//         }
//     }, [currentRounds, winningNumbers]); 

//     const formatTime = (seconds: number): string[] => {
//         const m = Math.floor(seconds / 60).toString().padStart(2, "0");
//         const s = (seconds % 60).toString().padStart(2, "0");
//         return [...m, ":", ...s];
//     };

//     const handlePress = (type: "color" | "number" | "size", value: string | number) => {
//         if (!isBettingAllowed) {
//             Alert.alert("Betting Closed", "Betting is not allowed in the final 30 seconds.");
//             return;
//         }
//         setSelectedOption((prev) =>
//             prev?.type === type && prev.value === value ? null : { type, value }
//         );
//     };

//     const isValid3MinGame = !!currentPeriod;
//     const isBetButtonActive = selectedOption !== null && isBettingAllowed && isValid3MinGame && isConnected;
//     const colors = [{ key: "Green", bg: "bg-green-500" }, { key: "Violet", bg: "bg-violet-500" }, { key: "Red", bg: "bg-red-500" }];
//     const numbers = Array.from({ length: 10 }, (_, i) => i);
    
//     return (
//         <View>
//             {!isConnected && (
//                 <View className="bg-red-100 p-2 mx-2 mt-2 rounded-lg">
//                     <Text className="text-red-800 text-center text-sm font-semibold">
//                         ⚠️ Disconnected - Reconnecting...
//                     </Text>
//                 </View>
//             )}

//             <View className="bg-green-600 flex-row justify-between p-3 rounded-xl py-4 items-center">
//                 <View>
//                     <View className="border border-white rounded-2xl items-center px-3 flex-row gap-1 py-1">
//                         <Image source={require("../assets/images/howtoplay.png")} className="w-5 h-5" />
//                         <Text className="text-white font-bold text-sm">How to play</Text>
//                     </View>
//                     <Text className="font-extrabold text-white px-3 py-2">Win Go 3 min</Text>
//                     <View className="pl-2 mt-1">
//                         <View className="flex-row gap-2">
//                             {winningNumbers.length > 0 ? (
//                                 winningNumbers.map((num, index) => (
//                                     <View key={index} className="w-8 h-8 rounded-full bg-white items-center justify-center">
//                                         <Image source={numberImages[num]} style={{ width: 30, height: 30 }} resizeMode="contain"/>
//                                     </View>
//                                 ))
//                             ) : (
//                                 <Text className="text-white text-xs">No history yet</Text>
//                             )}
//                         </View>
//                     </View>
//                 </View>

//                 <View className="items-center px-1">
//                     <Text className="text-white text-center text-sm font-bold h-6 mb-1">
//                         {currentPeriod || "Syncing..."}
//                     </Text>

//                     <Text className="text-white text-lg font-extrabold mb-1">Time Left</Text>
//                     <View className="flex-row gap-1">
//                         {formatTime(timeLeft).map((char, index) => (
//                             <View key={index} className={`rounded-md px-2 ${isInFinalSeconds ? "bg-red-500" : "bg-white"}`}>
//                                 <Text className={`text-lg font-extrabold ${isInFinalSeconds ? "text-white" : "text-green-600"}`}>
//                                     {char}
//                                 </Text>
//                             </View>
//                         ))}
//                     </View>
//                 </View>
//             </View>

//             <View className="my-5 flex-row justify-between px-1">
//                 {colors.map(({ key, bg }) => {
//                     const isSelected = selectedOption?.type === "color" && selectedOption.value === key;
//                     const isDisabled = !isBettingAllowed || !isValid3MinGame;
//                     return (
//                         <TouchableOpacity key={key} onPress={() => handlePress("color", key)} disabled={isDisabled}
//                             className={`${bg} p-2 rounded-tr-2xl rounded-bl-2xl flex-1 mx-2 ${isSelected ? "border-4 border-yellow-400" : ""} ${isDisabled ? "opacity-30" : ""}`}>
//                             <Text className="text-lg text-white font-bold text-center">{key}</Text>
//                         </TouchableOpacity>
//                     );
//                 })}
//             </View>

//             <View className="flex flex-row flex-wrap justify-center gap-2 my-4 px-2">
//                 {numbers.map((number) => {
//                     const isSelected = selectedOption?.type === "number" && selectedOption.value === number;
//                     const isDisabled = !isBettingAllowed || !isValid3MinGame;
//                     return (
//                         <TouchableOpacity key={number} onPress={() => handlePress("number", number)} disabled={isDisabled}
//                             className={`h-16 w-16 rounded-full overflow-hidden items-center justify-center ${isSelected ? "border-4 border-yellow-500" : ""} ${isDisabled ? "opacity-30" : ""}`}>
//                             <Image source={numberImages[number]} className="h-full w-full" resizeMode="cover"/>
//                         </TouchableOpacity>
//                     );
//                 })}
//             </View>

//             <View className="flex-row justify-center mt-6 gap-3 px-3">
//                 {(["Big", "Small"] as const).map((size) => {
//                     const isSelected = selectedOption?.type === "size" && selectedOption.value === size;
//                     const isDisabled = !isBettingAllowed || !isValid3MinGame;
//                     const bgColor = size === "Big" ? "bg-orange-400" : "bg-purple-500";
//                     return (
//                         <TouchableOpacity key={size} onPress={() => handlePress("size", size)} disabled={isDisabled}
//                             className={`${bgColor} px-12 py-3 rounded-full ${isSelected ? "border-4 border-yellow-500" : ""} ${isDisabled ? "opacity-30" : ""}`}>
//                             <Text className="text-lg font-bold text-white">{size}</Text>
//                         </TouchableOpacity>
//                     );
//                 })}
//             </View>

//             <View className="mt-6 items-center pb-6 px-3">
//                 <TouchableOpacity onPress={() => setIsModalVisible(true)} disabled={!isBetButtonActive}
//                     className={`px-8 py-3 rounded-full w-full ${isBetButtonActive ? "bg-green-600" : "bg-gray-400"}`}>
//                     <Text className={`text-lg font-bold text-center ${isBetButtonActive ? "text-white" : "text-gray-600"}`}>
//                         {!isConnected
//                             ? "Connecting..."
//                             : !currentPeriod
//                             ? "Waiting for game..."
//                             : !isBettingAllowed
//                             ? "Betting Closed"
//                             : isBetButtonActive
//                             ? `Place Bet (${selectedOption?.type}: ${selectedOption?.value})`
//                             : "Select an option to bet"}
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             <BetModal
//                 visible={isModalVisible}
//                 onClose={() => setIsModalVisible(false)}
//                 selectedAmount={selectedAmount}
//                 selectedMultiplier={selectedMultiplier}
//                 setSelectedAmount={setSelectedAmount}
//                 setSelectedMultiplier={setSelectedMultiplier}
//                 onPlaceBet={placeBet}
//                 isPlacingBet={isPlacingBet}
//             />

//             <View className="pt-5">
//                 <Game2 />
//             </View>
//         </View>
//     );
// };

// export default Min3;

import React, { useState, useEffect, useRef } from "react";
import BetModal from "./Betmodel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import Game2 from "@/Components/GameHistory/Game2";
import { useSocket } from "@/Components/context/SocketContext";

const numberImages: { [key: number]: any } = {
  0: require("../assets/images/No_images/0.png"),
  1: require("../assets/images/No_images/1.png"),
  2: require("../assets/images/No_images/2.png"),
  3: require("../assets/images/No_images/3.png"),
  4: require("../assets/images/No_images/4.png"),
  5: require("../assets/images/No_images/5.png"),
  6: require("../assets/images/No_images/6.png"),
  7: require("../assets/images/No_images/7.png"),
  8: require("../assets/images/No_images/8.png"),
  9: require("../assets/images/No_images/9.png"),
};

interface GameRound {
  _id: string;
  period: string;
  winningNumber: number | null;
  color: string[];
  size: string | null;
  status: string;
  scheduledAt: string;
  gameDuration: number;
}

const API_BASE_URL = "https://ctbackend.crobstacle.com";

const Min3 = () => {
  const { socket, isConnected, currentRounds, refreshRounds } = useSocket();

  const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("₹10");
  const [selectedMultiplier, setSelectedMultiplier] = useState("x1");
  const [selectedOption, setSelectedOption] = useState<{
    type: "color" | "number" | "size";
    value: string | number;
  } | null>(null);
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [currentPeriod, setCurrentPeriod] = useState<string>("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const isBettingAllowed = timeLeft > 30;
  const isInFinalSeconds = timeLeft <= 30 && timeLeft > 0;

  const prevTimeRef = useRef<number>(180);
  const lastPeriodRef = useRef<string>("");
  const hasRequestedRoundsRef = useRef(false);
  const roundEndTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculateTimeLeft = (): number => {
    const now = new Date();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    const nextGameMinute = Math.ceil((currentMinute + 1) / 3) * 3;
    let minutesUntilNext = nextGameMinute - currentMinute;
    if (minutesUntilNext <= 0) minutesUntilNext = 3;
    const secondsLeft = minutesUntilNext * 60 - currentSecond;
    return Math.max(0, Math.min(180, secondsLeft));
  };

  const fetchGameHistory = async () => {
    try {
      setIsLoadingHistory(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setIsLoadingHistory(false);
        return;
      }
      const response = await fetch(`${API_BASE_URL}/api/game/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok)
        throw new Error(`Failed to fetch history: ${response.status}`);
      const data = await response.json();
      if (
        data.status === "success" &&
        data.data?.data &&
        Array.isArray(data.data.data)
      ) {
        const allGames: any[] = [].concat(
          ...data.data.data.map((ts: any) => ts.games || [])
        );
        const completedGames = allGames.filter(
          (game: any) =>
            game.status === "completed" &&
            game.winningNumber !== null &&
            game.gameDuration === 180 &&
            game.period?.endsWith("-2")
        );
        const nums = completedGames
          .sort((a: any, b: any) => b.period.localeCompare(a.period))
          .map((game: any) => game.winningNumber)
          .slice(0, 4);
        if (nums.length > 0) setWinningNumbers(nums);
      }
    } catch (error) {
      console.error("❌ Error fetching game history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const placeBetViaAPI = async (betAmount: number): Promise<void> => {
    try {
      if (!selectedOption) throw new Error("Please select an option to bet.");
      if (!currentPeriod)
        throw new Error("Waiting for game period. Please try again.");
      if (!isBettingAllowed)
        throw new Error("Betting is closed for this round.");
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Authentication error. Please log in again.");

      let betType: string;
      let betValue: string | string[];

      if (selectedOption.type === "color") {
        betType = "color";
        betValue = selectedOption.value as string;
      } else if (selectedOption.type === "number") {
        betType = "number";
        betValue = [selectedOption.value.toString()];
      } else if (selectedOption.type === "size") {
        betType = "size";
        betValue = (selectedOption.value as string).toLowerCase();
      } else {
        throw new Error("Invalid bet type.");
      }
      const betData = { period: currentPeriod, betAmount, betType, betValue };
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${API_BASE_URL}/api/game/bet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(betData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const responseData = await response.json();

      if (!response.ok || responseData.status !== "success") {
        throw new Error(
          responseData.message || `Server error: ${response.status}`
        );
      }

      const betDetails = responseData.data;
      Alert.alert(
        "✅ Bet Placed Successfully!",
        `Period: ${betDetails.period}\n` +
          `Bet: ${betDetails.betType} on ${Array.isArray(betDetails.betValue) ? betDetails.betValue.join(", ") : betDetails.betValue}\n` +
          `Amount: ₹${betDetails.betAmount}`,
        [
          {
            text: "OK",
            onPress: () => {
              setIsModalVisible(false);
              setSelectedOption(null);
              setSelectedAmount("₹10");
              setSelectedMultiplier("x1");
            },
          },
        ]
      );
      refreshRounds();
      fetchGameHistory();
    } catch (error: any) {
      const errorMessage =
        error.name === "AbortError"
          ? "Request timed out. Please try again."
          : error.message;
      Alert.alert("Bet Failed", errorMessage);
      throw error;
    }
  };

  const placeBet = async (betAmount: number): Promise<void> => {
    setIsPlacingBet(true);
    try {
      await placeBetViaAPI(betAmount);
    } catch (error) {
      /* Error already handled */
    } finally {
      setIsPlacingBet(false);
    }
  };

  useEffect(() => {
    if (socket && isConnected && !hasRequestedRoundsRef.current) {
      refreshRounds();
      fetchGameHistory();
      hasRequestedRoundsRef.current = true;
    }
  }, [socket, isConnected, refreshRounds]);

  useEffect(() => {
    if (!socket) return;
    const handleRoundCreated = (data: GameRound) => {
      if (
        data?.period &&
        data.gameDuration === 180 &&
        data.period.endsWith("-2") &&
        data.period !== lastPeriodRef.current
      ) {
        setCurrentPeriod(data.period);
        lastPeriodRef.current = data.period;
        setTimeLeft(calculateTimeLeft());
        if (roundEndTimeoutRef.current)
          clearTimeout(roundEndTimeoutRef.current);
        setSelectedOption(null);
      }
    };
    const handleRoundFinalized = () => {
      setTimeout(() => {
        refreshRounds();
        fetchGameHistory();
      }, 1500);
    };
    socket.on("round:created", handleRoundCreated);
    socket.on("round:finalized", handleRoundFinalized);
    return () => {
      socket.off("round:created", handleRoundCreated);
      socket.off("round:finalized", handleRoundFinalized);
    };
  }, [socket, refreshRounds]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
      if (newTime === 0 && prevTimeRef.current > 0) {
        if (roundEndTimeoutRef.current)
          clearTimeout(roundEndTimeoutRef.current);
        roundEndTimeoutRef.current = setTimeout(() => {
          refreshRounds();
          fetchGameHistory();
        }, 300);
      }
      if (newTime > 170 && !currentPeriod) refreshRounds();
      prevTimeRef.current = newTime;
    }, 1000);
    return () => {
      clearInterval(interval);
      if (roundEndTimeoutRef.current) clearTimeout(roundEndTimeoutRef.current);
    };
  }, [currentPeriod, refreshRounds]);

  useEffect(() => {
    if (!currentRounds || currentRounds.length === 0) return;
    const threeMinGame = currentRounds.find(
      (g) =>
        g &&
        g.gameDuration === 180 &&
        (g.status === "active" || g.status === "scheduled") &&
        g.period?.endsWith("-2")
    );
    if (threeMinGame?.period && threeMinGame.period !== lastPeriodRef.current) {
      setCurrentPeriod(threeMinGame.period);
      lastPeriodRef.current = threeMinGame.period;
      setTimeLeft(calculateTimeLeft());
    } else if (!threeMinGame) {
      setTimeLeft(calculateTimeLeft());
    }
  }, [currentRounds]);

  // FIXED: Return array of individual characters/elements for layout display
  const formatTime = (seconds: number): string[] => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return [m[0], m[1], ":", s[0], s[1]];
  };

  const handlePress = (
    type: "color" | "number" | "size",
    value: string | number
  ) => {
    if (!isBettingAllowed) {
      Alert.alert(
        "Betting Closed",
        "Betting is not allowed in the final 30 seconds."
      );
      return;
    }
    if (!isValid3MinGame) {
      Alert.alert(
        "Game Not Ready",
        "Waiting for game to start. Please try again."
      );
      return;
    }
    if (
      selectedOption &&
      selectedOption.type === type &&
      selectedOption.value === value
    ) {
      setSelectedOption(null);
    } else {
      setSelectedOption({ type, value });
    }
  };

  const isValid3MinGame = !!currentPeriod;
  const isBetButtonActive =
    selectedOption !== null &&
    isBettingAllowed &&
    isValid3MinGame &&
    isConnected;
  const colors = [
    { key: "Green", bg: "bg-green-500" },
    { key: "Violet", bg: "bg-violet-500" },
    { key: "Red", bg: "bg-red-500" },
  ];
  const numbers = Array.from({ length: 10 }, (_, i) => i);

  return (
    <View>
      {!isConnected && (
        <View className="bg-red-100 p-2 mx-2 mt-2 rounded-lg">
          <Text className="text-red-800 text-center text-sm font-semibold">
            ⚠️ Disconnected - Reconnecting...
          </Text>
        </View>
      )}
      <View className="bg-green-600 flex-row justify-between p-3 rounded-xl py-4 items-center">
        <View>
          <View className="border border-white rounded-2xl items-center px-3 flex-row gap-1 py-1">
            <Image
              source={require("../assets/images/howtoplay.png")}
              className="w-5 h-5"
            />
            <Text className="text-white font-bold text-sm">How to play</Text>
          </View>

          <Text className="font-extrabold text-white px-3 py-2">
            Win Go 3 min
          </Text>

          <View className="pl-2 mt-1">
            <View className="flex-row gap-2">
              {winningNumbers.length > 0 ? (
                winningNumbers.map((num, index) => (
                  <View
                    key={`${num}-${index}`}
                    className="w-8 h-8 rounded-full bg-white items-center justify-center"
                  >
                    <Image
                      source={numberImages[num]}
                      style={{ width: 30, height: 30 }}
                      resizeMode="cover"
                    />
                  </View>
                ))
              ) : (
                <Text className="text-white text-xs">Loading history...</Text>
              )}
            </View>
          </View>
        </View>

        <View className="items-center px-1">
          <Text className="text-white text-center text-sm font-bold h-6 mb-1">
            {currentPeriod || "Syncing..."}
          </Text>

          <Text className="text-white text-lg font-extrabold mb-1">
            Time Left
          </Text>

          {/* FIXED: formatTime now returns array of strings, each wrapped in Text component */}
          <View className="flex-row gap-1">
            {formatTime(timeLeft).map((char, index) => (
              <View
                key={index}
                className={`rounded-md px-2 ${
                  isInFinalSeconds ? "bg-red-500" : "bg-white"
                }`}
              >
                <Text
                  className={`text-lg font-extrabold ${
                    isInFinalSeconds ? "text-white" : "text-green-600"
                  }`}
                >
                  {char}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="relative">
        <View className="my-5 flex-row justify-between px-1">
          {colors.map(({ key, bg }) => {
            const isSelected =
              selectedOption?.type === "color" && selectedOption.value === key;
            return (
              <TouchableOpacity
                key={key}
                onPress={() => handlePress("color", key)}
                activeOpacity={0.7}
                className={`${bg} p-2 rounded-tr-2xl rounded-bl-2xl flex-1 mx-2 border-4 ${
                  isSelected ? "border-yellow-400" : "border-transparent"
                }`}
              >
                <Text className="text-lg text-white font-bold text-center">
                  {key}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="my-2 px-2">
          {/* First Row: Numbers 0-4 */}
          <View className="flex-row justify-center">
            {numbers.slice(0, 5).map((number) => {
              const isSelected =
                selectedOption?.type === "number" &&
                selectedOption.value === number;
              return (
                <View
                  key={number}
                  className={`rounded-full ${
                    isSelected
                      ? "border-4 border-yellow-500"
                      : "border-4 border-transparent"
                  }`}
                >
                  <TouchableOpacity
                    onPress={() => handlePress("number", number)}
                    activeOpacity={0.7}
                    className="h-16 w-16 rounded-full overflow-hidden items-center justify-center"
                  >
                    <Image
                      source={numberImages[number]}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          {/* Second Row: Numbers 5-9 */}
          <View className="flex-row justify-center mt-1">
            {numbers.slice(5, 10).map((number) => {
              const isSelected =
                selectedOption?.type === "number" &&
                selectedOption.value === number;
              return (
                <View
                  key={number}
                  className={`rounded-full ${
                    isSelected
                      ? "border-4 border-yellow-500"
                      : "border-4 border-transparent"
                  }`}
                >
                  <TouchableOpacity
                    onPress={() => handlePress("number", number)}
                    activeOpacity={0.7}
                    className="h-16 w-16 rounded-full overflow-hidden items-center justify-center"
                  >
                    <Image
                      source={numberImages[number]}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        <View className="flex-row justify-center mt-6 gap-3 px-3">
          {(["Big", "Small"] as const).map((size) => {
            const isSelected =
              selectedOption?.type === "size" && selectedOption.value === size;
            const bgColor = size === "Big" ? "bg-orange-400" : "bg-purple-500";
            return (
              <TouchableOpacity
                key={size}
                onPress={() => handlePress("size", size)}
                activeOpacity={0.7}
                className={`${bgColor} px-10 py-2 rounded-full flex-1 border-4 ${
                  isSelected ? "border-yellow-500" : "border-transparent"
                }`}
              >
                <Text className="text-lg font-bold text-white text-center">
                  {size}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {(!isBettingAllowed || !isValid3MinGame) && (
          <View className="absolute inset-0 bg-black/60 z-10 mt-3 rounded-xl" />
        )}
      </View>

      <View className="mt-6 items-center pb-6 px-3">
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          disabled={!isBetButtonActive}
          activeOpacity={0.7}
          className={`px-8 py-3 rounded-full w-full ${
            isBetButtonActive ? "bg-green-600" : "bg-gray-400"
          }`}
        >
          <Text
            className={`text-lg font-bold text-center ${
              isBetButtonActive ? "text-white" : "text-gray-600"
            }`}
          >
            {!isConnected
              ? "Connecting..."
              : !currentPeriod
                ? "Waiting for game..."
                : !isBettingAllowed
                  ? "Betting Closed"
                  : selectedOption
                    ? `Place Bet on ${selectedOption.value}`
                    : "Select an option to bet"}
          </Text>
        </TouchableOpacity>
      </View>

      <BetModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        selectedAmount={selectedAmount}
        selectedMultiplier={selectedMultiplier}
        setSelectedAmount={setSelectedAmount}
        setSelectedMultiplier={setSelectedMultiplier}
        onPlaceBet={placeBet}
        isPlacingBet={isPlacingBet}
      />

      <View className="pt-5">
        <Game2 />
      </View>
    </View>
  );
};

export default Min3;