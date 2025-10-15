// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { Link } from "expo-router";
// import Svg, { Circle } from "react-native-svg";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { StatusBar as RNStatusBar } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const WalletPage = () => {
//   const totalLimit = 200000;
//   const [Balance, setBalance] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const progressPercentage = (Balance / totalLimit) * 100;
//   const progressColor = "green";

//   // Circular progress settings
//   const strokeWidth = 10;
//   const radius = 50;
//   const circumference = 2 * Math.PI * radius;
//   const progressStrokeDashoffset =
//     circumference - (progressPercentage / 100) * circumference;

//   // Function to fetch wallet balance from API
//    const fetchWalletBalance = async () => {
//   try {
//     setLoading(true);
//     const token = await AsyncStorage.getItem("token");

//     if (!token) {
//       console.error("No token found");
//       setLoading(false);
//       return;
//     }

//     const response = await fetch(
//       "http://192.154.230.43:3000/api/wallet/balance",
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const data = await response.json();
//     console.log("API Response:", data); // Debugging

//     if (
//       data.status === "success" &&
//       data.data &&
//       data.data.balance !== undefined
//     ) {
//       // Fix floating point precision issues and round to 2 decimal places
//       const roundedBalance = Math.round(data.data.balance * 100) / 100;
//       setBalance(roundedBalance);
//     } else {
//       console.error("Failed to fetch balance:", data.message);
//     }
//   } catch (error) {
//     console.error("Error fetching balance:", error);
//   } finally {
//     setLoading(false);
//   }
// };
//   useEffect(() => {
//     fetchWalletBalance();
//   }, []);

//   return (
//     <ScrollView className="bg-gray-100">
//       <StatusBar style="auto" backgroundColor="#22c55e" />
                 
//                  {/* Custom Status Bar Background - This creates the green background behind status bar */}
//                  <View 
//                    className="bg-green-500"
//                    style={{ 
//                      height: RNStatusBar.currentHeight,
//                      position: 'absolute',
//                      top: 0,
//                      left: 0,
//                      right: 0,
//                      zIndex: 1
//                    }} 
//                  />
           
//       <View className="my-4">
        
//         <View className="bg-green-500 p-5 items-center pb-3">
//           <Text className="text-3xl text-white py-3 font-extrabold">
//             Wallet
//           </Text>
//           <Ionicons className="my-2" name="wallet" size={40} color="white" />
//           <View className="items-center my-2">
//             {loading ? (
//               <ActivityIndicator size="large" color="#fff" />
//             ) : (
//               <>
//                 <Text className="text-white text-xl">{`₹${Balance}`}</Text>
//                 <Text className="text-white text-xl font-bold">
//                   Total Amount
//                 </Text>
//               </>
//             )}
//           </View>
//         </View>

//         {/* Circular Progress Bar */}
//         <View className="items-center my-8">
//           <View>
//             <Svg
//               width={radius * 2 + strokeWidth * 2}
//               height={radius * 2 + strokeWidth * 2}
//               className="absolute"
//             >
//               {/* Background Circle */}
//               <Circle
//                 cx={radius + strokeWidth}
//                 cy={radius + strokeWidth}
//                 r={radius}
//                 stroke="#e5e7eb"
//                 strokeWidth={strokeWidth}
//                 fill="none"
//               />
//               {/* Progress Circle */}
//               <Circle
//                 cx={radius + strokeWidth}
//                 cy={radius + strokeWidth}
//                 r={radius}
//                 stroke={progressColor}
//                 strokeWidth={strokeWidth}
//                 fill="none"
//                 strokeDasharray={circumference}
//                 strokeDashoffset={progressStrokeDashoffset}
//                 strokeLinecap="round"
//                 rotation="-90"
//                 origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}
//               />
//             </Svg>
//             {/* Center Percentage Text */}
//             <View
//               style={{
//                 position: "absolute",
//                 left: strokeWidth,
//                 right: strokeWidth,
//                 top: strokeWidth,
//                 bottom: strokeWidth,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Text className="text-2xl font-bold">{`${progressPercentage.toFixed(
//                 0
//               )}%`}</Text>
//             </View>
//           </View>
//         </View>

