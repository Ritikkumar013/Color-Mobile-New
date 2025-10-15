// import { View, Text, Image } from "react-native";
// import React, { useState, useEffect } from "react";
// import { TouchableOpacity } from "react-native";

// const numberImages: { [key: number]: any } = {
//   0: require("../assets/images/No_images/0.png"),
//   1: require("../assets/images/No_images/1.png"),
//   2: require("../assets/images/No_images/2.png"),

//   3: require("../assets/images/No_images/3.png"),
//   4: require("../assets/images/No_images/4.png"),
//   5: require("../assets/images/No_images/5.png"),

//   6: require("../assets/images/No_images/6.png"),
//   7: require("../assets/images/No_images/7.png"),
//   8: require("../assets/images/No_images/8.png"),
//   9: require("../assets/images/No_images/9.png"),
// };

// const Min3 = () => {
//   const [time, setTime] = useState(600); // Set initial time to 3 minutes (180 seconds)
//   const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//   useEffect(() => {
//     if (time <= 0) return;

//     const timer = setInterval(() => {
//       setTime((prevTime) => prevTime - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [time]);

//   // Convert time into MM:SS format and separate digits
//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, "0");
//     const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

//     return [...minutes, ":", ...remainingSeconds]; // Returns an array for styling each digit
//   };

//   return (
//     <View>
//       <View className="bg-green-600 flex-row justify-between p-3 rounded-xl py-5 items-center">
//         {/* Left Section (Unchanged) */}
//         <View>
//           <View className="border border-white rounded-2xl items-center px-3 flex-row gap-1 py-1">
//             <Image
//               source={require("../assets/images/howtoplay.png")}
//               className="w-5 h-5"
//             />
//             <Text className="text-white font-bold text-sm">How to play</Text>
//           </View>
//           <Text className="font-extrabold text-white px-3 py-2">
//             Win Go 10 min
//           </Text>
//         </View>

//         {/* Right Section (Modified to match image) */}
//         <View className="items-center px-1">
//           {/* Time Remaining Title */}
//           <Text className="text-white text-lg font-extrabold mb-1">
//             Time Remaining
//           </Text>

//           {/* Timer in Block Style */}
//           <View className="flex-row gap-1">
//             {formatTime(time).map((char, index) => (
//               <View
//                 key={index}
//                 className={`${
//                   char === ":" ? "bg-white" : "bg-white"
//                 } rounded-md px-2`}
//               >
//                 <Text className="text-green-600 text-lg font-extrabold">
//                   {char}
//                 </Text>
//               </View>
//             ))}
//           </View>

//           {/* Extra Number Below Timer */}
//           <Text className="text-white text-center mt-1">2025485252</Text>
//         </View>
//       </View>
//       {/* Game Section */}
//       <View className="my-5">
//         <View className="flex-row justify-between ">
//           <View className="bg-green-500 px-7 p-2 rounded-tr-2xl rounded-bl-2xl">
//             <Text className="text-lg text-white font-bold">Green</Text>
//           </View>

//           <View className="bg-violet-500 px-7 p-2 rounded-tr-2xl rounded-bl-2xl">
//             <Text className="text-lg text-white font-bold">Violet</Text>
//           </View>

//           <View className="bg-red-500 px-7 p-2 rounded-tr-2xl rounded-bl-2xl">
//             <Text className="text-lg text-white font-bold">Red</Text>
//           </View>
//         </View>

//         <View className="flex flex-row flex-wrap justify-center gap-4 my-4">
//           {numbers.map((number, index) => (
//             <TouchableOpacity
//               key={index}
//               className="h-16 w-16 rounded-full overflow-hidden items-center justify-center"
//               onPress={() => console.log(`Number ${number} pressed`)} // Replace with your logic
//             >
//               <Image
//                 source={numberImages[number]} // Replace with your actual image mapping logic
//                 className="h-full w-full object-cover"
//               />
//             </TouchableOpacity>
//           ))}
//         </View>

//         <View className="container flex-row gap-2 items-center">
//           <View>
//             <TouchableOpacity className="border border-green-500 p-3 px-5 rounded-xl">
//               <Text className="text-lg text-green-500 font-semibold">
//                 Random
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View>
//           <View className="flex-row gap-2">
//             {[3, 5, 10, 20, 50].map((multiplier) => (
//               <TouchableOpacity
//                 key={multiplier}
//                 className="p-2 hover:bg-green-500 hover:text-white bg-gray-200 rounded-lg text-gray-700"
//               >

