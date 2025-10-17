// import {
//   View,
//   Text,
//   Image,
//   ImageBackground,
//   TouchableOpacity,
//   Alert,
//   SafeAreaView,
// } from "react-native";
// import React, { useState,useEffect } from "react";
// import RNPickerSelect from "react-native-picker-select";
// import { TextInput } from "react-native-gesture-handler";
// import { useRouter } from "expo-router"; 
// import {
//   GestureHandlerRootView,
//   ScrollView,
// } from "react-native-gesture-handler";
// import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import StstusBar  from "@/Components/StstusBar";

// const WithdrawMoney = () => {
//   const [selectBankDetail, setSelectBankDetail] = useState<string>("");
//   const [amount, setAmount] = useState<string>("");
//   const [login, setLogin] = useState<string>("");
//   const [loading, setLoading] = useState(false);
// const [Balance, setBalance] = useState(0);
//  const router = useRouter();

//   const AddBank = [
//     { label: "Select Bank", value: "" },
//     { label: "State Bank of India", value: "State Bank of India" },
//     { label: "Add New Bank", value: "Add New Bank" },
//   ];

//  const fetchBalance = async () => {
//   try {
//     setLoading(true);
//     const token = await AsyncStorage.getItem("token");

//     if (!token) {
//       console.error("No token found");
//       setLoading(false);
//       return;
//     }

//     const response = await fetch(
//       "https://ctbackend.crobstacle.com/api/wallet/balance",
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
//    useEffect(() => {
//       fetchBalance();
//     }, []);
  

//   const handleWithdraw = async () => {
//     if (!amount || parseFloat(amount) <= 0) {
//       Alert.alert("Invalid Amount", "Please enter a valid withdrawal amount.");
//       return;
//     }
   
    
//     if (!selectBankDetail) {
//       Alert.alert("Invalid Bank", "Please select a bank.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         throw new Error("User not authenticated. Please log in again.");
//       }

//       const response = await fetch("https://ctbackend.crobstacle.com/api/wallet/withdraw", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           amount: parseFloat(amount),
//           password: login,
//           bank: selectBankDetail,
//         }),
//       });

//       const text = await response.text();
//       console.log("Raw API Response:", text);

//       let data: any;
//       try {
//         data = JSON.parse(text);
//       } catch (error) {
//         throw new Error("Invalid JSON response from server");
//       }

//       console.log("Parsed API Response:", data);

//       if (response.ok && data?.success) {
//         Alert.alert("Withdrawal Successful", "Your withdrawal has been processed.");
//         setAmount("");
//         setLogin("");
//         setSelectBankDetail("");
//       } else {
//         Alert.alert("Withdrawal Failed", data?.message || "Something went wrong.");
//       }
//     } catch (error: unknown) {
//       console.error("Withdrawal Error:", error);

//       let errorMessage = "Unable to process withdrawal. Please try again later.";
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
//       <StstusBar />
//       <SafeAreaView className="my-10">
//       <ScrollView>
        
//         {/* Header */}
//         <View className="bg-white flex-row items-center justify-between px-2 py-3">
//           <TouchableOpacity onPress={() => router.back()}>
//                        <Image
//                          className="w-8 h-7"
//                          source={require("../assets/images/left.png")}
//                          resizeMode="center"
//                        />
//                      </TouchableOpacity>
         
//           <Text className="text-xl font-bold">Withdrawal </Text>
//           <Text className="text-sm font-bold">Withdrawal History</Text>
//         </View>

//         {/* Balance Section */}
//         <View className="mx-4">
//           <ImageBackground
//             source={require("../assets/images/bannerbg.png")}
//             resizeMode="cover"
//             className="my-4 rounded-xl overflow-hidden"
//           >
//             <View className="p-4">
//               <View className="flex-row gap-2 items-center">
//                 <Ionicons name="wallet" size={24} color="orange" />
//                 <Text className="font-bold text-white text-lg">Balance</Text>
//               </View>
//               <View className="flex-row gap-2 items-center my-2 pb-20">
//                 <Text className="font-extrabold text-white text-2xl">{`₹${Balance}`}</Text>
//                 <Ionicons name="refresh" size={24} color="white" />
//               </View>
//             </View>
//           </ImageBackground>

//           {/* Bank Selection */}
//           <View>
//             <RNPickerSelect
//               onValueChange={(value) => setSelectBankDetail(value)}
//               items={AddBank}
//               placeholder={{ label: "Select Bank Details...", value: null }}
//               style={bankDetailStyle}
//               value={selectBankDetail}
//             />
//           </View>

