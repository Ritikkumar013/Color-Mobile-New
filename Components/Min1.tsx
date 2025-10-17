// import React, { useState, useEffect } from "react";
// import BetModal from "./Betmodel";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import Game1 from "@/Components/GameHistory/Game1";

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

// interface LastGame {
//   period: string;
//   winningNumber: number;
//   winningColor: string[];
//   winningSize: string;
//   mySelection: any;
//   myWinnings: number;
//   result: string;
// }

// interface GameData {
//   games: {};
//   lastGames: { [key: string]: LastGame };
//   walletBalance: number;
// }

// // Utility: Always get the latest 3-min game (period ends with -1)
// function getCurrentThreeMinGame(lastGames: { [key: string]: LastGame }): LastGame | undefined {
//   return Object.values(lastGames).find(
//     (game) => game?.period?.endsWith("-1")
//   );
// }

// const Min3 = () => {
//   const [gameData, setGameData] = useState<GameData | null>(null);
//   const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
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
//   const [timeLeft, setTimeLeft] = useState(180);
//   const [currentPeriod, setCurrentPeriod] = useState<string>("");

//   const API_BASE_URL = "https://ctbackend.crobstacle.com";

//   // Timer calculation for 3-minute intervals
//   const calculateTimeLeft = (): number => {
//     const now = new Date();
//     const currentMinute = now.getMinutes();
//     const currentSecond = now.getSeconds();
//     const nextGameMinute = Math.ceil((currentMinute + 1) / 3) * 3;
//     let minutesUntilNext = nextGameMinute - currentMinute;
//     if (minutesUntilNext <= 0) minutesUntilNext = 3;
//     const secondsLeft = (minutesUntilNext * 60) - currentSecond;
//     return Math.max(0, Math.min(180, secondsLeft));
//   };

//   // Get last winning numbers for the 3-min game
//   useEffect(() => {
//     if (gameData?.lastGames) {
//       const nums = Object.values(gameData.lastGames)
//         .filter(game => game?.period?.endsWith("-1") && game?.winningNumber !== undefined)
//         .map(game => game.winningNumber);
//       setWinningNumbers(nums);
//     }
//   }, [gameData]);

//   // Timer countdown logic synced to real time and game round
//   useEffect(() => {
//     setTimeLeft(calculateTimeLeft());
//     const interval = setInterval(() => {
//       const newTime = calculateTimeLeft();
//       setTimeLeft(newTime);
//       // When we cross into a new period (time resets), fetch new data
//       if (newTime > 170 && timeLeft < 10) {
//         fetchGameData();
//       }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [timeLeft]);

//   // When game period (of the 3-min game) changes, sync timer
//   useEffect(() => {
//     const threeMinGame = gameData?.lastGames && getCurrentThreeMinGame(gameData.lastGames);
//     if (threeMinGame?.period) {
//       if (threeMinGame.period.endsWith("-1") && threeMinGame.period !== currentPeriod) {
//         setCurrentPeriod(threeMinGame.period);
//         setTimeLeft(calculateTimeLeft());
//       }
//     }
//   }, [gameData?.lastGames]);

//   const isBettingAllowed = timeLeft > 30;
//   const isInFinalSeconds = timeLeft <= 30 && timeLeft > 0;

//   const fetchGameData = async () => {
//     try {
//       setError(null);
//       const storedToken = await AsyncStorage.getItem("token");
//       if (!storedToken) throw new Error("No authentication token found. Please log in again.");
//       const headers: { [key: string]: string } = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${storedToken}`,
//       };
//       const response = await fetch(`${API_BASE_URL}/api/game/current`, {
//         method: "GET",
//         headers: headers,
//       });
//       if (!response.ok) {
//         let errorMessage = `HTTP error! status: ${response.status}`;
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.message || errorMessage;
//         } catch { }
//         throw new Error(errorMessage);
//       }
//       const result = await response.json();
//       if (result.status === "success" && result.data) {
//         setGameData(result.data);
//       } else {
//         throw new Error(result.message || "Failed to fetch game data");
//       }
//     } catch (error) {
//       setError(
//         error instanceof Error ? error.message : "Failed to load game data"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGameData();
//     const interval = setInterval(fetchGameData, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (!isBettingAllowed && selectedOption) {
//       setSelectedOption(null);
//     }
//   }, [isBettingAllowed]);

//   const placeBet = async (betAmount: number) => {
//     const threeMinGame = gameData?.lastGames && getCurrentThreeMinGame(gameData.lastGames);
//     if (!selectedOption) {
//       Alert.alert("Error", "Please select a betting option first");
//       return;
//     }
//     if (!threeMinGame) {
//       Alert.alert("Error", "Game data not available. Please try again.");
//       return;
//     }
//     if (!threeMinGame.period.endsWith("-1")) {
//       Alert.alert("Error", "This is not a 3-minute game. Please wait for the next round.");
//       return;
//     }
//     if (!isBettingAllowed) {
//       Alert.alert("Error", "Betting is closed. Less than 30 seconds remaining!");
//       return;
//     }
//     setIsPlacingBet(true);
//     try {
//       const storedToken = await AsyncStorage.getItem("token");
//       if (!storedToken) throw new Error("No authentication token found. Please log in again.");
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
//         betValue = (selectedOption.value as string).toLowerCase();
//       } else {
//         throw new Error("Invalid bet type");
//       }
//       const betData = {
//         period: threeMinGame.period,
//         betAmount: betAmount,
//         betType: betType,
//         betValue: betValue,
//       };
//       const headers: { [key: string]: string } = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${storedToken}`,
//       };
//       const response = await fetch(`${API_BASE_URL}/api/game/bet`, {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(betData),
//       });
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null);
//         throw new Error(
//           errorData?.message || `HTTP error! status: ${response.status}`
//         );
//       }
//       const result = await response.json();
//       Alert.alert(
//         "Success",
//         `Bet placed successfully!\nAmount: ₹${betAmount}\nType: ${betType}\nValue: ${betValue}`,
//         [
//           {
//             text: "OK",
//             onPress: () => {
//               setIsModalVisible(false);
//               setSelectedOption(null);
//               fetchGameData();
//             },
//           },
//         ]
//       );
//     } catch (error) {
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
//         : { type: "color", value: color }
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
//         : { type: "number", value: number }
//     );
//   };

//   const handleSizePress = (size: "Big" | "Small") => {
//     if (!isBettingAllowed) {
//       Alert.alert("Betting Closed", "Betting is not allowed in the final 30 seconds!");
//       return;
//     }
//     setSelectedOption((prev) =>
//       prev?.type === "size" && prev.value === size
//         ? null
//         : { type: "size", value: size }
//     );
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

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-100">
//         <ActivityIndicator size="large" color="#16a34a" />
//         <Text className="mt-4 text-lg font-semibold text-gray-700">
//           Loading game...
//         </Text>
//       </View>
//     );
//   }

//   if (error || !gameData) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-100 p-6">
//         <Text className="text-lg font-semibold text-red-600 mb-4 text-center">
//           {error || "Failed to load game data"}
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

//   // Get the active 3-min game
//   const currentGame = getCurrentThreeMinGame(gameData.lastGames);
//   const isValid3MinGame = !!currentGame;
//   const isBetButtonActive = selectedOption !== null && isBettingAllowed && isValid3MinGame;

//   return (
//     <View>
//       {/* Header */}
//       <View className="bg-green-600 flex-row justify-between p-3 rounded-xl py-4 items-center">
//         <View>
//           <View className="border border-white rounded-2xl items-center px-3 flex-row gap-1 py-1">
//             <Image
//               source={require("../assets/images/howtoplay.png")}
//               className="w-5 h-5"
//             />
//             <Text className="text-white font-bold text-sm">How to play</Text>
//           </View>
//           <Text className="font-extrabold text-white px-3 py-2">Win Go 3 min</Text>

//           {/* Game History Display */}
//           <View className="pl-2 mt-1">
//             <View className="flex-row gap-2">
//               {winningNumbers.length > 0 ? (
//                 winningNumbers.map((winningNumber, index) => (
//                   <View key={index} className="items-center">
//                     <View className="w-8 h-8 rounded-full overflow-hidden bg-white items-center justify-center">
//                       <Image
//                         source={numberImages[winningNumber]}
//                         style={{ width: 30, height: 30 }}
//                         resizeMode="contain"
//                       />
//                     </View>
//                   </View>
//                 ))
//               ) : (
//                 <Text className="text-white text-xs opacity-75">
//                   Loading recent results...
//                 </Text>
//               )}
//             </View>
//           </View>
//         </View>

