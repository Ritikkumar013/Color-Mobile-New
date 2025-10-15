// import { View, Text, Image, TouchableOpacity } from "react-native";
// import React from "react";
// import { Link } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { StatusBar as RNStatusBar } from "react-native";
// export default function Header() {
//   return (
//     <SafeAreaView className=" flex-row justify-between bg-white px-2 py-3">
//       <StatusBar style="auto" backgroundColor="#22c55e" />
                       
//                        {/* Custom Status Bar Background - This creates the green background behind status bar */}
//                        <View 
//                          className="bg-green-500"
//                          style={{ 
//                            height: RNStatusBar.currentHeight,
//                            position: 'absolute',
//                            top: 0,
//                            left: 0,
//                            right: 0,
//                            zIndex: 1
//                          }} 
//                        />
              

//       <View className="">
//         <Image
//           className="w-32 h-12"
//           source={require("../../assets/images/logoD.png")}
//           resizeMode="contain"
//         />
//       </View>
//       <View className="flex-row gap-3">
//         <View>
//           {/* <TouchableOpacity className="bg-green-500 border-2 border-green-500  px-4 p-1 rounded-md">
//             <Text className="text-md text-white font-extrabold">Login</Text>
//           </TouchableOpacity> */}

//           <Link href="/Login">
//             <View className="bg-green-500 border-2 border-green-500  px-4 p-1 rounded-md">
//               <Text className="text-md text-white font-extrabold">Login</Text>
//             </View>
//           </Link>
//         </View>
//         <View>
//           {/* <TouchableOpacity className="border-2 border-green-500 px-4 p-1 rounded-md">
//             <Text className="text-md text-green-600 font-extrabold">
//               Register
//             </Text>
//           </TouchableOpacity> */}

//           <Link href="/Register">
//             <View className="border-2 border-green-500 px-4 p-1 rounded-md">
//               <Text className="text-md text-green-600 font-extrabold">
//                 Register
//               </Text>
//             </View>
//           </Link>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }


// import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
// import React, { useState, useEffect } from "react";
// import { Link } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { StatusBar as RNStatusBar } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useFocusEffect } from '@react-navigation/native';

// export default function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const checkAuthStatus = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       setIsLoggedIn(!!token); // Convert to boolean - true if token exists, false if not
//     } catch (error) {
//       console.error("Error checking auth status:", error);
//       setIsLoggedIn(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check auth status when component mounts
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   // Also check when the screen comes into focus (important for when user logs in/out)
//   useFocusEffect(
//     React.useCallback(() => {
//       checkAuthStatus();
//     }, [])
//   );

//   const handleDownload = () => {
//     const apkUrl = "https://diuvin.com/app.apk"; // replace with your APK URL
//     Linking.openURL(apkUrl).catch((err) =>
//       console.error("Failed to open URL", err)
//     );
//   };

//   return (
//     <SafeAreaView className="flex-row justify-between bg-white px-2 py-3">
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

//       {/* Conditional rendering based on login status */}
//       {!loading && (
//         <View className="flex-row gap-3">
//           {isLoggedIn ? (
//             // Show Download button when logged in
//             <TouchableOpacity 
//               onPress={handleDownload}
//               className="bg-green-500 px-4 flex flex-col justify-center items-center rounded-md"
//             >
//               <Text className="text-md text-white font-extrabold">Download Now</Text>
//             </TouchableOpacity>
//           ) : (
//             // Show Login and Register buttons when not logged in
//             <>
//               <View>
//                 <Link href="/Login">
//                   <View className="bg-green-500 border-2 border-green-500 px-4 p-1 rounded-md">
//                     <Text className="text-md text-white font-extrabold">Login</Text>
//                   </View>
//                 </Link>
//               </View>
//               <View>
//                 <Link href="/Register">
//                   <View className="border-2 border-green-500 px-4 p-1 rounded-md">
//                     <Text className="text-md text-green-600 font-extrabold">
//                       Register
//                     </Text>
//                   </View>
//                 </Link>
//               </View>
//             </>
//           )}
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StatusBar as RNStatusBar } from "react-native";
import { useAuth } from "@/Components/Auth"; // Update this path as needed

export default function Header() {
  const { isLoggedIn, loading } = useAuth();

  const handleDownload = () => {
    const apkUrl = "https://diuvin.com/app.apk"; // replace with your APK URL
    Linking.openURL(apkUrl).catch((err) =>
      console.error("Failed to open URL", err)
    );
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <SafeAreaView className=" flex-row justify-between bg-white px-2 py-3">
        <StatusBar style="auto" backgroundColor="#22c55e" />
        
        {/* Custom Status Bar Background - This creates the green background behind status bar */}
        <View 
          className="bg-green-500"
          style={{ 
            height: RNStatusBar.currentHeight,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1
          }} 
        />

        <View className="">
          <Image
            className="w-32 h-12"
            source={require("../../assets/images/logoD.png")}
            resizeMode="contain"
          />
        </View>
        
        <View className="flex-row gap-3">
          {/* Empty space while loading */}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className=" flex-row justify-between bg-white px-2 py-3">
      <StatusBar style="auto" backgroundColor="#22c55e" />

      {/* Custom Status Bar Background - This creates the green background behind status bar */}
      <View 
        className="bg-green-500"
        style={{ 
          height: RNStatusBar.currentHeight,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1
        }} 
      />

      <View className="">
        <Image
          className="w-32 h-12"
          source={require("../../assets/images/logoD.png")}
          resizeMode="contain"
        />
      </View>
      
      <View className="flex-row gap-3">
        {isLoggedIn ? (
          // Show Download button when user is logged in
          <TouchableOpacity 
            className="bg-green-500 px-4 flex justify-center items-center rounded-md"
            onPress={handleDownload}
          >
            <Text className="text-md text-white font-extrabold">Download Now</Text>
          </TouchableOpacity>
        ) : (
          // Show Login and Register buttons when user is not logged in
          <>
            <Link href="/Login">
              <View className="bg-green-500 border-2 border-green-500 px-4 p-1 rounded-md">
                <Text className="text-md text-white font-extrabold">Login</Text>
              </View>
            </Link>

            <Link href="/Register">
              <View className="border-2 border-green-500 px-4 p-1 rounded-md">
                <Text className="text-md text-green-600 font-extrabold">
                  Register
                </Text>
              </View>
            </Link>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}