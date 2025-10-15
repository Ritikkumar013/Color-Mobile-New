// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   RefreshControl,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';


// // Types
// interface Bet {
//   _id: string;
//   userId: string;
//   period: string;
//   gameDuration: number;
//   betAmount: number;
//   betType: 'size' | 'number' | 'color';
//   betValue: string[];
//   status: 'lost' | 'pending' | 'won';
//   winnings: number;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// interface BetHistoryData {
//   status: string;
//   statusCode: number;
//   message: string;
//   data: {
//     page: number;
//     limit: number;
//     totalPages: number;
//     totalBets: number;
//     bets: Bet[];
//   };
// }

// const BetHistoryScreen: React.FC = () => {
//   const router = useRouter();
//   const [betHistory, setBetHistory] = useState<BetHistoryData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [currentPage, setCurrentPage] = useState<number>(1);
  

//   // Format date function
//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     const options: Intl.DateTimeFormatOptions = {
//       weekday: 'short',
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: true
//     };
//     return date.toLocaleDateString('en-US', options);
//   };

//   // Get bet title
//   const getBetTitle = (betType: string, betValue: string[]): string => {
//     if (betType === 'size') {
//       return `Bet: ${betValue[0]}`;
//     } else if (betType === 'number') {
//       return `Bet: ${betValue[0]}`;
//     } else if (betType === 'color') {
//       return `Bet: ${betValue[0]}`;
//     }
//     return 'Bet';
//   };

//   // Get status color classes
//   const getStatusColorClass = (status: string): string => {
//     switch (status) {
//       case 'lost':
//         return 'text-red-500';
//       case 'pending':
//         return 'text-yellow-500';
//       case 'won':
//         return 'text-green-500';
//       default:
//         return 'text-gray-500';
//     }
//   };

//   // Format amount with proper prefix
//   const formatAmount = (amount: number, status: string): string => {
//     const prefix = status === 'lost' ? '- ₹ ' : status === 'won' ? '+ ₹ ' : '₹ ';
//     return prefix + amount.toFixed(1);
//   };

//   // Fetch bet history - replace with actual API call
//   const fetchBetHistory = async (page: number = 1) => {
//     try {
//       setLoading(true);
     
//       const response = await fetch(`http://192.154.230.43:3000/api/users/history?page=${page}`);
//       const data = await response.json();
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setBetHistory(data);
//     } catch (error) {
//       console.error('Error fetching bet history:', error);
//       Alert.alert('Error', 'Failed to fetch bet history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle refresh
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchBetHistory(currentPage);
//     setRefreshing(false);
//   };

//   // Load more data (pagination)
//   const loadPage = async (page: number) => {
//     if (page < 1 || (betHistory && page > betHistory.data.totalPages)) return;
//     setCurrentPage(page);
//     await fetchBetHistory(page);
//   };

//   // Initial load
//   useEffect(() => {
//     fetchBetHistory();
//   }, []);

//   // Render bet item
//   const renderBetItem = (bet: Bet) => {
//     const gameNumber = bet.period.split('-').pop();
    
//     return (
//       <View key={bet._id} className="bg-gray-50 rounded-xl p-5 mb-4 shadow-sm">
//         <StatusBar style="dark" />
//         <View className="flex-row justify-between items-start mb-3">
//           <Text className="text-lg font-semibold text-gray-800">
//             {getBetTitle(bet.betType, bet.betValue)}
//           </Text>
//           <View className="items-end">
//             <Text className={`text-base font-semibold mb-1 ${getStatusColorClass(bet.status)}`}>
//               {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
//             </Text>
//             <Text className={`text-base font-semibold ${getStatusColorClass(bet.status)}`}>
//               {formatAmount(bet.betAmount, bet.status)}
//             </Text>
//           </View>
//         </View>
        
//         <View className="space-y-1">
//           <Text className="text-sm text-gray-600">Period: {bet.period}</Text>
//           <Text className="text-sm text-gray-600">Game: {gameNumber}</Text>
//           <Text className="text-sm text-gray-600">{formatDate(bet.createdAt)}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View className="flex-1 bg-white">
//       {/* Header */}

//       {/* Content */}
//       <View className="flex-1">
//         {loading && !betHistory ? (
//           <View className="flex-1 justify-center items-center">
//             <ActivityIndicator size="large" color="#10b981" />
//             <Text className="text-gray-500 mt-2">Loading bet history...</Text>
//           </View>
//         ) : (
//           <ScrollView
//             className="flex-1"
//             refreshControl={
//               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#10b981']} />
//             }
//           >
//           <View className="p-5">
//             {betHistory?.data.bets && betHistory.data.bets.length > 0 ? (
//               betHistory.data.bets.map(renderBetItem)
//             ) : (
//               <View className="flex-1 justify-center items-center py-20">
//                 <Text className="text-gray-400 text-lg">No bet history found</Text>
//               </View>
//             )}
//           </View>

//           {/* Pagination */}
//           {betHistory && betHistory.data.totalPages > 1 && (
//             <View className="px-5 pb-5">
//               <View className="flex-row justify-between items-center bg-gray-50 rounded-lg p-4">
//                 <TouchableOpacity
//                   onPress={() => loadPage(currentPage - 1)}
//                   disabled={currentPage <= 1}
//                   className={`px-4 py-2 rounded-md ${
//                     currentPage <= 1 ? 'bg-gray-300' : 'bg-green-500'
//                   }`}
//                 >
//                   <Text className={`font-medium ${
//                     currentPage <= 1 ? 'text-gray-500' : 'text-white'
//                   }`}>
//                     Previous
//                   </Text>
//                 </TouchableOpacity>

