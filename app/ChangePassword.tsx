import { View, Text } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import StstusBar  from "@/Components/StstusBar";

const ChangePassword = () => {
  const [password, setPassword] = useState<string>("");  
  const [newPassword, setNewPassword] = useState<string>("");
  const [conPassword, setConPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const[showNewPassword,setShowNewPassword] = useState(false);
const[showOldPassword, setShowOldPassword]= useState(false);

  return (
    <View className="">
      <StstusBar />
      <View className="border-l-4 border-green-500 mx-2 mb-2 mt-16">
        <Text className=" text-xl font-bold ml-2">Update Password</Text>
      </View>

      <View className="mx-4 mt-4 flex-row items-center gap-2">
        <Image
          className="w-8 h-14"
          source={require("../assets/images/padlock.png")}
          resizeMode="contain"
        />
        <Text className="font-bold text-lg">Current Password</Text>
      </View>
      <View>
        <TextInput
          className="bg-white rounded-md mx-4 mt-1"
          value={password}
          onChangeText={setPassword} // Updates the phone number state on text change
          placeholder="Enter password"
          secureTextEntry={(!showOldPassword)}
          keyboardType="default" // To show the numeric keyboard
        />
        <TouchableOpacity onPress={()=> setShowOldPassword(!showOldPassword)} className="absolute right-7">
        <Image
          className="w-7 h-14 "
          source={ showOldPassword ? require("../assets/images/eye-hide.png") : require("../assets/images/eye.png")}
          resizeMode="contain"
        /></TouchableOpacity>
        {/* <Image
              className="w-7 h-14 absolute right-7"
              source={require("../assets/images/eye-hide.png")}
              resizeMode="contain"
            /> */}
      </View>

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
          className="bg-white rounded-md mx-4 mt-1"
          value={newPassword}
          onChangeText={setNewPassword} // Updates the phone number state on text change
          placeholder="Enter password"
          secureTextEntry={!showNewPassword}
          keyboardType="name-phone-pad" // To show the numeric keyboard
        />
        <TouchableOpacity onPress={()=>setShowNewPassword(!showNewPassword)} className=" absolute right-7">
        <Image
          className="w-7 h-14"
          source={showNewPassword ?  require("../assets/images/eye-hide.png") : require("../assets/images/eye.png")}
          resizeMode="contain"
        /></TouchableOpacity>
        {/* <Image
              className="w-7 h-14 absolute right-7"
              source={require("../assets/images/eye-hide.png")}
              resizeMode="contain"
            /> */}
      </View>


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
          className="bg-white rounded-md mx-4 mt-1"
          value={conPassword}
          onChangeText={setConPassword} // Updates the phone number state on text change
          placeholder="Enter password"
          secureTextEntry={!showPassword} 
          keyboardType="default" // To show the numeric keyboard
        />
        <TouchableOpacity onPress={()=>setShowPassword(!showPassword)} className=" absolute right-7">
        <Image
          className="w-7 h-14"
          source={showPassword ? require("../assets/images/eye-hide.png") : require("../assets/images/eye.png")}
          resizeMode="contain"
        /></TouchableOpacity>
        {/* <Image
              className="w-7 h-14 absolute right-7"
              source={require("../assets/images/eye-hide.png")}
              resizeMode="contain"
            /> */}
      </View>

<TouchableOpacity className="my-8 items-center p-3 bg-green-600 rounded-full mx-4"><Text className="text-white text-lg">Change Password</Text></TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
