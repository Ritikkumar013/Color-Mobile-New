// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   SafeAreaView,
// } from "react-native";
// import React, { useState } from "react";
// import { useRouter } from "expo-router";
// import {
//   GestureHandlerRootView,
//   ScrollView,
// } from "react-native-gesture-handler";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Link } from "expo-router";

// const Login = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   const register = () => {
//     router.push("/Register");
//   };

//   const handleLogin = async () => {
//     if (!phoneNumber || !password) {
//       Alert.alert("Error", "Please enter phone number and password");
//       return;
//     }

//     try {
//       const response = await fetch("https://ctbackend.crobstacle.com/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           number: phoneNumber,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       const token = data?.data?.token; // Extract token
//       // if (!token) {
//       //   throw new Error("Token not received from server.");
//       // }

//       await AsyncStorage.setItem("token", token); // Store token

//       // Alert.alert("Success", "Login successful!");

//       // console.log("Token Stored:", token);

//       // Navigate to Home Screen
//       router.push("/(tabs)");
//     } catch (error) {
//       Alert.alert("Login Failed", (error as Error).message);
//     }
//   };
//   return (
//     <GestureHandlerRootView className="">
//       <ScrollView className="">
//         <SafeAreaView className="bg-[#4CAF50] pt-10">
//           <View className="items-center">
//             <Image
//               className="w-32 h-12"
//               source={require("../assets/images/headerlogo.png")}
//               resizeMode="contain"
//             />
//           </View>
//           <View className="mx-4 my-7">
//             <Text className="text-white text-lg font-extrabold">Login</Text>
//             <Text className="text-white text-sm font-extrabold">
//               Please Login with your phone number
//             </Text>
//           </View>
//         </SafeAreaView>

//         <View className="items-center border-b-2 border-green-600 mx-6 py-2 mb-5">
//           <Image
//                       className="w-8 h-12"
//                       source={require("../assets/images/cellphone.webp")}
//                       resizeMode="contain"
//                     />
//           <Text className="text-xl font-bold text-green-600 mb-2">
//             Login Using phone
//           </Text>
//         </View>

//         <View className="mx-4 mt-4">
//           <View className="flex-row items-center gap-2">
//             <Image
//               className="w-6 h-14"
//               source={require("../assets/images/cellphone.webp")}
//               resizeMode="contain"
//             />
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
//           <View className="flex-row gap-2 items-center">
//             <Image
//               className="w-8 h-16"
//               source={require("../assets/images/reset.png")}
//               resizeMode="contain"
//             />
//             <Text className="font-bold text-lg">Password</Text>
//           </View>
//           <View className="relative">
//             <TextInput
//               className="bg-white rounded-md p-3"
//               value={password}
//               onChangeText={setPassword}
//               placeholder="Enter password"
//               secureTextEntry={!showPassword}
//             />
//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3"
//             >
//               <Image
//                 className="w-7 h-7"
//                 source={
//                   showPassword
//                     ? require("../assets/images/eye-hide.png")
//                     : require("../assets/images/eye.png")
//                 }
//               />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View className="mx-4 my-7">
//           <TouchableOpacity
//             onPress={handleLogin}
//             className="w-full items-center bg-green-600 p-3 rounded-full"
//           >
//             <Text className="text-white text-xl font-bold">Login</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={register}
//             className="w-full items-center  border-2 border-green-600 p-3 rounded-full my-3"
//           >
//             <Text className="text-green-600 text-xl font-bold">Register</Text>
//           </TouchableOpacity>

//           <Link href="/ForgotPassword">
//             <Text className="text-green-600 text-lg text-center font-extrabold">
//               Forgot password ?
//             </Text>
//           </Link>
//         </View>
//       </ScrollView>
//     </GestureHandlerRootView>
//   );
// };

// export default Login;

// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   SafeAreaView,
// } from "react-native";
// import React, { useState } from "react";
// import { useRouter, Link } from "expo-router";
// import {
//   GestureHandlerRootView,
//   ScrollView,
// } from "react-native-gesture-handler";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useAuth } from "@/Components/Auth"; // ✅ added

