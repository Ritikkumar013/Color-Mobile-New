// import React from "react";
// import { useState } from "react";
// import { StatusBar as RNStatusBar } from "react-native";
// import { StatusBar } from "expo-status-bar";

// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Linking,
//   ActivityIndicator,
// } from "react-native";
// import {
//   FontAwesome5,
//   FontAwesome,
//   Feather,
//   MaterialIcons,
//   Fontisto,
// } from "@expo/vector-icons";
// import { Link, useRouter } from "expo-router";
// import GPopup from "@/Components/GPopup";
// import Telegram from "@/Components/Telegram";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Type definitions for user profile
// interface UserProfile {
//   _id: string;
//   name: string;
//   number: {
//     value: string;
//     verified: boolean;
//   };
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// interface UserProfileResponse {
//   success: boolean;
//   message: string;
//   data: UserProfile;
// }

// const Account = () => {
//   const [balance, setBalance] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [profileLoading, setProfileLoading] = useState(false);

//   const fetchUserProfile = async () => {
//     try {
//       setProfileLoading(true);
//       const token = await AsyncStorage.getItem("token");

//       if (!token) {
//         console.error("No token found");
//         setProfileLoading(false);
//         return;
//       }

//       const response = await fetch(
//         "http://192.154.230.43:3000/api/users/profile", // Update with your actual profile endpoint
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data: UserProfileResponse = await response.json();
//       console.log("Profile API Response:", data); // Debugging

//       if (data.success && data.data) {
//         setUserProfile(data.data);
//       } else {
//         console.error("Failed to fetch user profile:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//     } finally {
//       setProfileLoading(false);
//     }
//   };

//   const fetchBalance = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem("token");

//       if (!token) {
//         console.error("No token found");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(
//         "http://192.154.230.43:3000/api/wallet/balance",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json();
//       console.log("API Response:", data); // Debugging

//       if (
//         data.status === "success" &&
//         data.data &&
//         data.data.balance !== undefined
//       ) {
//         // Fix floating point precision issues and round to 2 decimal places
//         const roundedBalance = Math.round(data.data.balance * 100) / 100;
//         setBalance(roundedBalance);
//       } else {
//         console.error("Failed to fetch balance:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBalance();
//     fetchUserProfile();
//   }, []);

//   const handleDownload = () => {
//     const apkUrl = "https://diuvin.com/app.apk"; // replace with your APK URL
//     Linking.openURL(apkUrl).catch((err) =>
//       console.error("Failed to open URL", err)
//     );
//   };

//   const router = useRouter();
//   const support = () => {
//     router.push("/Support");
//   };

//   const settings = () => {
//     router.push("/ChangePassword");
//   };

//   const wallet = () => {
//     router.push("/Wallet");
//   };
//   const deposit = () => {
//     router.push("/AddMoney");
//   };
//   const withraw = () => {
//     router.push("/WithdrawMoney");
//   };

//   const transaction = () => {
//     router.push("/BetHistory");
//   };

//   const [isPopupVisible, setPopupVisible] = useState(false);

//   return (
//     <View className="flex-1 bg-green-50">
//       {/* Status Bar with custom background */}
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

//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         {/* Header Section */}
//         <View className="bg-green-500 pt-16 p-5 items-center rounded-b-[30px] pb-20">
//           <View className="flex flex-row items-center">
//             <Image
//               source={require("../../assets/images/Profile.png")}
//               className="w-16 h-16 rounded-full border-2 border-white"
//             />
//             <View className="ml-4">
//               {profileLoading ? (
//                 <>
//                   <Text className="text-lg font-bold text-white">Loading...</Text>
//                   <Text className="text-sm text-white">UID: Loading...</Text>
//                   <Text className="text-sm text-white">Mobile: Loading...</Text>
//                 </>
//               ) : userProfile ? (
//                 <>
//                   <Text className="text-lg font-bold text-white">
//                     {userProfile.name}
//                   </Text>
//                   <Text className="text-sm text-white">
//                     UID: {userProfile._id}
//                   </Text>
//                   <Text className="text-sm text-white">
//                     Mobile: {userProfile.number.value}
//                   </Text>
//                 </>
//               ) : (
//                 <>
//                   <Text className="text-lg font-bold text-white">
//                     MemberpD6SF
//                   </Text>
//                   <Text className="text-sm text-white">UID: 369751</Text>
//                   <Text className="text-sm text-white">
//                     Mobile: +9189**091236
//                   </Text>
//                 </>
//               )}
//             </View>
//           </View>
//         </View>