//         <View className="items-center mx-4">
//           {loading ? (
//             <ActivityIndicator size="large" color="green" />
//           ) : (
//             <>
//               <Text className="text-md font-bold">{`Current Balance: ₹${Balance}`}</Text>
//               <TouchableOpacity className="items-center w-full bg-green-600 p-3 rounded-full my-3">
//                 <Text className="text-lg text-white font-bold">
//                   Add To Wallet
//                 </Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </View>

//         {/* Feature Buttons Section */}
//         <View className="mx-4 my-14">
//           <View className="flex-row justify-between gap-2">
//             <Link href="/AddMoney">
//               <View className="items-center gap-3">
//                 <Ionicons
//                   className="bg-white rounded-xl p-1 shadow-xl"
//                   name="wallet"
//                   size={35}
//                   color="orange"
//                 />
//                 <View className="items-center">
//                   <Text className="text-sm font-bold">Add</Text>
//                   <Text className="text-sm font-bold">Money</Text>
//                 </View>
//               </View>
//             </Link>
//             <Link href="/WithdrawMoney">
//               <View className="items-center gap-3">
//                 <Ionicons
//                   className="bg-white rounded-xl p-1 shadow-xl"
//                   name="wallet"
//                   size={35}
//                   color="blue"
//                 />
//                 <View className="items-center">
//                   <Text className="text-sm font-bold">Withdrawal</Text>
//                   <Text className="text-sm font-bold">Money</Text>
//                 </View>
//               </View>
//             </Link>
//             <Link href="/Transaction">
//               <View className="items-center gap-3">
//                 <Ionicons
//                   className="bg-white rounded-xl p-1 shadow-xl"
//                   name="wallet"
//                   size={35}
//                   color="red"
//                 />
//                 <View className="items-center">
//                   <Text className="text-sm font-bold">Deposit</Text>
//                   <Text className="text-sm font-bold">History</Text>
//                 </View>
//               </View>
//             </Link>