// const Login = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
//   const { login, checkAuthStatus } = useAuth(); //

//   const register = () => {
//     router.push("/Register");
//   };

//   // ✅ success handler
// const handleLoginSuccess = async (token: string, userData: any) => {
//   try {
//     await AsyncStorage.setItem("token", token);

//     if (userData) {
//       await AsyncStorage.setItem("user", JSON.stringify(userData));
//     } else {
//       console.warn("No user data received from API");
//       // optional: remove old user
//       await AsyncStorage.removeItem("user");
//     }

//     await login(token);
//     await checkAuthStatus();

//     console.log("Login successful, auth state updated");
//     router.replace("/(tabs)");
//   } catch (error) {
//     console.error("Error during login:", error);
//   }
// };


//   // ✅ login handler
//   const handleLogin = async () => {
//     if (!phoneNumber || !password) {
//       Alert.alert("Error", "Please enter phone number and password");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const response = await fetch("https://ctbackend.crobstacle.com/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           number: phoneNumber,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok || !data?.data?.token) {
//         throw new Error(data.message || "Login failed");
//       }

//       const token = data.data.token;
//       const user = data.data.user;

//       await handleLoginSuccess(token, user);

//       Alert.alert("Success", "Login successful!");
//     } catch (error) {
//       Alert.alert("Login Failed", (error as Error).message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <GestureHandlerRootView>
//       <ScrollView>
//         <SafeAreaView className="bg-[#4CAF50] pt-10">
//           <View className="items-center">
//             <Image
//               className="w-32 h-12"
//               source={require("../assets/images/headerlogo.png")}
//               resizeMode="contain"
//             />
//           </View>
//           <View className="mx-4 my-7">
//             <Text className="text-white text-lg font-extrabold">Login</Text>
//             <Text className="text-white text-sm font-extrabold">
//               Please Login with your phone number
//             </Text>
//           </View>
//         </SafeAreaView>

//         <View className="items-center border-b-2 border-green-600 mx-6 py-2 mb-5">
//           <Image
//             className="w-8 h-12"
//             source={require("../assets/images/cellphone.webp")}
//             resizeMode="contain"
//           />
//           <Text className="text-xl font-bold text-green-600 mb-2">
//             Login Using phone
//           </Text>
//         </View>

//         <View className="mx-4 mt-4">
//           <View className="flex-row items-center gap-2">
//             <Image
//               className="w-6 h-14"
//               source={require("../assets/images/cellphone.webp")}
//               resizeMode="contain"
//             />
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
//           <View className="flex-row gap-2 items-center">
//             <Image
//               className="w-8 h-16"
//               source={require("../assets/images/reset.png")}
//               resizeMode="contain"
//             />
//             <Text className="font-bold text-lg">Password</Text>
//           </View>
//           <View className="relative">
//             <TextInput
//               className="bg-white rounded-md p-3"
//               value={password}
//               onChangeText={setPassword}
//               placeholder="Enter password"
//               secureTextEntry={!showPassword}
//             />
//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3"
//             >
//               <Image
//                 className="w-7 h-7"
//                 source={
//                   showPassword
//                     ? require("../assets/images/eye-hide.png")
//                     : require("../assets/images/eye.png")
//                 }
//               />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View className="mx-4 my-7">
//           <TouchableOpacity
//             onPress={handleLogin}
//             disabled={isLoading}
//             className="w-full items-center bg-green-600 p-3 rounded-full"
//           >
//             <Text className="text-white text-xl font-bold">
//               {isLoading ? "Logging in..." : "Login"}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={register}
//             className="w-full items-center  border-2 border-green-600 p-3 rounded-full my-3"
//           >
//             <Text className="text-green-600 text-xl font-bold">Register</Text>
//           </TouchableOpacity>

//           <Link href="/ForgotPassword">
//             <Text className="text-green-600 text-lg text-center font-extrabold">
//               Forgot password ?
//             </Text>
//           </Link>
//         </View>
//       </ScrollView>
//     </GestureHandlerRootView>
//   );
// };

// export default Login;

