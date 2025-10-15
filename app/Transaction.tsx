import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StstusBar  from "@/Components/StstusBar";

// Define the TypeScript interface for a transaction
interface TransactionType {
  _id: string;
  type: string;
  amount: number;
  createdAt: string;
}

const API_URL = "http://192.154.230.43:3000/api/wallet/transactions"; // Replace with actual API URL

const TransactionItem = ({ type, amount, date }: { type: string; amount: number; date: string }) => (
  <View className="flex-row justify-between items-center mt-4">
    <View>
      <Text className="text-gray-700 font-semibold">{type}</Text>
      <Text className="text-gray-500 text-sm">{new Date(date).toLocaleDateString()}</Text>
    </View>
    <Text className={`text-lg font-bold ${type === "debit" ? "text-red-500" : "text-green-500"}`}>
      {type === "debit" ? `- ₹${amount}` : `+ ₹${amount}`}
    </Text>
  </View>
);
const Transaction = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        
        // Get token from AsyncStorage
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.log("No token found, user might not be logged in.");
          setLoading(false);
          return;
        }

        // Make API request with token in headers
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach token here
          },
        });

        const data = await response.json();
        if (data.status === "success") {
          setTransactions(data.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <View>
      <StstusBar />
      <View className="bg-white shadow-md rounded-lg mt-14 mx-4 p-4">
        <Text className="text-gray-700 text-lg font-bold">Recent Transactions</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#16a34a" className="mt-4" />
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TransactionItem type={item.type} amount={item.amount} date={item.createdAt} />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Transaction;
