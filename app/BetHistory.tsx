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
     
//       const response = await fetch(`https://ctbackend.crobstacle.com/api/users/history?page=${page}`);
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

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   RefreshControl,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import StstusBar  from "@/Components/StstusBar";

// // Types
// interface Bet {
//   _id: string;
//   userId: string;
//   period: string;
//   gameDuration: number;
//   betAmount: number;
//   betType: "size" | "number" | "color";
//   betValue: string[];
//   status: "lost" | "pending" | "won";
//   winnings: number;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// interface BetHistoryData {
//   page: number;
//   limit: number;
//   totalPages: number;
//   totalBets: number;
//   bets: Bet[];
// }

// const BetHistoryScreen: React.FC = () => {
//   const [betHistory, setBetHistory] = useState<BetHistoryData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   // Format date function
//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", {
//       weekday: "short",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     });
//   };

//   // Get bet title
//   const getBetTitle = (betType: string, betValue: string[]): string => {
//     if (betValue.length > 0) return `Bet: ${betValue[0]}`;
//     return "Bet";
//   };

//   // Get status color classes
//   const getStatusColorClass = (status: string): string => {
//     switch (status) {
//       case "lost":
//         return "text-red-500";
//       case "pending":
//         return "text-yellow-500";
//       case "won":
//         return "text-green-500";
//       default:
//         return "text-gray-500";
//     }
//   };

//   // Format amount
//   const formatAmount = (amount: number, status: string): string => {
//     const prefix =
//       status === "lost" ? "- ₹ " : status === "won" ? "+ ₹ " : "₹ ";
//     return prefix + amount.toFixed(1);
//   };

//   // Fetch bet history from backend
//   const fetchBetHistory = async (page: number = 1) => {
//     try {
//       setLoading(true);

//       const token = await AsyncStorage.getItem("token");
//       if (!token) throw new Error("No authentication token found");

//       const response = await fetch(
//         `https://ctbackend.crobstacle.com/api/users/history?page=${page}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`API error: ${response.status}`);
//       }

//       const data = await response.json();

//       // expect backend response shape → { data: { page, totalPages, bets, ... } }
//       setBetHistory(data.data);
//     } catch (error) {
//       console.error("Error fetching bet history:", error);
//       Alert.alert("Error", "Failed to fetch bet history");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refresh
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchBetHistory(currentPage);
//     setRefreshing(false);
//   };

//   // Load another page
//   const loadPage = async (page: number) => {
//     if (page < 1 || (betHistory && page > betHistory.totalPages)) return;
//     setCurrentPage(page);
//     await fetchBetHistory(page);
//   };

//   useEffect(() => {
//     fetchBetHistory();
//   }, []);

//   // Render bet item
//   const renderBetItem = (bet: Bet) => {
//     const gameNumber = bet.period.split("-").pop();

//     return (
//       <View key={bet._id} className="bg-gray-50 rounded-xl p-5 mb-4 shadow-sm">
//         <StatusBar style="dark" />
//         <View className="flex-row justify-between items-start mb-3">
//           <Text className="text-lg font-semibold text-gray-800">
//             {getBetTitle(bet.betType, bet.betValue)}
//           </Text>
//           <View className="items-end">
//             <Text
//               className={`text-base font-semibold mb-1 ${getStatusColorClass(
//                 bet.status
//               )}`}
//             >
//               {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
//             </Text>
//             <Text
//               className={`text-base font-semibold ${getStatusColorClass(
//                 bet.status
//               )}`}
//             >
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
//       <StstusBar />
//       <View className="flex-1 mt-10">
//         {loading && !betHistory ? (
//           <View className="flex-1 justify-center items-center">
//             <ActivityIndicator size="large" color="#10b981" />
//             <Text className="text-gray-500 mt-2">Loading bet history...</Text>
//           </View>
//         ) : (
//           <ScrollView
//             className="flex-1"
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 colors={["#10b981"]}
//               />
//             }
//           >
//             <View className="p-5">
//               {betHistory?.bets && betHistory.bets.length > 0 ? (
//                 betHistory.bets.map(renderBetItem)
//               ) : (
//                 <View className="flex-1 justify-center items-center py-20">
//                   <Text className="text-gray-400 text-lg">
//                     No bet history found
//                   </Text>
//                 </View>
//               )}
//             </View>

//             {/* Pagination */}
//             {betHistory && betHistory.totalPages > 1 && (
//               <View className="px-5 pb-5">
//                 <View className="flex-row justify-between items-center bg-gray-50 rounded-lg p-4">
//                   <TouchableOpacity
//                     onPress={() => loadPage(currentPage - 1)}
//                     disabled={currentPage <= 1}
//                     className={`px-4 py-2 rounded-md ${
//                       currentPage <= 1 ? "bg-gray-300" : "bg-green-500"
//                     }`}
//                   >
//                     <Text
//                       className={`font-medium ${
//                         currentPage <= 1 ? "text-gray-500" : "text-white"
//                       }`}
//                     >
//                       Previous
//                     </Text>
//                   </TouchableOpacity>

//                   <Text className="text-gray-600 font-medium">
//                     Page {betHistory.page} of {betHistory.totalPages}
//                   </Text>

