// import { View, Text } from "react-native";
// import React, { useState } from "react";
// import { Image } from "react-native";
// import { TextInput } from "react-native";
// import { TouchableOpacity } from "react-native";
// import StstusBar  from "@/Components/StstusBar";

// const ChangePassword = () => {
//   const [password, setPassword] = useState<string>("");  
//   const [newPassword, setNewPassword] = useState<string>("");
//   const [conPassword, setConPassword] = useState<string>("");

//   const [showPassword, setShowPassword] = useState(false);
//   const[showNewPassword,setShowNewPassword] = useState(false);
// const[showOldPassword, setShowOldPassword]= useState(false);

//   return (
//     <View className="">
//       <StstusBar />
//       <View className="border-l-4 border-green-500 mx-2 mb-2 mt-16">
//         <Text className=" text-xl font-bold ml-2">Change Password</Text>
//       </View>

//       <View className="mx-4 mt-4 flex-row items-center gap-2">
//         <Image
//           className="w-8 h-14"
//           source={require("../assets/images/padlock.png")}
//           resizeMode="contain"
//         />
//         <Text className="font-bold text-lg">Current Password</Text>
//       </View>
//       <View>
//         <TextInput
//           className="bg-white rounded-md mx-4 mt-1"
//           value={password}
//           onChangeText={setPassword} // Updates the phone number state on text change
//           placeholder="Enter password"
//           secureTextEntry={(!showOldPassword)}
//           keyboardType="default" // To show the numeric keyboard
//         />
//         <TouchableOpacity onPress={()=> setShowOldPassword(!showOldPassword)} className="absolute right-7">
//         <Image
//           className="w-7 h-14 "
//           source={ showOldPassword ? require("../assets/images/eye-hide.png") : require("../assets/images/eye.png")}
//           resizeMode="contain"
//         /></TouchableOpacity>
//         {/* <Image
//               className="w-7 h-14 absolute right-7"
//               source={require("../assets/images/eye-hide.png")}
//               resizeMode="contain"
//             /> */}
//       </View>

//       <View className="mx-4 mt-4 flex-row items-center gap-2">
//         <Image
//           className="w-8 h-14"
//           source={require("../assets/images/padlock.png")}
//           resizeMode="contain"
//         />
//         <Text className="font-bold text-lg">New Password</Text>
//       </View>
//       <View>
//         <TextInput
//           className="bg-white rounded-md mx-4 mt-1"
//           value={newPassword}
//           onChangeText={setNewPassword} // Updates the phone number state on text change
//           placeholder="Enter password"
//           secureTextEntry={!showNewPassword}
//           keyboardType="name-phone-pad" // To show the numeric keyboard
//         />
//         <TouchableOpacity onPress={()=>setShowNewPassword(!showNewPassword)} className=" absolute right-7">
//         <Image
//           className="w-7 h-14"
//           source={showNewPassword ?  require("../assets/images/eye-hide.png") : require("../assets/images/eye.png")}
//           resizeMode="contain"
//         /></TouchableOpacity>
//         {/* <Image
//               className="w-7 h-14 absolute right-7"
//               source={require("../assets/images/eye-hide.png")}
//               resizeMode="contain"
//             /> */}
//       </View>


//       <View className="mx-4 mt-4 flex-row items-center gap-2">
//         <Image
//           className="w-8 h-14"
//           source={require("../assets/images/padlock.png")}
//           resizeMode="contain"
//         />
//         <Text className="font-bold text-lg">Confirm Password</Text>
//       </View>
//       <View>
//         <TextInput
//           className="bg-white rounded-md mx-4 mt-1"
//           value={conPassword}
//           onChangeText={setConPassword} // Updates the phone number state on text change
//           placeholder="Enter password"
//           secureTextEntry={!showPassword} 
//           keyboardType="default" // To show the numeric keyboard
//         />
//         <TouchableOpacity onPress={()=>setShowPassword(!showPassword)} className=" absolute right-7">
//         <Image
//           className="w-7 h-14"
//           source={showPassword ? require("../assets/images/eye-hide.png") : require("../assets/images/eye.png")}
//           resizeMode="contain"
//         /></TouchableOpacity>
//         {/* <Image
//               className="w-7 h-14 absolute right-7"
//               source={require("../assets/images/eye-hide.png")}
//               resizeMode="contain"
//             /> */}
//       </View>

// <TouchableOpacity className="my-8 items-center p-3 bg-green-600 rounded-full mx-4"><Text className="text-white text-lg">Change Password</Text></TouchableOpacity>
//     </View>
//   );
// };

