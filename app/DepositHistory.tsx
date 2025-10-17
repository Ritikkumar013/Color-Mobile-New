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

const API_URL = "https://ctbackend.crobstacle.com/api/wallet/transactions";
const ITEMS_PER_PAGE = 10;

// --- 2. Transaction Item Component (NativeWind) ---
const TransactionItem = ({ item }: { item: TransactionDetail }) => {
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
          Deposit
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
      
      {/* Amount Text - Always green for deposits */}
      <Text className="text-base font-bold text-green-600">
        + ₹{item.amount.toFixed(2)}
      </Text>
    </View>
  );
};

// --- 3. Main Transaction Screen Component (NativeWind) ---
const Transaction = () => {
  const [allTransactions, setAllTransactions] = useState<TransactionDetail[]>([]);
  const [displayedTransactions, setDisplayedTransactions] = useState<TransactionDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
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
        
        // FIX: Extract the nested data array and filter only credit transactions
        if (data.status === "success" && data.data && Array.isArray(data.data.data)) {
          // Filter only credit transactions (deposits)
          const creditTransactions = data.data.data.filter(
            (transaction) => transaction.type === 'credit'
          );
          setAllTransactions(creditTransactions);
          // Show first 10 items
          setDisplayedTransactions(creditTransactions.slice(0, ITEMS_PER_PAGE));
        } else {
            throw new Error("Invalid response format received from server.");
        }

      } catch (e: any) {
        console.error("Error fetching transactions:", e);
        setError(e.message || "Failed to load deposit history.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Load more transactions
  const loadMoreTransactions = () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * ITEMS_PER_PAGE;
    
    setTimeout(() => {
      setDisplayedTransactions(allTransactions.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
      setLoadingMore(false);
    }, 300);
  };

  // Check if there are more items to load
  const hasMoreItems = displayedTransactions.length < allTransactions.length;

  // --- Render Logic ---
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#16a34a" className="mt-5" />;
    }

    if (error) {
      return <Text className="text-red-500 text-center py-5">Error: {error}</Text>;
    }

    if (allTransactions.length === 0) {
      return <Text className="text-gray-500 text-center py-5">No deposits found.</Text>;
    }

    return (
      <View className="flex-1">
        <FlatList<TransactionDetail>
          data={displayedTransactions}
          keyExtractor={(item: TransactionDetail) => item._id}
          renderItem={({ item }: { item: TransactionDetail }) => <TransactionItem item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        
        {/* Load More Button */}
        {hasMoreItems && (
          <View className="items-center py-4">
            <TouchableOpacity
              onPress={loadMoreTransactions}
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
              Showing {displayedTransactions.length} of {allTransactions.length} deposits
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
        <Text className="text-lg font-bold text-gray-800">Deposit History</Text>
        {/* Placeholder for alignment */}
        <View className="w-8 h-8" /> 
      </View>

      {/* Main Content Area */}
      <View className="flex-1 px-4 pt-2">
        <Text className="text-base font-bold text-gray-700 mb-2">All Deposits</Text>
        <View className="bg-white rounded-lg shadow-md p-4 flex-1">
            {renderContent()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Transaction;