//         {/* Balance Section */}
//         <View className="bg-white p-4 rounded-xl flex flex-col shadow-md mx-4 -mt-12">
//           <View className="flex flex-row justify-between items-center shadow-md">
//             <Text className="text-gray-700 font-bold text-lg">Total Balance</Text>
//             <TouchableOpacity
//               className="flex flex-row items-center"
//               onPress={fetchBalance}
//             >
//               {loading ? (
//                 <ActivityIndicator size="small" color="#16a34a" />
//               ) : (
//                 <>
//                   <Text className="text-green-600 font-bold text-xl">
//                     {balance !== null ? `₹${balance}` : "₹0"}
//                   </Text>
//                   <FontAwesome5
//                     name="sync-alt"
//                     size={16}
//                     color="#ccc"
//                     className="ml-2"
//                   />
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>

//           <View className="mt-4 flex flex-row justify-around">
//             <TouchableOpacity onPress={wallet} className="items-center">
//               <Fontisto name="wallet" size={24} color="#ff5e57" />
//               <Text className="text-gray-600 mt-2">Wallet</Text>
//             </TouchableOpacity>

//             <TouchableOpacity className="items-center" onPress={deposit}>
//               <FontAwesome5 name="piggy-bank" size={24} color="#ffa502" />
//               <Text className="text-gray-600 mt-2">Deposit</Text>
//             </TouchableOpacity>
//             <TouchableOpacity className="items-center" onPress={withraw}>
//               <MaterialIcons name="credit-card" size={24} color="#1e90ff" />
//               <Text className="text-gray-600 mt-2">Withdraw</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* History Section */}
//         <View className="mx-4 mt-4">
//           <View className="container flex flex-row justify-between gap-3">
//             <TouchableOpacity
//               onPress={transaction}
//               className="flex-1 bg-white rounded-xl shadow-md "
//             >
//               <View className="container flex-row items-center gap-3 justify-center p-3">
//                 <FontAwesome5 name="money-bill" size={26} color="#3498db" />
//                 <View>
//                   <Text className="text-sm font-bold">Bet</Text>
//                   <Text className="text-sm">My Bet History</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//             <View className="flex-1 bg-white rounded-xl shadow-md ">
//               <Link href="/Transaction">
//                 {" "}
//                 <View className="conatiner flex-row gap-3 justify-center items-center p-3">
//                   <FontAwesome5 name="exchange-alt" size={26} color="#27ae60" />
//                   <View>
//                     <Text className="font-semibold">Transaction</Text>
//                     <Text className="text-gray- text-sm">My Transaction</Text>
//                   </View>
//                 </View>
//               </Link>
//             </View>
//           </View>

//           <View className="flex flex-row justify-between my-3 gap-3">
//             <TouchableOpacity
//               onPress={transaction}
//               className="flex-1 bg-white rounded-xl shadow-md "
//             >
//               <View className="container flex-row justify-center items-center gap-3 p-3">
//                 <FontAwesome5 name="piggy-bank" size={26} color="#e74c3c" />
//                 <View>
//                   <Text className="text-sm font-bold">Deposit</Text>
//                   <Text className="text-sm">My Deposit history</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={transaction}
//               className="flex-1 bg-white rounded-xl shadow-md"
//             >
//               <View className="container flex-row justify-center items-center gap-3 p-3">
//                 <FontAwesome5 name="credit-card" size={20} color="#f39c12" />
//                 <View>
//                   <Text className="text-sm font-bold">Withdraw</Text>
//                   <Text className="text-gray-600 text-sm">
//                     My Withdraw history
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Section 4 */}
//         <View className="bg-white mx-4 rounded-lg my-2 mb-4">
//           <Link href="/Profile">
//             <View className="container flex-row justify-between items-center p-3 border-b border-gray-300">
//               <View className="flex-row items-center gap-2">
//                 <Image
//                   className="w-10 h-8"
//                   source={require("../../assets/images/promote.png")}
//                   resizeMode="contain"
//                 />
//                 <Text className="text-lg font-bold">My Profile</Text>
//               </View>
//               <View>
//                 <Image
//                   className="w-9 h-10"
//                   source={require("../../assets/images/next.png")}
//                   resizeMode="contain"
//                 />
//               </View>
//             </View>
//           </Link>

//           <TouchableOpacity
//             onPress={settings}
//             className="container flex-row justify-between items-center p-3 border-b border-gray-300"
//           >
//             <View className="flex-row items-center gap-2">
//               <Image
//                 className="w-10 h-8"
//                 source={require("../../assets/images/setting.png")}
//                 resizeMode="contain"
//               />
//               <Text className="text-lg font-bold">Settings</Text>
//             </View>
//             <View>
//               <Image
//                 className="w-9 h-10"
//                 source={require("../../assets/images/next.png")}
//                 resizeMode="contain"
//               />
//             </View>
//           </TouchableOpacity>
          
