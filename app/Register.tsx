// import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
// import React, { useState } from "react";
// import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
// import { useRouter } from "expo-router";
// import { Link } from "expo-router";

// export default function Register() {
//   const [name, setName] = useState<string>(""); // New name state
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   const API_URL = "https://ctbackend.crobstacle.com/api/auth/register"; // Replace with actual API URL

//   const onRegister = async () => {
//     if (!name || !phoneNumber || !password) {
//       Alert.alert("Error", "All fields are required.");
//       return;
//     }

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//            name, // Include name field
//           number:phoneNumber,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert("Success", "Registration successful!", [
//           { text: "OK", onPress: () => router.push("/Otp") },
//         ]);
//       } else {
//         Alert.alert("Error", data.message || "Registration failed. Try again.");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Something went wrong. Please try again later.");
//     }
//   };

//   return (
//     <GestureHandlerRootView>
//       <ScrollView>
//         <View>
//           <View className="bg-green-500 pt-10">
//             <View className="items-center">
//               <Image className="w-32 h-12" source={require("../assets/images/headerlogo.png")} resizeMode="contain" />
//             </View>
//             <View className="mx-4 my-7">
//               <Text className="text-white text-lg font-extrabold">Register</Text>
//               <Text className="text-sm text-white">Please Register with your name, phone number, and password</Text>
//             </View>
//           </View>

// <View className="items-center border-b-2 border-green-600 mx-6 py-2 mb-5">
//           <Image
//             className="w-8 h-12"
//             source={require("../assets/images/cellphone.webp")}
//             resizeMode="contain"
//           />
//           <Text className="text-xl font-bold text-green-600 mb-2">
//             Register your phone
//           </Text>
//         </View>

//           {/* Name Input */}
//           <View className="mx-4 mt-4 flex-row items-center gap-3">
//             <Image className="w-7 h-16" source={require("../assets/images/user.png")} resizeMode="contain" />
//             <Text className="font-bold text-lg">Full Name</Text>
//           </View>
//           <TextInput
//             className="bg-white rounded-md mx-4 p-3"
//             value={name}
//             onChangeText={setName}
//             placeholder="Enter your full name"
//           />

//           {/* Phone Number Input */}
//           <View className="mx-4 mt-4 flex-row items-center gap-3">
//             <Image className="w-6 h-16" source={require("../assets/images/cellphone.webp")} resizeMode="contain" />
//             <Text className="font-bold text-lg">Phone number</Text>
//           </View>
//           <TextInput
//             className="bg-white rounded-md mx-4 p-3"
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//             placeholder="Enter phone number"
//             maxLength={10}
//             keyboardType="phone-pad"
//           />

//           {/* Password Input */}
//           <View className="mx-4 mt-4 flex-row items-center gap-2">
//             <Image className="w-9 h-14" source={require("../assets/images/reset.png")} resizeMode="contain" />
//             <Text className="font-bold text-lg">Set password</Text>
//           </View>
//           <View>
//             <TextInput
//              style={{ color: '#000000' }}
//               placeholderTextColor="#666666"
//               className="bg-white rounded-md mx-4 mt-1 p-3"
//               value={password}
//               onChangeText={setPassword}
//               placeholder="Enter password"
//               secureTextEntry={!showPassword}
//             />
//             <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-7">
//               <Image
//                 className="w-7 h-14"
//                 source={showPassword ? require("../assets/images/eye-hide.png") : require("../assets/images/eye.png")}
//                 resizeMode="contain"
//               />
//             </TouchableOpacity>
//           </View>

//           {/* Register Button */}
//           <View className="mx-4">
//           <TouchableOpacity onPress={onRegister} className="w-full items-center bg-green-600 p-3 rounded-full mt-7">
//             <Text className="text-white text-xl font-bold">Continue</Text>
//           </TouchableOpacity>

//           {/* Login Link */}
//           <TouchableOpacity onPress={() => router.push("/Login")} className="w-full items-center rounded-full flex-row justify-center my-3 mb-10">
//             <Text className="text-gray-400 font-extrabold">Already have an account ?</Text>
//             <Text className="text-green-600 text-xl font-bold underline"> Login</Text>
//           </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </GestureHandlerRootView>
//   );
// };


import { View, Text, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const API_URL = "https://ctbackend.crobstacle.com/api/auth/register";

  const onRegister = async () => {
    if (!name || !phoneNumber || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          number: phoneNumber,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Registration successful!", [
          { text: "OK", onPress: () => router.push("/Otp") },
        ]);
      } else {
        Alert.alert("Error", data.message || "Registration failed. Try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View className="bg-green-500 pt-10">
              <View className="items-center">
                <Image className="w-32 h-12" source={require("../assets/images/headerlogo.png")} resizeMode="contain" />
              </View>
              <View className="mx-4 my-7">
                <Text className="text-white text-lg font-extrabold">Register</Text>
                <Text className="text-sm text-white">Please Register with your name, phone number, and password</Text>
              </View>
            </View>

            <View className="items-center border-b-2 border-green-600 mx-6 py-2 mb-5">
              <Image
                className="w-8 h-12"
                source={require("../assets/images/cellphone.webp")}
                resizeMode="contain"
              />
              <Text className="text-xl font-bold text-green-600 mb-2">
                Register your phone
              </Text>
            </View>

            {/* Name Input */}
            <View className="mx-4 mt-4 flex-row items-center gap-3">
              <Image className="w-7 h-16" source={require("../assets/images/user.png")} resizeMode="contain" />
              <Text className="font-bold text-lg">Full Name</Text>
            </View>
            <TextInput
              className="bg-white rounded-md mx-4 p-3"
              style={{ color: '#000000' }}
              placeholderTextColor="#666666"
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
            />

            {/* Phone Number Input */}
            <View className="mx-4 mt-4 flex-row items-center gap-3">
              <Image className="w-6 h-16" source={require("../assets/images/cellphone.webp")} resizeMode="contain" />
              <Text className="font-bold text-lg">Phone number</Text>
            </View>
            <TextInput
              className="bg-white rounded-md mx-4 p-3"
              style={{ color: '#000000' }}
              placeholderTextColor="#666666"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter phone number"
              maxLength={10}
              keyboardType="phone-pad"
            />

            {/* Password Input */}
            <View className="mx-4 mt-4 flex-row items-center gap-2">
              <Image className="w-9 h-14" source={require("../assets/images/reset.png")} resizeMode="contain" />
              <Text className="font-bold text-lg">Set password</Text>
            </View>
            <View className="relative">
              <TextInput
                style={{ color: '#000000' }}
                placeholderTextColor="#666666"
                className="bg-white rounded-md mx-4 mt-1 p-3"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)} 
                className="absolute right-7 top-3"
              >
                <Image
                  className="w-7 h-7"
                  source={showPassword ? require("../assets/images/eye-hide.png") : require("../assets/images/eye.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Register Button */}
            <View className="mx-4">
              <TouchableOpacity onPress={onRegister} className="w-full items-center bg-green-600 p-3 rounded-full mt-7">
                <Text className="text-white text-xl font-bold">Continue</Text>
              </TouchableOpacity>

              {/* Login Link */}
              <TouchableOpacity onPress={() => router.push("/Login")} className="w-full items-center rounded-full flex-row justify-center my-3 mb-10">
                <Text className="text-gray-400 font-extrabold">Already have an account ?</Text>
                <Text className="text-green-600 text-xl font-bold underline"> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