//         {/* Timer */}
//         <View className="items-center px-1">
//           <Text className="text-white text-center text-sm">
//             {currentGame?.period || "Loading..."}
//           </Text>
//           <Text className="text-white text-lg font-extrabold mb-1">
//             Time Left
//           </Text>

//           <View className="flex-row gap-1">
//             {formatTime(timeLeft).map((char, index) => (
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

//       {/* Invalid Game Warning */}
//       {!isValid3MinGame && (
//         <View className="bg-orange-100 p-3 mx-2 mt-3 rounded-lg">
//           <Text className="text-orange-800 text-center font-semibold">
//             ⚠️ This is not a 3-minute game. Waiting for valid period...
//           </Text>
//         </View>
//       )}

//       {/* Betting Status Messages */}
//       {timeLeft === 0 && (
//         <View className="bg-yellow-100 p-3 mx-2 mt-3 rounded-lg">
//           <Text className="text-yellow-800 text-center font-semibold">
//             Game ended. Waiting for next round...
//           </Text>
//         </View>
//       )}

//       {isInFinalSeconds && (
//         <View className="bg-red-100 p-3 mx-2 mt-3 rounded-lg">
//           <Text className="text-red-800 text-center font-semibold">
//             ⚠️ Betting Closed - Final {timeLeft} seconds!
//           </Text>
//         </View>
//       )}

//       {/* Color Buttons */}
//       <View className="my-5 flex-row justify-between px-3">
//         {colors.map(({ key, bg }) => {
//           const isSelected =
//             selectedOption?.type === "color" && selectedOption.value === key;
//           const isDisabled = !isBettingAllowed || !isValid3MinGame;
//           return (
//             <TouchableOpacity
//               key={key}
//               onPress={() => handleColorPress(key)}
//               disabled={isDisabled}
//               className={`${bg} px-7 p-2 rounded-tr-2xl rounded-bl-2xl flex-1 mx-1 ${
//                 isSelected ? "border-4 border-yellow-400" : ""
//               } ${isDisabled ? "opacity-30" : ""}`}
//             >
//               <Text className="text-lg text-white font-bold text-center">
//                 {key}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {/* Number Grid */}
//       <View className="flex flex-row flex-wrap justify-center gap-2 my-4 px-2">
//         {numbers.map((number) => {
//           const isSelected =
//             selectedOption?.type === "number" && selectedOption.value === number;
//           const isDisabled = !isBettingAllowed || !isValid3MinGame;
//           return (
//             <TouchableOpacity
//               key={number}
//               className={`h-16 w-16 rounded-full overflow-hidden items-center justify-center ${
//                 isSelected ? "border-4 border-yellow-500" : ""
//               } ${isDisabled ? "opacity-30" : ""}`}
//               onPress={() => handleNumberPress(number)}
//               disabled={isDisabled}
//             >
//               <Image
//                 source={numberImages[number]}
//                 className="h-full w-full"
//                 resizeMode="cover"
//               />
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {/* Big / Small Buttons */}
//       <View className="flex-row justify-center mt-6 gap-3 px-3">
//         <TouchableOpacity
//           onPress={() => handleSizePress("Big")}
//           disabled={!isBettingAllowed || !isValid3MinGame}
//           className={`bg-orange-400 px-12 py-3 rounded-full ${
//             selectedOption?.type === "size" && selectedOption.value === "Big"
//               ? "border-4 border-yellow-500"
//               : ""
//           } ${(!isBettingAllowed || !isValid3MinGame) ? "opacity-30" : ""}`}
//         >
//           <Text className="text-lg font-bold text-white">Big</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => handleSizePress("Small")}
//           disabled={!isBettingAllowed || !isValid3MinGame}
//           className={`bg-purple-500 px-12 py-3 rounded-full ${
//             selectedOption?.type === "size" && selectedOption.value === "Small"
//               ? "border-4 border-yellow-500"
//               : ""
//           } ${(!isBettingAllowed || !isValid3MinGame) ? "opacity-30" : ""}`}
//         >
//           <Text className="text-lg font-bold text-white">Small</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Place Bet Button */}
//       <View className="mt-6 items-center pb-6 px-3">
//         <TouchableOpacity
//           onPress={() => setIsModalVisible(true)}
//           disabled={!isBetButtonActive}
//           className={`px-8 py-3 rounded-full w-full ${
//             isBetButtonActive ? "bg-green-600" : "bg-gray-400"
//           }`}
//         >
//           <Text
//             className={`text-lg font-bold text-center ${
//               isBetButtonActive ? "text-white" : "text-gray-600"
//             }`}
//           >
//             {timeLeft === 0
//               ? "Game Ended"
//               : !isValid3MinGame
//               ? "Waiting for 3-minute game..."
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

//       <View className="pt-5">
//         <Game1 />
//       </View>
//     </View>
//   );
// };

// export default Min3;

// import React, { useState, useEffect, useRef } from "react";
// import { io, Socket } from "socket.io-client";
// import BetModal from "./Betmodel";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import Game1 from "@/Components/GameHistory/Game1";

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

// interface GameRound {
//   _id: string;
//   period: string;
//   winningNumber: number | null;
//   color: string[];
//   size: string | null;
//   status: string;
//   scheduledAt: string;
//   gameDuration: number;
// }

// interface LastGame extends GameRound {
//   mySelection?: any;
//   myWinnings?: number;
//   result?: string;
// }

// interface GameData {
//   data?: {
//     games?: {};
//     lastGames?: { [key: string]: LastGame };
//     walletBalance?: number;
//   };
//   rounds?: GameRound[];
//   slot?: string;
//   games?: {};
//   lastGames?: { [key: string]: LastGame };
//   walletBalance?: number;
// }

// function getCurrentThreeMinGame(gameData: GameData | null): GameRound | undefined {
//   console.log("🔍 Looking for 3-min game ending with -1...");

//   if (gameData?.data?.lastGames) {
//     const lastGames = gameData.data.lastGames;
//     const threeMinGames = Object.entries(lastGames)
//       .filter(([key, game]) => game && game.gameDuration === 180 && game.period)
//       .map(([key, game]) => game);

//     console.log("🎮 Found 3-min games (REST):", threeMinGames.map(g => g.period));

//     const gameEndingWithOne = threeMinGames.find(game => game.period.endsWith("-1"));
//     if (gameEndingWithOne) {
//       console.log("✅ Found -1 game:", gameEndingWithOne.period);
//       return gameEndingWithOne;
//     }

//     const activeGame = threeMinGames.find(game =>
//       game.status === "active" || game.status === "scheduled"
//     );
//     if (activeGame) {
//       console.log("⚠️ No -1 game, using active game:", activeGame.period);
//       return activeGame;
//     }
//   }

//   if (gameData?.rounds && Array.isArray(gameData.rounds)) {
//     const threeMinGames = gameData.rounds.filter(
//       round => round && round.gameDuration === 180 && round.period
//     );

//     console.log("🎮 Found 3-min rounds:", threeMinGames.map(g => `${g.period} (${g.status})`));

//     const gameEndingWithOne = threeMinGames.find(game => game.period.endsWith("-1"));
//     if (gameEndingWithOne) {
//       console.log("✅ Found -1 game:", gameEndingWithOne.period);
//       return gameEndingWithOne;
//     }

//     const activeGame = threeMinGames.find(game =>
//       game.status === "active" || game.status === "scheduled"
//     );
//     if (activeGame) {
//       console.log("⚠️ No -1 game, using active/scheduled game:", activeGame.period);
//       return activeGame;
//     }
//   }

//   if (gameData?.lastGames) {
//     const threeMinGames = Object.entries(gameData.lastGames)
//       .filter(([key, game]) => game && game.gameDuration === 180 && game.period)
//       .map(([key, game]) => game);

//     console.log("🎮 Found 3-min games (fallback):", threeMinGames.map(g => g.period));

//     const gameEndingWithOne = threeMinGames.find(game => game.period.endsWith("-1"));
//     if (gameEndingWithOne) {
//       console.log("✅ Found -1 game:", gameEndingWithOne.period);
//       return gameEndingWithOne;
//     }

//     const activeGame = threeMinGames.find(game =>
//       game.status === "active" || game.status === "scheduled"
//     );
//     if (activeGame) {
//       console.log("⚠️ Using active game:", activeGame.period);
//       return activeGame;
//     }
//   }