//                 <Text className="text-gray-600 font-medium">
//                   Page {betHistory.data.page} of {betHistory.data.totalPages}
//                 </Text>

//                 <TouchableOpacity
//                   onPress={() => loadPage(currentPage + 1)}
//                   disabled={currentPage >= betHistory.data.totalPages}
//                   className={`px-4 py-2 rounded-md ${
//                     currentPage >= betHistory.data.totalPages ? 'bg-gray-300' : 'bg-green-500'
//                   }`}
//                 >
//                   <Text className={`font-medium ${
//                     currentPage >= betHistory.data.totalPages ? 'text-gray-500' : 'text-white'
//                   }`}>
//                     Next
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//           </ScrollView>
//         )}
//       </View>
//     </View>
//   );
// };

// export default BetHistoryScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StstusBar  from "@/Components/StstusBar";

// Types
interface Bet {
  _id: string;
  userId: string;
  period: string;
  gameDuration: number;
  betAmount: number;
  betType: "size" | "number" | "color";
  betValue: string[];
  status: "lost" | "pending" | "won";
  winnings: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface BetHistoryData {
  page: number;
  limit: number;
  totalPages: number;
  totalBets: number;
  bets: Bet[];
}

const BetHistoryScreen: React.FC = () => {
  const [betHistory, setBetHistory] = useState<BetHistoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // Get bet title
  const getBetTitle = (betType: string, betValue: string[]): string => {
    if (betValue.length > 0) return `Bet: ${betValue[0]}`;
    return "Bet";
  };

  // Get status color classes
  const getStatusColorClass = (status: string): string => {
    switch (status) {
      case "lost":
        return "text-red-500";
      case "pending":
        return "text-yellow-500";
      case "won":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  // Format amount
  const formatAmount = (amount: number, status: string): string => {
    const prefix =
      status === "lost" ? "- ₹ " : status === "won" ? "+ ₹ " : "₹ ";
    return prefix + amount.toFixed(1);
  };

  // Fetch bet history from backend
  const fetchBetHistory = async (page: number = 1) => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(
        `http://192.154.230.43:3000/api/users/history?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // expect backend response shape → { data: { page, totalPages, bets, ... } }
      setBetHistory(data.data);
    } catch (error) {
      console.error("Error fetching bet history:", error);
      Alert.alert("Error", "Failed to fetch bet history");
    } finally {
      setLoading(false);
    }
  };

  // Refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBetHistory(currentPage);
    setRefreshing(false);
  };

  // Load another page
  const loadPage = async (page: number) => {
    if (page < 1 || (betHistory && page > betHistory.totalPages)) return;
    setCurrentPage(page);
    await fetchBetHistory(page);
  };

  useEffect(() => {
    fetchBetHistory();
  }, []);

  // Render bet item
  const renderBetItem = (bet: Bet) => {
    const gameNumber = bet.period.split("-").pop();

    return (
      <View key={bet._id} className="bg-gray-50 rounded-xl p-5 mb-4 shadow-sm">
        <StatusBar style="dark" />
        <View className="flex-row justify-between items-start mb-3">
          <Text className="text-lg font-semibold text-gray-800">
            {getBetTitle(bet.betType, bet.betValue)}
          </Text>
          <View className="items-end">
            <Text
              className={`text-base font-semibold mb-1 ${getStatusColorClass(
                bet.status
              )}`}
            >
              {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
            </Text>
            <Text
              className={`text-base font-semibold ${getStatusColorClass(
                bet.status
              )}`}
            >
              {formatAmount(bet.betAmount, bet.status)}
            </Text>
          </View>
        </View>

        <View className="space-y-1">
          <Text className="text-sm text-gray-600">Period: {bet.period}</Text>
          <Text className="text-sm text-gray-600">Game: {gameNumber}</Text>
          <Text className="text-sm text-gray-600">{formatDate(bet.createdAt)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <StstusBar />
      <View className="flex-1 mt-10">
        {loading && !betHistory ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#10b981" />
            <Text className="text-gray-500 mt-2">Loading bet history...</Text>
          </View>
        ) : (
          <ScrollView
            className="flex-1"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#10b981"]}
              />
            }
          >
            <View className="p-5">
              {betHistory?.bets && betHistory.bets.length > 0 ? (
                betHistory.bets.map(renderBetItem)
              ) : (
                <View className="flex-1 justify-center items-center py-20">
                  <Text className="text-gray-400 text-lg">
                    No bet history found
                  </Text>
                </View>
              )}
            </View>

            {/* Pagination */}
            {betHistory && betHistory.totalPages > 1 && (
              <View className="px-5 pb-5">
                <View className="flex-row justify-between items-center bg-gray-50 rounded-lg p-4">
                  <TouchableOpacity
                    onPress={() => loadPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className={`px-4 py-2 rounded-md ${
                      currentPage <= 1 ? "bg-gray-300" : "bg-green-500"
                    }`}
                  >
                    <Text
                      className={`font-medium ${
                        currentPage <= 1 ? "text-gray-500" : "text-white"
                      }`}
                    >
                      Previous
                    </Text>
                  </TouchableOpacity>

                  <Text className="text-gray-600 font-medium">
                    Page {betHistory.page} of {betHistory.totalPages}
                  </Text>

                  <TouchableOpacity
                    onPress={() => loadPage(currentPage + 1)}
                    disabled={currentPage >= betHistory.totalPages}
                    className={`px-4 py-2 rounded-md ${
                      currentPage >= betHistory.totalPages
                        ? "bg-gray-300"
                        : "bg-green-500"
                    }`}
                  >
                    <Text
                      className={`font-medium ${
                        currentPage >= betHistory.totalPages
                          ? "text-gray-500"
                          : "text-white"
                      }`}
                    >
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default BetHistoryScreen;
