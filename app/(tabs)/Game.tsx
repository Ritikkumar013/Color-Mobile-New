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
//         "https://ctbackend.crobstacle.com/api/wallet/balance",
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
// app/(tabs)/game.tsx

    import {
        View,
        Text,
        Image,
        ActivityIndicator,
        Alert, 
    } from "react-native";
    import React, { useState } from "react";
    // 👈 Import useLocalSearchParams
    import { useLocalSearchParams } from "expo-router"; 
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
    import { TouchableOpacity } from "react-native";
    import Animation from "@/Components/Animation";
    import { useSocket } from "@/Components/context/SocketContext";

    const Game = () => {
        // 👈 1. Get the initialGameId parameter
        const params = useLocalSearchParams();
        // Ensure the parameter is a string, defaulting to "1" if not provided
        const initialGameId = Array.isArray(params.initialGameId)
            ? params.initialGameId[0]
            : params.initialGameId || "1"; 


        const { socket, isConnected, balance, refreshBalance } = useSocket(); 
        const [loading, setLoading] = useState(false);
        
        const handleManualRefresh = async () => {
            if (loading) return;

            setLoading(true);
            try {
                await refreshBalance(); 
                Alert.alert("Request Sent", "Balance refresh initiated.");
            } catch (error) {
                console.error("Error initiating refresh:", error);
                Alert.alert("Error", "Could not initiate balance refresh.");
            } finally {
                setTimeout(() => setLoading(false), 500); 
            }
        };

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
                            
                            <TouchableOpacity
                                className="flex flex-row items-center mt-2 mb-2"
                                onPress={handleManualRefresh}
                                disabled={loading} 
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="#16a34a" />
                                ) : (
                                    <>
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
                    {/* 👈 2. Pass the retrieved parameter as the initialTab prop */}
                    <TabsMin initialTab={initialGameId} /> 
                </ScrollView>
            </GestureHandlerRootView>
        );
    };

    export default Game;