//   console.warn("⚠️ No gameData available");
//   return undefined;
// }

// const SOCKET_IO_URL = "https://ctbackend.crobstacle.com";

// const Min3 = () => {
//   const [gameData, setGameData] = useState<GameData | null>(null);
//   const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [socketConnected, setSocketConnected] = useState(false);

//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedAmount, setSelectedAmount] = useState("₹10");
//   const [selectedMultiplier, setSelectedMultiplier] = useState("x1");
//   const [selectedOption, setSelectedOption] = useState<{
//     type: "color" | "number" | "size";
//     value: string | number;
//   } | null>(null);
//   const [isPlacingBet, setIsPlacingBet] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(180);
//   const [currentPeriod, setCurrentPeriod] = useState<string>("");
//   const [roundCompleted, setRoundCompleted] = useState(false);
//   const [forceUpdate, setForceUpdate] = useState(0);

//   const isBettingAllowed = timeLeft > 30;
//   const isInFinalSeconds = timeLeft <= 30 && timeLeft > 0;
//   const isRoundEnded = timeLeft === 0;

//   const socket = useRef<Socket | null>(null);
//   const prevTimeRef = useRef<number>(180);
//   const lastPeriodRef = useRef<string>("");
//   const betTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const calculateTimeLeft = (): number => {
//     const now = new Date();
//     const currentMinute = now.getMinutes();
//     const currentSecond = now.getSeconds();
//     const nextGameMinute = Math.ceil((currentMinute + 1) / 3) * 3;
//     let minutesUntilNext = nextGameMinute - currentMinute;
//     if (minutesUntilNext <= 0) minutesUntilNext = 3;
//     const secondsLeft = minutesUntilNext * 60 - currentSecond;
//     return Math.max(0, Math.min(180, secondsLeft));
//   };

//   useEffect(() => {
//     const setupSocket = async () => {
//       try {
//         const token = await AsyncStorage.getItem("token");
//         if (!token) {
//           setError("No authentication token found. Please log in.");
//           setLoading(false);
//           return;
//         }

//         if (socket.current) {
//           socket.current.disconnect();
//         }

//         socket.current = io(SOCKET_IO_URL, {
//           transports: ["websocket"],
//           auth: { token },
//           autoConnect: true,
//           reconnectionAttempts: Infinity,
//           reconnectionDelay: 5000,
//           reconnectionDelayMax: 10000,
//         });

//         socket.current.on("connect", () => {
//           console.log("✅ Socket.IO connected", socket.current?.id);
//           setSocketConnected(true);
//           setError(null);

//           socket.current?.emit("get:current:rounds");
//           socket.current?.emit("getCurrentRounds");
//           socket.current?.emit("fetch:game:data");
//         });

//         socket.current.on("connect_error", (err) => {
//           console.error("❌ Socket.IO connection error:", err.message);
//           setError("Connection error: " + err.message);
//           setSocketConnected(false);
//           setLoading(false);
//         });

//         socket.current.on("disconnect", (reason) => {
//           console.log("🔌 Socket.IO disconnected:", reason);
//           setSocketConnected(false);

//           if (reason === "io server disconnect") {
//             socket.current?.connect();
//           }
//         });

//         socket.current.on("reconnect_attempt", (attemptNumber) => {
//           console.log(`🔄 Reconnection attempt ${attemptNumber}`);
//           setError("Reconnecting...");
//         });

//         socket.current.on("reconnect", (attemptNumber) => {
//           console.log(`✅ Reconnected after ${attemptNumber} attempts`);
//           setError(null);
//           setSocketConnected(true);
//           socket.current?.emit("get:current:rounds");
//           socket.current?.emit("getCurrentRounds");
//         });

//         socket.current.on("current:rounds", (data: any) => {
//           console.log("📊 Received current rounds:", data);
//           if (data) {
//             setGameData(data);
//             setLoading(false);
//           }
//         });

//         socket.current.on("currentRounds", (data: any) => {
//           console.log("📊 Received currentRounds:", data);
//           if (data) {
//             setGameData(data);
//             setLoading(false);
//           }
//         });

//         socket.current.on("game:data", (data: any) => {
//           console.log("📊 Received game:data:", data);
//           if (data) {
//             setGameData(data);
//             setLoading(false);
//           }
//         });

//         socket.current.onAny((eventName, ...args) => {
//           console.log(`🔔 Socket event: ${eventName}`, args);
//         });

//         socket.current.on("round:created", (data: any) => {
//           console.log("🆕 New round created:", data);

//           if (data?.period && data?.gameDuration === 180) {
//             const periodEndsWithOne = data.period.endsWith("-1");
//             const isActiveOrScheduled = data.status === "scheduled" || data.status === "active";

//             console.log(`📊 Period: ${data.period}, ends with -1: ${periodEndsWithOne}, status: ${data.status}`);

//             if (periodEndsWithOne || !currentPeriod || (isActiveOrScheduled && !lastPeriodRef.current.endsWith("-1"))) {
//               console.log("✅ Updating to new period immediately:", data.period);

//               setCurrentPeriod(data.period);
//               lastPeriodRef.current = data.period;
//               setRoundCompleted(false);
//               setTimeLeft(180);
//               setSelectedOption(null);
//               setForceUpdate(prev => prev + 1);

//               setGameData((prev) => {
//                 if (!prev) return prev;

//                 if (prev.rounds && Array.isArray(prev.rounds) && prev.rounds[0]) {
//                   const updatedRounds = [...prev.rounds];
//                   updatedRounds[0] = { ...updatedRounds[0], period: data.period, status: data.status };
//                   return { ...prev, rounds: updatedRounds };
//                 }

//                 if (prev.data?.lastGames) {
//                   return {
//                     ...prev,
//                     data: {
//                       ...prev.data,
//                       lastGames: {
//                         ...prev.data.lastGames,
//                         "1_game": {
//                           ...prev.data.lastGames["1_game"],
//                           period: data.period,
//                           status: data.status
//                         }
//                       }
//                     }
//                   };
//                 }

//                 return prev;
//               });
//             }
//           }

//           setTimeout(() => {
//             socket.current?.emit("get:current:rounds");
//             socket.current?.emit("getCurrentRounds");
//             socket.current?.emit("fetch:game:data");
//           }, 300);
//         });

//         socket.current.on("round:finalized", (data: any) => {
//           console.log("✅ Round finalized:", data);
//           setRoundCompleted(true);

//           setTimeout(() => {
//             socket.current?.emit("get:current:rounds");
//             socket.current?.emit("getCurrentRounds");
//             socket.current?.emit("fetch:game:data");
//           }, 1000);
//         });

//         socket.current.on("balance:update", (data: any) => {
//           console.log("💰 Balance updated:", data);
//           setGameData((prev) => {
//             if (!prev) return prev;

//             if (prev.data) {
//               return {
//                 ...prev,
//                 data: {
//                   ...prev.data,
//                   walletBalance: data.balance
//                 }
//               };
//             } else {
//               return {
//                 ...prev,
//                 walletBalance: data.balance
//               };
//             }
//           });
//         });

//         socket.current.on("user:balance", (data: any) => {
//           console.log("💰 User balance:", data);
//           setGameData((prev) => {
//             if (!prev) return prev;

//             if (prev.data) {
//               return {
//                 ...prev,
//                 data: {
//                   ...prev.data,
//                   walletBalance: data.balance
//                 }
//               };
//             } else {
//               return {
//                 ...prev,
//                 walletBalance: data.balance
//               };
//             }
//           });
//         });

//         socket.current.on("game:result", (data: any) => {
//           console.log("🎮 Game result:", data);
//           if (data.result) {
//             Alert.alert(
//               "Game Result",
//               `Period: ${data.period}\nNumber: ${data.winningNumber}\nResult: ${data.result}${data.winnings ? `\nWinnings: ₹${data.winnings}` : ""}`
//             );
//           }
//           socket.current?.emit("get:current:rounds");
//           socket.current?.emit("getCurrentRounds");
//         });

//         // CRITICAL FIX: Improved bet placed handler
//         socket.current.on("bet:placed", (data: any) => {
//           console.log("✅ Bet placed successfully:", data);

//           // Don't handle here - let the promise handler deal with it
//           // This is just for updating UI state
//           setIsPlacingBet(false);