//                 <Text className="text-sm">x{multiplier}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Min3;

// import React, { useState, useEffect } from "react";
// import BetModal from "./Betmodel";

// import Game4 from "@/Components/GameHistory/Game4"
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   AppState,
//   AppStateStatus,
//   Alert,
//   ActivityIndicator,
// } from "react-native";

// const numberImages: { [key: number]: any } = {
//   0: require("../assets/images/No_images/0.png"),
//   1: require("../assets/images/No_images/1.png"),
//   2: require("../assets/images/No_images/2.png"),
//   3: require("../assets/images/No_images/3.png"),
//   4: require("../assets/images/No_images/4.png"),
//   5: require("../assets/images/No_images/5.png"),
//   6: require("../assets/images/No_images/6.png"),
//   7: require("../assets/images/No_images/7.png"),
//   8: require("../assets/images/No_images/8.png"),
//   9: require("../assets/images/No_images/9.png"),
// };

// interface Game {
//   _id: string;
//   period: string;
//   gameDuration: number;
//   scheduledAt: string;
//   status: string;
//   createdAt: string;
// }

// interface GameData {
//   games: {
//     "1_game": Game;
//     "2_game": Game;
//     "3_game": Game;
//     "4_game": Game;
//   };
//   lastGames: any;
//   walletBalance: number;
// }

// function usePersistentCountdown(
//   scheduledAt: string | null,
//   gameDuration: number | null,
//   onExpire?: () => void
// ): number {
//   const [timeLeft, setTimeLeft] = useState<number>(0);

//   useEffect(() => {
//     if (!scheduledAt || gameDuration == null) return;

//     const startTime = new Date(scheduledAt).getTime();
//     const duration = gameDuration;

//     function update() {
//       const now = Date.now();
//       const elapsed = Math.floor((now - startTime) / 1000);
//       const left = Math.max(duration - elapsed, 0);
//       setTimeLeft(left);
//       if (left === 0 && onExpire) {
//         onExpire();
//       }
//     }

//     update();
//     const id = setInterval(update, 1000);
//     return () => clearInterval(id);
//   }, [scheduledAt, gameDuration, onExpire]);

//   useEffect(() => {
//     const handler = (status: AppStateStatus) => {
//       if (status === "active" && scheduledAt && gameDuration != null) {
//         const startTime = new Date(scheduledAt).getTime();
//         const now = Date.now();
//         const elapsed = Math.floor((now - startTime) / 1000);
//         setTimeLeft(Math.max(gameDuration - elapsed, 0));
//       }
//     };

//     const sub = AppState.addEventListener("change", handler);
//     return () => sub.remove();
//   }, [scheduledAt, gameDuration]);

//   return timeLeft;
// }

// const Min10 = () => {
//   const [gameData, setGameData] = useState<GameData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedAmount, setSelectedAmount] = useState("₹10");
//   const [selectedMultiplier, setSelectedMultiplier] = useState("x1");
//   const [selectedOption, setSelectedOption] = useState<{
//     type: "color" | "number" | "size";
//     value: string | number;
//   } | null>(null);
//   const [isPlacingBet, setIsPlacingBet] = useState(false);

//   // API Configuration
//   const API_BASE_URL = "http://192.154.230.43:3000";
//   const API_TOKEN = "token"; // Your actual token

//   // Changed to use 3-minute game (4_game instead of 3_game)
//   const currentGame = gameData?.games["4_game"];

//   const time = usePersistentCountdown(
//     currentGame?.scheduledAt || null,
//     currentGame?.gameDuration || null,
//     () => {
//       fetchGameData();
//     }
//   );

//   // Check if betting is allowed (more than 30 seconds remaining)
//   const isBettingAllowed = time > 30;
  
//   // Check if we're in the final 30 seconds
//   const isInFinalSeconds = time <= 30 && time > 0;

//   // Fetch game data from API - Modified to fetch period_id-2 data
//   const fetchGameData = async () => {
//     try {
//       setError(null);

//       // Get token from AsyncStorage
//       const storedToken = await AsyncStorage.getItem("token");
//       if (!storedToken) {
//         throw new Error("No authentication token found. Please log in again.");
//       }

//       const headers: { [key: string]: string } = {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${storedToken}`, // Send token from storage
//       };

//       // Modified API endpoint to fetch period_id-4 data (3-minute game)
//       console.log("Fetching game data from:", `${API_BASE_URL}/api/game/current?period_id=4`);
//       console.log("Headers:", headers);

