// import * as React from "react";
// import { Stack } from "expo-router";
// import HeaderSignUp from "@/Components/commonComponents/HeaderSignUp";
// import { AuthProvider } from "@/Components/Auth";

// const _layout = () => {
//   return (
//     <AuthProvider>

//     <Stack>
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       <Stack.Screen
//         name="Profile"
//         options={{
//           headerTintColor: "white",
//           headerShadowVisible: false,
//           headerTitleAlign: "center",
//           headerStyle: { backgroundColor: "#4CAF50" },
//         }}
//       />
//       <Stack.Screen
//         name="Login"
//         options={{

//           headerShown: false,
//           headerTintColor: "white",
//           headerShadowVisible: false,
//           headerStyle: { backgroundColor: "#4CAF50" },

//         }}
//       />
//       <Stack.Screen
//         name="Register"
//         options={{
//           headerShown:false,
//           headerTintColor: "white",
//           headerShadowVisible: false,
//           headerStyle: { backgroundColor: "#4CAF50" },
//         }}
//       />
//       <Stack.Screen name="AboutUs" />
//       <Stack.Screen name="Privacy" />
//       <Stack.Screen name="Transaction" />
//       <Stack.Screen name="ChangePassword" />
//       <Stack.Screen name="Support" />
//       <Stack.Screen name="AddMoney" options={{headerShown:false}}/>
//       <Stack.Screen name="WithdrawMoney" options={{headerShown:false}}/>
//       <Stack.Screen name="Otp" options={{headerShown:true}}/>
//       <Stack.Screen name="ForgotPassword" options={{headerShown:false}}/>
//       <Stack.Screen name="UpdatePass" options={{headerShown:false}}/>
// <Stack.Screen name="Game1" options={{headerShown:false}}/>
//     </Stack>
//     </AuthProvider>
//   );
// };

// export default _layout;

import "react-native-reanimated";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/Components/Auth";
import "../global.css";
import { SocketProvider } from "@/Components/context/SocketContext";

// Separate component to use auth/socket hooks
 function RootLayoutContent() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="Register" />
      <Stack.Screen name="Otp" />
      <Stack.Screen name="ForgotPassword" />
      <Stack.Screen name="UpdatePass" />
      <Stack.Screen name="Profile" />
      <Stack.Screen name="AboutUs" />
      <Stack.Screen name="Privacy" />
      <Stack.Screen name="Transaction" />
      <Stack.Screen name="ChangePassword" />
      <Stack.Screen name="Support" />
      <Stack.Screen name="AddMoney" />
      <Stack.Screen name="WithdrawMoney" />
      <Stack.Screen name="Game1" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <SocketProvider>
            <RootLayoutContent />
          </SocketProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}