//           const betDetails = data.data || data;
//           Alert.alert(
//             "✅ Bet Placed Successfully!",
//             `Period: ${betDetails.period || data.period || currentPeriod}\n` +
//             `Bet Type: ${betDetails.betType || 'N/A'}\n` +
//             `Bet Value: ${Array.isArray(betDetails.betValue) ? betDetails.betValue.join(', ') : betDetails.betValue}\n` +
//             `Amount: ₹${betDetails.betAmount || data.amount}\n` +
//             `Status: ${betDetails.status || 'Pending'}`,
//             [
//               {
//                 text: "OK",
//                 onPress: () => {
//                   setIsModalVisible(false);
//                   setSelectedOption(null);
//                   setSelectedAmount("₹10");
//                   setSelectedMultiplier("x1");
//                 },
//               },
//             ]
//           );

//           socket.current?.emit("get:current:rounds");
//           socket.current?.emit("getCurrentRounds");
//         });

//         // CRITICAL FIX: Improved bet error handler
//         socket.current.on("bet:error", (data: any) => {
//           console.error("❌ Bet error:", data);

//           // Don't handle here - let the promise handler deal with it
//           setIsPlacingBet(false);
//         });

//         socket.current.on("message", (msg: any) => {
//           console.log("📨 Socket message:", msg);
//         });

//         socket.current.on("error", (error: any) => {
//           console.error("❌ Socket error:", error);
//           setError(error.message || "Socket error occurred");
//         });

//       } catch (err) {
//         console.error("❌ Setup socket error:", err);
//         setError(err instanceof Error ? err.message : "Failed to setup connection");
//         setLoading(false);
//       }
//     };

//     setupSocket();

//     return () => {
//       if (betTimeoutRef.current) {
//         clearTimeout(betTimeoutRef.current);
//       }
//       if (socket.current) {
//         console.log("🔌 Cleaning up socket connection");
//         socket.current.removeAllListeners();
//         socket.current.disconnect();
//         socket.current = null;
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newTime = calculateTimeLeft();
//       const prevTime = prevTimeRef.current;

//       setTimeLeft(newTime);
//       prevTimeRef.current = newTime;

//       if (newTime >= 175 && newTime <= 180 && prevTime < 170) {
//         console.log("🔄 Timer reset detected - New round starting!");
//         if (socketConnected) {
//           socket.current?.emit("get:current:rounds");
//           socket.current?.emit("getCurrentRounds");
//           socket.current?.emit("fetch:game:data");
//           setRoundCompleted(false);
//         }
//       }

//       if (newTime === 5 && socketConnected) {
//         socket.current?.emit("get:current:rounds");
//       }

//       if (newTime === 0 && prevTime === 1 && socketConnected) {
//         setTimeout(() => {
//           socket.current?.emit("get:current:rounds");
//           socket.current?.emit("getCurrentRounds");
//           socket.current?.emit("fetch:game:data");
//         }, 500);
//       }

//       if (newTime % 30 === 0 && newTime !== 0 && newTime !== 180 && socketConnected) {
//         socket.current?.emit("get:current:rounds");
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [socketConnected]);

//   useEffect(() => {
//     console.log("🎮 Game data updated:", gameData);

//     if (!gameData) return;

//     const threeMinGame = getCurrentThreeMinGame(gameData);
//     console.log("🎯 Selected 3-min game:", threeMinGame);

//     if (threeMinGame?.period) {
//       const newPeriod = threeMinGame.period;
//       const endsWithOne = newPeriod.endsWith("-1");
//       const isActiveGame = threeMinGame.status === "active" || threeMinGame.status === "scheduled";

//       if (!endsWithOne && !isActiveGame) {
//         console.warn(`⚠️ Rejecting period ${newPeriod}`);
//         return;
//       }

//       if (lastPeriodRef.current && lastPeriodRef.current.endsWith("-1")) {
//         const currentTimeSlot = lastPeriodRef.current.substring(0, lastPeriodRef.current.lastIndexOf("-"));
//         const newTimeSlot = newPeriod.substring(0, newPeriod.lastIndexOf("-"));

//         if (currentTimeSlot === newTimeSlot) {
//           console.log(`📌 Same time slot detected. Keeping -1 period: ${lastPeriodRef.current}`);
//           return;
//         }
//       }

//       if (newPeriod !== lastPeriodRef.current) {
//         console.log(`✅ PERIOD CHANGED: ${lastPeriodRef.current} → ${newPeriod}`);
//         setCurrentPeriod(newPeriod);
//         lastPeriodRef.current = newPeriod;
//         setForceUpdate(prev => prev + 1);
//         setRoundCompleted(false);
//         setSelectedOption(null);

//         const calculatedTime = calculateTimeLeft();
//         setTimeLeft(calculatedTime);
//       }
//     }

//     let completedGames: GameRound[] = [];

//     if (gameData.data?.lastGames) {
//       completedGames = Object.values(gameData.data.lastGames).filter(
//         game => game && game.status === "completed" && game.winningNumber !== null
//       );
//     }
//     else if (gameData.rounds && Array.isArray(gameData.rounds)) {
//       completedGames = gameData.rounds.filter(
//         game => game && game.status === "completed" && game.winningNumber !== null
//       );
//     }
//     else if (gameData.lastGames) {
//       completedGames = Object.values(gameData.lastGames).filter(
//         game => game && game.status === "completed" && game.winningNumber !== null
//       );
//     }

//     const nums = completedGames
//       .map(game => game.winningNumber as number)
//       .filter(num => num !== null && num !== undefined)
//       .slice(0, 10);

//     setWinningNumbers(nums);
//   }, [gameData]);

//   useEffect(() => {
//     const staleCheckInterval = setInterval(() => {
//       if (socketConnected) {
//         if (!currentPeriod || timeLeft === 0) {
//           console.log("🔍 No period or timer at 0 - requesting fresh data");
//           socket.current?.emit("get:current:rounds");
//           socket.current?.emit("getCurrentRounds");
//           socket.current?.emit("fetch:game:data");
//         }

//         if (currentPeriod && !currentPeriod.endsWith("-1")) {
//           console.log("🔍 Current period is not -1 game, requesting fresh data");
//           socket.current?.emit("get:current:rounds");
//           socket.current?.emit("getCurrentRounds");
//         }
//       }
//     }, 10000);

//     return () => clearInterval(staleCheckInterval);
//   }, [socketConnected, timeLeft, currentPeriod]);

//   // CRITICAL FIX: Improved placeBet function with Promise return
//   const placeBet = (betAmount: number): Promise<void> => {
//     return new Promise((resolve, reject) => {
//       console.log("🎲 placeBet called with amount:", betAmount);
//       console.log("🎯 Selected option:", selectedOption);
//       console.log("📍 Current period:", currentPeriod);
//       console.log("🔌 Socket connected:", socketConnected);
//       console.log("⏰ Time left:", timeLeft);
//       console.log("✅ Betting allowed:", isBettingAllowed);

//       const threeMinGame = getCurrentThreeMinGame(gameData);
//       console.log("🎮 Current game:", threeMinGame);

//       // Validation checks
//       if (!selectedOption) {
//         Alert.alert("Error", "Please select a betting option first");
//         reject(new Error("No option selected"));
//         return;
//       }

//       if (!threeMinGame) {
//         Alert.alert("Error", "Game data not available. Please try again.");
//         reject(new Error("No game data"));
//         return;
//       }

//       if (threeMinGame.gameDuration !== 180) {
//         Alert.alert("Error", "This is not a 3-minute game. Please wait for the next round.");
//         reject(new Error("Invalid game duration"));
//         return;
//       }

//       if (!isBettingAllowed) {
//         Alert.alert("Error", "Betting is closed. Less than 30 seconds remaining!");
//         reject(new Error("Betting closed"));
//         return;
//       }

//       if (!socketConnected) {
//         Alert.alert("Error", "Not connected to server. Please wait...");
//         reject(new Error("Socket not connected"));
//         return;
//       }

//       // Use the current period from state or game data
//       const periodToUse = currentPeriod || threeMinGame.period;

//       if (!periodToUse) {
//         Alert.alert("Error", "Period information not available. Please try again.");
//         reject(new Error("No period available"));
//         return;
//       }

//       setIsPlacingBet(true);

//       try {
//         let betType: string;
//         let betValue: string | number | string[];

//         if (selectedOption.type === "color") {
//           betType = "color";
//           betValue = selectedOption.value as string;
//         } else if (selectedOption.type === "number") {
//           betType = "number";
//           betValue = selectedOption.value as number;
//         } else if (selectedOption.type === "size") {
//           betType = "size";
//           betValue = (selectedOption.value as string).toLowerCase();
//         } else {
//           throw new Error("Invalid bet type");
//         }