//           <Link href="/AboutUs">
//             <View className="container flex-row justify-between items-center p-3 border-b border-gray-300">
//               <View className="flex-row items-center gap-2">
//                 <Image
//                   className="w-10 h-8"
//                   source={require("../../assets/images/agent.png")}
//                   resizeMode="contain"
//                 />
//                 <Text className="text-lg font-bold">About Us</Text>
//               </View>
//               <View>
//                 <Image
//                   className="w-9 h-10"
//                   source={require("../../assets/images/next.png")}
//                   resizeMode="contain"
//                 />
//               </View>
//             </View>
//           </Link>

//           <TouchableOpacity
//             onPress={support}
//             className="container flex-row justify-between items-center p-3 border-b border-gray-300"
//           >
//             <View className="flex-row items-center gap-2">
//               <Image
//                 className="w-10 h-8"
//                 source={require("../../assets/images/ticket.png")}
//                 resizeMode="contain"
//               />
//               <Text className="text-lg font-bold">Support</Text>
//             </View>
//             <View>
//               <Image
//                 className="w-9 h-10"
//                 source={require("../../assets/images/next.png")}
//                 resizeMode="contain"
//               />
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => setPopupVisible(true)}
//             className="container flex-row justify-between items-center p-3 border-b border-gray-300"
//           >
//             <View className="flex-row items-center gap-2">
//               <Image
//                 className="w-10 h-8"
//                 source={require("../../assets/images/videos.png")}
//                 resizeMode="contain"
//               />
//               <Text className="text-lg font-bold">Guide</Text>
//             </View>
//             <View>
//               <Image
//                 className="w-9 h-10"
//                 source={require("../../assets/images/next.png")}
//                 resizeMode="contain"
//               />
//               <GPopup
//                 visible={isPopupVisible}
//                 onClose={() => setPopupVisible(false)}
//               />
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={handleDownload}
//             className="container flex-row justify-between items-center p-3 border-b border-gray-300"
//           >
//             <View className="flex-row items-center gap-2">
//               <Image
//                 className="w-10 h-8"
//                 source={require("../../assets/images/app.png")}
//                 resizeMode="contain"
//               />
//               <Text className="text-lg font-bold">App Download</Text>
//             </View>
//             <View>
//               <Image
//                 className="w-9 h-10"
//                 source={require("../../assets/images/next.png")}
//                 resizeMode="contain"
//               />
//             </View>
//           </TouchableOpacity>
//           <Telegram />
//         </View>

//         {/* Logout Section */}
//         <View className="mt-2 mb-6 mx-4">
//           <TouchableOpacity className="bg-green-500 py-3 rounded-full items-center">
//             <Text className="text-white text-lg font-extrabold">Log Out</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default Account;

// import React from "react";
// import { useState } from "react";
// import { StatusBar as RNStatusBar } from "react-native";
// import { StatusBar } from "expo-status-bar";

// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Linking,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import {
//   FontAwesome5,
//   FontAwesome,
//   Feather,
//   MaterialIcons,
//   Fontisto,
// } from "@expo/vector-icons";
// import { Link, useRouter } from "expo-router";
// import GPopup from "@/Components/GPopup";
// import Telegram from "@/Components/Telegram";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Type definitions for user profile
// interface UserProfile {
//   _id: string;
//   name: string;
//   number: {
//     value: string;
//     verified: boolean;
//   };
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// interface UserProfileResponse {
//   success: boolean;
//   message: string;
//   data: UserProfile;
// }

// const Account = () => {
//   const [balance, setBalance] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [profileLoading, setProfileLoading] = useState(false);
//   const [logoutLoading, setLogoutLoading] = useState(false);

//   const router = useRouter();

//   const fetchUserProfile = async () => {
//     try {
//       setProfileLoading(true);
//       const token = await AsyncStorage.getItem("token");

//       if (!token) {
//         console.error("No token found");
//         setProfileLoading(false);
//         return;
//       }

//       const response = await fetch(
//         "http://192.154.230.43:3000/api/users/profile", // Update with your actual profile endpoint
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data: UserProfileResponse = await response.json();
//       console.log("Profile API Response:", data); // Debugging

//       if (data.success && data.data) {
//         setUserProfile(data.data);
//       } else {
//         console.error("Failed to fetch user profile:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//     } finally {
//       setProfileLoading(false);
//     }
//   };

//   const fetchBalance = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem("token");