//       const response = await fetch(`${API_BASE_URL}/api/game/current?period_id=4`, {
//         method: "GET",
//         headers: headers,
//       });

//       console.log("Response status:", response.status);

//       if (!response.ok) {
//         let errorMessage = `HTTP error! status: ${response.status}`;
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.message || errorMessage;
//           console.log("Error response body:", errorData);
//         } catch {
//           console.log("Could not parse error response");
//         }
//         throw new Error(errorMessage);
//       }

//       const result = await response.json();
//       console.log("API Response:", result);

//       if (result.status === "success" && result.data) {
//         setGameData(result.data);
//       } else {
//         throw new Error(result.message || "Failed to fetch game data");
//       }
//     } catch (error) {
//       console.error("Error fetching game data:", error);
//       setError(error instanceof Error ? error.message : "Failed to load game data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch game data on mount + refresh every 30s
//   useEffect(() => {
//     fetchGameData();
//     const interval = setInterval(fetchGameData, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   // Clear selection when betting becomes disabled
//   useEffect(() => {
//     if (!isBettingAllowed && selectedOption) {
//       setSelectedOption(null);
//     }
//   }, [isBettingAllowed]);

//   const placeBet = async (betAmount: number) => {
//     if (!selectedOption) {
//       Alert.alert("Error", "Please select a betting option first");
//       return;
//     }

//     if (!currentGame) {
//       Alert.alert("Error", "Game data not available. Please try again.");
//       return;
//     }

//     // Double check if betting is still allowed
//     if (!isBettingAllowed) {
//       Alert.alert("Error", "Betting is closed. Less than 30 seconds remaining!");
//       return;
//     }

//     setIsPlacingBet(true);

//     try {
//       // Get token from AsyncStorage
//       const storedToken = await AsyncStorage.getItem("token");
//       if (!storedToken) {
//         throw new Error("No authentication token found. Please log in again.");
//       }

//       let betType: string;
//       let betValue: string | number;

//       if (selectedOption.type === "color") {
//         betType = "color";
//         betValue = selectedOption.value as string;
//       } else if (selectedOption.type === "number") {
//         betType = "number";
//         betValue = selectedOption.value as number;
//       } else if (selectedOption.type === "size") {
//         betType = "size";
//         // Convert display values to backend expected values
//         const sizeValue = selectedOption.value as string;
//         if (sizeValue === "Big") {
//           betValue = "big"; // Backend expects lowercase
//         } else if (sizeValue === "Small") {
//           betValue = "small"; // Backend expects lowercase
//         } else {
//           throw new Error("Invalid size value");
//         }
//       } else {
//         throw new Error("Invalid bet type");
//       }

//       const betData = {
//         period: currentGame.period,
//         betAmount: betAmount,
//         betType: betType,
//         betValue: betValue,
//         period_id: 4, // Added period_id for 3-minute game
//       };

//       const headers: { [key: string]: string } = {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${storedToken}`, // Token from storage
//       };

//       console.log("Placing bet for 3-minute game (period_id-4):", betData);

//       const response = await fetch(`${API_BASE_URL}/api/game/bet`, {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(betData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null);
//         throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("Bet placed successfully:", result);

//       Alert.alert(
//         "Success",
//         `Bet placed successfully for 3-minute game!\nAmount: ₹${betAmount}\nType: ${betType}\nValue: ${betValue}`,
//         [
//           {
//             text: "OK",
//             onPress: () => {
//               setIsModalVisible(false);
//               fetchGameData(); // Refresh game data after placing bet
//             }
//           }
//         ]
//       );

//     } catch (error) {
//       console.error("Error placing bet:", error);
//       Alert.alert(
//         "Error",
//         error instanceof Error ? error.message : "Failed to place bet. Please try again."
//       );
//     } finally {
//       setIsPlacingBet(false);
//     }
//   };

//   const handleColorPress = (color: string) => {
//     if (!isBettingAllowed) {
//       Alert.alert("Betting Closed", "Betting is not allowed in the final 30 seconds!");
//       return;
//     }
    
//     setSelectedOption((prev) =>
//       prev?.type === "color" && prev.value === color
//         ? null
//         : { type: "color" as const, value: color }
//     );
//   };

//   const handleNumberPress = (number: number) => {
//     if (!isBettingAllowed) {
//       Alert.alert("Betting Closed", "Betting is not allowed in the final 30 seconds!");
//       return;
//     }
    
