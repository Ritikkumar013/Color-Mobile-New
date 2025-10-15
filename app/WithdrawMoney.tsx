import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState,useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router"; 
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StstusBar  from "@/Components/StstusBar";

const WithdrawMoney = () => {
  const [selectBankDetail, setSelectBankDetail] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [loading, setLoading] = useState(false);
const [Balance, setBalance] = useState(0);
 const router = useRouter();

  const AddBank = [
    { label: "Select Bank", value: "" },
    { label: "State Bank of India", value: "State Bank of India" },
    { label: "Add New Bank", value: "Add New Bank" },
  ];

 const fetchBalance = async () => {
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
      fetchBalance();
    }, []);
  

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid withdrawal amount.");
      return;
    }
   
    
    if (!selectBankDetail) {
      Alert.alert("Invalid Bank", "Please select a bank.");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated. Please log in again.");
      }

      const response = await fetch("http://192.154.230.43:3000/api/wallet/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          password: login,
          bank: selectBankDetail,
        }),
      });

      const text = await response.text();
      console.log("Raw API Response:", text);

      let data: any;
      try {
        data = JSON.parse(text);
      } catch (error) {
        throw new Error("Invalid JSON response from server");
      }

      console.log("Parsed API Response:", data);

      if (response.ok && data?.success) {
        Alert.alert("Withdrawal Successful", "Your withdrawal has been processed.");
        setAmount("");
        setLogin("");
        setSelectBankDetail("");
      } else {
        Alert.alert("Withdrawal Failed", data?.message || "Something went wrong.");
      }
    } catch (error: unknown) {
      console.error("Withdrawal Error:", error);

      let errorMessage = "Unable to process withdrawal. Please try again later.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <StstusBar />
      <SafeAreaView className="my-10">
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
          <Text className="text-sm font-bold">Withdrawal History</Text>
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
                <Text className="font-extrabold text-white text-2xl">{`₹${Balance}`}</Text>
                <Ionicons name="refresh" size={24} color="white" />
              </View>
            </View>
          </ImageBackground>

          {/* Bank Selection */}
          <View>
            <RNPickerSelect
              onValueChange={(value) => setSelectBankDetail(value)}
              items={AddBank}
              placeholder={{ label: "Select Bank Details...", value: null }}
              style={bankDetailStyle}
              value={selectBankDetail}
            />
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
            {/* <View className="flex-row items-center gap-2">
              <Image
                className="w-8 h-16"
                source={require("../assets/images/padlock.png")}
                resizeMode="contain"
              />
              <TextInput
                className="bg-white border border-gray-300 rounded-lg mt-2 px-8 p-4 text-lg font-bold"
                onChangeText={setLogin}
                placeholder="Please Enter the Login Password"
                secureTextEntry
                keyboardType="default"
                value={login}
              />
            </View> */}
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

const bankDetailStyle = {
  inputAndroid: {
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 14,
    marginHorizontal: 4,
  },
};

export default WithdrawMoney;
