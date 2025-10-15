import React from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";

const GPopup = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="bg-white p-5 rounded-lg w-11/12 max-h-3/4">
          <Text className="text-lg font-bold text-center mb-3">Game Rules</Text>

          {/* Scrollable Content */}
          <ScrollView className="mb-3">
            <Text className="text-gray-700">
              1 minute 1 period, 50 seconds to order, 10 seconds waiting for the draw. It opens all day, the total number of purchases in a day is 1440 times.
              {"\n\n"}All single bets will have a 2% handling fee.
              {"\n"}For example, if you bet 100 Rs, after deducting the fee, the exact betting amount will be 98 Rs.
              {"\n\n"}📌 <Text className="font-extrabold">Odds:</Text>
              {"\n"}-1. Select Green: if the result shows 1,3,7,9 the pay out is (98*2)=196 ; If the result shows 5, the pay out is (98*1.5) 147
              {"\n"}2. Select Red: if the result shows 2,4,6,8 the pay out is (98*2)=196 ; If the result shows 0, the pay out is (98*1.5) 147
              {"\n"}3. Select Violet: if the result shows 0 or 5, the pay out is (98*4.5)=441
              {"\n"}4. Select Number: if the result is the same as the number you selected, the pay out is (98*9)=882
              {"\n"}5. Select Big: if the result shows 5,6,7,8,9 the pay out is (98*2)=196
              {"\n"}6. Select Small: if the result shows 0,1,2,3,4 the pay out is (98*2)=196
              {"\n\n"}❗ <Text className="font-extrabold">Game Rules:</Text>
              {"\n"}- It is not allowed to make 2-sided bets in 1 game period (For example: choosing green and red or big and small in the same period)
              {"\n"}- To bet on numbers: the maximum total number that can be selected is 7 in 1 period (No more)</Text>
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity onPress={onClose} className="bg-green-500 px-4 py-2 rounded mt-2">
            <Text className="text-white text-center">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GPopup;