//           {/* Amount and Password Fields */}
//           <View className="my-4">
//             <TextInput
//               className="bg-white border rounded-lg my-2 p-4 text-xl font-bold"
//               onChangeText={setAmount}
//               placeholder="₹ | Please Enter the Amount"
//               keyboardType="number-pad"
//               value={amount}
//             />
//             {/* <View className="flex-row items-center gap-2">
//               <Image
//                 className="w-8 h-16"
//                 source={require("../assets/images/padlock.png")}
//                 resizeMode="contain"
//               />
//               <TextInput
//                 className="bg-white border border-gray-300 rounded-lg mt-2 px-8 p-4 text-lg font-bold"
//                 onChangeText={setLogin}
//                 placeholder="Please Enter the Login Password"
//                 secureTextEntry
//                 keyboardType="default"
//                 value={login}
//               />
//             </View> */}
//           </View>

//           {/* Withdraw Button */}
//           <TouchableOpacity
//             className={`p-3 rounded-full my-2 ${loading ? "bg-gray-400" : "bg-green-600"}`}
//             onPress={handleWithdraw}
//             disabled={loading}
//           >
//             <Text className="text-center text-lg font-bold text-white">
//               {loading ? "Processing..." : "Withdrawal"}
//             </Text>
//           </TouchableOpacity>

//           {/* Withdraw Instruction */}
//           <View className="bg-white my-6 p-3 rounded-xl">
//             <View className="flex-row items-center gap-1 mb-2">
//               <Image
//                 className="w-10 h-9"
//                 source={require("../assets/images/book.png")}
//                 resizeMode="center"
//               />
//               <Text className="text-xl font-bold">Withdrawal Instruction</Text>
//             </View>
//             <View className="justify-between my-2">
//               <View className="border border-gray-400 p-3 py-3 rounded-xl">
//                 <Text className="text-gray-500 font-bold mb-2">
//                   • Need to bet 0.00 to be able to Withdraw
//                 </Text>
//                 <Text className="text-gray-500 font-bold mb-2">
//                   • Withdraw time 10:00 AM to 6:00 PM.
//                 </Text>
//                 <Text className="text-gray-500 font-bold mb-2">
//                   • In-Day remaining Withdrawal Times: 3
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// const bankDetailStyle = {
//   inputAndroid: {
//     backgroundColor: "white",
//     borderRadius: 12,
//     marginTop: 14,
//     marginHorizontal: 4,
//   },
// };

// export default WithdrawMoney;
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StstusBar from "@/Components/StstusBar"; 
import { useSocket } from "@/Components/context/SocketContext"; 

// API URL is needed only for the withdrawal action
const API_BASE_URL = "https://ctbackend.crobstacle.com";

