// import {
//   View,
//   Text,
//   Image,
//   Animated,
//   Dimensions,
//   ActivityIndicator,
// } from "react-native";
// import React from "react";
// import TabsMin from "../../Components/TabsMin";
// import { FontAwesome5 } from "@expo/vector-icons";
// import {
//   GestureHandlerRootView,
//   ScrollView,
// } from "react-native-gesture-handler";
// import { Ionicons } from "@expo/vector-icons";
// import { useRef, useEffect, useState } from "react";
// import { Link } from "expo-router";
// import { StatusBar as RNStatusBar } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { TouchableOpacity } from "react-native";
// import Animation from "@/Components/Animation";
// const Game = () => {
//   const [balance, setBalance] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);

//   const fetchBalance = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem("token");

//       if (!token) {
//         console.error("No token found");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(
//         "http://192.154.230.43:3000/api/wallet/balance",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json();
//       console.log("API Response:", data); // Debugging

//       if (
//         data.status === "success" &&
//         data.data &&
//         data.data.balance !== undefined
//       ) {
//         // Fix floating point precision issues and round to 2 decimal places
//         const roundedBalance = Math.round(data.data.balance * 100) / 100;
//         setBalance(roundedBalance);
//       } else {
//         console.error("Failed to fetch balance:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchBalance();
//   }, []);

//   return (
//     <GestureHandlerRootView>
//       <StatusBar style="auto" backgroundColor="#22c55e" />

//       {/* Custom Status Bar Background - This creates the green background behind status bar */}
//       <View
//         className="bg-green-500"
//         style={{
//           height: RNStatusBar.currentHeight,
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 1,
//         }}
//       />

//       <ScrollView>
//         <SafeAreaView className="bg-green-500 min-h-[35vh] rounded-b-[40px] p-4">
//           <View className="bg-white w-full items-center rounded-3xl my-4">
//             {/* <View className="flex-row items-center gap-2 mt-2">
//               <Text className="text-xl font-extrabold">0.00</Text>
//               <Ionicons name="refresh" size={20} color="black" />
//             </View> */}

//             <TouchableOpacity
//               className="flex flex-row items-center mt-3"
//               onPress={fetchBalance}
//             >
//               {loading ? (
//                 <ActivityIndicator size="small" color="#16a34a" />
//               ) : (
//                 <>
//                   <Text className="text-green-600 font-bold text-2xl">
//                     {balance !== null ? `₹${balance}` : "₹0"}
//                   </Text>
//                   <FontAwesome5
//                     name="sync-alt"
//                     size={16}
//                     color="#ccc"
//                     className="ml-2"
//                   />
//                 </>
//               )}
//             </TouchableOpacity>

//             <View className="flex-row items-center gap-2">
//               <Ionicons name="wallet" size={30} color="green" />
//               <Text className="text-xl font-bold">Wallet Balance</Text>
//             </View>

//             <View className="flex-row justify-between gap-3 mt-10 my-4">
//               <Link href="/AddMoney">
//                 {" "}
//                 <View className="bg-green-600 p-2 px-10 rounded-full">
//                   <Text className="text-white text-lg text-center">
//                     Deposit
//                   </Text>
//                 </View>{" "}
//               </Link>

//               <Link href="/WithdrawMoney">
//                 {" "}
//                 <View className="bg-green-600 p-2 rounded-full px-10">
//                   <Text className="text-white text-lg text-center">
//                     Withdraw
//                   </Text>
//                 </View>
//               </Link>
//             </View>
//           </View>

//           <Animation />
          
//         </SafeAreaView>
//         <TabsMin />
//       </ScrollView>
//     </GestureHandlerRootView>
//   );
// };

// export default Game;
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    Alert, 
} from "react-native";
import React, { useRef, useEffect, useState, useCallback } from "react";
import TabsMin from "../../Components/TabsMin";
import { FontAwesome5 } from "@expo/vector-icons";
import {
    GestureHandlerRootView,
    ScrollView,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StatusBar as RNStatusBar } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import Animation from "@/Components/Animation";