//       if (!token) {
//         console.error("No token found");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(
//         "http://192.154.230.43:3000/api/wallet/balance",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json();
//       console.log("API Response:", data); // Debugging

//       if (
//         data.status === "success" &&
//         data.data &&
//         data.data.balance !== undefined
//       ) {
//         // Fix floating point precision issues and round to 2 decimal places
//         const roundedBalance = Math.round(data.data.balance * 100) / 100;
//         setBalance(roundedBalance);
//       } else {
//         console.error("Failed to fetch balance:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     Alert.alert(
//       "Confirm Logout",
//       "Are you sure you want to log out?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Log Out",
//           style: "destructive",
//           onPress: async () => {
//             try {
//               setLogoutLoading(true);
              
//               // Clear all stored authentication data
//               await AsyncStorage.multiRemove([
//                 'token', 
//                 'user', 
//                 'userProfile', 
//                 'isLoggedIn',
//                 'refreshToken', // if you use refresh tokens
//               ]);

//               // Optional: Call logout API endpoint if your backend requires it
//               // You can uncomment and modify this section if needed
//               /*
//               const token = await AsyncStorage.getItem("token");
//               if (token) {
//                 try {
//                   await fetch("http://192.154.230.43:3000/api/auth/logout", {
//                     method: "POST",
//                     headers: {
//                       Authorization: `Bearer ${token}`,
//                       "Content-Type": "application/json",
//                     },
//                   });
//                 } catch (error) {
//                   console.log("Logout API call failed:", error);
//                 }
//               }
//               */

//               console.log("User logged out successfully");
              
//               // Reset all state
//               setBalance(null);
//               setUserProfile(null);
              
//               // Navigate to login screen
//               // Replace with your actual login/auth screen route
//               router.replace("/"); // or "/auth" or whatever your login screen is
              
//             } catch (error) {
//               console.error("Error during logout:", error);
//               Alert.alert("Error", "Failed to log out. Please try again.");
//             } finally {
//               setLogoutLoading(false);
//             }
//           },
//         },
//       ]
//     );
//   };

//   useEffect(() => {
//     fetchBalance();
//     fetchUserProfile();
//   }, []);

//   const handleDownload = () => {
//     const apkUrl = "https://diuvin.com/app.apk"; // replace with your APK URL
//     Linking.openURL(apkUrl).catch((err) =>
//       console.error("Failed to open URL", err)
//     );
//   };

//   const support = () => {
//     router.push("/Support");
//   };

//   const settings = () => {
//     router.push("/ChangePassword");
//   };

//   const wallet = () => {
//     router.push("/Wallet");
//   };
//   const deposit = () => {
//     router.push("/AddMoney");
//   };
//   const withraw = () => {
//     router.push("/WithdrawMoney");
//   };

//   const transaction = () => {
//     router.push("/BetHistory");
//   };

//   const [isPopupVisible, setPopupVisible] = useState(false);

//   return (
//     <View className="flex-1 bg-green-50">
//       {/* Status Bar with custom background */}
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

//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         {/* Header Section */}
//         <View className="bg-green-500 pt-16 p-5 items-center rounded-b-[30px] pb-20">
//           <View className="flex flex-row items-center">
//             <Image
//               source={require("../../assets/images/Profile.png")}
//               className="w-16 h-16 rounded-full border-2 border-white"
//             />
//             <View className="ml-4">
//               {profileLoading ? (
//                 <>
//                   <Text className="text-lg font-bold text-white">Loading...</Text>
//                   <Text className="text-sm text-white">UID: Loading...</Text>
//                   <Text className="text-sm text-white">Mobile: Loading...</Text>
//                 </>
//               ) : userProfile ? (
//                 <>
//                   <Text className="text-lg font-bold text-white">
//                     {userProfile.name}
//                   </Text>
//                   <Text className="text-sm text-white">
//                     UID: {userProfile._id}
//                   </Text>
//                   <Text className="text-sm text-white">
//                     Mobile: {userProfile.number.value}
//                   </Text>
//                 </>
//               ) : (
//                 <>
//                   <Text className="text-lg font-bold text-white">
//                     MemberpD6SF
//                   </Text>
//                   <Text className="text-sm text-white">UID: 369751</Text>
//                   <Text className="text-sm text-white">
//                     Mobile: +9189**091236
//                   </Text>
//                 </>
//               )}
//             </View>
//           </View>
//         </View>