//     setSelectedOption((prev) =>
//       prev?.type === "number" && prev.value === number
//         ? null
//         : { type: "number" as const, value: number }
//     );
//   };

//   const handleSizePress = (size: "Big" | "Small") => {
//     if (!isBettingAllowed) {
//       Alert.alert("Betting Closed", "Betting is not allowed in the final 30 seconds!");
//       return;
//     }
    
//     console.log(`Size button pressed: ${size}`);
//     console.log(`Current betting allowed: ${isBettingAllowed}`);
    
//     setSelectedOption((prev) => {
//       const newSelection = prev?.type === "size" && prev.value === size
//         ? null
//         : { type: "size" as const, value: size };
      
//       console.log(`Previous selection:`, prev);
//       console.log(`New selection:`, newSelection);
      
//       return newSelection;
//     });
//   };

//   const formatTime = (seconds: number): string[] => {
//     const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
//     const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
//     return [...minutes, ":", ...remainingSeconds];
//   };

//   const colors = [
//     { key: "Green", bg: "bg-green-500" },
//     { key: "Violet", bg: "bg-violet-500" },
//     { key: "Red", bg: "bg-red-500" },
//   ];

//   const numbers = Array.from({ length: 10 }, (_, i) => i);

//   const isBetButtonActive = selectedOption !== null && isBettingAllowed;

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-100">
//         <ActivityIndicator size="large" color="#16a34a" />
//         <Text className="mt-4 text-lg font-semibold text-gray-700">Loading 3-minute game...</Text>
//       </View>
//     );
//   }

//   if (error || !gameData || !currentGame) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-100 p-6">
//         <Text className="text-lg font-semibold text-red-600 mb-4 text-center">
//           {error || "Failed to load 3-minute game data"}
//         </Text>
//         <TouchableOpacity
//           onPress={fetchGameData}
//           className="bg-green-600 px-6 py-3 rounded-full"
//         >
//           <Text className="text-white font-bold">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View>
//       {/* Header */}
//       <View className="bg-green-600 flex-row justify-between p-3 rounded-xl py-5 items-center">
//         <View>
//           <View className="border border-white rounded-2xl items-center px-3 flex-row gap-1 py-1">
//             <Image
//               source={require("../assets/images/howtoplay.png")}
//               className="w-5 h-5"
//             />
//             <Text className="text-white font-bold text-sm">How to play</Text>
//           </View>
//           <Text className="font-extrabold text-white px-3 py-2">Win Go 10 min</Text>
//         </View>

//         {/* Timer */}
//         <View className="items-center px-1">
//           <Text className="text-white text-center text-sm">
//             {currentGame.period}
//           </Text>
//           <Text className="text-white text-lg font-extrabold mb-1">
//             Time Remaining
//           </Text>
          
//           <View className="flex-row gap-1">
//             {formatTime(time).map((char, index) => (
//               <View 
//                 key={index} 
//                 className={`rounded-md px-2 ${
//                   isInFinalSeconds ? "bg-red-500" : "bg-white"
//                 }`}
//               >
//                 <Text 
//                   className={`text-lg font-extrabold ${
//                     isInFinalSeconds ? "text-white" : "text-green-600"
//                   }`}
//                 >
//                   {char}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </View>

//       {/* Betting Status Messages */}
//       {time === 0 && (
//         <View className="bg-yellow-100 p-3 mx-2 mt-3 rounded-lg">
//           <Text className="text-yellow-800 text-center font-semibold">
//             Game ended. Waiting for next round...
//           </Text>
//         </View>
//       )}
      


//       {/* Overlay for final 30 seconds */}
//       {/* {isInFinalSeconds && (
//         <View className="absolute top-32 left-0 right-0 bottom-0 bg-white/40 bg-opacity-30 z-10 justify-center items-center">
//           <View className="bg-red-500 px-6 py-4 rounded-lg mx-4">
//             <Text className="text-white text-xl font-bold text-center">
//               BETTING CLOSED
//             </Text>
//             <Text className="text-white text-center mt-2">
//               Final {time} seconds remaining
//             </Text>
//           </View>
//         </View>
//       )} */}

