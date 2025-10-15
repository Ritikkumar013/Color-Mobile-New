// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ImageBackground,
//   SafeAreaView,
//   Alert,
// } from "react-native";

// import React from "react";
// import {
//   Gesture,
//   GestureHandlerRootView,
//   ScrollView,
//   TextInput,
// } from "react-native-gesture-handler";
// import { Ionicons } from "@expo/vector-icons";
// import { useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const AddMoney = () => {
//   const [amount, setAmount] = useState(""); // State to store the deposit amount
//   const [loading, setLoading] = useState(false);
//   const [Balance, setBalance] = useState(0);

// const fetchBalance = async () => {
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
//     fetchBalance();
//   }, []);


//   const handleDeposit = async () => {
//     if (!amount || parseFloat(amount) <= 0) {
//       Alert.alert("Invalid Amount", "Please enter a valid deposit amount.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         throw new Error("User not authenticated. Please log in again.");
//       }

//       const response = await fetch(
//         "http://192.154.230.43:3000/api/wallet/deposit",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             amount: parseFloat(amount),
//           }),
//         }
//       );

//       // Read response as text to prevent JSON parse errors
//       const text = await response.text();
//       console.log("Raw API Response:", text);

//       let data: any;
//       try {
//         data = JSON.parse(text); // Parse only if it's valid JSON
//       } catch (error) {
//         throw new Error("Invalid JSON response from server");
//       }

//       console.log("Parsed API Response:", data);

//       if (response.ok && data?.success) {
//         Alert.alert("Deposit Successful", "Your deposit has been processed.");
//         setAmount(""); // Reset input after success
//       } else {
//         Alert.alert("Deposit Failed", data?.message || "Something went wrong.");
//       }
//     } catch (error: unknown) {
//       console.error("Deposit Error:", error);

//       let errorMessage = "Unable to process deposit. Please try again later.";
//       if (error instanceof Error) {
//         errorMessage = error.message;
//       }

//       Alert.alert("Error", errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <GestureHandlerRootView>
//       <ScrollView>
//         <SafeAreaView>
//           {/* Header */}
//           <View className="bg-white flex-row items-center justify-between px-2 py-3 fixed">
//             <View>
//               <Image
//                 className="w-8 h-7"
//                 source={require("../assets/images/left.png")}
//                 resizeMode="center"
//               />
//             </View>

//             <View className="">
//               <Text className="text-center text-xl font-bold">Deposit</Text>
//             </View>
//             <View>
//               {/* <Text className="text-sm font-bold">Deposit History</Text> */}
//             </View>
//           </View>

//           {/* Section 1 */}
//           <View className="mx-4">
//             <ImageBackground
//               source={require("../assets/images/bannerbg.png")} // Replace with your image path
//               resizeMode="cover"
//               className="my-4 rounded-xl overflow-hidden"
//             >
//               <View className=" my-4  rounded-xl p-4 ">
//                 <View className="  flex-row gap-2 items-center ">
//                   <Ionicons name="wallet" size={24} color="orange" />
//                   <Text className="font-bold text-white text-lg">Balance</Text>
//                 </View>
//                 <View className="flex-row gap-2 items-center my-2 pb-12">
//                   <Text className="font-extrabold text-white text-2xl">
//                   {`₹${Balance}`}
//                   </Text>
//                   <TouchableOpacity>
//                   <Ionicons name="refresh" size={24} color="white" /></TouchableOpacity>
//                 </View>
//               </View>
//             </ImageBackground>

//             {/* Section Upi */}
//             <View className="bg-green-500 rounded-xl w-36 flex-1 justify-center items-center py-7">
//               <Image
//                 className="w-14 h-12"
//                 source={require("../assets/images/upi.png")}
//                 resizeMode="center"
//               />
//             </View>

//             {/* Section 3 */}
//             <View className="bg-white my-4 p-3 rounded-xl">
//               <View className="flex-row items-center gap-1">
//                 <Image
//                   className="w-10 h-9"
//                   source={require("../assets/images/selectr.png")}
//                   resizeMode="center"
//                 />
//                 <Text className="text-xl font-bold">Select Channel</Text>
//               </View>

//               <View className="bg-green-500 w-52 p-5 rounded-xl mt-4 mb-2">
//                 <Text className="font-bold text-lg text-white mb-2">
//                   Fast pay
//                 </Text>
//                 <Text className="text-white font-bold text-md">
//                   Balance: 350 - 200k
//                 </Text>
//               </View>
//             </View>