//         const betData = {
//           period: periodToUse,
//           betAmount: betAmount,
//           betType: betType,
//           betValue: betValue,
//         };

//         console.log("📤 Placing bet via WebSocket:", betData);
//         console.log("📤 Socket instance:", socket.current?.id);
//         console.log("📤 Socket connected:", socket.current?.connected);

//         if (!socket.current || !socket.current.connected) {
//           throw new Error("Socket not connected");
//         }

//         // Store resolve/reject in a way that event handlers can access them
//         const betPromise = { resolve, reject };

//         // Set up one-time listeners for this specific bet
//         const betPlacedHandler = (data: any) => {
//           console.log("✅ Bet placed successfully:", data);

//           if (betTimeoutRef.current) {
//             clearTimeout(betTimeoutRef.current);
//             betTimeoutRef.current = null;
//           }

//           // Remove listeners
//           socket.current?.off("bet:placed", betPlacedHandler);
//           socket.current?.off("bet:error", betErrorHandler);

//           betPromise.resolve();
//         };

//         const betErrorHandler = (data: any) => {
//           console.error("❌ Bet error:", data);

//           if (betTimeoutRef.current) {
//             clearTimeout(betTimeoutRef.current);
//             betTimeoutRef.current = null;
//           }

//           // Remove listeners
//           socket.current?.off("bet:placed", betPlacedHandler);
//           socket.current?.off("bet:error", betErrorHandler);

//           Alert.alert("Bet Failed", data.message || "Failed to place bet. Please try again.");
//           betPromise.reject(new Error(data.message || "Bet failed"));
//         };

//         // Add temporary listeners
//         socket.current.once("bet:placed", betPlacedHandler);
//         socket.current.once("bet:error", betErrorHandler);

//         // Emit the bet
//         socket.current.emit("place:bet", betData);
//         console.log("✅ Bet emitted successfully");

//         // Set timeout for bet response
//         betTimeoutRef.current = setTimeout(() => {
//           console.log("⏰ Bet timeout reached");

//           // Remove listeners on timeout
//           socket.current?.off("bet:placed", betPlacedHandler);
//           socket.current?.off("bet:error", betErrorHandler);

//           setIsPlacingBet(false);
//           Alert.alert("Timeout", "Bet request timed out. Please check your connection and try again.");
//           betPromise.reject(new Error("Timeout"));
//         }, 15000);

//       } catch (error) {
//         console.error("❌ Bet error:", error);
//         setIsPlacingBet(false);
//         Alert.alert(
//           "Error",
//           error instanceof Error ? error.message : "Failed to place bet. Please try again."
//         );
//         reject(error);
//       }
//     });
//   };

//   const handleColorPress = (color: string) => {
//     if (!isBettingAllowed) {
//       Alert.alert("Betting Closed", "Betting is not allowed in the final 30 seconds!");
//       return;
//     }
//     setSelectedOption((prev) =>
//       prev?.type === "color" && prev.value === color
//         ? null
//         : { type: "color", value: color }
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
//         : { type: "number", value: number }
//     );
//   };

//   const handleSizePress = (size: "Big" | "Small") => {
//     if (!isBettingAllowed) {
//       Alert.alert("Betting Closed", "Betting is not allowed in the final 30 seconds!");
//       return;
//     }
//     setSelectedOption((prev) =>
//       prev?.type === "size" && prev.value === size
//         ? null
//         : { type: "size", value: size }
//     );
//   };

//   const formatTime = (seconds: number): string[] => {
//     const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
//     const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
//     return [...minutes, ":", ...remainingSeconds];
//   };

//   const handleRetry = () => {
//     setLoading(true);
//     setError(null);

//     console.log("🔄 Manual retry triggered");

//     if (socket.current) {
//       if (socket.current.connected) {
//         console.log("📡 Socket connected, requesting data...");
//         socket.current.emit("get:current:rounds");
//         socket.current.emit("getCurrentRounds");
//         socket.current.emit("fetch:game:data");
//       } else {
//         console.log("🔌 Socket disconnected, reconnecting...");
//         socket.current.connect();
//       }
//     }
//   };

//   const colors = [
//     { key: "Green", bg: "bg-green-500" },
//     { key: "Violet", bg: "bg-violet-500" },
//     { key: "Red", bg: "bg-red-500" },
//   ];

//   const numbers = Array.from({ length: 10 }, (_, i) => i);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-100">
//         <ActivityIndicator size="large" color="#16a34a" />
//         <Text className="mt-4 text-lg font-semibold text-gray-700">
//           {socketConnected ? "Loading game data..." : "Connecting to server..."}
//         </Text>
//       </View>
//     );
//   }

//   if (error && !gameData) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-100 p-6">
//         <Text className="text-lg font-semibold text-red-600 mb-4 text-center">
//           {error}
//         </Text>
//         <TouchableOpacity
//           onPress={handleRetry}
//           className="bg-green-600 px-6 py-3 rounded-full"
//         >
//           <Text className="text-white font-bold">Retry Connection</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const currentGame = getCurrentThreeMinGame(gameData);
//   const isValid3MinGame = !!currentGame && currentGame.gameDuration === 180;
//   const isBetButtonActive = selectedOption !== null && isBettingAllowed && isValid3MinGame && socketConnected;

//   return (
//     <View>
//       {!socketConnected && (
//         <View className="bg-red-100 p-2 mx-2 mt-2 rounded-lg">
//           <Text className="text-red-800 text-center text-sm font-semibold">
//             ⚠️ Disconnected - Reconnecting...
//           </Text>
//         </View>
//       )}

//       <View className="bg-green-600 flex-row justify-between p-3 rounded-xl py-4 items-center">
//         <View>
//           <View className="border border-white rounded-2xl items-center px-3 flex-row gap-1 py-1">
//             <Image
//               source={require("../assets/images/howtoplay.png")}
//               className="w-5 h-5"
//             />
//             <Text className="text-white font-bold text-sm">How to play</Text>
//           </View>
//           <Text className="font-extrabold text-white px-3 py-2">Win Go 3 min</Text>

//           <View className="pl-2 mt-1">
//             <View className="flex-row gap-2">
//               {winningNumbers.length > 0 ? (
//                 winningNumbers.map((winningNumber, index) => (
//                   <View key={index} className="items-center">
//                     <View className="w-8 h-8 rounded-full overflow-hidden bg-white items-center justify-center">
//                       <Image
//                         source={numberImages[winningNumber]}
//                         style={{ width: 30, height: 30 }}
//                         resizeMode="contain"
//                       />
//                     </View>
//                   </View>
//                 ))
//               ) : (
//                 <Text className="text-white text-xs opacity-75">
//                   Loading recent results...
//                 </Text>
//               )}
//             </View>
//           </View>
//         </View>

//         <View className="items-center px-1">
//           <Text className="text-white text-center text-sm font-bold">
//             {currentPeriod || currentGame?.period || "Loading..."}
//           </Text>
//           <Text className="text-white text-lg font-extrabold mb-1">
//             Time Left
//           </Text>

//           <View className="flex-row gap-1">
//             {formatTime(timeLeft).map((char, index) => (
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

//       {!isValid3MinGame && (
//         <View className="bg-orange-100 p-3 mx-2 mt-3 rounded-lg">
//           <Text className="text-orange-800 text-center font-semibold">
//             ⚠️ This is not a 3-minute game. Waiting for valid period...
//           </Text>
//         </View>
//       )}

//       {timeLeft === 0 && (
//         <View className="bg-yellow-100 p-3 mx-2 mt-3 rounded-lg">
//           <Text className="text-yellow-800 text-center font-semibold">
//             Game ended. Waiting for next round...
//           </Text>
//         </View>
//       )}

//       {isInFinalSeconds && (
//         <View className="bg-red-100 p-3 mx-2 mt-3 rounded-lg">
//           <Text className="text-red-800 text-center font-semibold">
//             ⚠️ Betting Closed - Final {timeLeft} seconds!
//           </Text>
//         </View>
//       )}