//         {/* Balance Section */}
//         <View className="bg-white p-4 rounded-xl flex flex-col shadow-md mx-4 -mt-12">
//           <View className="flex flex-row justify-between items-center shadow-md">
//             <Text className="text-gray-700 font-bold text-lg">Total Balance</Text>
//             <TouchableOpacity
//               className="flex flex-row items-center"
//               onPress={fetchBalance}
//             >
//               {loading ? (
//                 <ActivityIndicator size="small" color="#16a34a" />
//               ) : (
//                 <>
//                   <Text className="text-green-600 font-bold text-xl">
//                     {balance !== null ? `₹${balance}` : "₹0"}
//                   </Text>
//                   <FontAwesome5
//                     name="sync-alt"
//                     size={16}
//                     color="#ccc"
//                     className="ml-2"
//                   />
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>

//           <View className="mt-4 flex flex-row justify-around">
//             <TouchableOpacity onPress={wallet} className="items-center">
//               <Fontisto name="wallet" size={24} color="#ff5e57" />
//               <Text className="text-gray-600 mt-2">Wallet</Text>
//             </TouchableOpacity>

//             <TouchableOpacity className="items-center" onPress={deposit}>
//               <FontAwesome5 name="piggy-bank" size={24} color="#ffa502" />
//               <Text className="text-gray-600 mt-2">Deposit</Text>
//             </TouchableOpacity>
//             <TouchableOpacity className="items-center" onPress={withraw}>
//               <MaterialIcons name="credit-card" size={24} color="#1e90ff" />
//               <Text className="text-gray-600 mt-2">Withdraw</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* History Section */}
//         <View className="mx-4 mt-4">
//           <View className="container flex flex-row justify-between gap-3">
//             <TouchableOpacity
//               onPress={transaction}
//               className="flex-1 bg-white rounded-xl shadow-md "
//             >
//               <View className="container flex-row items-center gap-3 justify-center p-3">
//                 <FontAwesome5 name="money-bill" size={26} color="#3498db" />
//                 <View>
//                   <Text className="text-sm font-bold">Bet</Text>
//                   <Text className="text-sm">My Bet History</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//             <View className="flex-1 bg-white rounded-xl shadow-md ">
//               <Link href="/Transaction">
//                 {" "}
//                 <View className="conatiner flex-row gap-3 justify-center items-center p-3">
//                   <FontAwesome5 name="exchange-alt" size={26} color="#27ae60" />
//                   <View>
//                     <Text className="font-semibold">Transaction</Text>
//                     <Text className="text-gray- text-sm">My Transaction</Text>
//                   </View>
//                 </View>
//               </Link>
//             </View>
//           </View>

//           <View className="flex flex-row justify-between my-3 gap-3">
//             <TouchableOpacity
//               onPress={transaction}
//               className="flex-1 bg-white rounded-xl shadow-md "
//             >
//               <View className="container flex-row justify-center items-center gap-3 p-3">
//                 <FontAwesome5 name="piggy-bank" size={26} color="#e74c3c" />
//                 <View>
//                   <Text className="text-sm font-bold">Deposit</Text>
//                   <Text className="text-sm">My Deposit history</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={transaction}
//               className="flex-1 bg-white rounded-xl shadow-md"
//             >
//               <View className="container flex-row justify-center items-center gap-3 p-3">
//                 <FontAwesome5 name="credit-card" size={20} color="#f39c12" />
//                 <View>
//                   <Text className="text-sm font-bold">Withdraw</Text>
//                   <Text className="text-gray-600 text-sm">
//                     My Withdraw history
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Section 4 */}
//         <View className="bg-white mx-4 rounded-lg my-2 mb-4">
//           <Link href="/Profile">
//             <View className="container flex-row justify-between items-center p-3 border-b border-gray-300">
//               <View className="flex-row items-center gap-2">
//                 <Image
//                   className="w-10 h-8"
//                   source={require("../../assets/images/promote.png")}
//                   resizeMode="contain"
//                 />
//                 <Text className="text-lg font-bold">My Profile</Text>
//               </View>
//               <View>
//                 <Image
//                   className="w-9 h-10"
//                   source={require("../../assets/images/next.png")}
//                   resizeMode="contain"
//                 />
//               </View>
//             </View>
//           </Link>

//           <TouchableOpacity
//             onPress={settings}
//             className="container flex-row justify-between items-center p-3 border-b border-gray-300"
//           >
//             <View className="flex-row items-center gap-2">
//               <Image
//                 className="w-10 h-8"
//                 source={require("../../assets/images/setting.png")}
//                 resizeMode="contain"
//               />
//               <Text className="text-lg font-bold">Settings</Text>
//             </View>
//             <View>
//               <Image
//                 className="w-9 h-10"
//                 source={require("../../assets/images/next.png")}
//                 resizeMode="contain"
//               />
//             </View>
//           </TouchableOpacity>
          