//       {/* Color Buttons */}
//       <View className="my-5 flex-row justify-between">
//         {colors.map(({ key, bg }) => {
//           const isSelected = selectedOption?.type === "color" && selectedOption.value === key;
//           return (
//             <TouchableOpacity
//               key={key}
//               onPress={() => handleColorPress(key)}
//               disabled={!isBettingAllowed}
//               className={`${bg} px-7 p-2 rounded-tr-2xl rounded-bl-2xl ${
//                 isSelected ? "border-4 border-yellow-400" : ""
//               } ${!isBettingAllowed ? "opacity-30" : ""}`}
//             >
//               <Text className="text-lg text-white font-bold">{key}</Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {/* Number Grid */}
//       <View className="flex flex-row flex-wrap justify-center gap-3 my-4">
//         {numbers.map((number) => {
//           const isSelected = selectedOption?.type === "number" && selectedOption.value === number;
//           return (
//             <TouchableOpacity
//               key={number}
//               className={`h-16 w-16 rounded-full overflow-hidden items-center justify-center ${
//                 isSelected ? "border-4 border-yellow-500" : ""
//               } ${!isBettingAllowed ? "opacity-30" : ""}`}
//               onPress={() => handleNumberPress(number)}
//               disabled={!isBettingAllowed}
//             >
//               <Image
//                 source={numberImages[number]}
//                 className="h-full w-full object-cover"
//               />
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {/* Big / Small Buttons - Fixed for better interaction */}
//       <View className="flex-row justify-center mt-6 space-x-6">
//         <TouchableOpacity
//           onPress={() => handleSizePress("Big")}
//           disabled={!isBettingAllowed}
//           className={`bg-orange-400 px-16 py-3 rounded-l-full ${
//             selectedOption?.type === "size" && selectedOption.value === "Big"
//               ? "border-4 border-yellow-500"
//               : ""
//           } ${!isBettingAllowed ? "opacity-30" : ""}`}
//           activeOpacity={0.7}
//         >
//           <Text className="text-lg font-bold text-white">Big</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => handleSizePress("Small")}
//           disabled={!isBettingAllowed}
//           className={`bg-purple-500 px-16 py-3 rounded-r-full ${
//             selectedOption?.type === "size" && selectedOption.value === "Small"
//               ? "border-4 border-yellow-500"
//               : ""
//           } ${!isBettingAllowed ? "opacity-30" : ""}`}
//           activeOpacity={0.7}
//         >
//           <Text className="text-lg font-bold text-white">Small</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Place Bet Button */}
//       <View className="mt-6 items-center">
//         <TouchableOpacity
//           onPress={() => isBetButtonActive && setIsModalVisible(true)}
//           disabled={!isBetButtonActive}
//           className={`px-8 py-3 rounded-full ${
//             isBetButtonActive ? "bg-green-600" : "bg-gray-400"
//           }`}
//         >
//           <Text
//             className={`text-lg font-bold ${
//               isBetButtonActive ? "text-white" : "text-gray-600"
//             }`}
//           >
//             {time === 0
//               ? "Game Ended"
//               : isInFinalSeconds
//               ? "Betting Closed - Final Seconds"
//               : isBetButtonActive
//               ? `Place Bet (${selectedOption?.type}: ${selectedOption?.value})`
//               : "Select an option to bet"}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Bet Modal */}
//       <BetModal
//         visible={isModalVisible}
//         onClose={() => setIsModalVisible(false)}
//         selectedAmount={selectedAmount}
//         selectedMultiplier={selectedMultiplier}
//         setSelectedAmount={setSelectedAmount}
//         setSelectedMultiplier={setSelectedMultiplier}
//         onPlaceBet={placeBet}
//         isPlacingBet={isPlacingBet}
//       />

//           <View className="pt-5">
//         <Game4 />
//       </View>
//     </View>
//   );
// };

// export default Min10;

import React, { useState, useEffect, useRef } from "react";
import BetModal from "./Betmodel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import Game1 from "@/Components/GameHistory/Game1";
import { useSocket } from "@/app/context/SocketContext";

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