//       {roundCompleted && timeLeft === 0 && (
//         <View className="bg-green-100 p-4 mx-2 mt-3 rounded-lg">
//           <Text className="text-green-800 text-center font-semibold mb-3">
//             ✅ Round Completed!
//           </Text>
//           <TouchableOpacity
//             onPress={() => {
//               setRoundCompleted(false);
//               socket.current?.emit("get:current:rounds");
//               socket.current?.emit("getCurrentRounds");
//               socket.current?.emit("fetch:game:data");
//             }}
//             className="bg-green-600 px-6 py-2 rounded-full"
//           >
//             <Text className="text-white font-bold text-center">
//               Reload Results
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <View className="my-5 flex-row justify-between px-1">
//         {colors.map(({ key, bg }) => {
//           const isSelected =
//             selectedOption?.type === "color" && selectedOption.value === key;
//           const isDisabled = !isBettingAllowed || !isValid3MinGame;
//           return (
//             <TouchableOpacity
//               key={key}
//               onPress={() => handleColorPress(key)}
//               disabled={isDisabled}
//               className={`${bg} px-6 p-2 rounded-tr-2xl rounded-bl-2xl flex-1 mx-2 ${
//                 isSelected ? "border-4 border-yellow-400" : ""
//               } ${isDisabled ? "opacity-30" : ""}`}
//             >
//               <Text className="text-lg text-white font-bold text-center">
//                 {key}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       <View className="flex flex-row flex-wrap justify-center gap-2 my-4 px-2">
//         {numbers.map((number) => {
//           const isSelected =
//             selectedOption?.type === "number" && selectedOption.value === number;
//           const isDisabled = !isBettingAllowed || !isValid3MinGame;
//           return (
//             <TouchableOpacity
//               key={number}
//               className={`h-16 w-16 rounded-full overflow-hidden items-center justify-center ${
//                 isSelected ? "border-4 border-yellow-500" : ""
//               } ${isDisabled ? "opacity-30" : ""}`}
//               onPress={() => handleNumberPress(number)}
//               disabled={isDisabled}
//             >
//               <Image
//                 source={numberImages[number]}
//                 className="h-full w-full"
//                 resizeMode="cover"
//               />
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       <View className="flex-row justify-center mt-6 gap-3 px-3">
//         <TouchableOpacity
//           onPress={() => handleSizePress("Big")}
//           disabled={!isBettingAllowed || !isValid3MinGame}
//           className={`bg-orange-400 px-12 py-3 rounded-full ${
//             selectedOption?.type === "size" && selectedOption.value === "Big"
//               ? "border-4 border-yellow-500"
//               : ""
//           } ${(!isBettingAllowed || !isValid3MinGame) ? "opacity-30" : ""}`}
//         >
//           <Text className="text-lg font-bold text-white">Big</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => handleSizePress("Small")}
//           disabled={!isBettingAllowed || !isValid3MinGame}
//           className={`bg-purple-500 px-12 py-3 rounded-full ${
//             selectedOption?.type === "size" && selectedOption.value === "Small"
//               ? "border-4 border-yellow-500"
//               : ""
//           } ${(!isBettingAllowed || !isValid3MinGame) ? "opacity-30" : ""}`}
//         >
//           <Text className="text-lg font-bold text-white">Small</Text>
//         </TouchableOpacity>
//       </View>

//       <View className="mt-6 items-center pb-6 px-3">
//         <TouchableOpacity
//           onPress={() => setIsModalVisible(true)}
//           disabled={!isBetButtonActive}
//           className={`px-8 py-3 rounded-full w-full ${
//             isBetButtonActive ? "bg-green-600" : "bg-gray-400"
//           }`}
//         >
//           <Text
//             className={`text-lg font-bold text-center ${
//               isBetButtonActive ? "text-white" : "text-gray-600"
//             }`}
//           >
//             {!socketConnected
//               ? "Connecting..."
//               : timeLeft === 0
//               ? "Game Ended"
//               : !isValid3MinGame
//               ? "Waiting for 3-minute game..."
//               : isInFinalSeconds
//               ? "Betting Closed - Final Seconds"
//               : isBetButtonActive
//               ? `Place Bet (${selectedOption?.type}: ${selectedOption?.value})`
//               : "Select an option to bet"}
//           </Text>
//         </TouchableOpacity>
//       </View>

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

//       <View className="pt-5">
//         <Game1 />
//       </View>
//     </View>
//   );
// };

// export default Min3;

// import React, { useState, useEffect, useRef } from "react";
// import BetModal from "./Betmodel";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import Game1 from "@/Components/GameHistory/Game1";
// import { useSocket } from "@/app/context/SocketContext";

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

// interface GameRound {
//   _id: string;
//   period: string;
//   winningNumber: number | null;
//   color: string[];
//   size: string | null;
//   status: string;
//   scheduledAt: string;
//   gameDuration: number;
// }

// const API_BASE_URL = "https://ctbackend.crobstacle.com";

// const Min3 = () => {
//   const { socket, isConnected, currentRounds, refreshRounds } = useSocket();

//   const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedAmount, setSelectedAmount] = useState("₹10");
//   const [selectedMultiplier, setSelectedMultiplier] = useState("x1");
//   const [selectedOption, setSelectedOption] = useState<{
//     type: "color" | "number" | "size";
//     value: string | number;
//   } | null>(null);
//   const [isPlacingBet, setIsPlacingBet] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(180);
//   const [currentPeriod, setCurrentPeriod] = useState<string>("");

//   const isBettingAllowed = timeLeft > 30;
//   const isInFinalSeconds = timeLeft <= 30 && timeLeft > 0;

//   const prevTimeRef = useRef<number>(180);
//   const lastPeriodRef = useRef<string>("");
//   const hasRequestedRoundsRef = useRef(false);
//   const roundEndTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const calculateTimeLeft = (): number => {
//     const now = new Date();
//     const currentMinute = now.getMinutes();
//     const currentSecond = now.getSeconds();
//     // Logic to find the end of the current 3-minute cycle
//     const nextGameMinute = Math.ceil((currentMinute + 1) / 3) * 3;
//     let minutesUntilNext = nextGameMinute - currentMinute;
//     if (minutesUntilNext <= 0) minutesUntilNext = 3;
//     const secondsLeft = minutesUntilNext * 60 - currentSecond;
//     return Math.max(0, Math.min(180, secondsLeft));
//   };

// const placeBetViaAPI = async (betAmount: number): Promise<void> => {
//     try {
//         if (!selectedOption) throw new Error("Please select an option to bet.");
//         if (!currentPeriod) throw new Error("Waiting for game period. Please try again.");
//         if (!isBettingAllowed) throw new Error("Betting is closed for this round.");

//         const token = await AsyncStorage.getItem("token");
//         if (!token) throw new Error("Authentication error. Please log in again.");

//         let betType: string;
//         let betValue: string[]; // This must be an array of strings

//         if (selectedOption.type === "color") {
//             betType = "color";
//             // FIX: Ensure betValue is an array of strings AND convert to lowercase
//             // to handle potential API case sensitivity for 'green', 'red', 'violet'.
//             betValue = [(selectedOption.value as string).toLowerCase()];
//         } else if (selectedOption.type === "number") {
//             betType = "number";
//             betValue = [selectedOption.value.toString()];
//         } else if (selectedOption.type === "size") {
//             betType = "size";
//             // FIX: Already correctly converted to lowercase 'small' or 'big'
//             betValue = [(selectedOption.value as string).toLowerCase()];
//         } else {
//             throw new Error("Invalid bet type.");
//         }

//         const betData = { period: currentPeriod, betAmount, betType, betValue };

//         console.log("➡️ Sending Bet Data:", JSON.stringify(betData)); // Debug log for body

//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), 15000);

//         const response = await fetch(`${API_BASE_URL}/api/game/bet`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//             body: JSON.stringify(betData),
//             signal: controller.signal,
//         });

//         clearTimeout(timeoutId);
//         const responseData = await response.json();

//         if (!response.ok || responseData.status !== "success") {
//             throw new Error(responseData.message || `Server error: ${response.status}`);
//         }

//         const betDetails = responseData.data;
//         Alert.alert(
//             "✅ Bet Placed Successfully!",
//             `Period: ${betDetails.period}\n` +
//             `Bet: ${betDetails.betType} on ${betDetails.betValue.join(', ')}\n` +
//             `Amount: ₹${betDetails.betAmount}`,
//             [{ text: "OK", onPress: () => {
//                 setIsModalVisible(false);
//                 setSelectedOption(null);
//                 setSelectedAmount("₹10");
//                 setSelectedMultiplier("x1");
//             }}]
//         );

//         refreshRounds();
//     } catch (error: any) {
//         console.error("❌ Bet API error:", error);
//         const errorMessage = error.name === 'AbortError' ? "Request timed out. Please try again." : error.message;
//         Alert.alert("Bet Failed", errorMessage);
//         throw error;
//     }
// };

