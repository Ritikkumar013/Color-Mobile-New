// import "../../global.css";
// import { Tabs } from "expo-router";
// import React from "react";
// import Header from "@/Components/commonComponents/Header";
// import { View } from "react-native";
// import { Image, Linking } from "react-native";
// import { useRouter } from "expo-router";
// import { useAuth } from "@/Components/Auth"
// import index from "@/app/(tabs)";

// export default function RootLayout() {
//   const { isLoggedIn, loading } = useAuth();
//   const router = useRouter();

//   const handleDownload = () => {
//     const apkUrl = "https://diuvin.com/app.apk"; // replace with your APK URL
//     Linking.openURL(apkUrl).catch((err) =>
//       console.error("Failed to open URL", err)
//     );
//   };

//   const handleProtectedTabPress = (e: any) => {
//     if (!isLoggedIn) {
//       e.preventDefault();
//       router.push("/Login");
//     }
//   };

//   // Don't render tabs while checking authentication
//   if (loading) {
//     return null; // or a loading spinner
//   }

//   return (

//     <Tabs
//       initialRouteName="index" // This sets index as the landing page
//       screenOptions={{
//         tabBarStyle: {
//           height: 70,
//           paddingTop: 12,
//           paddingBottom: 12,
//           alignItems: "center",
//           justifyContent: "center",
//         },
//         headerShown: false,
//         tabBarLabelStyle: {
//           fontSize: 11,
//           marginTop: 4,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="Download"
//         options={{
//           title: "Download",
//           tabBarIcon: () => (
//             <Image
//               className="w-11 h-11"
//               source={require("../../assets/images/download.png")}
//               resizeMode="contain"
//             />
//           ),
//         }}
//         listeners={{
//           tabPress: (e) => {
//             e.preventDefault();
//             handleDownload(); // Triggers the download
//           },
//         }}
//       />

//       <Tabs.Screen
//         name="Wallet"
//         options={{
//           title: "Wallet",
//           tabBarIcon: ({ focused }) => (
//             <Image
//               className="w-9 h-9"
//               source={require("../../assets/images/wallet1.png")}
//               resizeMode="contain"
//               style={{
//                 opacity: !isLoggedIn ? 0.5 : 1 // Make icon appear disabled when not logged in
//               }}
//             />
//           ),
//         }}
//         listeners={{
//           tabPress: handleProtectedTabPress,
//         }}
//       />

//       <Tabs.Screen
//         name="index"
//         initialParams={index}
//         options={{
//           headerShown: true,
//           header: () => <Header />,
//           title: "",
//           tabBarIcon: () => (
//             <View className="bg-green-600 p-[5px] px-6 rounded-full">
//               <Image
//                 className="w-8 h-8"
//                 source={require("../../assets/images/gameHome.png")}
//                 resizeMode="contain"
//               />
//             </View>
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="Game"
//         options={{
//           title: "Game",
//           tabBarIcon: ({ focused }) => (
//             <Image
//               className="w-9 h-9"
//               source={require("../../assets/images/win.png")}
//               resizeMode="contain"
//               style={{
//                 opacity: !isLoggedIn ? 0.5 : 1 // Make icon appear disabled when not logged in
//               }}
//             />
//           ),
//         }}
//         listeners={{
//           tabPress: handleProtectedTabPress,
//         }}
//       />

//       <Tabs.Screen
//         name="Account"
//         options={{
//           title: "Account",
//           tabBarIcon: ({ focused }) => (
//             <Image
//               className="w-9 h-9"
//               source={require("../../assets/images/profile (1).png")}
//               resizeMode="contain"
//               style={{
//                 opacity: !isLoggedIn ? 0.5 : 1 // Make icon appear disabled when not logged in
//               }}
//             />
//           ),
//         }}
//         listeners={{
//           tabPress: handleProtectedTabPress,
//         }}
//       />
//     </Tabs>

//   );
// }

import "../../global.css";
import { Tabs } from "expo-router";
import React from "react";
import Header from "@/Components/commonComponents/Header";
import { View, Linking, Pressable, TouchableOpacity, Text } from "react-native";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/Components/Auth"
import index from "@/app/(tabs)";

export default function RootLayout() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  const handleDownload = () => {
    const apkUrl = "https://diuvin.com/app.apk"; // replace with your APK URL
    Linking.openURL(apkUrl).catch((err) =>
      console.error("Failed to open URL", err)
    );
  };

  const handleProtectedTabPress = (e: any) => {
    if (!isLoggedIn) {
      e.preventDefault();
      router.push("/Login");
    }
  };

  // Don't render tabs while checking authentication
  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <Tabs
      screenListeners={{
        state: (e) => {
          // Prevent Download from being in navigation state
          const state = e.data.state;
          if (state) {
            const currentRoute = state.routes[state.index];
            if (currentRoute.name === 'Download') {
              // Immediately navigate away from Download
              router.replace('/');
            }
          }
        },
      }}
      initialRouteName="index" // This sets index as the landing page
      screenOptions={{
        tabBarStyle: {
          height: 70,
          paddingTop: 12,
          paddingBottom: 12,
          alignItems: "center",
          justifyContent: "center",
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="Download"
        options={{
          title: "Download",
          tabBarButton: (props) => (
            <TouchableOpacity
              onPress={() => handleDownload()}
              style={props.style}
              activeOpacity={0.7}
            >
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  className="w-11 h-11"
                  source={require("../../assets/images/download.png")}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 11 }}>Download</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="Wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ focused }) => (
            <Image
              className="w-9 h-9"
              source={require("../../assets/images/wallet1.png")}
              resizeMode="contain"
              style={{
                opacity: !isLoggedIn ? 0.5 : 1 // Make icon appear disabled when not logged in
              }}
            />
          ),
        }}
        listeners={{
          tabPress: handleProtectedTabPress,
        }}
      />

      <Tabs.Screen
        name="index"
        initialParams={index}
        options={{
          headerShown: true,
          header: () => <Header />,
          title: "",
          tabBarIcon: () => (
            <View className="bg-green-600 p-[5px] px-6 rounded-full">
              <Image
                className="w-8 h-8"
                source={require("../../assets/images/gameHome.png")}
                resizeMode="contain"
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="Game"
        options={{
          title: "Game",
          tabBarIcon: ({ focused }) => (
            <Image
              className="w-9 h-9"
              source={require("../../assets/images/win.png")}
              resizeMode="contain"
              style={{
                opacity: !isLoggedIn ? 0.5 : 1 // Make icon appear disabled when not logged in
              }}
            />
          ),
        }}
        listeners={{
          tabPress: handleProtectedTabPress,
        }}
      />

      <Tabs.Screen
        name="Account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <Image
              className="w-9 h-9"
              source={require("../../assets/images/profile (1).png")}
              resizeMode="contain"
              style={{
                opacity: !isLoggedIn ? 0.5 : 1 // Make icon appear disabled when not logged in
              }}
            />
          ),
        }}
        listeners={{
          tabPress: handleProtectedTabPress,
        }}
      />
    </Tabs>
  );
}