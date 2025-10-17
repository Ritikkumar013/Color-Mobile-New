// import React, { useEffect, useState, useRef } from "react";
// import { ScrollView } from "react-native-gesture-handler";
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type ApiHistoryItem = {
//   _id: string;
//   period: string;
//   gameDuration: number; // seconds (e.g. 180 for 3 min)
//   scheduledAt: string;  // start time of the round
//   status: string;
//   winningNumber: number | null;
//   color: string[];
//   size: "big" | "small" | null;
//   createdAt: string;
// };

// type HistoryRow = {
//   period: string;
//   number: number;
//   size: "Big" | "Small";
//   colours: ("red" | "green" | "violet")[];
// };

// const HistoryTable: React.FC = () => {
//   const [data, setData] = useState<HistoryRow[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState(false);

//   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     fetchHistory();

//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, []);

//   const fetchHistory = async (isRefresh = false) => {
//     try {
//       if (isRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }
//       setError(null);

//       const token = await AsyncStorage.getItem("token");
//       if (!token) {
//         throw new Error("No authentication token found");
//       }

//       const response = await fetch(
//         "https://ctbackend.crobstacle.com/api/game/history",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`API error: ${response.statusText}`);
//       }

//       const apiData = await response.json();
//       console.log("History API Response:", apiData);

//       const historyArray = Array.isArray(apiData.data)
//         ? (apiData.data as ApiHistoryItem[])
//         : [];

//       // Filter for completed games only
//       const completedBets = historyArray.filter(
//         (item) => item.status === "completed" && item.winningNumber !== null
//       );

//       // Filter for 3-minute games (ending with -1)
//       const filteredBets = completedBets.filter(
//         (item) => item.period.startsWith("3m-") && item.period.endsWith("-1")
//       );

//       // Sort by scheduledAt in descending order (most recent first)
//       const sortedFilteredBets = filteredBets
//         .slice()
//         .sort(
//           (a, b) =>
//             new Date(b.scheduledAt).getTime() -
//             new Date(a.scheduledAt).getTime()
//         );

//       // Get last 10 results (or however many you want to display)
//       const recentBets = sortedFilteredBets.slice(0, 3);

//       // Map to display format
//       const mappedData: HistoryRow[] = recentBets.map((item) => ({
//         period: item.period,
//         number: item.winningNumber ?? 0,
//         size: item.size
//           ? (item.size.charAt(0).toUpperCase() +
//               item.size.slice(1).toLowerCase() as "Big" | "Small")
//           : "Small",
//         colours: (item.color || []).map(
//           (c) => c.toLowerCase() as "red" | "green" | "violet"
//         ),
//       }));

//       setData(mappedData);

//       // Schedule next refresh when the NEXT 3-minute game ends
//       if (sortedFilteredBets.length > 0) {
//         const latest = sortedFilteredBets[0]; // latest completed game
//         const start = new Date(latest.scheduledAt).getTime();
//         const duration = (latest.gameDuration || 180) * 1000;
//         const endTime = start + duration;
//         const now = Date.now();

//         // Calculate time until next game ends (adding one game duration)
//         const nextGameEnd = endTime + duration;
//         const timeLeft = nextGameEnd - now;

//         if (timeLeft > 0) {
//           if (timerRef.current) clearTimeout(timerRef.current);
//           timerRef.current = setTimeout(() => fetchHistory(false), timeLeft + 2000);
//           console.log(`Next refresh in ${Math.round(timeLeft / 1000)} seconds`);
//         }
//       }
//     } catch (err: unknown) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Failed to load history data";
//       setError(errorMessage);
//       console.error("History fetch error:", errorMessage);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const getColorDotClass = (color: "red" | "green" | "violet") => {
//     switch (color) {
//       case "red":
//         return "bg-rose-500";
//       case "green":
//         return "bg-green-500";
//       case "violet":
//         return "bg-violet-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   const handleRefresh = () => {
//     fetchHistory(true);
//   };

//   if (loading && !refreshing) {
//     return (
//       <View className="flex-1 justify-center items-center py-8">
//         <ActivityIndicator size="large" color="#10b981" />
//         <Text className="mt-3 text-gray-700 text-base">Loading history...</Text>
//       </View>
//     );
//   }

//   if (error && data.length === 0) {
//     return (
//       <View className="flex-1 justify-center items-center py-8 px-4">
//         <Text className="text-red-600 text-base text-center mb-4">
//           {error}
//         </Text>
//         <TouchableOpacity
//           onPress={handleRefresh}
//           className="bg-green-600 px-6 py-3 rounded-full"
//         >
//           <Text className="text-white font-bold">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View className="py-3 pt-5 border-t border-green-400">
//       <View className="flex-row justify-between items-center mb-4 px-2">
//         <Text className="text-xl font-extrabold text-gray-900">
//           Game History (3 Min)
//         </Text>
//         <TouchableOpacity
//           onPress={handleRefresh}
//           disabled={refreshing}
//           className="bg-green-100 px-4 py-2 rounded-full"
//         >
//           {refreshing ? (
//             <ActivityIndicator size="small" color="#10b981" />
//           ) : (
//             <Text className="text-green-700 font-semibold">Refresh</Text>
//           )}
//         </TouchableOpacity>
//       </View>

//       {data.length === 0 ? (
//         <View className="bg-gray-100 rounded-lg p-8 items-center">
//           <Text className="text-gray-600 text-center text-base">
//             No game history available yet.
//           </Text>
//           <Text className="text-gray-500 text-center text-sm mt-2">
//             Complete games will appear here.
//           </Text>
//         </View>
//       ) : (
//         <>
//           {/* Table Header */}
//           <View className="flex-row bg-green-500 rounded-t-lg">
//             <View className="flex-1 py-3 px-2 items-center justify-center min-w-[80px]">
//               <Text className="text-white font-bold text-sm">Period</Text>
//             </View>
//             <View className="flex-1 py-3 px-2 items-center justify-center min-w-[60px]">
//               <Text className="text-white font-bold text-sm">Number</Text>
//             </View>
//             <View className="flex-1 py-3 px-2 items-center justify-center min-w-[60px]">
//               <Text className="text-white font-bold text-sm">Size</Text>
//             </View>
//             <View className="flex-1 py-3 px-2 items-center justify-center min-w-[80px]">
//               <Text className="text-white font-bold text-sm">Colour</Text>
//             </View>
//           </View>

//           {/* Data Rows */}
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             style={{ maxHeight: 400 }}
//           >
//             {data.map((item, index) => (
//               <View
//                 key={`${item.period}-${index}`}
//                 className={`flex-row bg-white border-b border-gray-200 ${
//                   index === data.length - 1 ? "rounded-b-lg" : ""
//                 }`}
//               >
//                 <View className="flex-1 py-3 px-2 items-center justify-center min-w-[80px]">
//                   <Text className="text-xs text-gray-900 text-center" numberOfLines={1}>
//                     {item.period}
//                   </Text>
//                 </View>
//                 <View className="flex-1 py-3 px-2 items-center justify-center min-w-[60px]">
//                   <View className={`w-8 h-8 rounded-full items-center justify-center ${
//                     item.number === 0 || item.number === 5
//                       ? "bg-violet-100"
//                       : item.colours.includes("red")
//                       ? "bg-rose-100"
//                       : "bg-green-100"
//                   }`}>
//                     <Text
//                       className={`text-lg font-bold ${
//                         item.number === 0 || item.number === 5
//                           ? "text-violet-600"
//                           : item.colours.includes("red")
//                           ? "text-rose-600"
//                           : "text-green-600"
//                       }`}
//                     >
//                       {item.number}
//                     </Text>
//                   </View>
//                 </View>
//                 <View className="flex-1 py-3 px-2 items-center justify-center min-w-[60px]">
//                   <Text className="text-sm text-gray-900 text-center font-semibold">
//                     {item.size}
//                   </Text>
//                 </View>
//                 <View className="flex-1 py-3 px-2 items-center justify-center min-w-[80px]">
//                   <View className="flex-row items-center justify-center gap-1">
//                     {item.colours.map((color, i) => (
//                       <View
//                         key={i}
//                         className={`w-4 h-4 rounded-full border border-white ${getColorDotClass(
//                           color
//                         )}`}
//                       />
//                     ))}
//                   </View>
//                 </View>
//               </View>
//             ))}
//           </ScrollView>
//         </>
//       )}
//     </View>
//   );
// };

// export default HistoryTable;

import React, { useEffect, useState, useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// --- UPDATED API TYPES TO MATCH NESTED STRUCTURE ---

type GameItem = {
  _id: string;
  period: string;
  gameDuration: number; // seconds (e.g. 180 for 3 min)
  scheduledAt: string; // start time of the round
  status: string;
  winningNumber: number | null;
  color: string[];
  size: "big" | "small" | null;
  createdAt: string;
  // ... other fields not needed for display
};

type TimeSlotItem = {
  timeSlot: string;
  games: GameItem[];
};

type ApiResponse = {
  status: string;
  statusCode: number;
  message: string;
  data: {
    data: TimeSlotItem[];
  };
};

type HistoryRow = {
  period: string;
  number: number;
  size: "Big" | "Small" | "N/A"; // Added N/A for safety
  colours: ("red" | "green" | "violet")[];
};

const HistoryTable: React.FC = () => {
  const [data, setData] = useState<HistoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetchHistory();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const fetchHistory = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        "https://ctbackend.crobstacle.com/api/game/history",
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

      const apiResponse: ApiResponse = await response.json();
      console.log("History API Response:", apiResponse);

      // --- FIX: FLATTEN THE NESTED DATA STRUCTURE ---
      const timeSlotArray = Array.isArray(apiResponse.data.data)
        ? apiResponse.data.data
        : [];

      // 1. Flatten the 'games' array from all time slots into a single array
      const allGames: GameItem[] = timeSlotArray.flatMap((slot) => slot.games);

      // 2. Filter for completed games only
      const completedGames = allGames.filter(
        (item) => item.status === "completed" && item.winningNumber !== null
      );

      // 3. Filter for 3-minute games
      const filteredGames = completedGames.filter((item) =>
        item.period.startsWith("3m-")
      );

      // 4. IMPORTANT: Filter to only include the specific game you requested (e.g., ending with '-1')
      const requestedPeriodGames = filteredGames.filter((item) =>
        item.period.endsWith("-1")
      );

      // 5. Sort by scheduledAt in descending order (most recent first)
      const sortedRequestedGames = requestedPeriodGames
        .slice()
        .sort(
          (a, b) =>
            new Date(b.scheduledAt).getTime() -
            new Date(a.scheduledAt).getTime()
        );

      // Get last 4 results (as per your slice)
      const recentBets = sortedRequestedGames.slice(0, 4);

      // Map to display format
      const mappedData: HistoryRow[] = recentBets.map((item) => ({
        period: item.period,
        number: item.winningNumber ?? 0,
        size: item.size
          ? ((item.size.charAt(0).toUpperCase() +
              item.size.slice(1).toLowerCase()) as "Big" | "Small")
          : "N/A", // Use "N/A" for missing size
        colours: (item.color || []).map(
          (c) => c.toLowerCase() as "red" | "green" | "violet"
        ),
      }));

      setData(mappedData);

      // --- FIX: CORRECT AUTOREFRESH LOGIC ---
      if (sortedRequestedGames.length > 0) {
        const latest = sortedRequestedGames[0]; // latest completed game
        const durationMs = (latest.gameDuration || 180) * 1000;
        
        // The start time of the latest completed game
        const latestStartTime = new Date(latest.scheduledAt).getTime();
        
        // The start time of the *next* game for this period (-1)
        const nextStartTime = latestStartTime + durationMs;
        
        // The end time of the *next* game for this period (-1)
        const nextExpectedEndTime = nextStartTime + durationMs;
        
        const now = Date.now();
        
        // Calculate the time remaining until the next game ends, plus a 2-second buffer
        const timeLeft = nextExpectedEndTime - now;
        const timeToNextRefresh = timeLeft > 0 ? timeLeft + 2000 : durationMs + 2000;
        
        if (timerRef.current) clearTimeout(timerRef.current);
        
        // Only set the timeout if the calculated time is positive (i.e., in the future)
        if (timeToNextRefresh > 0) {
            timerRef.current = setTimeout(
                () => fetchHistory(false),
                timeToNextRefresh
            );
            console.log(
                `Next refresh in ${Math.round(timeToNextRefresh / 1000)} seconds`
            );
        }
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load history data";
      setError(errorMessage);
      console.error("History fetch error:", errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
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

  const handleRefresh = () => {
    fetchHistory(true);
  };

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center py-8">
        <ActivityIndicator size="large" color="#10b981" />
        <Text className="mt-3 text-gray-700 text-base">Loading history...</Text>
      </View>
    );
  }

  if (error && data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-8 px-4">
        <Text className="text-red-600 text-base text-center mb-4">{error}</Text>
        <TouchableOpacity
          onPress={handleRefresh}
          className="bg-green-600 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="py-3 pt-5 border-t border-green-400">
      <View className="flex-row justify-between items-center mb-4 px-2">
        <Text className="text-xl font-extrabold text-gray-900">
          Game History (3 Min)
        </Text>
        <TouchableOpacity
          onPress={handleRefresh}
          disabled={refreshing}
          className="bg-green-100 px-4 py-2 rounded-full"
        >
          {refreshing ? (
            <ActivityIndicator size="small" color="#10b981" />
          ) : (
            <Text className="text-green-700 font-semibold">Refresh</Text>
          )}
        </TouchableOpacity>
      </View>

      {data.length === 0 ? (
        <View className="bg-gray-100 rounded-lg p-8 items-center">
          <Text className="text-gray-600 text-center text-base">
            No game history available yet for period ending in -1.
          </Text>
          <Text className="text-gray-500 text-center text-sm mt-2">
            Complete games will appear here.
          </Text>
        </View>
      ) : (
        <>
          {/* Table Header (Updated min-w) */}
          <View className="flex-row bg-green-500 rounded-t-lg">
            <View className="flex-1 py-3 px-2 items-center justify-center min-w-[100px]">
              <Text className="text-white font-bold text-sm">Period</Text>
            </View>
            <View className="flex-1 py-3 px-2 items-center justify-center min-w-[60px]">
              <Text className="text-white font-bold text-sm">Number</Text>
            </View>
            <View className="flex-1 py-3 px-2 items-center justify-center min-w-[60px]">
              <Text className="text-white font-bold text-sm">Size</Text>
            </View>
            <View className="flex-1 py-3 px-2 items-center justify-center min-w-[80px]">
              <Text className="text-white font-bold text-sm">Colour</Text>
            </View>
          </View>

          {/* Data Rows */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: 400 }}
          >
            {data.map((item, index) => (
              <View
                key={`${item.period}-${index}`}
                className={`flex-row bg-white border-b border-gray-200 ${
                  index === data.length - 1 ? "rounded-b-lg" : ""
                }`}
              >
                {/* Period Column (Updated min-w and removed numberOfLines) */}
                <View className="flex-1 py-3 px-2 items-center justify-center min-w-[100px]">
                  <Text className="text-xs text-gray-900 text-center">
                    {item.period}
                  </Text>
                </View>
                <View className="flex-1 py-3 px-2 items-center justify-center min-w-[60px]">
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center ${
                      item.number === 0 || item.number === 5
                        ? "bg-violet-100"
                        : item.colours.includes("red")
                        ? "bg-rose-100"
                        : "bg-green-100"
                    }`}
                  >
                    <Text
                      className={`text-lg font-bold ${
                        item.number === 0 || item.number === 5
                          ? "text-violet-600"
                          : item.colours.includes("red")
                          ? "text-rose-600"
                          : "text-green-600"
                      }`}
                    >
                      {item.number}
                    </Text>
                  </View>
                </View>
                <View className="flex-1 py-3 px-2 items-center justify-center min-w-[60px]">
                  <Text className="text-sm text-gray-900 text-center font-semibold">
                    {item.size}
                  </Text>
                </View>
                <View className="flex-1 py-3 px-2 items-center justify-center min-w-[80px]">
                  <View className="flex-row items-center justify-center gap-1">
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
        </>
      )}
    </View>
  );
};

export default HistoryTable;