// Importing the useSocket hook to access the global socket instance
import { useSocket } from "@/app/context/SocketContext";

// Removed API_BASE_URL as it's no longer needed for direct balance fetching here

const Game = () => {
    // Access the global socket instance, connection status, balance, and refresh function
    const { socket, isConnected, balance, refreshBalance } = useSocket(); 

    // Keep loading state for the *manual refresh* indicator only
    const [loading, setLoading] = useState(false);
    
    // The previous API-based balance logic is now obsolete, 
    // as balance is provided by the SocketContext.

    // Helper for manual refresh press
    const handleManualRefresh = async () => {
        if (loading) return; // Prevent multiple clicks

        setLoading(true);
        try {
            // Call the unified refresh function from the context
            await refreshBalance(); 
            // In a real scenario, you might want to wait for the socket/API 
            // to update the context state, but for this component, we'll
            // immediately display a success message after the call starts.
            // Note: The context's fetchBalanceViaApi already handles the API call 
            // if the socket is down, and the socket itself will push the update.
            Alert.alert("Request Sent", "Balance refresh initiated.");
        } catch (error) {
            console.error("Error initiating refresh:", error);
            Alert.alert("Error", "Could not initiate balance refresh.");
        } finally {
            // Since the context manages the balance state update, we just stop 
            // the local loading indicator after a short delay for UX.
            // A more robust solution might listen to a temporary context state 
            // like 'isBalanceRefreshing' if you want a perfect link between 
            // the UI indicator and the network response.
            setTimeout(() => setLoading(false), 500); 
        }
    };

    // The socket listeners and initial fetch logic are now handled entirely in the SocketProvider.
    // The balance state is automatically updated here when the context updates.


    return (
        <GestureHandlerRootView>
            <StatusBar style="auto" backgroundColor="#22c55e" />

            {/* Custom Status Bar Background */}
            <View
                className="bg-green-500"
                style={{
                    height: RNStatusBar.currentHeight,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                }}
            />

            <ScrollView>
                <SafeAreaView className="bg-green-500 min-h-[35vh] rounded-b-[40px] p-4">
                    <View className="bg-white w-full items-center rounded-3xl my-4">
                        
                        {/* Connection Status is leveraged from context */}
                        {/* <Text className={`text-sm font-light mt-3 ${isConnected ? "text-green-500" : "text-red-500"}`}>
                             {isConnected ? "Connection: Live" : "Connection: Reconnecting..."}
                        </Text> */}
                        
                        <TouchableOpacity
                            className="flex flex-row items-center mt-2 mb-2"
                            onPress={handleManualRefresh}
                            disabled={loading} 
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#16a34a" />
                            ) : (
                                <>
                                    {/* Balance is read directly from the context state */}
                                    <Text className="text-green-600 font-bold text-3xl">
                                         {balance !== null ? `₹${balance.toFixed(2)}` : "₹--"}
                                    </Text>
                                    <FontAwesome5
                                        name="sync-alt"
                                        size={16}
                                        color="#ccc"
                                        style={{ marginLeft: 8 }}
                                    />
                                </>
                            )}
                        </TouchableOpacity>

                        <View className="flex-row items-center gap-2 mb-4">
                            <Ionicons name="wallet" size={30} color="green" />
                            <Text className="text-xl font-bold">Wallet Balance</Text>
                        </View>

                        <View className="flex-row justify-between gap-3 mt-4 my-4">
                            <Link href="/AddMoney">
                                <View className="bg-green-600 p-2 px-10 rounded-full">
                                    <Text className="text-white text-lg text-center">
                                        Deposit
                                    </Text>
                                </View>
                            </Link>

                            <Link href="/WithdrawMoney">
                                <View className="bg-green-600 p-2 rounded-full px-10">
                                    <Text className="text-white text-lg text-center">
                                        Withdraw
                                    </Text>
                                </View>
                            </Link>
                        </View>
                    </View>

                    <Animation />
                    
                </SafeAreaView>
                <TabsMin />
            </ScrollView>
        </GestureHandlerRootView>
    );
};

export default Game;