import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useRouter, Link } from "expo-router";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/Components/Auth";
import { useSocket } from "@/Components/context/SocketContext" // ✅ Import global socket

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login, checkAuthStatus } = useAuth();
  const { onTokenChange } = useSocket(); // ✅ Get socket token handler

  const register = () => {
    router.push("/Register");
  };

  // ✅ Enhanced success handler with socket connection
  const handleLoginSuccess = async (token: string, userData: any) => {
    try {
      // Store token in AsyncStorage
      await AsyncStorage.setItem("token", token);

      if (userData) {
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      } else {
        console.warn("No user data received from API");
        await AsyncStorage.removeItem("user");
      }

      // Update auth context
      await login(token);
      await checkAuthStatus();

      // ✅ IMPORTANT: Notify socket context to establish connection
      onTokenChange(token);

      console.log("✅ Login successful, socket connecting...");
      router.replace("/(tabs)");
    } catch (error) {
      console.error("❌ Error during login:", error);
      Alert.alert("Error", "Failed to complete login process");
    }
  };

  // ✅ Login handler
  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert("Error", "Please enter phone number and password");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("https://ctbackend.crobstacle.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: phoneNumber,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.data?.token) {
        throw new Error(data.message || "Login failed");
      }

      const token = data.data.token;
      const user = data.data.user;

      await handleLoginSuccess(token, user);

      Alert.alert("Success", "Login successful!");
    } catch (error) {
      console.error("❌ Login error:", error);
      Alert.alert("Login Failed", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView>
        <SafeAreaView className="bg-green-500 pt-10">
          <View className="items-center">
            <Image
              className="w-32 h-12"
              source={require("../assets/images/headerlogo.png")}
              resizeMode="contain"
            />
          </View>
          <View className="mx-4 my-7">
            <Text className="text-white text-lg font-extrabold">Login</Text>
            <Text className="text-white text-sm font-extrabold">
              Please Login with your phone number
            </Text>
          </View>
        </SafeAreaView>

        <View className="items-center border-b-2 border-green-600 mx-6 py-2 mb-5">
          <Image
            className="w-8 h-12"
            source={require("../assets/images/cellphone.webp")}
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-green-600 mb-2">
            Login Using phone
          </Text>
        </View>

        <View className="mx-4 mt-4">
          <View className="flex-row items-center gap-2">
            <Image
              className="w-6 h-14"
              source={require("../assets/images/cellphone.webp")}
              resizeMode="contain"
            />
            <Text className="font-bold text-lg">Phone number</Text>
          </View>
          <TextInput
            className="bg-white rounded-md p-3"
             placeholderTextColor="#666666"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            maxLength={10}
            editable={!isLoading}
          />
        </View>

        <View className="mx-4 mt-4">
          <View className="flex-row gap-2 items-center">
            <Image
              className="w-8 h-16"
              source={require("../assets/images/reset.png")}
              resizeMode="contain"
            />
            <Text className="font-bold text-lg">Password</Text>
          </View>
          <View className="relative">
            <TextInput
             style={{ color: '#000000' }} 
              placeholderTextColor="#666666" 
              className="bg-white rounded-md p-3"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry={!showPassword}
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
              disabled={isLoading}
            >
              <Image
                className="w-7 h-7"
                source={
                  showPassword
                    ? require("../assets/images/eye-hide.png")
                    : require("../assets/images/eye.png")
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mx-4 my-7">
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`w-full items-center p-3 rounded-full ${
              isLoading ? "bg-green-400" : "bg-green-600"
            }`}
          >
            <Text className="text-white text-xl font-bold">
              {isLoading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={register}
            disabled={isLoading}
            className={`w-full items-center border-2 border-green-600 p-3 rounded-full my-3 ${
              isLoading ? "opacity-50" : ""
            }`}
          >
            <Text className="text-green-600 text-xl font-bold">Register</Text>
          </TouchableOpacity>

          <Link href="/ForgotPassword" asChild>
            <TouchableOpacity disabled={isLoading}>
              <Text className="text-green-600 text-lg text-center font-extrabold">
                Forgot password ?
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