//   const placeBet = async (betAmount: number): Promise<void> => {
//     setIsPlacingBet(true);
//     try {
//       await placeBetViaAPI(betAmount);
//     } catch (error) {
//       // Error already handled
//     } finally {
//       setIsPlacingBet(false);
//     }
//   };

//   // 1. Initial rounds request
//   useEffect(() => {
//     if (socket && isConnected && !hasRequestedRoundsRef.current) {
//       console.log("📡 Initial rounds request on mount");
//       refreshRounds();
//       hasRequestedRoundsRef.current = true;
//     }
//   }, [socket, isConnected, refreshRounds]);

//   // 2. Socket event listeners (FIXED LOGIC)
//   useEffect(() => {
//     if (!socket) return;

//     const handleRoundCreated = (data: GameRound) => {
//       console.log(`🔔 Round created event: ${data.period} (${data.gameDuration}s, ${data.status})`);

//       // CRITICAL FIX: Only accept the official -1 betting round for update
//       if (data?.period && data.gameDuration === 180 && data.period.endsWith("-1")) {

//         // Only update if the period is NEW (period has changed)
//         if (data.period !== lastPeriodRef.current) {
//           console.log(`✨ SOCKET NEW -1 ROUND DETECTED: ${lastPeriodRef.current || 'none'} → ${data.period}`);

//           // 1. Update period state and ref
//           setCurrentPeriod(data.period);
//           lastPeriodRef.current = data.period;

//           // 2. Reset timer to match the start of the new round cycle
//           const calculatedTime = calculateTimeLeft();
//           setTimeLeft(calculatedTime);

//           // 3. Clear any pending timeout from the previous round's completion
//           if (roundEndTimeoutRef.current) {
//             clearTimeout(roundEndTimeoutRef.current);
//             roundEndTimeoutRef.current = null;
//           }

//           // 4. Clear selected bet option
//           setSelectedOption(null);
//         } else {
//           console.log(`ℹ️ Received 'round:created' for existing -1 period: ${lastPeriodRef.current}`);
//         }
//       } else if (data?.period && data.gameDuration === 180) {
//         console.log(`⚠️ Ignoring non-betting round: ${data.period}`);
//       }
//     };

//     const handleRoundFinalized = (data: any) => {
//       console.log("🏁 Round finalized:", data);

//       setTimeout(() => {
//         console.log("🔄 Requesting fresh rounds after finalization");
//         refreshRounds();
//       }, 1500);
//     };

//     socket.on("round:created", handleRoundCreated);
//     socket.on("round:finalized", handleRoundFinalized);

//     return () => {
//       socket.off("round:created", handleRoundCreated);
//       socket.off("round:finalized", handleRoundFinalized);
//     };
//   }, [socket, refreshRounds]);

//   // 3. Timer countdown logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newTime = calculateTimeLeft();
//       const prevTime = prevTimeRef.current;
//       setTimeLeft(newTime);
//       prevTimeRef.current = newTime;

//       // Detect round ending (timer going from >0 to 0)
//       if (newTime === 0 && prevTime > 0) {
//         console.log("⏳ Round ended (timer hit 0)");

//         if (roundEndTimeoutRef.current) {
//           clearTimeout(roundEndTimeoutRef.current);
//         }

//         // Schedule IMMEDIATE round refresh
//         roundEndTimeoutRef.current = setTimeout(() => {
//           console.log("🔄 Round end timeout - requesting new rounds");
//           refreshRounds();
//         }, 300); // Only wait 300ms for new period ID
//       }

//       // Safety check if period is empty and timer is high
//       if (newTime > 170 && newTime <= 180 && !currentPeriod) {
//         console.log("⚠️ No period ID at start of cycle - requesting rounds");
//         refreshRounds();
//       }
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//       if (roundEndTimeoutRef.current) {
//         clearTimeout(roundEndTimeoutRef.current);
//       }
//     };
//   }, [currentPeriod, refreshRounds]);

//   // 4. Sync period from currentRounds (API fallback and history) (REFINED)
//   useEffect(() => {
//     if (!currentRounds || currentRounds.length === 0) {
//       return;
//     }

//     console.log("📊 Processing currentRounds from API/SocketContext update...");

//     // CRITICAL FIX: Find the current active/scheduled 3-minute game that ends in -1
//     const threeMinGame = currentRounds.find(
//         (game) =>
//         game &&
//         game.gameDuration === 180 &&
//         (game.status === "active" || game.status === "scheduled") &&
//         game.period?.endsWith("-1") // <-- Only accept -1
//     );

//     if (threeMinGame?.period) {
//       const newPeriod = threeMinGame.period;
//       const oldPeriod = lastPeriodRef.current;

//       // Update if: no current period OR the period has changed
//       if (!oldPeriod || newPeriod !== oldPeriod) {
//         console.log(`🔄 API/CONTEXT -1 PERIOD UPDATE: ${oldPeriod || 'none'} → ${newPeriod}`);
//         setCurrentPeriod(newPeriod);
//         lastPeriodRef.current = newPeriod;

//         // Recalculate timer for this period
//         const calculatedTime = calculateTimeLeft();
//         setTimeLeft(calculatedTime);
//       } else {
//         console.log(`ℹ️ API/CONTEXT -1 period matches current: ${oldPeriod}`);
//       }
//     } else {
//       console.log("❌ No active/scheduled 3-minute game ending in -1 found");
//       setTimeLeft(calculateTimeLeft());
//     }

//     // Extract winning numbers from completed games (History logic remains)
//     const completedGames = currentRounds.filter(
//       g => g?.status === "completed" && g.winningNumber !== null && g.gameDuration === 180
//     );

//     const nums = completedGames
//       .sort((a, b) => b.period.localeCompare(a.period))
//       .map(g => g.winningNumber as number)
//       .slice(0, 5);

//     if (nums.length > 0 && JSON.stringify(nums) !== JSON.stringify(winningNumbers)) {
//       console.log("🎲 Updating winning numbers:", nums);
//       setWinningNumbers(nums);
//     }
//   }, [currentRounds, winningNumbers]);

//   const formatTime = (seconds: number): string[] => {
//     const m = Math.floor(seconds / 60).toString().padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return [...m, ":", ...s];
//   };

//   const handlePress = (type: "color" | "number" | "size", value: string | number) => {
//     if (!isBettingAllowed) {
//       Alert.alert("Betting Closed", "Betting is not allowed in the final 30 seconds.");
//       return;
//     }
//     setSelectedOption((prev) =>
//       prev?.type === type && prev.value === value ? null : { type, value }
//     );
//   };

//   const isValid3MinGame = !!currentPeriod;
//   const isBetButtonActive = selectedOption !== null && isBettingAllowed && isValid3MinGame && isConnected;
//   const colors = [{ key: "Green", bg: "bg-green-500" }, { key: "Violet", bg: "bg-violet-500" }, { key: "Red", bg: "bg-red-500" }];
//   const numbers = Array.from({ length: 10 }, (_, i) => i);

//   return (
//     <View>
//       {!isConnected && (
//         <View className="bg-red-100 p-2 mx-2 mt-2 rounded-lg">
//           <Text className="text-red-800 text-center text-sm font-semibold">
//             ⚠️ Disconnected - Reconnecting...
//           </Text>
//         </View>
//       )}

//       <View className="bg-green-600 flex-row justify-between p-3 rounded-xl py-4 items-center">
//         <View>
//           <View className="border border-white rounded-2xl items-center px-3 flex-row gap-1 py-1">
//             <Image source={require("../assets/images/howtoplay.png")} className="w-5 h-5" />
//             <Text className="text-white font-bold text-sm">How to play</Text>
//           </View>
//           <Text className="font-extrabold text-white px-3 py-2">Win Go 3 min</Text>
//           <View className="pl-2 mt-1">
//             <View className="flex-row gap-2">
//               {winningNumbers.length > 0 ? (
//                 winningNumbers.map((num, index) => (
//                   <View key={index} className="w-8 h-8 rounded-full bg-white items-center justify-center">
//                     <Image source={numberImages[num]} style={{ width: 30, height: 30 }} resizeMode="contain"/>
//                   </View>
//                 ))
//               ) : (
//                 <Text className="text-white text-xs">No history yet</Text>
//               )}
//             </View>
//           </View>
//         </View>

//         <View className="items-center px-1">
//           <Text className="text-white text-center text-sm font-bold h-6 mb-1">
//             {currentPeriod || "Syncing..."}
//           </Text>