//             {/* Section 4 */}
//             <View className="bg-white my-4 p-3 rounded-xl">
//               <View className="flex-row items-center gap-1 mb-2">
//                 <Image
//                   className="w-10 h-9"
//                   source={require("../assets/images/deposita.png")}
//                   resizeMode="center"
//                 />
//                 <Text className="text-xl font-bold">Deposit Amount</Text>
//               </View>

//               <View className="flex-row justify-between my-2 gap-2">
//                 <TouchableOpacity
//                   className="border border-gray-400 p-2 px-7 rounded-xl"
//                   onPress={() => setAmount("350")}
//                 >
//                   <Text className="text-green-600 text-lg font-bold">
//                     ₹ 350
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   className="border border-gray-400 p-2 px-7 rounded-xl"
//                   onPress={() => setAmount("1000")}
//                 >
//                   <Text className="text-green-600 text-lg font-bold">
//                     ₹ 1000
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   className="border border-gray-400 p-2 px-6 rounded-xl"
//                   onPress={() => setAmount("2000")}
//                 >
//                   <Text className="text-green-600 text-lg font-bold">
//                     ₹ 2000
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               <View className="flex-row justify-between my-2 gap-2">
//                 <TouchableOpacity
//                   className="border border-gray-400 p-2 px-6 rounded-xl"
//                   onPress={() => setAmount("5000")}
//                 >
//                   <Text className="text-green-600 text-lg font-bold">
//                     ₹ 5000
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   className="border border-gray-400 p-2 px-5 rounded-xl"
//                   onPress={() => setAmount("10000")}
//                 >
//                   <Text className="text-green-600 text-lg font-bold">
//                     ₹ 10000
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   className="border border-gray-400 p-2 px-5 rounded-xl"
//                   onPress={() => setAmount("20000")}
//                 >
//                   <Text className="text-green-600 text-lg font-bold">
//                     ₹ 20000
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               <View className="flex-row justify-between my-2 gap-2">
//                 <TouchableOpacity
//                   className="border border-gray-400 p-2 px-5 rounded-xl"
//                   onPress={() => setAmount("25000")}
//                 >
//                   <Text className="text-green-600 text-lg font-bold">
//                     ₹ 25000
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   className="border border-gray-400 p-2 px-5 rounded-xl"
//                   onPress={() => setAmount("75000")}
//                 >
//                   <Text className="text-green-600 text-lg font-bold">
//                     ₹ 75000
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   className="border border-gray-400 p-2 px-4 rounded-xl"
//                   onPress={() => setAmount("100000")}
//                 >
//                   <Text className="text-green-600 text-lg font-bold">
//                     ₹ 100000
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               <TextInput
//                 className="bg-green-100 rounded-xl my-4 p-3 text-lg font-bold border-l-2"
//                 placeholder="₹ | Enter or select recharge amount"
//                 keyboardType="number-pad"
//                 value={amount}
//                 onChangeText={setAmount}
//               ></TextInput>

//               <TouchableOpacity
//                 className={`p-3 rounded-full my-2 ${
//                   loading ? "bg-gray-400" : "bg-green-500"
//                 }`}
//                 onPress={handleDeposit}
//                 disabled={loading}
//               >
//                 <Text className="text-white text-xl font-extrabold text-center">
//                   {loading ? "Processing..." : "Deposit"}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* Section 5 */}
//             <View className="bg-white my-4 p-3 rounded-xl">
//               <View className="flex-row items-center gap-1 mb-2">
//                 <Image
//                   className="w-10 h-9"
//                   source={require("../assets/images/book.png")}
//                   resizeMode="center"
//                 />
//                 <Text className="text-xl font-bold">Deposit Instruction</Text>
//               </View>

//               <View className="justify-between my-2">
//                 <View className="border border-gray-400 p-3 py-5 rounded-xl">
//                   <Text className="text-gray-500 font-bold mb-2">
//                     • Dont Save Old Qr Code or Upi Id From Recharge Page.
//                   </Text>
//                   <Text className="text-gray-500 font-bold mb-2">
//                     • Always Pay On Active Qr Code or Upi ID.
//                   </Text>
//                   <Text className="text-gray-500 font-bold mb-2">
//                     • Contact On Telegram Or create support Ticket If your
//                     Getting Any Problem.
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </SafeAreaView>
//       </ScrollView>
//     </GestureHandlerRootView>
//   );
// };

