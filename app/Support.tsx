// import { View, Text, TouchableOpacity } from "react-native";
// import React, { useState } from "react";
// import { TextInput } from "react-native";
// import RNPickerSelect from "react-native-picker-select";
// import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

// const Support = () => {
//   const [name, setName] = useState<string>("");
//   const [number, setNumber] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const [selectedQuery, setSelectedQuery] = useState<string>("");

//   const queries = [
//     { label: "Consult", value: "Consult" },
//     { label: "Recharge Problem", value: "Recharge Problem" },
//     { label: "Withdraw Problem", value: "Withdraw Problem" },
//     { label: "Game Problem", value: "Game Problem" },
//     { label: "Other", value: "Other" },
//   ];

//   return (
//     <GestureHandlerRootView>
//     <ScrollView className="p-5">
//       <View className="mb-3">
//         <Text className="text-lg font-bold">Enter your full name</Text>
//         <TextInput
//           className="bg-white border border-black rounded-lg my-2 p-2"
//           onChangeText={setName}
//           placeholder="Enter your name"
//           keyboardType="default"
//           value={name}
//         />
//       </View>

//       <View className="mb-3">
//         <Text className="text-lg font-bold">Enter your Query Type</Text>
//         <View className="bg-white border border-black rounded-lg my-2">
//           <RNPickerSelect
          
//             onValueChange={(value) => setSelectedQuery(value)}
//             items={queries}
//             placeholder={{ label: "Select a query type...", value: null }}
//             style={pickerSelectStyles}
//           />
//         </View>
//       </View>

//       <View className="mb-3">
//         <Text className="text-lg font-bold">Enter your WhatsApp Number</Text>
//         <TextInput
//           className="bg-white border border-black rounded-lg my-2 p-2"
//           onChangeText={setNumber}
//           placeholder="Enter 10-digit WhatsApp number"
//           keyboardType="number-pad"
//           value={number}
//         />
//       </View>

//       <View className=""> 
//         <Text className="text-lg font-bold">Your Message</Text>
//         <TextInput
//           className="bg-white border pb-14 border-black rounded-lg my-2 p-2"
//           onChangeText={setMessage}
//           placeholder="Enter your message"
//           keyboardType="default"
//           value={message}
//           multiline
//         />
//       </View>

//       <View className="my-5 items-center">
//         <TouchableOpacity className="bg-green-500 p-3 w-full rounded-full">
//           <Text className="text-center text-white">Send Message</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//     </GestureHandlerRootView>
//   );
// };

// // Picker styles (since Tailwind doesn’t work on RNPickerSelect)
// const pickerSelectStyles = {
//   inputIOS: {
//     fontSize: 16,
//     borderRadius: 4,
//     color: "black",
//   },
//   inputAndroid: {
//     fontSize: 16,
//     color: "black",
//   },
// };

// export default Support;


import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StstusBar from "@/Components/StstusBar";

const Support = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [token, setToken] = useState("");

  const queries = [
    { label: "Consult", value: "consult" },
    { label: "Recharge Problem", value: "recharge" },
    { label: "Withdraw Problem", value: "withdraw" },
    { label: "Game Problem", value: "game" },
    { label: "Other", value: "other" },
  ];

  // ✅ Fetch token from AsyncStorage
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Failed to load token", error);
      }
    };

    fetchToken();
  }, []);

  // ✅ API Submit Handler
  const handleSubmit = async () => {
    if (!name || !number || !message || !selectedQuery) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return;
    }

    try {
      const response = await fetch("http://192.154.230.43:3000/api/queries/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token
        },
        body: JSON.stringify({
          name,
          number,
          queryType: selectedQuery,
          message,
        }),
      });

      const json = await response.json();

      if (response.ok && json.status === "success") {
        Alert.alert("Success", "Message sent successfully!");
        setName("");
        setNumber("");
        setMessage("");
        setSelectedQuery("");
      } else {
        console.error("Server error:", json);
        Alert.alert("Error", "Something went wrong. Try again.");
      }
    } catch (err) {
      console.error("API error:", err);
      Alert.alert("Network Error", "Failed to send message.");
    }
  };

  return (
    <GestureHandlerRootView>
      <StstusBar />
      <ScrollView className="p-5 mt-10">
        <View className="mb-3">
          <Text className="text-lg font-bold">Enter your full name</Text>
          <TextInput
            className="bg-white border border-black rounded-lg my-2 p-2"
            onChangeText={setName}
            placeholder="Enter your name"
            keyboardType="default"
            value={name}
          />
        </View>

        <View className="mb-3">
          <Text className="text-lg font-bold">Enter your Query Type</Text>
          <View className="bg-white border border-black rounded-lg my-2">
            <RNPickerSelect
              onValueChange={setSelectedQuery}
              items={queries}
              placeholder={{ label: "Select a query type...", value: null }}
              style={pickerSelectStyles}
              value={selectedQuery}
            />
          </View>
        </View>

        <View className="mb-3">
          <Text className="text-lg font-bold">Enter your WhatsApp Number</Text>
          <TextInput
            className="bg-white border border-black rounded-lg my-2 p-2"
            onChangeText={setNumber}
            placeholder="Enter 10-digit WhatsApp number"
            keyboardType="number-pad"
            value={number}
            maxLength={10}
          />
        </View>

        <View>
          <Text className="text-lg font-bold">Your Message</Text>
          <TextInput
            className="bg-white border pb-14 border-black rounded-lg my-2 p-2"
            onChangeText={setMessage}
            placeholder="Enter your message"
            keyboardType="default"
            value={message}
            multiline
          />
        </View>

        <View className="my-5 items-center">
          <TouchableOpacity
            className="bg-green-500 p-3 w-full rounded-full"
            onPress={handleSubmit}
          >
            <Text className="text-center text-white">Send Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

// Picker styles (since Tailwind doesn’t work on RNPickerSelect)
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "black",
  },
};

export default Support;