//           <Link href="/AboutUs">
//             <View className="container flex-row justify-between items-center p-3 border-b border-gray-300">
//               <View className="flex-row items-center gap-2">
//                 <Image
//                   className="w-10 h-8"
//                   source={require("../../assets/images/agent.png")}
//                   resizeMode="contain"
//                 />
//                 <Text className="text-lg font-bold">About Us</Text>
//               </View>
//               <View>
//                 <Image
//                   className="w-9 h-10"
//                   source={require("../../assets/images/next.png")}
//                   resizeMode="contain"
//                 />
//               </View>
//             </View>
//           </Link>

//           <TouchableOpacity
//             onPress={support}
//             className="container flex-row justify-between items-center p-3 border-b border-gray-300"
//           >
//             <View className="flex-row items-center gap-2">
//               <Image
//                 className="w-10 h-8"
//                 source={require("../../assets/images/ticket.png")}
//                 resizeMode="contain"
//               />
//               <Text className="text-lg font-bold">Support</Text>
//             </View>
//             <View>
//               <Image
//                 className="w-9 h-10"
//                 source={require("../../assets/images/next.png")}
//                 resizeMode="contain"
//               />
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => setPopupVisible(true)}
//             className="container flex-row justify-between items-center p-3 border-b border-gray-300"
//           >
//             <View className="flex-row items-center gap-2">
//               <Image
//                 className="w-10 h-8"
//                 source={require("../../assets/images/videos.png")}
//                 resizeMode="contain"
//               />
//               <Text className="text-lg font-bold">Guide</Text>
//             </View>
//             <View>
//               <Image
//                 className="w-9 h-10"
//                 source={require("../../assets/images/next.png")}
//                 resizeMode="contain"
//               />
//               <GPopup
//                 visible={isPopupVisible}
//                 onClose={() => setPopupVisible(false)}
//               />
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={handleDownload}
//             className="container flex-row justify-between items-center p-3 border-b border-gray-300"
//           >
//             <View className="flex-row items-center gap-2">
//               <Image
//                 className="w-10 h-8"
//                 source={require("../../assets/images/app.png")}
//                 resizeMode="contain"
//               />
//               <Text className="text-lg font-bold">App Download</Text>
//             </View>
//             <View>
//               <Image
//                 className="w-9 h-10"
//                 source={require("../../assets/images/next.png")}
//                 resizeMode="contain"
//               />
//             </View>
//           </TouchableOpacity>
//           <Telegram />
//         </View>

//         {/* Logout Section */}
//         <View className="mt-2 mb-6 mx-4">
//           <TouchableOpacity 
//             className="bg-green-500 py-3 rounded-full items-center flex-row justify-center"
//             onPress={handleLogout}
//             disabled={logoutLoading}
//           >
//             {logoutLoading ? (
//               <ActivityIndicator size="small" color="#ffffff" />
//             ) : (
//               <Text className="text-white text-lg font-extrabold">Log Out</Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default Account;

import React from "react";
import { useState } from "react";
import { StatusBar as RNStatusBar } from "react-native";
import { StatusBar } from "expo-status-bar";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  Feather,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import GPopup from "@/Components/GPopup";
import Telegram from "@/Components/Telegram";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/Components/Auth";