// export default AddMoney;

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Alert,
  ActivityIndicator, 
} from "react-native";
import React, { useState } from "react";
import {
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; 
import { useSocket } from "@/app/context/SocketContext"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import  StstusBar  from "@/Components/StstusBar";
// API URL is only needed for the deposit action
const API_BASE_URL = "http://192.154.230.43:3000";

const AddMoney = () => {
  const router = useRouter();
  
  // Use state and functions from the global context
  const { 
    balance: currentBalance, 
    refreshBalance, 
    isConnected 
  } = useSocket();

  const [amount, setAmount] = useState(""); // State to store the deposit amount
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false); // Local loading for manual refresh
  
  
  // Handle manual balance refresh
  const handleManualRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      // Call the unified refresh function from the context
      await refreshBalance(); 
    } catch (error) {
      console.error("Error initiating refresh:", error);
      Alert.alert("Error", "Could not initiate balance refresh.");
    } finally {
      // Small timeout to allow the spinner to show for a brief moment
      setTimeout(() => setIsRefreshing(false), 500); 
    }
  };

const handleDeposit = async () => {
  if (!amount || parseFloat(amount) <= 0) {
    Alert.alert("Invalid Amount", "Please enter a valid deposit amount.");
    return;
  }

  setLoading(true);
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("User not authenticated. Please log in again.");

    const response = await fetch(`${API_BASE_URL}/api/wallet/deposit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: parseFloat(amount) }),
    });

    const rawText = await response.text();
    console.log("Raw API Response:", rawText);

    let data: any = null;
    let isJson = false;

    try {
      data = JSON.parse(rawText);
      isJson = true;
    } catch {
      isJson = false;
    }

    // ✅ Fix: Smart detection for success text
    const messageText =
      (isJson ? data?.message : rawText)?.toLowerCase?.() || "";

    const looksSuccessful =
      (isJson && data?.success) ||
      messageText.includes("deposit successful") ||
      messageText.includes("success");

    if (looksSuccessful && response.ok) {
      Alert.alert("Deposit Successful", "Your deposit has been processed successfully.");
      setAmount("");
      await refreshBalance();
      return;
    }

    if (!isJson && response.ok) {
      Alert.alert("Deposit Initiated", "Redirecting to payment gateway...");
      setAmount("");
      await refreshBalance();
      return;
    }

    Alert.alert("Deposit Failed", data?.message || "Something went wrong during deposit.");
    return;

  } catch (error: unknown) {
    console.error("Deposit Error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to process deposit. Please try again later.";
    Alert.alert("Error", message);
  } finally {
    setLoading(false);
  }
};


  return (
    <GestureHandlerRootView>
      <StstusBar />
      <ScrollView>
        <SafeAreaView>
        {/* Status Bar */}
       
          {/* Header with Back Button Fix */}
          <View className="bg-white flex-row items-center justify-between px-2 py-3 mt-10">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                className="w-8 h-7"
                source={require("../assets/images/left.png")}
                resizeMode="center"
              />
            </TouchableOpacity>

            <View className="">
              <Text className="text-center text-xl font-bold">Deposit</Text>
            </View>
            <View>
              {/* Optional: Add Deposit History Link here if needed */}
            </View>
          </View>

          {/* Section 1 - Balance Display */}
          <View className="mx-4">
            <ImageBackground
              source={require("../assets/images/bannerbg.png")}
              resizeMode="cover"
              className="my-4 rounded-xl overflow-hidden"
            >
              <View className=" my-4 rounded-xl p-4 ">
                <View className=" flex-row gap-2 items-center ">
                  <Ionicons name="wallet" size={24} color="orange" />
                  <Text className="font-bold text-white text-lg">Balance</Text>
                </View>
                <View className="flex-row gap-2 items-center my-2 pb-12">
                  <Text className="font-extrabold text-white text-2xl">
                    {/* Display context balance, use toFixed(2) for Indian Rupees format */}
                    {currentBalance !== null ? `₹${currentBalance.toFixed(2)}` : "₹--"}
                  </Text>
                  <TouchableOpacity
                    onPress={handleManualRefresh}
                    disabled={isRefreshing || !isConnected} // Disable if refreshing or disconnected
                  >
                    {isRefreshing ? (
                       <ActivityIndicator size="small" color="white" />
                    ) : (
                       <Ionicons name="refresh" size={24} color="white" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>

            {/* Section Upi */}
            <View className="bg-green-500 rounded-xl w-36 flex-1 justify-center items-center py-7">
              <Image
                className="w-14 h-12"
                source={require("../assets/images/upi.png")}
                resizeMode="center"
              />
            </View>

            {/* Section 3 */}
            <View className="bg-white my-4 p-3 rounded-xl">
              <View className="flex-row items-center gap-1">
                <Image
                  className="w-10 h-9"
                  source={require("../assets/images/selectr.png")}
                  resizeMode="center"
                />
                <Text className="text-xl font-bold">Select Channel</Text>
              </View>

              <View className="bg-green-500 w-52 p-5 rounded-xl mt-4 mb-2">
                <Text className="font-bold text-lg text-white mb-2">
                  Fast pay
                </Text>
                <Text className="text-white font-bold text-md">
                  Balance: 350 - 200k
                </Text>
              </View>
            </View>

            {/* Section 4 */}
            <View className="bg-white my-4 p-3 rounded-xl">
              <View className="flex-row items-center gap-1 mb-2">
                <Image
                  className="w-10 h-9"
                  source={require("../assets/images/deposita.png")}
                  resizeMode="center"
                />
                <Text className="text-xl font-bold">Deposit Amount</Text>
              </View>

              {/* Amount selection buttons */}
              <View className="flex-row justify-between my-2 gap-2">
                <TouchableOpacity
                  className="border border-gray-400 p-2 px-7 rounded-xl"
                  onPress={() => setAmount("350")}
                >
                  <Text className="text-green-600 text-lg font-bold">
                    ₹ 350
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="border border-gray-400 p-2 px-7 rounded-xl"
                  onPress={() => setAmount("1000")}
                >
                  <Text className="text-green-600 text-lg font-bold">
                    ₹ 1000
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="border border-gray-400 p-2 px-6 rounded-xl"
                  onPress={() => setAmount("2000")}
                >
                  <Text className="text-green-600 text-lg font-bold">
                    ₹ 2000
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-between my-2 gap-2">
                <TouchableOpacity
                  className="border border-gray-400 p-2 px-6 rounded-xl"
                  onPress={() => setAmount("5000")}
                >
                  <Text className="text-green-600 text-lg font-bold">
                    ₹ 5000
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="border border-gray-400 p-2 px-5 rounded-xl"
                  onPress={() => setAmount("10000")}
                >
                  <Text className="text-green-600 text-lg font-bold">
                    ₹ 10000
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="border border-gray-400 p-2 px-5 rounded-xl"
                  onPress={() => setAmount("20000")}
                >
                  <Text className="text-green-600 text-lg font-bold">
                    ₹ 20000
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-between my-2 gap-2">
                <TouchableOpacity
                  className="border border-gray-400 p-2 px-5 rounded-xl"
                  onPress={() => setAmount("25000")}
                >
                  <Text className="text-green-600 text-lg font-bold">
                    ₹ 25000
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="border border-gray-400 p-2 px-5 rounded-xl"
                  onPress={() => setAmount("75000")}
                >
                  <Text className="text-green-600 text-lg font-bold">
                    ₹ 75000
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="border border-gray-400 p-2 px-4 rounded-xl"
                  onPress={() => setAmount("100000")}
                >
                  <Text className="text-green-600 text-lg font-bold">
                    ₹ 100000
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                className="bg-green-100 rounded-xl my-4 p-3 text-lg font-bold border-l-2"
                placeholder="₹ | Enter or select recharge amount"
                keyboardType="number-pad"
                value={amount}
                onChangeText={setAmount}
              ></TextInput>

              <TouchableOpacity
                className={`p-3 rounded-full my-2 ${
                  loading ? "bg-gray-400" : "bg-green-500"
                }`}
                onPress={handleDeposit}
                disabled={loading}
              >
                <Text className="text-white text-xl font-extrabold text-center">
                  {loading ? "Processing..." : "Deposit"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Section 5 */}
            <View className="bg-white my-4 p-3 rounded-xl">
              <View className="flex-row items-center gap-1 mb-2">
                <Image
                  className="w-10 h-9"
                  source={require("../assets/images/book.png")}
                  resizeMode="center"
                />
                <Text className="text-xl font-bold">Deposit Instruction</Text>
              </View>

              <View className="justify-between my-2">
                <View className="border border-gray-400 p-3 py-5 rounded-xl">
                  <Text className="text-gray-500 font-bold mb-2">
                    • Dont Save Old Qr Code or Upi Id From Recharge Page.
                  </Text>
                  <Text className="text-gray-500 font-bold mb-2">
                    • Always Pay On Active Qr Code or Upi ID.
                  </Text>
                  <Text className="text-gray-500 font-bold mb-2">
                    • Contact On Telegram Or create support Ticket If your
                    Getting Any Problem.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default AddMoney;