import React, { ReactNode } from "react";
import { View } from "react-native";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <View className="flex-1 bg-black items-center">
      <View className="w-full max-w-md bg-green-50 min-h-screen">
        {children}
      </View>
    </View>
  );
};

export default Container;