//           <Text className="text-white text-lg font-extrabold mb-1">Time Left</Text>
//           <View className="flex-row gap-1">
//             {formatTime(timeLeft).map((char, index) => (
//               <View key={index} className={`rounded-md px-2 ${isInFinalSeconds ? "bg-red-500" : "bg-white"}`}>
//                 <Text className={`text-lg font-extrabold ${isInFinalSeconds ? "text-white" : "text-green-600"}`}>
//                   {char}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </View>

//       <View className="my-5 flex-row justify-between px-1">
//         {colors.map(({ key, bg }) => {
//           const isSelected = selectedOption?.type === "color" && selectedOption.value === key;
//           const isDisabled = !isBettingAllowed || !isValid3MinGame;
//           return (
//             <TouchableOpacity key={key} onPress={() => handlePress("color", key)} disabled={isDisabled}
//               className={`${bg} p-2 rounded-tr-2xl rounded-bl-2xl flex-1 mx-2 ${isSelected ? "border-4 border-yellow-400" : ""} ${isDisabled ? "opacity-30" : ""}`}>
//               <Text className="text-lg text-white font-bold text-center">{key}</Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       <View className="flex flex-row flex-wrap justify-center gap-2 my-4 px-2">
//         {numbers.map((number) => {
//           const isSelected = selectedOption?.type === "number" && selectedOption.value === number;
//           const isDisabled = !isBettingAllowed || !isValid3MinGame;
//           return (
//             <TouchableOpacity key={number} onPress={() => handlePress("number", number)} disabled={isDisabled}
//               className={`h-16 w-16 rounded-full overflow-hidden items-center justify-center ${isSelected ? "border-4 border-yellow-500" : ""} ${isDisabled ? "opacity-30" : ""}`}>
//               <Image source={numberImages[number]} className="h-full w-full" resizeMode="cover"/>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       <View className="flex-row justify-center mt-6 gap-3 px-3">
//         {(["Big", "Small"] as const).map((size) => {
//           const isSelected = selectedOption?.type === "size" && selectedOption.value === size;
//           const isDisabled = !isBettingAllowed || !isValid3MinGame;
//           const bgColor = size === "Big" ? "bg-orange-400" : "bg-purple-500";
//           return (
//             <TouchableOpacity key={size} onPress={() => handlePress("size", size)} disabled={isDisabled}
//               className={`${bgColor} px-12 py-3 rounded-full ${isSelected ? "border-4 border-yellow-500" : ""} ${isDisabled ? "opacity-30" : ""}`}>
//               <Text className="text-lg font-bold text-white">{size}</Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       <View className="mt-6 items-center pb-6 px-3">
//         <TouchableOpacity onPress={() => setIsModalVisible(true)} disabled={!isBetButtonActive}
//           className={`px-8 py-3 rounded-full w-full ${isBetButtonActive ? "bg-green-600" : "bg-gray-400"}`}>
//           <Text className={`text-lg font-bold text-center ${isBetButtonActive ? "text-white" : "text-gray-600"}`}>
//             {!isConnected
//               ? "Connecting..."
//               : !currentPeriod
//               ? "Waiting for game..."
//               : !isBettingAllowed
//               ? "Betting Closed"
//               : isBetButtonActive
//               ? `Place Bet (${selectedOption?.type}: ${selectedOption?.value})`
//               : "Select an option to bet"}
//           </Text>
//         </TouchableOpacity>
//       </View>

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

//       <View className="pt-5">
//         <Game1 />
//       </View>
//     </View>
//   );
// };

// export default Min3;

// import React, { useState, useEffect, useRef } from "react";
// import BetModal from "./Betmodel";
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

//  const placeBetViaAPI = async (betAmount: number): Promise<void> => {
//     try {
//         if (!selectedOption) throw new Error("Please select an option to bet.");
//         if (!currentPeriod) throw new Error("Waiting for game period. Please try again.");
//         if (!isBettingAllowed) throw new Error("Betting is closed for this round.");

//         const token = await AsyncStorage.getItem("token");
//         if (!token) throw new Error("Authentication error. Please log in again.");

//         let betType: string;
//         let betValue: string | string[]; // Allow betValue to be either a string or string array

//         if (selectedOption.type === "color") {
//             betType = "color";
//             // FINAL FIX for Color: Must be a single string, Title Case (e.g., "Green")
//             betValue = selectedOption.value as string;
//         } else if (selectedOption.type === "number") {
//             betType = "number";
//             // Keep Number as a string array, as this was working before (e.g., ["5"])
//             betValue = [selectedOption.value.toString()];
//         } else if (selectedOption.type === "size") {
//             betType = "size";
//             // FINAL FIX for Size: Must be a single string, lowercase (e.g., "small")
//             betValue = (selectedOption.value as string).toLowerCase();
//         } else {
//             throw new Error("Invalid bet type.");
//         }
//         const betData = { period: currentPeriod, betAmount, betType, betValue };

//         console.log("➡️ Sending Bet Data (FINAL):", JSON.stringify(betData)); // Debug log for body

//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), 15000);

//         const response = await fetch(`${API_BASE_URL}/api/game/bet`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
//             body: JSON.stringify(betData),
//             signal: controller.signal,
//         });

//         clearTimeout(timeoutId);
//         const responseData = await response.json();

//         if (!response.ok || responseData.status !== "success") {
//             throw new Error(responseData.message || `Server error: ${response.status}`);
//         }

//         const betDetails = responseData.data;
//         Alert.alert(
//             "✅ Bet Placed Successfully!",
//             `Period: ${betDetails.period}\n` +
//             `Bet: ${betDetails.betType} on ${Array.isArray(betDetails.betValue) ? betDetails.betValue.join(', ') : betDetails.betValue}\n` + // Adjust alert for clarity
//             `Amount: ₹${betDetails.betAmount}`,
//             [{ text: "OK", onPress: () => {
//                 setIsModalVisible(false);
//                 setSelectedOption(null);
//                 setSelectedAmount("₹10");
//                 setSelectedMultiplier("x1");
//             }}]
//         );

//         refreshRounds();
//     } catch (error: any) {
//         console.error("❌ Bet API error:", error);
//         const errorMessage = error.name === 'AbortError' ? "Request timed out. Please try again." : error.message;
//         Alert.alert("Bet Failed", errorMessage);
//         throw error;
//     }
// };

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

//             // CRITICAL FIX: Only accept the official -1 betting round for update
//             if (data?.period && data.gameDuration === 180 && data.period.endsWith("-1")) {

//                 // Only update if the period is NEW (period has changed)
//                 if (data.period !== lastPeriodRef.current) {
//                     console.log(`✨ SOCKET NEW -1 ROUND DETECTED: ${lastPeriodRef.current || 'none'} → ${data.period}`);

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
//                     console.log(`ℹ️ Received 'round:created' for existing -1 period: ${lastPeriodRef.current}`);
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

//         // CRITICAL FIX: Find the current active/scheduled 3-minute game that ends in -1
//         const threeMinGame = currentRounds.find(
//             (game) =>
//             game &&
//             game.gameDuration === 180 &&
//             (game.status === "active" || game.status === "scheduled") &&
//             game.period?.endsWith("-1") // <-- Only accept -1
//         );

//         if (threeMinGame?.period) {
//             const newPeriod = threeMinGame.period;
//             const oldPeriod = lastPeriodRef.current;

//             // Update if: no current period OR the period has changed
//             if (!oldPeriod || newPeriod !== oldPeriod) {
//                 console.log(`🔄 API/CONTEXT -1 PERIOD UPDATE: ${oldPeriod || 'none'} → ${newPeriod}`);
//                 setCurrentPeriod(newPeriod);
//                 lastPeriodRef.current = newPeriod;

//                 // Recalculate timer for this period
//                 const calculatedTime = calculateTimeLeft();
//                 setTimeLeft(calculatedTime);
//             } else {
//                 console.log(`ℹ️ API/CONTEXT -1 period matches current: ${oldPeriod}`);
//             }
//         } else {
//             console.log("❌ No active/scheduled 3-minute game ending in -1 found");
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
//                 <Game1 />
//             </View>
//         </View>
//     );
// };

// export default Min3;

import React, { useState, useEffect, useRef } from "react";
import BetModal from "./Betmodel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import Game1 from "@/Components/GameHistory/Game1";
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
            game.period?.endsWith("-1")
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
        data.period.endsWith("-1") &&
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
        g.period?.endsWith("-1")
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
        <Game1 />
      </View>
    </View>
  );
};

export default Min3;