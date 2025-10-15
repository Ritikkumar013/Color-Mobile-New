import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar as RNStatusBar } from "react-native";
import { StatusBar } from "expo-status-bar";
const StstusBar = () => {
  return (
    <View>
     <StatusBar style="auto" backgroundColor="#22c55e" />
           
                       {/* Custom Status Bar Background */}
                       <View
                           className="bg-green-500"
                           style={{
                               height: RNStatusBar.currentHeight,
                               position: "absolute",
                               top: 0,
                               left: 0,
                               right: 0,
                               zIndex: 1,
                           }}
                       />
           
    </View>
  )
}

export default StstusBar