// Define the bankDetailStyle using StyleSheet.create for correct TypeScript type inference
const styles = StyleSheet.create({
    bankDetailStyle: {
        backgroundColor: "white",
        borderRadius: 12,
        marginTop: 14,
        marginHorizontal: 4,
        paddingVertical: 10 ,
        paddingHorizontal: 15,
        fontSize: 18,
        fontWeight: '700', 
        color: '#000',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    placeholder: {
        color: '#9ca3af',
    }
});

export default function WithdrawMoney() {
  const {
    balance,         
    isConnected,     
    refreshBalance,  
  } = useSocket();

  const [selectBankDetail, setSelectBankDetail] = useState("");
  const [amount, setAmount] = useState("");
  const [login, setLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false); 
  const router = useRouter();

  const AddBank = [
    { label: "Select Bank", value: "" },
    { label: "State Bank of India", value: "State Bank of India" },
    { label: "Add New Bank", value: "Add New Bank" },
  ];

  const handleManualRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      await refreshBalance(); 
    } catch (error) {
      console.error("Error initiating refresh:", error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500); 
    }
  };

  const handleWithdraw = async () => {
    const withdrawalAmount = parseFloat(amount);
    if (!amount || isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid withdrawal amount.");
      return;
    }

    if (!selectBankDetail) {
      Alert.alert("Invalid Bank", "Please select a bank.");
      return;
    }

    if (balance !== null && withdrawalAmount > balance) {
      Alert.alert(
        "Insufficient Balance",
        `Your current balance (₹${balance.toFixed(2)}) is less than the withdrawal amount (₹${withdrawalAmount.toFixed(2)}).`
      );
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("User not authenticated. Please log in again.");

      const response = await fetch(`${API_BASE_URL}/api/wallet/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: withdrawalAmount,
          password: login,
          bank: selectBankDetail,
        }),
      });

      const rawText = await response.text();
      console.log("Raw API Response:", rawText);

      // Try parse JSON, but don't crash on non-JSON
      let data: any = null;
      let isJson = false;
      try {
        data = JSON.parse(rawText);
        isJson = true;
      } catch {
        isJson = false;
      }

      // Normalize message text to inspect for success keywords
      const messageText = (
        (isJson ? (data?.message ?? "") : rawText) || ""
      ).toString().toLowerCase();

      // Decide whether this looks like a success
      const looksSuccessful =
        (isJson && !!data?.success) ||
        messageText.includes("withdrawal successful") ||
        messageText.includes("withdraw successful") ||
        messageText.includes("withdrawn") ||
        messageText.includes("success");

      // CASE: explicit success (either JSON success flag or message contains success)
      if (response.ok && looksSuccessful) {
        Alert.alert("Withdrawal Successful", (isJson ? data?.message : "Your withdrawal has been processed.") || "Your withdrawal has been processed.");
        setAmount("");
        setLogin("");
        await refreshBalance();
        return;
      }

      // CASE: server returned OK but non-JSON (maybe initiated)
      if (response.ok && !isJson) {
        Alert.alert("Withdrawal Initiated", "Your withdrawal request has been received. Please wait for processing.");
        setAmount("");
        setLogin("");
        await refreshBalance();
        return;
      }

      // CASE: JSON response but success flag false (or no success keywords)
      if (isJson) {
        Alert.alert("Withdrawal Failed", data?.message || `Something went wrong. Server status: ${response.status}`);
        return;
      }

      // CASE: fallback unexpected response
      Alert.alert("Withdrawal Failed", `Unexpected server response. Status: ${response.status}`);
      return;
    } catch (error: unknown) {
      console.error("Withdrawal Error:", error);
      const message = error instanceof Error ? error.message : "Unable to process withdrawal. Please try again later.";
      Alert.alert("Error", message);
      return;
    } finally {
      setLoading(false);
    }
  };

  const displayBalance = 
    balance === null || isRefreshing 
      ? <ActivityIndicator size="small" color="#fff" />
      : `₹${balance.toFixed(2)}`;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StstusBar />
      <SafeAreaView style={{ flex: 1, paddingTop: 38 }}> 
        <ScrollView>
          
          {/* Header */}
          <View className="bg-white flex-row items-center justify-between px-2 py-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                className="w-8 h-7"
                source={require("../assets/images/left.png")}
                resizeMode="center"
              />
            </TouchableOpacity>
          
            <Text className="text-xl font-bold">Withdrawal </Text>
            
            <TouchableOpacity 
                onPress={() => router.push("/Transaction" as unknown as never)} 
            > 
                <Text className="text-sm font-bold text-green-600">Withdrawal History</Text>
            </TouchableOpacity>
          </View>

          {/* Balance Section */}
          <View className="mx-4">
            <ImageBackground
              source={require("../assets/images/bannerbg.png")}
              resizeMode="cover"
              className="my-4 rounded-xl overflow-hidden"
            >
              <View className="p-4">
                <View className="flex-row gap-2 items-center">
                  <Ionicons name="wallet" size={24} color="orange" />
                  <Text className="font-bold text-white text-lg">Balance</Text>
                </View>
                <View className="flex-row gap-2 items-center my-2 pb-20">
                  <Text className="font-extrabold text-white text-2xl">
                    {displayBalance}
                  </Text>
                  <TouchableOpacity
                    onPress={handleManualRefresh}
                    disabled={isRefreshing || !isConnected}
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

            {/* Bank Selection */}
            <View>
              <RNPickerSelect
                onValueChange={(value: string) => setSelectBankDetail(value)}
                items={AddBank}
                placeholder={{ label: "Select Bank Details...", value: null }}
                style={{
                    inputAndroid: styles.bankDetailStyle,
                    placeholder: styles.placeholder,
                }}
                value={selectBankDetail}
              />
              {selectBankDetail === "Add New Bank" && (
                <TouchableOpacity
                    className="mt-2 p-3 bg-blue-500 rounded-lg"
                    onPress={() => Alert.alert("Navigate", "Go to Add New Bank Screen")}
                >
                    <Text className="text-white text-center font-bold">Configure Bank Details</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Amount and Password Fields */}
            <View className="my-4">
              <TextInput
                className="bg-white border rounded-lg my-2 p-4 text-xl font-bold"
                onChangeText={setAmount}
                placeholder="₹ | Please Enter the Amount"
                keyboardType="number-pad"
                value={amount}
              />
            </View>

            {/* Withdraw Button */}
            <TouchableOpacity
              className={`p-3 rounded-full my-2 ${loading ? "bg-gray-400" : "bg-green-600"}`}
              onPress={handleWithdraw}
              disabled={loading}
            >
              <Text className="text-center text-lg font-bold text-white">
                {loading ? "Processing..." : "Withdrawal"}
              </Text>
            </TouchableOpacity>

            {/* Withdraw Instruction */}
            <View className="bg-white my-6 p-3 rounded-xl">
              <View className="flex-row items-center gap-1 mb-2">
                <Image
                  className="w-10 h-9"
                  source={require("../assets/images/book.png")}
                  resizeMode="center"
                />
                <Text className="text-xl font-bold">Withdrawal Instruction</Text>
              </View>
              <View className="justify-between my-2">
                <View className="border border-gray-400 p-3 py-3 rounded-xl">
                  <Text className="text-gray-500 font-bold mb-2">
                    • Need to bet 0.00 to be able to Withdraw
                  </Text>
                  <Text className="text-gray-500 font-bold mb-2">
                    • Withdraw time 10:00 AM to 6:00 PM.
                  </Text>
                  <Text className="text-gray-500 font-bold mb-2">
                    • In-Day remaining Withdrawal Times: 3
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