// export default ChangePassword;
import { View, Text, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StstusBar from "@/Components/StstusBar";

const API_URL = "https://ctbackend.crobstacle.com/api/auth/reset-password"; // Update with your actual endpoint

export default function ChangePassword() {
  const [number, setNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Load phone number from user profile API on mount
  React.useEffect(() => {
    const loadPhoneNumber = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const response = await fetch("https://ctbackend.crobstacle.com/api/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          if (result.data && result.data.phoneNumber) {
            setNumber(result.data.phoneNumber);
          }
        }
      } catch (error) {
        console.error("Error loading phone number:", error);
      }
    };
    loadPhoneNumber();
  }, []);

  // Validate inputs
  const validateInputs = (): boolean => {
    if (!number.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return false;
    }
    if (number.length !== 10) {
      Alert.alert("Error", "Phone number must be 10 digits");
      return false;
    }
    if (!otp.trim()) {
      Alert.alert("Error", "Please enter OTP");
      return false;
    }
    if (otp.length !== 6) {
      Alert.alert("Error", "OTP must be 6 digits");
      return false;
    }
    if (!newPassword.trim()) {
      Alert.alert("Error", "Please enter new password");
      return false;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }
    if (!confirmPassword.trim()) {
      Alert.alert("Error", "Please confirm your password");
      return false;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    return true;
  };

  // Handle password change
  const handleChangePassword = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: number,
          otp: otp,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      Alert.alert("Success", "Password changed successfully", [
        {
          text: "OK",
          onPress: () => {
            // Clear form
            setNumber("");
            setOtp("");
            setNewPassword("");
            setConfirmPassword("");
          },
        },
      ]);
    } catch (error: any) {
      console.error("Error changing password:", error);
      Alert.alert("Error", error.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StstusBar />
      <View className="border-l-4 border-green-500 mx-2 mb-2 mt-16">
        <Text className="text-xl font-bold ml-2">Update Password</Text>
      </View>

      {/* Phone Number Field */}
      <View className="mx-4 mt-4 flex-row items-center gap-2">
        <Image
          className="w-8 h-14"
          source={require("../assets/images/padlock.png")}
          resizeMode="contain"
        />
        <Text className="font-bold text-lg">Phone Number</Text>
      </View>
      <View>
        <TextInput
          className="bg-white rounded-md mx-4 mt-1 px-3 py-2"
          value={number}
          onChangeText={setNumber}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>

      {/* OTP Field */}
      <View className="mx-4 mt-4 flex-row items-center gap-2">
        <Image
          className="w-8 h-14"
          source={require("../assets/images/padlock.png")}
          resizeMode="contain"
        />
        <Text className="font-bold text-lg">OTP</Text>
      </View>
      <View>
        <TextInput
          className="bg-white rounded-md mx-4 mt-1 px-3 py-2"
          value={otp}
          onChangeText={setOtp}
          placeholder="Enter 6-digit OTP"
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>

      {/* New Password Field */}
      <View className="mx-4 mt-4 flex-row items-center gap-2">
        <Image
          className="w-8 h-14"
          source={require("../assets/images/padlock.png")}
          resizeMode="contain"
        />
        <Text className="font-bold text-lg">New Password</Text>
      </View>
      <View>
        <TextInput
          className="bg-white rounded-md mx-4 mt-1 px-3 py-2"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter new password"
          secureTextEntry={!showNewPassword}
          keyboardType="default"
        />
        <TouchableOpacity
          onPress={() => setShowNewPassword(!showNewPassword)}
          className="absolute right-7 top-1"
        >
          <Image
            className="w-7 h-14"
            source={
              showNewPassword
                ? require("../assets/images/eye-hide.png")
                : require("../assets/images/eye.png")
            }
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Field */}
      <View className="mx-4 mt-4 flex-row items-center gap-2">
        <Image
          className="w-8 h-14"
          source={require("../assets/images/padlock.png")}
          resizeMode="contain"
        />
        <Text className="font-bold text-lg">Confirm Password</Text>
      </View>
      <View>
        <TextInput
          className="bg-white rounded-md mx-4 mt-1 px-3 py-2"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm new password"
          secureTextEntry={!showConfirmPassword}
          keyboardType="default"
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-7 top-1"
        >
          <Image
            className="w-7 h-14"
            source={
              showConfirmPassword
                ? require("../assets/images/eye-hide.png")
                : require("../assets/images/eye.png")
            }
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Change Password Button */}
      <TouchableOpacity
        className="my-8 items-center p-3 bg-green-600 rounded-full mx-4"
        onPress={handleChangePassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="text-white text-lg font-semibold">
            Change Password
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

