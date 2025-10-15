import { View, Text, Image } from "react-native";
import React from "react";

const HeaderSignUp = () => {
  return (
    <View className="flex-row items-center">

<View>
        <Image
          className="w-5 h-7"
          source={require("../../assets/images/leftArrow.png")}
          resizeMode="contain"
        />
      </View>

      <View>
        <Image
          className="w-12 h-12"
          source={require("../../assets/images/icon.png")}
          resizeMode="contain"
        />
      </View>

    
    </View>
  );
};

export default HeaderSignUp;
