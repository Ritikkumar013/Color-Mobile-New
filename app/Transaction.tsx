// import { View, Text, FlatList, ActivityIndicator } from "react-native";
// import React, { useEffect, useState } from "react";
// // import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import StstusBar  from "@/Components/StstusBar";

// // Define the TypeScript interface for a transaction
// interface TransactionType {
//   _id: string;
//   type: string;
//   amount: number;
//   createdAt: string;
// }

// const API_URL = "http://192.154.230.43:3000/api/wallet/transactions"; // Replace with actual API URL

// const TransactionItem = ({ type, amount, date }: { type: string; amount: number; date: string }) => (
//   <View className="flex-row justify-between items-center mt-4">
//     <View>
//       <Text className="text-gray-700 font-semibold">{type}</Text>
//       <Text className="text-gray-500 text-sm">{new Date(date).toLocaleDateString()}</Text>
//     </View>
//     <Text className={`text-lg font-bold ${type === "debit" ? "text-red-500" : "text-green-500"}`}>
//       {type === "debit" ? `- ₹${amount}` : `+ ₹${amount}`}
//     </Text>
//   </View>
// );
// const Transaction = () => {
//   const [transactions, setTransactions] = useState<TransactionType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         setLoading(true);
        
//         // Get token from AsyncStorage
//         const token = await AsyncStorage.getItem("token");

//         if (!token) {
//           console.log("No token found, user might not be logged in.");
//           setLoading(false);
//           return;
//         }

//         // Make API request with token in headers
//         const response = await fetch(API_URL, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Attach token here
//           },
//         });

//         const data = await response.json();
//         if (data.status === "success") {
//           setTransactions(data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   return (
//     <View>
//       <StstusBar />
//       <View className="bg-white shadow-md rounded-lg mt-14 mx-4 p-4">
//         <Text className="text-gray-700 text-lg font-bold">Recent Transactions</Text>
//         {loading ? (
//           <ActivityIndicator size="large" color="#16a34a" className="mt-4" />
//         ) : (
//           <FlatList
//             data={transactions}
//             keyExtractor={(item) => item._id}
//             renderItem={({ item }) => (
//               <TransactionItem type={item.type} amount={item.amount} date={item.createdAt} />
//             )}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// export default Transaction;

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StstusBar from "@/Components/StstusBar";

// --- 1. Define the TypeScript Interface based on the JSON response ---
interface TransactionDetail {
  _id: string;
  type: 'credit' | 'debit'; // Transaction type
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
  description: string; // Including description for better detail
  category: 'game' | 'money'; // Including category
}

// Interface for the full API response structure
interface ApiResponse {
    status: string;
    statusCode: number;
    message: string;
    data: {
        data: TransactionDetail[];
        pagination: any; 
        summary: any; 
    };
}

const API_URL = "http://192.154.230.43:3000/api/wallet/transactions";

// --- 2. Transaction Item Component (NativeWind) ---
const TransactionItem = ({ item }: { item: TransactionDetail }) => {
  const isDebit = item.type === "debit";
  const amountPrefix = isDebit ? "- ₹" : "+ ₹";
  
  // Use conditional class names for colors
  const amountColorClass = isDebit ? "text-red-500" : "text-green-600";
  
  const formattedDate = new Date(item.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View className="flex-row justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
      <View className="flex-1 mr-3">
        {/* Main Text: Type of transaction */}
        <Text className="text-sm font-bold text-gray-800">
          {item.category === 'money' ? (isDebit ? 'Withdrawal' : 'Deposit') : 'Game Bet'}
        </Text>
        {/* Sub Text: Description */}
        <Text className="text-xs text-gray-500 mt-1">
          {item.description}
        </Text>
        {/* Date Text */}
        <Text className="text-[10px] text-gray-400 mt-1">
          {formattedDate}
        </Text>
      </View>
      
      {/* Amount Text */}
      <Text className={`text-base font-bold ${amountColorClass}`}>
        {amountPrefix}{item.amount.toFixed(2)}
      </Text>
    </View>
  );
};

// --- 3. Main Transaction Screen Component (NativeWind) ---
const Transaction = () => {
  const [transactions, setTransactions] = useState<TransactionDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setError("Authentication required. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `API Error: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        
        // FIX: Extract the nested data array
        if (data.status === "success" && data.data && Array.isArray(data.data.data)) {
          setTransactions(data.data.data);
        } else {
            throw new Error("Invalid response format received from server.");
        }

      } catch (e: any) {
        console.error("Error fetching transactions:", e);
        setError(e.message || "Failed to load transaction history.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // --- Render Logic ---
  const renderContent = () => {
    if (loading) {
      // NativeWind supports tintColor for ActivityIndicator
      return <ActivityIndicator size="large" color="#16a34a" className="mt-5" />;
    }

    if (error) {
      return <Text className="text-red-500 text-center py-5">Error: {error}</Text>;
    }

    if (transactions.length === 0) {
      return <Text className="text-gray-500 text-center py-5">No transactions found.</Text>;
    }

    return (
      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }} // Keep this as inline style for consistency with NativeWind's FlatList
      />
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
        <Text className="text-lg font-bold text-gray-800">Transaction History</Text>
        {/* Placeholder for alignment */}
        <View className="w-8 h-8" /> 
      </View>

      {/* Main Content Area */}
      <View className="flex-1 px-4 pt-2">
        <Text className="text-base font-bold text-gray-700 mb-2">All Transactions</Text>
        <View className="bg-white rounded-lg shadow-md p-4 flex-1">
            {renderContent()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Transaction;