// Type definitions for user profile
interface UserProfile {
  _id: string;
  name: string;
  number: {
    value: string;
    verified: boolean;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

const Account = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Use the auth context
  const { logout } = useAuth();
  const router = useRouter();

  const fetchUserProfile = async () => {
    try {
      setProfileLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        setProfileLoading(false);
        return;
      }

      const response = await fetch(
        "http://192.154.230.43:3000/api/users/profile", // Update with your actual profile endpoint
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data: UserProfileResponse = await response.json();
      console.log("Profile API Response:", data); // Debugging

      if (data.success && data.data) {
        setUserProfile(data.data);
      } else {
        console.error("Failed to fetch user profile:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://192.154.230.43:3000/api/wallet/balance",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("API Response:", data); // Debugging

      if (
        data.status === "success" &&
        data.data &&
        data.data.balance !== undefined
      ) {
        // Fix floating point precision issues and round to 2 decimal places
        const roundedBalance = Math.round(data.data.balance * 100) / 100;
        setBalance(roundedBalance);
      } else {
        console.error("Failed to fetch balance:", data.message);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  };

  // Updated logout function using AuthContext
  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              setLogoutLoading(true);
              
              // Optional: Call logout API endpoint if your backend requires it
              try {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                  await fetch("http://192.154.230.43:3000/api/auth/logout", {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  });
                }
              } catch (apiError) {
                console.log("Logout API call failed:", apiError);
                // Continue with logout even if API fails
              }

              // Use the logout function from AuthContext
              await logout();

              // Reset local component state
              setBalance(null);
              setUserProfile(null);
              
              // Navigate to home screen
              router.replace("/");
              
              // Show success message
              Alert.alert("Success", "You have been logged out successfully");
              
            } catch (error) {
              console.error("Error during logout:", error);
              Alert.alert("Error", "Failed to log out. Please try again.");
            } finally {
              setLogoutLoading(false);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchBalance();
    fetchUserProfile();
  }, []);

  const handleDownload = () => {
    const apkUrl = "https://diuvin.com/app.apk"; // replace with your APK URL
    Linking.openURL(apkUrl).catch((err) =>
      console.error("Failed to open URL", err)
    );
  };

  const support = () => {
    router.push("/Support");
  };

  const settings = () => {
    router.push("/ChangePassword");
  };

  const wallet = () => {
    router.push("/Wallet");
  };
  const deposit = () => {
    router.push("/AddMoney");
  };
  const withraw = () => {
    router.push("/WithdrawMoney");
  };

  const transaction = () => {
    router.push("/BetHistory");
  };

  const [isPopupVisible, setPopupVisible] = useState(false);

  return (
    <View className="flex-1 bg-green-50">
      {/* Status Bar with custom background */}
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

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="bg-green-500 pt-16 p-5 items-center rounded-b-[30px] pb-20">
          <View className="flex flex-row items-center">
            <Image
              source={require("../../assets/images/Profile.png")}
              className="w-16 h-16 rounded-full border-2 border-white"
            />
            <View className="ml-4">
              {profileLoading ? (
                <>
                  <Text className="text-lg font-bold text-white">Loading...</Text>
                  <Text className="text-sm text-white">UID: Loading...</Text>
                  <Text className="text-sm text-white">Mobile: Loading...</Text>
                </>
              ) : userProfile ? (
                <>
                  <Text className="text-lg font-bold text-white">
                    {userProfile.name}
                  </Text>
                  <Text className="text-sm text-white">
                    UID: {userProfile._id}
                  </Text>
                  <Text className="text-sm text-white">
                    Mobile: {userProfile.number.value}
                  </Text>
                </>
              ) : (
                <>
                  <Text className="text-lg font-bold text-white">
                    MemberpD6SF
                  </Text>
                  <Text className="text-sm text-white">UID: 369751</Text>
                  <Text className="text-sm text-white">
                    Mobile: +9189**091236
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Balance Section */}
        <View className="bg-white p-4 rounded-xl flex flex-col shadow-md mx-4 -mt-12">
          <View className="flex flex-row justify-between items-center shadow-md">
            <Text className="text-gray-700 font-bold text-lg">Total Balance</Text>
            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={fetchBalance}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#16a34a" />
              ) : (
                <>
                  <Text className="text-green-600 font-bold text-xl">
                    {balance !== null ? `₹${balance}` : "₹0"}
                  </Text>
                  <FontAwesome5
                    name="sync-alt"
                    size={16}
                    color="#ccc"
                    className="ml-2"
                  />
                </>
              )}
            </TouchableOpacity>
          </View>

          <View className="mt-4 flex flex-row justify-around">
            <TouchableOpacity onPress={wallet} className="items-center">
              <Fontisto name="wallet" size={24} color="#ff5e57" />
              <Text className="text-gray-600 mt-2">Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center" onPress={deposit}>
              <FontAwesome5 name="piggy-bank" size={24} color="#ffa502" />
              <Text className="text-gray-600 mt-2">Deposit</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center" onPress={withraw}>
              <MaterialIcons name="credit-card" size={24} color="#1e90ff" />
              <Text className="text-gray-600 mt-2">Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* History Section */}
        <View className="mx-4 mt-4">
          <View className="container flex flex-row justify-between gap-3">
            <TouchableOpacity
              onPress={transaction}
              className="flex-1 bg-white rounded-xl shadow-md "
            >
              <View className="container flex-row items-center gap-3 justify-center p-3">
                <FontAwesome5 name="money-bill" size={26} color="#3498db" />
                <View>
                  <Text className="text-sm font-bold">Bet</Text>
                  <Text className="text-sm">My Bet History</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View className="flex-1 bg-white rounded-xl shadow-md ">
              <Link href="/Transaction">
                {" "}
                <View className="conatiner flex-row gap-3 justify-center items-center p-3">
                  <FontAwesome5 name="exchange-alt" size={26} color="#27ae60" />
                  <View>
                    <Text className="font-semibold">Transaction</Text>
                    <Text className="text-gray- text-sm">My Transaction</Text>
                  </View>
                </View>
              </Link>
            </View>
          </View>

          <View className="flex flex-row justify-between my-3 gap-3">
            <TouchableOpacity
              onPress={transaction}
              className="flex-1 bg-white rounded-xl shadow-md "
            >
              <View className="container flex-row justify-center items-center gap-3 p-3">
                <FontAwesome5 name="piggy-bank" size={26} color="#e74c3c" />
                <View>
                  <Text className="text-sm font-bold">Deposit</Text>
                  <Text className="text-sm">My Deposit history</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={transaction}
              className="flex-1 bg-white rounded-xl shadow-md"
            >
              <View className="container flex-row justify-center items-center gap-3 p-3">
                <FontAwesome5 name="credit-card" size={20} color="#f39c12" />
                <View>
                  <Text className="text-sm font-bold">Withdraw</Text>
                  <Text className="text-gray-600 text-sm">
                    My Withdraw history
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 4 */}
        <View className="bg-white mx-4 rounded-lg my-2 mb-4">
          <Link href="/Profile">
            <View className="container flex-row justify-between items-center p-3 border-b border-gray-300">
              <View className="flex-row items-center gap-2">
                <Image
                  className="w-10 h-8"
                  source={require("../../assets/images/promote.png")}
                  resizeMode="contain"
                />
                <Text className="text-lg font-bold">My Profile</Text>
              </View>
              <View>
                <Image
                  className="w-9 h-10"
                  source={require("../../assets/images/next.png")}
                  resizeMode="contain"
                />
              </View>
            </View>
          </Link>

