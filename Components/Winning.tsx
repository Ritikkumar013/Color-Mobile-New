import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image } from "react-native";

interface WinnerInfo {
  id: number;
  username: string;
  avatar: any;
  gameIcon: any;
  amount: number;
}

const avatars = [
  require("../assets/images/avatar1.png"),
  require("../assets/images/avatar2.png"),
  require("../assets/images/avatar3.png"),
];

const gameIcons = [
  require("../assets/images/game-icon1.jpg"),
  require("../assets/images/game-icon2.jpg"),
  require("../assets/images/game-icon3.jpg"),
];

export default function WinningInfo() {
  const [winners, setWinners] = useState<WinnerInfo[]>([
    {
      id: 1,
      username: "Mem***HCU",
      avatar: avatars[0],
      gameIcon: gameIcons[0],
      amount: 18628.0,
    },
    {
      id: 2,
      username: "Mem***VEI",
      avatar: avatars[1],
      gameIcon: gameIcons[1],
      amount: 25215.0,
    },
    {
      id: 3,
      username: "Mem***QJA",
      avatar: avatars[2],
      gameIcon: gameIcons[2],
      amount: 44239.0,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newWinner: WinnerInfo = {
        id: Date.now(),
        username: `Mem***${Math.random()
          .toString(36)
          .substring(2, 5)
          .toUpperCase()}`,
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
        gameIcon: gameIcons[Math.floor(Math.random() * gameIcons.length)],
        amount: parseFloat((Math.random() * 10000).toFixed(2)),
      };

      setWinners((prevWinners) => [newWinner, ...prevWinners.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <FlatList
      data={winners}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 20 }}
      renderItem={({ item }) => (
        <View className="w-full flex-row justify-between items-center bg-white p-3 rounded-lg shadow mb-3">
          <View className="flex-row">
            <Image
              source={item.avatar}
              className="w-10 h-10 rounded-full border mr-3"
              resizeMode="contain"
            />
            <View className="">
             <Text className="font-semibold">{item.username}</Text>
             <Text className="text-sm text-gray-500">Winning amount</Text>
             </View>
          </View>
          {/* <View className="flex-1/4">
            <Text className="font-semibold">{item.username}</Text>
            <Text className="text-sm text-gray-500">Winning amount</Text>
          </View> */}
          {/* <Image
            source={item.gameIcon}



            className="w-10 h-10 mr-3"
          /> */}
          <Text className="text-green-600 font-bold">
            ₹{item.amount.toLocaleString()}
          </Text>
        </View>
      )}
      // nestedScrollEnabled={true}
    />
  );
}