//             <Link href="/Transaction">
//               <View className="items-center gap-3">
//                 <Ionicons
//                   className="bg-white rounded-xl p-1 shadow-xl"
//                   name="wallet"
//                   size={35}
//                   color="yellow"
//                 />
//                 <View className="items-center">
//                   <Text className="text-sm font-bold">Withdrawal</Text>
//                   <Text className="text-sm font-bold">History</Text>
//                 </View>
//               </View>
//             </Link>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default WalletPage;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import Svg, { Circle } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StatusBar as RNStatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WalletPage = () => {
  const totalLimit = 200000;
  const [Balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const progressPercentage = (Balance / totalLimit) * 100;
  const progressColor = "green";

  // Circular progress settings
  const strokeWidth = 10;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressStrokeDashoffset =
    circumference - (progressPercentage / 100) * circumference;

  // Function to fetch wallet balance from API
  const fetchWalletBalance = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://192.154.230.43:3000/api/wallet/balance",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("API Response:", data); // Debugging

      if (
        data.status === "success" &&
        data.data &&
        data.data.balance !== undefined
      ) {
        // Fix floating point precision issues and round to 2 decimal places
        const roundedBalance = Math.round(data.data.balance * 100) / 100;
        setBalance(roundedBalance);
      } else {
        console.error("Failed to fetch balance:", data.message);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  return (
    <ScrollView className="bg-gray-100">
      <StatusBar style="auto" backgroundColor="#22c55e" />
                 
      {/* Custom Status Bar Background - This creates the green background behind status bar */}
      <View 
        className="bg-green-500"
        style={{ 
          height: RNStatusBar.currentHeight,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1
        }} 
      />
           
      <View className="my-4">
        
        <View className="bg-green-500 p-5 items-center pb-3">
          <Text className="text-3xl text-white py-3 font-extrabold">
            Wallet
          </Text>
          <Ionicons className="my-2" name="wallet" size={40} color="white" />
          <View className="items-center my-2">
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <>
                <Text className="text-white text-xl">{`₹${Balance}`}</Text>
                <Text className="text-white text-xl font-bold">
                  Total Amount
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Circular Progress Bar */}
        <View className="items-center my-8">
          <View>
            <Svg
              width={radius * 2 + strokeWidth * 2}
              height={radius * 2 + strokeWidth * 2}
              className="absolute"
            >
              {/* Background Circle */}
              <Circle
                cx={radius + strokeWidth}
                cy={radius + strokeWidth}
                r={radius}
                stroke="#e5e7eb"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Progress Circle */}
              <Circle
                cx={radius + strokeWidth}
                cy={radius + strokeWidth}
                r={radius}
                stroke={progressColor}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={progressStrokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}
              />
            </Svg>
            {/* Center Percentage Text */}
            <View
              style={{
                position: "absolute",
                left: strokeWidth,
                right: strokeWidth,
                top: strokeWidth,
                bottom: strokeWidth,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text className="text-2xl font-bold">{`${progressPercentage.toFixed(
                0
              )}%`}</Text>
            </View>
          </View>
        </View>

        <View className="items-center mx-4">
          {loading ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <>
              <Text className="text-md font-bold">{`Current Balance: ₹${Balance}`}</Text>
              <Link href="/AddMoney" asChild>
                <TouchableOpacity className="items-center w-full bg-green-600 p-3 rounded-full my-3">
                  <Text className="text-lg text-white font-bold">
                    Add To Wallet
                  </Text>
                </TouchableOpacity>
              </Link>
            </>
          )}
        </View>

        {/* Feature Buttons Section */}
        <View className="mx-4 my-14">
          <View className="flex-row justify-between gap-2">
            {/* Add Money */}
            <Link href="/AddMoney" asChild>
              <TouchableOpacity className="items-center gap-3 flex-1">
                <View className="bg-white rounded-xl p-2 shadow-xl items-center justify-center w-16 h-16">
                  <FontAwesome5 name="plus-circle" size={32} color="#22c55e" />
                </View>
                <View className="items-center">
                  <Text className="text-sm font-bold text-gray-800">Add</Text>
                  <Text className="text-sm font-bold text-gray-800">Money</Text>
                </View>
              </TouchableOpacity>
            </Link>

            {/* Withdrawal Money */}
            <Link href="/WithdrawMoney" asChild>
              <TouchableOpacity className="items-center gap-3 flex-1">
                <View className="bg-white rounded-xl p-2 shadow-xl items-center justify-center w-16 h-16">
                  <FontAwesome5 name="minus-circle" size={32} color="#ef4444" />
                </View>
                <View className="items-center">
                  <Text className="text-sm font-bold text-gray-800">Withdrawal</Text>
                  <Text className="text-sm font-bold text-gray-800">Money</Text>
                </View>
              </TouchableOpacity>
            </Link>

            {/* Deposit History */}
            <Link href="/Transaction" asChild>
              <TouchableOpacity className="items-center gap-3 flex-1">
                <View className="bg-white rounded-xl p-2 shadow-xl items-center justify-center w-16 h-16">
                  <MaterialIcons name="trending-up" size={32} color="#3b82f6" />
                </View>
                <View className="items-center">
                  <Text className="text-sm font-bold text-gray-800">Deposit</Text>
                  <Text className="text-sm font-bold text-gray-800">History</Text>
                </View>
              </TouchableOpacity>
            </Link>

            {/* Withdrawal History */}
            <Link href="/Transaction" asChild>
              <TouchableOpacity className="items-center gap-3 flex-1">
                <View className="bg-white rounded-xl p-2 shadow-xl items-center justify-center w-16 h-16">
                  <MaterialIcons name="trending-down" size={32} color="#f59e0b" />
                </View>
                <View className="items-center">
                  <Text className="text-sm font-bold text-gray-800">Withdrawal</Text>
                  <Text className="text-sm font-bold text-gray-800">History</Text>
                </View>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        
      </View>
    </ScrollView>
  );
};

export default WalletPage;