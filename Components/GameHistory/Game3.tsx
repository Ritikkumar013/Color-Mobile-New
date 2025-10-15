
import React, { useEffect, useState, useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ApiHistoryItem = {
  _id: string;
  period: string;
  gameDuration: number; // seconds (e.g. 180 for 3 min)
  scheduledAt: string;  // start time of the round
  status: string;
  winningNumber: number | null;
  color: string[];
  size: "big" | "small" | null;
  createdAt: string;
};

type HistoryRow = {
  period: string;
  number: number;
  size: "Big" | "Small";
  colours: ("red" | "green" | "violet")[];
};

const HistoryTable: React.FC = () => {
  const [data, setData] = useState<HistoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetchHistory();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        "http://192.154.230.43:3000/api/game/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const apiData = await response.json();
      const historyArray = Array.isArray(apiData.data)
        ? (apiData.data as ApiHistoryItem[])
        : [];

      const completedBets = historyArray.filter(
        (item) => item.status === "completed"
      );

      const filteredBets = completedBets.filter(
        (item) => item.period.startsWith("3m-") && item.period.endsWith("-3")
      );

      const sortedFilteredBets = filteredBets
        .slice()
        .sort(
          (a, b) =>
            new Date(b.scheduledAt).getTime() -
            new Date(a.scheduledAt).getTime()
        );

      const lastFourBets = sortedFilteredBets.slice(0, 4);

      const mappedData: HistoryRow[] = lastFourBets.map((item) => ({
        period: item.period,
        number: item.winningNumber ?? 0,
        size: item.size
          ? (item.size.charAt(0).toUpperCase() +
              item.size.slice(1).toLowerCase() as "Big" | "Small")
          : "Small",
        colours: (item.color || []).map(
          (c) => c.toLowerCase() as "red" | "green" | "violet"
        ),
      }));

      setData(mappedData);

      // ✅ schedule next refresh when the NEXT 3m game ends
      if (historyArray.length > 0) {
        const latest = historyArray[0]; // latest game round
        const start = new Date(latest.scheduledAt).getTime();
        const duration = (latest.gameDuration || 180) * 1000;
        const endTime = start + duration;
        const now = Date.now();

        const timeLeft = endTime - now;
        if (timeLeft > 0) {
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(fetchHistory, timeLeft + 2000); 
          // add +2s buffer after game ends
        }
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load history data";
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getColorDotClass = (color: "red" | "green" | "violet") => {
    switch (color) {
      case "red":
        return "bg-rose-500";
      case "green":
        return "bg-green-500";
      case "violet":
        return "bg-violet-500";
      default:
        return "bg-gray-400";
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center py-8">
        <ActivityIndicator size="large" color="#10b981" />
        <Text className="mt-3 text-gray-700 text-base">Loading history...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center py-8">
        <Text className="text-red-600 text-base text-center">
          Error: {error}
        </Text>
      </View>
    );
  }

  return (
    <View className="py-3 pt-5 border-t border-green-400">
      <Text className="text-xl font-extrabold text-gray-900 mb-4 text-center">
        Game History
      </Text>

      {/* Table Header */}
      <View className="flex-row bg-green-500 rounded-t-lg">
        <View className="flex-1 py-3 px-3 items-center justify-center min-w-[80px]">
          <Text className="text-white font-bold text-base">Period</Text>
        </View>
        <View className="flex-1 py-3 px-3 items-center justify-center min-w-[80px]">
          <Text className="text-white font-bold text-base">Number</Text>
        </View>
        <View className="flex-1 py-3 px-3 items-center justify-center min-w-[80px]">
          <Text className="text-white font-bold text-base">Size</Text>
        </View>
        <View className="flex-1 py-3 px-3 items-center justify-center min-w-[80px]">
          <Text className="text-white font-bold text-base">Colour</Text>
        </View>
      </View>

      {/* Data Rows */}
      <ScrollView showsVerticalScrollIndicator={false}>
  {data.map((item, index) => (
    <View
      key={item.period}
      className={`flex-row bg-white border-b border-gray-200 ${
        index === data.length - 1 ? "rounded-b-lg" : ""
      }`}
    >
      <View className="flex-1 py-2 px-4 items-center justify-center min-w-[80px]">
        <Text className="text-md text-gray-900 text-center">{item.period}</Text>
      </View>
      <View className="flex-1 py-2 px-4 items-center justify-center min-w-[80px]">
        <Text
          className={`text-lg font-bold text-center ${
            item.number === 0 ? "text-rose-500" : "text-green-600"
          }`}
        >
          {item.number}
        </Text>
      </View>
      <View className="flex-1 py-2 px-4 items-center justify-center min-w-[80px]">
        <Text className="text-sm text-gray-900 text-center">{item.size}</Text>
      </View>
      <View className="flex-1 py-2 px-4 items-center justify-center min-w-[80px]">
        <View className="flex-row items-center justify-center space-x-1">
          {item.colours.map((color, i) => (
            <View
              key={i}
              className={`w-4 h-4 rounded-full border border-white ${getColorDotClass(
                color
              )}`}
            />
          ))}
        </View>
      </View>
    </View>
  ))}
</ScrollView>

    </View>
  );
};

export default HistoryTable;