//                   <TouchableOpacity
//                     onPress={() => loadPage(currentPage + 1)}
//                     disabled={currentPage >= betHistory.totalPages}
//                     className={`px-4 py-2 rounded-md ${
//                       currentPage >= betHistory.totalPages
//                         ? "bg-gray-300"
//                         : "bg-green-500"
//                     }`}
//                   >
//                     <Text
//                       className={`font-medium ${
//                         currentPage >= betHistory.totalPages
//                           ? "text-gray-500"
//                           : "text-white"
//                       }`}
//                     >
//                       Next
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
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
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StstusBar from "@/Components/StstusBar";

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

const ITEMS_PER_PAGE = 10;

// --- Bet Item Component ---
const BetItem = ({ item }: { item: Bet }) => {
  const gameNumber = item.period.split("-").pop();
  
  const formattedDate = new Date(item.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Get status color
  const getStatusColorClass = (status: string): string => {
    switch (status) {
      case "lost":
        return "text-red-500";
      case "pending":
        return "text-yellow-500";
      case "won":
        return "text-green-600";
      default:
        return "text-gray-500";
    }
  };

  // Format amount
  const formatAmount = (amount: number, status: string): string => {
    const prefix = status === "lost" ? "- ₹" : status === "won" ? "+ ₹" : "₹";
    return `${prefix}${amount.toFixed(2)}`;
  };

  const getBetTitle = (betType: string, betValue: string[]): string => {
    if (betValue.length > 0) return `${betValue[0]}`;
    return betType;
  };

  const statusColorClass = getStatusColorClass(item.status);

  return (
    <View className="flex-row justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
      <View className="flex-1 mr-3">
        {/* Main Text: Bet Value */}
        <Text className="text-sm font-bold text-gray-800">
          Bet: {getBetTitle(item.betType, item.betValue)}
        </Text>
        {/* Sub Text: Period and Game */}
        <Text className="text-xs text-gray-500 mt-1">
          Period: {item.period} | Game: {gameNumber}
        </Text>
        {/* Date Text */}
        <Text className="text-[10px] text-gray-400 mt-1">
          {formattedDate}
        </Text>
      </View>
      
      {/* Status and Amount */}
      <View className="items-end">
        <Text className={`text-xs font-semibold mb-1 ${statusColorClass}`}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
        <Text className={`text-base font-bold ${statusColorClass}`}>
          {formatAmount(item.betAmount, item.status)}
        </Text>
      </View>
    </View>
  );
};

// --- Main Bet History Screen ---
const BetHistoryScreen: React.FC = () => {
  const [allBets, setAllBets] = useState<Bet[]>([]);
  const [displayedBets, setDisplayedBets] = useState<Bet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch bet history from backend
  const fetchBetHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://ctbackend.crobstacle.com/api/users/history?page=1&limit=1000",
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

      const result = await response.json();
      
      if (result.data && Array.isArray(result.data.bets)) {
        setAllBets(result.data.bets);
        // Show first 10 items
        setDisplayedBets(result.data.bets.slice(0, ITEMS_PER_PAGE));
      } else {
        throw new Error("Invalid response format received from server.");
      }

    } catch (e: any) {
      console.error("Error fetching bet history:", e);
      setError(e.message || "Failed to load bet history.");
    } finally {
      setLoading(false);
    }
  };

  // Load more bets
  const loadMoreBets = () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * ITEMS_PER_PAGE;
    
    setTimeout(() => {
      setDisplayedBets(allBets.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
      setLoadingMore(false);
    }, 300);
  };

  // Check if there are more items to load
  const hasMoreItems = displayedBets.length < allBets.length;

  useEffect(() => {
    fetchBetHistory();
  }, []);

  // --- Render Logic ---
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#16a34a" className="mt-5" />;
    }

    if (error) {
      return <Text className="text-red-500 text-center py-5">Error: {error}</Text>;
    }

    if (allBets.length === 0) {
      return <Text className="text-gray-500 text-center py-5">No bet history found.</Text>;
    }

    return (
      <View className="flex-1">
        <FlatList<Bet>
          data={displayedBets}
          keyExtractor={(item: Bet) => item._id}
          renderItem={({ item }: { item: Bet }) => <BetItem item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        
        {/* Load More Button */}
        {hasMoreItems && (
          <View className="items-center py-4">
            <TouchableOpacity
              onPress={loadMoreBets}
              disabled={loadingMore}
              className="bg-green-600 px-6 py-3 rounded-lg flex-row items-center"
            >
              {loadingMore ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <Text className="text-white font-semibold mr-2">Load More</Text>
                  <Ionicons name="chevron-down" size={16} color="white" />
                </>
              )}
            </TouchableOpacity>
            <Text className="text-xs text-gray-500 mt-2">
              Showing {displayedBets.length} of {allBets.length} bets
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StstusBar />
      
      {/* Header View */}
      <View className="flex-row justify-between items-center px-4 mt-14 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="w-8 h-8 justify-center items-center">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">Bet History</Text>
        {/* Placeholder for alignment */}
        <View className="w-8 h-8" /> 
      </View>

      {/* Main Content Area */}
      <View className="flex-1 px-4 pt-2">
        <Text className="text-base font-bold text-gray-700 mb-2">All Bets</Text>
        <View className="bg-white rounded-lg shadow-md p-4 flex-1">
          {renderContent()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BetHistoryScreen;