          <TouchableOpacity
            onPress={settings}
            className="container flex-row justify-between items-center p-3 border-b border-gray-300"
          >
            <View className="flex-row items-center gap-2">
              <Image
                className="w-10 h-8"
                source={require("../../assets/images/setting.png")}
                resizeMode="contain"
              />
              <Text className="text-lg font-bold">Settings</Text>
            </View>
            <View>
              <Image
                className="w-9 h-10"
                source={require("../../assets/images/next.png")}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          
          <Link href="/AboutUs">
            <View className="container flex-row justify-between items-center p-3 border-b border-gray-300">
              <View className="flex-row items-center gap-2">
                <Image
                  className="w-10 h-8"
                  source={require("../../assets/images/agent.png")}
                  resizeMode="contain"
                />
                <Text className="text-lg font-bold">About Us</Text>
              </View>
              <View>
                <Image
                  className="w-9 h-10"
                  source={require("../../assets/images/next.png")}
                  resizeMode="contain"
                />
              </View>
            </View>
          </Link>

          <TouchableOpacity
            onPress={support}
            className="container flex-row justify-between items-center p-3 border-b border-gray-300"
          >
            <View className="flex-row items-center gap-2">
              <Image
                className="w-10 h-8"
                source={require("../../assets/images/ticket.png")}
                resizeMode="contain"
              />
              <Text className="text-lg font-bold">Support</Text>
            </View>
            <View>
              <Image
                className="w-9 h-10"
                source={require("../../assets/images/next.png")}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPopupVisible(true)}
            className="container flex-row justify-between items-center p-3 border-b border-gray-300"
          >
            <View className="flex-row items-center gap-2">
              <Image
                className="w-10 h-8"
                source={require("../../assets/images/videos.png")}
                resizeMode="contain"
              />
              <Text className="text-lg font-bold">Guide</Text>
            </View>
            <View>
              <Image
                className="w-9 h-10"
                source={require("../../assets/images/next.png")}
                resizeMode="contain"
              />
              <GPopup
                visible={isPopupVisible}
                onClose={() => setPopupVisible(false)}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDownload}
            className="container flex-row justify-between items-center p-3 border-b border-gray-300"
          >
            <View className="flex-row items-center gap-2">
              <Image
                className="w-10 h-8"
                source={require("../../assets/images/app.png")}
                resizeMode="contain"
              />
              <Text className="text-lg font-bold">App Download</Text>
            </View>
            <View>
              <Image
                className="w-9 h-10"
                source={require("../../assets/images/next.png")}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <Telegram />
        </View>

        {/* Logout Section */}
        <View className="mt-2 mb-6 mx-4">
          <TouchableOpacity 
            className="bg-green-500 py-3 rounded-full items-center flex-row justify-center"
            onPress={handleLogout}
            disabled={logoutLoading}
          >
            {logoutLoading ? (
              <>
                <ActivityIndicator size="small" color="#ffffff" className="mr-2" />
                <Text className="text-white text-lg font-extrabold">Logging out...</Text>
              </>
            ) : (
              <Text className="text-white text-lg font-extrabold">Log Out</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Account;