// import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
// import React from "react";
// import { Link } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { StatusBar as RNStatusBar } from "react-native";
// import { useAuth } from "@/Components/Auth"; // Update this path as needed

// export default function Header() {
//   const { isLoggedIn, loading } = useAuth();

//   const handleDownload = () => {
//     const apkUrl = "https://diuvin.com/app.apk"; // replace with your APK URL
//     Linking.openURL(apkUrl).catch((err) =>
//       console.error("Failed to open URL", err)
//     );
//   };

//   // Show loading state while checking authentication
//   if (loading) {
//     return (
//       <SafeAreaView className=" flex-row justify-between bg-white px-2 py-3">
//         <StatusBar style="auto" backgroundColor="#22c55e" />

//         {/* Custom Status Bar Background - This creates the green background behind status bar */}
//         <View
//           className="bg-green-500"
//           style={{
//             height: RNStatusBar.currentHeight,
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             zIndex: 1
//           }}
//         />

//         <View className="">
//           <Image
//             className="w-32 h-12"
//             source={require("../../assets/images/logoD.png")}
//             resizeMode="contain"
//           />
//         </View>

//         <View className="flex-row gap-3">
//           {/* Empty space while loading */}
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView className=" flex-row justify-between bg-white px-2 py-3">
//       <StatusBar style="auto" backgroundColor="#22c55e" />

//       {/* Custom Status Bar Background - This creates the green background behind status bar */}
//       <View
//         className="bg-green-500"
//         style={{
//           height: RNStatusBar.currentHeight,
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 1
//         }}
//       />

//       <View className="">
//         <Image
//           className="w-32 h-12"
//           source={require("../../assets/images/logoD.png")}
//           resizeMode="contain"
//         />
//       </View>

//       <View className="flex-row gap-3">
//         {isLoggedIn ? (
//           // Show Download button when user is logged in
//           <TouchableOpacity
//             className="bg-green-500 px-4 flex justify-center items-center rounded-md"
//             onPress={handleDownload}
//           >
//             <Text className="text-md text-white font-extrabold">Download Now</Text>
//           </TouchableOpacity>
//         ) : (
//           // Show Login and Register buttons when user is not logged in
//           <>
//             <Link href="/Login">
//               <View className="bg-green-500 border-2 border-green-500 px-4 p-1 rounded-md">
//                 <Text className="text-md text-white font-extrabold">Login</Text>
//               </View>
//             </Link>

//             <Link href="/Register">
//               <View className="border-2 border-green-500 px-4 p-1 rounded-md">
//                 <Text className="text-md text-green-600 font-extrabold">
//                   Register
//                 </Text>
//               </View>
//             </Link>
//           </>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StatusBar as RNStatusBar } from "react-native";
import { useAuth } from "@/Components/Auth";

export default function Header() {
  const { isLoggedIn, loading } = useAuth();
  const insets = useSafeAreaInsets();

  const handleDownload = () => {
    const apkUrl = "https://diuvin.com/app.apk";
    Linking.openURL(apkUrl).catch((err) =>
      console.error("Failed to open URL", err)
    );
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <View
        className="flex-row justify-between items-center bg-white px-3"
        style={{ paddingTop: insets.top + 10, paddingBottom: 12 }}
      >
        <StatusBar style="auto" backgroundColor="#22c55e" />

        {/* Custom Status Bar Background */}
        <View
          className="bg-green-500"
          style={{
            height: insets.top,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
        />

        <View className="z-10">
          <Image
            className="w-32 h-12"
            source={require("../../assets/images/logoD.png")}
            resizeMode="contain"
          />
        </View>

        <View className="flex-row gap-2 z-10">
          {/* Empty space while loading */}
        </View>
      </View>
    );
  }

  return (
    <View
      className="flex-row justify-between items-center bg-white px-3"
      style={{ paddingTop: insets.top + 10, paddingBottom: 10 }}
    >
      <StatusBar style="auto" backgroundColor="#22c55e" />

      {/* Custom Status Bar Background */}
      <View
        className="bg-green-500"
        style={{
          height: insets.top,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      />

      <View className="z-10">
        <Image
          className="w-32 h-12"
          source={require("../../assets/images/logoD.png")}
          resizeMode="contain"
        />
      </View>

      <View className="flex-row gap-2 z-10 items-center">
        {isLoggedIn ? (
          // Show Download button when user is logged in
          <TouchableOpacity
            className="bg-green-500 rounded-md"
            style={{ paddingHorizontal: 12, paddingVertical: 8 }}
            onPress={handleDownload}
            activeOpacity={0.8}
          >
            <Text className="text-sm text-white font-extrabold">
              Download Now
            </Text>
          </TouchableOpacity>
        ) : (
          // Show Login and Register buttons when user is not logged in
          <>
            <Link href="/Login" asChild>
              <TouchableOpacity 
                className="bg-green-500 border-2 border-green-500 rounded-md"
                style={{ paddingHorizontal: 16, paddingVertical: 6 }}
                activeOpacity={0.8}
              >
                <Text className="text-sm text-white font-extrabold">Login</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/Register" asChild>
              <TouchableOpacity 
                className="border-2 border-green-500 rounded-md"
                style={{ paddingHorizontal: 16, paddingVertical: 6 }}
                activeOpacity={0.8}
              >
                <Text className="text-sm text-green-600 font-extrabold">
                  Register
                </Text>
              </TouchableOpacity>
            </Link>
          </>
        )}
      </View>
    </View>
  );
}