const API_BASE_URL = "http://192.154.230.43:3000";

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
        // Logic to find the end of the current 3-minute cycle
        const nextGameMinute = Math.ceil((currentMinute + 1) / 3) * 3;
        let minutesUntilNext = nextGameMinute - currentMinute;
        if (minutesUntilNext <= 0) minutesUntilNext = 3;
        const secondsLeft = minutesUntilNext * 60 - currentSecond;
        return Math.max(0, Math.min(180, secondsLeft));
    };

    const placeBetViaAPI = async (betAmount: number): Promise<void> => {
        try {
            if (!selectedOption) throw new Error("Please select an option to bet.");
            if (!currentPeriod) throw new Error("Waiting for game period. Please try again.");
            if (!isBettingAllowed) throw new Error("Betting is closed for this round.");

            const token = await AsyncStorage.getItem("token");
            if (!token) throw new Error("Authentication error. Please log in again.");

            let betType: string;
            let betValue: string | string[]; // Allow betValue to be either a string or string array

            if (selectedOption.type === "color") {
                betType = "color";
                // FINAL FIX for Color: Must be a single string, Title Case (e.g., "Green")
                betValue = selectedOption.value as string; 
            } else if (selectedOption.type === "number") {
                betType = "number";
                // Keep Number as a string array, as this was working before (e.g., ["5"])
                betValue = [selectedOption.value.toString()];
            } else if (selectedOption.type === "size") {
                betType = "size";
                // FINAL FIX for Size: Must be a single string, lowercase (e.g., "small")
                betValue = (selectedOption.value as string).toLowerCase();
            } else {
                throw new Error("Invalid bet type.");
            }
            
            const betData = { period: currentPeriod, betAmount, betType, betValue };

            console.log("➡️ Sending Bet Data (FINAL):", JSON.stringify(betData)); // Debug log for body

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);

            const response = await fetch(`${API_BASE_URL}/api/game/bet`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(betData),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            const responseData = await response.json();

            if (!response.ok || responseData.status !== "success") {
                throw new Error(responseData.message || `Server error: ${response.status}`);
            }
            
            const betDetails = responseData.data;
            Alert.alert(
                "✅ Bet Placed Successfully!",
                `Period: ${betDetails.period}\n` +
                `Bet: ${betDetails.betType} on ${Array.isArray(betDetails.betValue) ? betDetails.betValue.join(', ') : betDetails.betValue}\n` + // Adjust alert for clarity
                `Amount: ₹${betDetails.betAmount}`,
                [{ text: "OK", onPress: () => {
                    setIsModalVisible(false);
                    setSelectedOption(null);
                    setSelectedAmount("₹10");
                    setSelectedMultiplier("x1");
                }}]
            );
            
            refreshRounds();
        } catch (error: any) {
            console.error("❌ Bet API error:", error);
            const errorMessage = error.name === 'AbortError' ? "Request timed out. Please try again." : error.message;
            Alert.alert("Bet Failed", errorMessage);
            throw error;
        }
    };

    const placeBet = async (betAmount: number): Promise<void> => {
        setIsPlacingBet(true);
        try {
            await placeBetViaAPI(betAmount);
        } catch (error) {
            // Error already handled
        } finally {
            setIsPlacingBet(false);
        }
    };

    // 1. Initial rounds request
    useEffect(() => {
        if (socket && isConnected && !hasRequestedRoundsRef.current) {
            console.log("📡 Initial rounds request on mount");
            refreshRounds();
            hasRequestedRoundsRef.current = true;
        }
    }, [socket, isConnected, refreshRounds]);

    // 2. Socket event listeners (FIXED LOGIC)
    useEffect(() => {
        if (!socket) return;

        const handleRoundCreated = (data: GameRound) => {
            console.log(`🔔 Round created event: ${data.period} (${data.gameDuration}s, ${data.status})`);
            
            // CRITICAL FIX: Look for the period ending in -2 instead of -1
            if (data?.period && data.gameDuration === 180 && data.period.endsWith("-2")) {
                
                // Only update if the period is NEW (period has changed)
                if (data.period !== lastPeriodRef.current) {
                    console.log(`✨ SOCKET NEW -2 ROUND DETECTED: ${lastPeriodRef.current || 'none'} → ${data.period}`);
                    
                    // 1. Update period state and ref
                    setCurrentPeriod(data.period);
                    lastPeriodRef.current = data.period;

                    // 2. Reset timer to match the start of the new round cycle
                    const calculatedTime = calculateTimeLeft();
                    setTimeLeft(calculatedTime);
                    
                    // 3. Clear any pending timeout from the previous round's completion
                    if (roundEndTimeoutRef.current) {
                        clearTimeout(roundEndTimeoutRef.current);
                        roundEndTimeoutRef.current = null;
                    }
                    
                    // 4. Clear selected bet option
                    setSelectedOption(null);
                } else {
                    console.log(`ℹ️ Received 'round:created' for existing -2 period: ${lastPeriodRef.current}`);
                }
            } else if (data?.period && data.gameDuration === 180) {
                console.log(`⚠️ Ignoring non-betting round: ${data.period}`);
            }
        };

        const handleRoundFinalized = (data: any) => {
            console.log("🏁 Round finalized:", data);
            
            setTimeout(() => {
                console.log("🔄 Requesting fresh rounds after finalization");
                refreshRounds();
            }, 1500); 
        };

        socket.on("round:created", handleRoundCreated);
        socket.on("round:finalized", handleRoundFinalized);

        return () => {
            socket.off("round:created", handleRoundCreated);
            socket.off("round:finalized", handleRoundFinalized);
        };
    }, [socket, refreshRounds]);

    // 3. Timer countdown logic
    useEffect(() => {
        const interval = setInterval(() => {
            const newTime = calculateTimeLeft();
            const prevTime = prevTimeRef.current;
            setTimeLeft(newTime);
            prevTimeRef.current = newTime;

            // Detect round ending (timer going from >0 to 0)
            if (newTime === 0 && prevTime > 0) {
                console.log("⏳ Round ended (timer hit 0)");
                
                if (roundEndTimeoutRef.current) {
                    clearTimeout(roundEndTimeoutRef.current);
                }
                
                // Schedule IMMEDIATE round refresh
                roundEndTimeoutRef.current = setTimeout(() => {
                    console.log("🔄 Round end timeout - requesting new rounds");
                    refreshRounds();
                }, 300); // Only wait 300ms for new period ID
            }
            
            // Safety check if period is empty and timer is high
            if (newTime > 170 && newTime <= 180 && !currentPeriod) {
                console.log("⚠️ No period ID at start of cycle - requesting rounds");
                refreshRounds();
            }
        }, 1000);
        
        return () => {
            clearInterval(interval);
            if (roundEndTimeoutRef.current) {
                clearTimeout(roundEndTimeoutRef.current);
            }
        };
    }, [currentPeriod, refreshRounds]);

    // 4. Sync period from currentRounds (API fallback and history) (REFINED)
    useEffect(() => {
        if (!currentRounds || currentRounds.length === 0) {
            return;
        }

        console.log("📊 Processing currentRounds from API/SocketContext update...");
        
        // CRITICAL FIX: Find the current active/scheduled 3-minute game that ends in -2
        const threeMinGame = currentRounds.find(
            (game) => 
            game && 
            game.gameDuration === 180 && 
            (game.status === "active" || game.status === "scheduled") &&
            game.period?.endsWith("-4") // <-- Only accept -2
        );
        
        if (threeMinGame?.period) {
            const newPeriod = threeMinGame.period;
            const oldPeriod = lastPeriodRef.current;
            
            // Update if: no current period OR the period has changed
            if (!oldPeriod || newPeriod !== oldPeriod) {
                console.log(`🔄 API/CONTEXT -2 PERIOD UPDATE: ${oldPeriod || 'none'} → ${newPeriod}`);
                setCurrentPeriod(newPeriod);
                lastPeriodRef.current = newPeriod;
                
                // Recalculate timer for this period
                const calculatedTime = calculateTimeLeft();
                setTimeLeft(calculatedTime);
            } else {
                console.log(`ℹ️ API/CONTEXT -2 period matches current: ${oldPeriod}`);
            }
        } else {
            console.log("❌ No active/scheduled 3-minute game ending in -2 found");
            setTimeLeft(calculateTimeLeft());
        }

        // Extract winning numbers from completed games (History logic remains)
        const completedGames = currentRounds.filter(
            g => g?.status === "completed" && g.winningNumber !== null && g.gameDuration === 180
        );
        
        const nums = completedGames
            .sort((a, b) => b.period.localeCompare(a.period))
            .map(g => g.winningNumber as number)
            .slice(0, 5);
        
        if (nums.length > 0 && JSON.stringify(nums) !== JSON.stringify(winningNumbers)) {
            console.log("🎲 Updating winning numbers:", nums);
            setWinningNumbers(nums);
        }
    }, [currentRounds, winningNumbers]); 

    const formatTime = (seconds: number): string[] => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return [...m, ":", ...s];
    };

    const handlePress = (type: "color" | "number" | "size", value: string | number) => {
        if (!isBettingAllowed) {
            Alert.alert("Betting Closed", "Betting is not allowed in the final 30 seconds.");
            return;
        }
        setSelectedOption((prev) =>
            prev?.type === type && prev.value === value ? null : { type, value }
        );
    };

    const isValid3MinGame = !!currentPeriod;
    const isBetButtonActive = selectedOption !== null && isBettingAllowed && isValid3MinGame && isConnected;
    const colors = [{ key: "Green", bg: "bg-green-500" }, { key: "Violet", bg: "bg-violet-500" }, { key: "Red", bg: "bg-red-500" }];
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
                        <Image source={require("../assets/images/howtoplay.png")} className="w-5 h-5" />
                        <Text className="text-white font-bold text-sm">How to play</Text>
                    </View>
                    <Text className="font-extrabold text-white px-3 py-2">Win Go 3 min</Text>
                    <View className="pl-2 mt-1">
                        <View className="flex-row gap-2">
                            {winningNumbers.length > 0 ? (
                                winningNumbers.map((num, index) => (
                                    <View key={index} className="w-8 h-8 rounded-full bg-white items-center justify-center">
                                        <Image source={numberImages[num]} style={{ width: 30, height: 30 }} resizeMode="contain"/>
                                    </View>
                                ))
                            ) : (
                                <Text className="text-white text-xs">No history yet</Text>
                            )}
                        </View>
                    </View>
                </View>

                <View className="items-center px-1">
                    <Text className="text-white text-center text-sm font-bold h-6 mb-1">
                        {currentPeriod || "Syncing..."}
                    </Text>

                    <Text className="text-white text-lg font-extrabold mb-1">Time Left</Text>
                    <View className="flex-row gap-1">
                        {formatTime(timeLeft).map((char, index) => (
                            <View key={index} className={`rounded-md px-2 ${isInFinalSeconds ? "bg-red-500" : "bg-white"}`}>
                                <Text className={`text-lg font-extrabold ${isInFinalSeconds ? "text-white" : "text-green-600"}`}>
                                    {char}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            <View className="my-5 flex-row justify-between px-1">
                {colors.map(({ key, bg }) => {
                    const isSelected = selectedOption?.type === "color" && selectedOption.value === key;
                    const isDisabled = !isBettingAllowed || !isValid3MinGame;
                    return (
                        <TouchableOpacity key={key} onPress={() => handlePress("color", key)} disabled={isDisabled}
                            className={`${bg} p-2 rounded-tr-2xl rounded-bl-2xl flex-1 mx-2 ${isSelected ? "border-4 border-yellow-400" : ""} ${isDisabled ? "opacity-30" : ""}`}>
                            <Text className="text-lg text-white font-bold text-center">{key}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View className="flex flex-row flex-wrap justify-center gap-2 my-4 px-2">
                {numbers.map((number) => {
                    const isSelected = selectedOption?.type === "number" && selectedOption.value === number;
                    const isDisabled = !isBettingAllowed || !isValid3MinGame;
                    return (
                        <TouchableOpacity key={number} onPress={() => handlePress("number", number)} disabled={isDisabled}
                            className={`h-16 w-16 rounded-full overflow-hidden items-center justify-center ${isSelected ? "border-4 border-yellow-500" : ""} ${isDisabled ? "opacity-30" : ""}`}>
                            <Image source={numberImages[number]} className="h-full w-full" resizeMode="cover"/>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View className="flex-row justify-center mt-6 gap-3 px-3">
                {(["Big", "Small"] as const).map((size) => {
                    const isSelected = selectedOption?.type === "size" && selectedOption.value === size;
                    const isDisabled = !isBettingAllowed || !isValid3MinGame;
                    const bgColor = size === "Big" ? "bg-orange-400" : "bg-purple-500";
                    return (
                        <TouchableOpacity key={size} onPress={() => handlePress("size", size)} disabled={isDisabled}
                            className={`${bgColor} px-12 py-3 rounded-full ${isSelected ? "border-4 border-yellow-500" : ""} ${isDisabled ? "opacity-30" : ""}`}>
                            <Text className="text-lg font-bold text-white">{size}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View className="mt-6 items-center pb-6 px-3">
                <TouchableOpacity onPress={() => setIsModalVisible(true)} disabled={!isBetButtonActive}
                    className={`px-8 py-3 rounded-full w-full ${isBetButtonActive ? "bg-green-600" : "bg-gray-400"}`}>
                    <Text className={`text-lg font-bold text-center ${isBetButtonActive ? "text-white" : "text-gray-600"}`}>
                        {!isConnected
                            ? "Connecting..."
                            : !currentPeriod
                            ? "Waiting for game..."
                            : !isBettingAllowed
                            ? "Betting Closed"
                            : isBetButtonActive
                            ? `Place Bet (${selectedOption?.type}: ${selectedOption?.value})`
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
                <Game1 />
            </View>
        </View>
    );
};

export default Min3;