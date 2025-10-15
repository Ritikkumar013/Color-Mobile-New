// import { View, Text, Image, TextInput, TouchableOpacity, Button } from "react-native";
// import React, { useState } from "react";
// // import CheckBox from "@react-native-community/checkbox";
// import { Gesture, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
// import { Link, useRouter } from "expo-router";
// import { router } from 'expo-router';

// const Register = () => {
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [isSelected, setIsSelected] = useState(false);
//   const [inviteCode, setInviteCode] = useState<string>("");

// const [showPassword , setShowPassword]= useState(false);

//   const router=useRouter();

//    const logout=()=> {
//     router.push('/Login');
//   }

//   return (
//     <GestureHandlerRootView>
//         <ScrollView>
//       <View>
//         <View className="bg-[#4CAF50]">
//           <View className="items-center">
//             <Image
//               className="w-32 h-12"
//               source={require("../assets/images/headerlogo.png")}
//               resizeMode="contain"
//             />
//           </View>
//           <View className="mx-4 my-7">
//             <Text className="text-white text-lg font-extrabold">Register</Text>
//             <Text className="text-sm text-white">
//               Please Register with your phone number or email
//             </Text>
//             <Text className="text-sm text-white">
//               If you Forgot your password, Connect to customer care
//             </Text>
//           </View>
//         </View>

//         <View className="items-center border-b-2 border-green-600 gap-2 my-4 mx-4">
//           <Image
//             className="w-32 h-12"
//             source={require("../assets/images/telephone.png")}
//             resizeMode="contain"
//           />
//           <Text className="text-xl font-bold text-green-600 pb-3">
//             Register your phone
//           </Text>
//         </View>

//         <View className="mx-4 mt-4 flex-row items-center gap-1">
//           <Image
//             className="w-9 h-16"
//             source={require("../assets/images/telephone.png")}
//             resizeMode="contain"
//           />
//           <Text className="font-bold text-lg">Phone number</Text>
//         </View>
//         <TextInput
//           className="bg-white rounded-md mx-4"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber} // Updates the phone number state on text change
//           placeholder="Enter phone number"
//           keyboardType="phone-pad" // To show the numeric keyboard
//         />

//         <View className="mx-4 mt-4 flex-row items-center gap-2">
//           <Image
//             className="w-8 h-14"
//             source={require("../assets/images/padlock.png")}
//             resizeMode="contain"
//           />
//           <Text className="font-bold text-lg">Set password</Text>
//         </View>
//         <View>
//           <TextInput
//             className="bg-white rounded-md mx-4 mt-1 "
//             value={password}
//             onChangeText={setPassword} // Updates the phone number state on text change
//             placeholder="Enter password"
//             secureTextEntry={!showPassword}
//             keyboardType="name-phone-pad" // To show the numeric keyboard
//           />
//           <TouchableOpacity onPress={()=>setShowPassword(!showPassword)} className="absolute right-7">
//           <Image
//             className="w-7 h-14 "
//             source={showPassword ? require("../assets/images/eye-hide.png") : require("../assets/images/eye.png")}
//             resizeMode="contain"
//           /></TouchableOpacity>
         
//         </View>
//         <View className="mx-4 mt-4 flex-row items-center gap-2">
//           <Image
//             className="w-8 h-12"
//             source={require("../assets/images/love-letter.png")}
//             resizeMode="contain"
//           />
//           <Text className="font-bold text-lg">Invite Code</Text>
//         </View>
//         <View>
//           <TextInput
//             className="bg-white rounded-md mx-4 mt-1"
//             value={inviteCode}
//             onChangeText={setInviteCode} // Updates the phone number state on text change
//             placeholder="Invite Code (Optional)"
//             keyboardType="phone-pad" // To show the numeric keyboard
//           />

//           <View className="mx-4 my-2">
//             {/* <CheckBox 
//         value={isSelected}
//         onValueChange={setIsSelected}
//         /> */}

//             <Text className="text-gray-500">Remember password</Text>
//           </View>

//           <View className="mx-4 my-7">
//             <TouchableOpacity className="w-full items-center bg-green-600 p-3 rounded-full">
//               <Text className="text-white text-xl font-bold">Register</Text>
//             </TouchableOpacity>

//             {/* <Link className="mx-4" href="/Login">  <View className="w-full items-center p-3 rounded-full border border-green-500 flex-row justify-center">
//                 <Text className="text-gray-400 text-sm font-extrabold">Already have an account ?</Text>
//              <Text className="text-green-600 text-xl font-bold"> Login</Text>
//             </View></Link> */}


//             <TouchableOpacity onPress={logout} className="w-full items-center p-3 rounded-full border border-green-500 flex-row justify-center my-3">
//                 <Text className="text-gray-400 text-sm font-extrabold">Already have an account ?</Text>
//              <Text className="text-green-600 text-xl font-bold"> Login</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       </ScrollView>
//     </GestureHandlerRootView>
//   );
// };

// export default Register;

import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

const Register = () => {
  const [name, setName] = useState<string>(""); // New name state
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const API_URL = "http://192.154.230.43:3000/api/auth/register"; // Replace with actual API URL

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
           name, // Include name field
          number:phoneNumber,
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
    <GestureHandlerRootView>
      <ScrollView>
        <View>
          <View className="bg-[#4CAF50] pt-10">
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
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />

          {/* Password Input */}
          <View className="mx-4 mt-4 flex-row items-center gap-2">
            <Image className="w-9 h-14" source={require("../assets/images/reset.png")} resizeMode="contain" />
            <Text className="font-bold text-lg">Set password</Text>
          </View>
          <View>
            <TextInput
              className="bg-white rounded-md mx-4 mt-1 p-3"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-7">
              <Image
                className="w-7 h-14"
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
    </GestureHandlerRootView>
  );
};

export default Register;
