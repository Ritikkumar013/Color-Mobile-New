// import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
// import React, { useState, useRef } from "react";
// import { useRouter } from "expo-router";
// import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
// import { SafeAreaView } from "react-native-safe-area-context";

// const OtpScreen = () => {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [phoneNumber, setPhoneNumber] = useState(""); // Assume number is passed from login
//   const router = useRouter();

//   const inputsRef = Array(4).fill(null).map(() => useRef(null));

//   const handleOtpChange = ( value, index) => {
//     if (value.length > 1) return; // Prevent more than one character per input

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Automatically move to the next input
//     if (value && index < otp.length - 1) {
//       inputsRef[index + 1]?.current?.focus();
//     }
//   };

//   const handleVerifyOtp = async () => {
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length !== 4) {
//       Alert.alert("Error", "Please enter a valid 4-digit OTP");
//       return;
//     }

//     try {
//       const response = await fetch("http://192.154.230.43:3000/api/auth/verifyOtp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           number: phoneNumber,
//           otp: enteredOtp,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "OTP verification failed");
//       }

//       Alert.alert("Success", "OTP Verified!");
//       console.log("API Response:", data);
//     } catch (error) {
//       Alert.alert("Verification Failed", error.message);
//     }
//   };

//   return (
//     <GestureHandlerRootView>
//         <SafeAreaView>
//       <ScrollView>
//         <View className="bg-[#4CAF50]">
//           <View className="items-center">
//             <Image className="w-32 h-12" source={require("../assets/images/headerlogo.png")} resizeMode="contain" />
//           </View>
//           <View className="mx-4 my-7">
//             <Text className="text-white text-lg font-extrabold">OTP Verification</Text>
//             <Text className="text-white text-sm font-extrabold">
//               Enter the 4-digit OTP sent to your phone
//             </Text>
//           </View>
//         </View>

//         <View className="mx-4 mt-4">
//           <View className="flex-row items-center">
//             <Image className="w-9 h-16" source={require("../assets/images/telephone.png")} resizeMode="contain" />
//             <Text className="font-bold text-lg">Phone number</Text>
//           </View>
//           <TextInput
//             className="bg-white rounded-md p-3"
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//             placeholder="Enter phone number"
//             keyboardType="phone-pad"
//           />
//         </View>

//         <View className="mx-4 mt-4">
//           <View className="flex-row items-center">
//             <Image className="w-8 h-16" source={require("../assets/images/otp.png")} resizeMode="contain" />
//             <Text className="font-bold text-lg">Enter OTP</Text>
//           </View>
//           <View className="flex-row justify-between mt-2">
//             {otp.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 ref={inputsRef[index]}
//                 className="w-12 h-12 bg-white text-center text-lg font-bold rounded-md"
//                 value={digit}
//                 onChangeText={(value) => handleOtpChange(value, index)}
//                 keyboardType="numeric"
//                 maxLength={1}
//                 returnKeyType="next"
//                 onKeyPress={({ nativeEvent }) => {
//                   if (nativeEvent.key === "Backspace" && !digit && index > 0) {
//                     inputsRef[index - 1]?.current?.focus();
//                   }
//                 }}
//               />
//             ))}
//           </View>
//         </View>

//         <TouchableOpacity onPress={() => console.log("Resend OTP")} className="mt-4 mx-4">
//           <Text className="text-green-600 text-center font-bold">Resend OTP</Text>
//         </TouchableOpacity>

//         <View className="mx-4 my-7">
//           <TouchableOpacity onPress={handleVerifyOtp} className="w-full items-center bg-green-600 p-3 rounded-full">
//             <Text className="text-white text-xl font-bold">Verify OTP</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// export default OtpScreen;



import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const OtpScreen = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // Assume number is passed from login
  const router = useRouter();

  const inputsRef = Array(4).fill(null).map(() => useRef<TextInput>(null));

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return; // Prevent more than one character per input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input
    if (value && index < otp.length - 1) {
      inputsRef[index + 1]?.current?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      Alert.alert("Error", "Please enter a valid 4-digit OTP");
      return;
    }

    try {
      const response = await fetch("http://192.154.230.43:3000/api/auth/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: phoneNumber,
          otp: enteredOtp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      Alert.alert("Success", "OTP Verified!");
      console.log("API Response:", data);
    } catch (error) {
      Alert.alert("Verification Failed", (error as Error).message);
    }
  };

  return (
    <GestureHandlerRootView>
        <SafeAreaView>
      <ScrollView>
        <View className="bg-[#4CAF50]">
          <View className="items-center">
            <Image className="w-32 h-12" source={require("../assets/images/headerlogo.png")} resizeMode="contain" />
          </View>
          <View className="mx-4 my-7">
            <Text className="text-white text-lg font-extrabold">OTP Verification</Text>
            <Text className="text-white text-sm font-extrabold">
              Enter the 4-digit OTP sent to your phone
            </Text>
          </View>
        </View>

        <View className="mx-4 mt-4">
          <View className="flex-row items-center">
            <Image className="w-9 h-16" source={require("../assets/images/telephone.png")} resizeMode="contain" />
            <Text className="font-bold text-lg">Phone number</Text>
          </View>
          <TextInput
            className="bg-white rounded-md p-3"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View className="mx-4 mt-4">
          <View className="flex-row items-center">
            <Image className="w-8 h-16" source={require("../assets/images/otp.png")} resizeMode="contain" />
            <Text className="font-bold text-lg">Enter OTP</Text>
          </View>
          <View className="flex-row justify-between mt-2">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputsRef[index]}
                className="w-12 h-12 bg-white text-center text-lg font-bold rounded-md"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
                returnKeyType="next"
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace" && !digit && index > 0) {
                    inputsRef[index - 1]?.current?.focus();
                  }
                }}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity onPress={() => console.log("Resend OTP")} className="mt-4 mx-4">
          <Text className="text-green-600 text-center font-bold">Resend OTP</Text>
        </TouchableOpacity>

        <View className="mx-4 my-7">
          <TouchableOpacity onPress={handleVerifyOtp} className="w-full items-center bg-green-600 p-3 rounded-full">
            <Text className="text-white text-xl font-bold">Verify OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default OtpScreen;
