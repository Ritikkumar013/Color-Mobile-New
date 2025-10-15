// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   ActivityIndicator,
// } from "react-native";

// interface BetModalProps {
//   visible: boolean;
//   onClose: () => void;
//   selectedAmount: string;
//   selectedMultiplier: string;
//   setSelectedAmount: (amount: string) => void;
//   setSelectedMultiplier: (multiplier: string) => void;
//   onPlaceBet: (amount: number) => Promise<void>;
//   isPlacingBet: boolean;
// }

// const BetModal: React.FC<BetModalProps> = ({
//   visible,
//   onClose,
//   selectedAmount,
//   selectedMultiplier,
//   setSelectedAmount,
//   setSelectedMultiplier,
//   onPlaceBet,
//   isPlacingBet,
// }) => {
//   const amounts = ["₹10", "₹50", "₹100", "₹500", "₹1000"];
//   const multipliers = ["x1", "x2", "x5", "x10", "x20"];
// const handlePlaceBet = async () => {
//   const numericAmount = parseInt(selectedAmount.replace("₹", ""));
//   const multiplierValue = parseInt(selectedMultiplier.replace("x", ""));
//   const finalAmount = numericAmount * multiplierValue;

//   await onPlaceBet(finalAmount);
// };

// // Helper function to calculate final amount
// const getFinalAmount = () => {
//   const numericAmount = parseInt(selectedAmount.replace("₹", "")) || 0;
//   const multiplierValue = parseInt(selectedMultiplier.replace("x", "")) || 1;
//   return numericAmount * multiplierValue;
// };


//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View className="flex-1 justify-end bg-black bg-opacity-50">
//         <View className="bg-white rounded-t-3xl p-6">
//           {/* Header */}
//           <View className="flex-row justify-between items-center mb-6">
//             <Text className="text-xl font-bold text-gray-800">Place Your Bet</Text>
//             <TouchableOpacity
//               onPress={onClose}
//               disabled={isPlacingBet}
//               className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
//             >
//               <Text className="text-gray-600 font-bold">×</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Bet Amount Selection */}
//           <View className="mb-6">
//             <Text className="text-lg font-semibold text-gray-700 mb-3">
//               Select Bet Amount
//             </Text>
//             <View className="flex-row flex-wrap gap-3">
//               {amounts.map((amount) => (
//                 <TouchableOpacity
//                   key={amount}
//                   onPress={() => setSelectedAmount(amount)}
//                   disabled={isPlacingBet}
//                   className={`px-6 py-3 rounded-full border-2 ${
//                     selectedAmount === amount
//                       ? "bg-green-500 border-green-500"
//                       : "bg-white border-gray-300"
//                   }`}
//                 >
//                   <Text
//                     className={`font-semibold ${
//                       selectedAmount === amount
//                         ? "text-white"
//                         : "text-gray-700"
//                     }`}
//                   >
//                     {amount}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>

//           {/* Multiplier Selection */}
//           <View className="mb-8">
//             <Text className="text-lg font-semibold text-gray-700 mb-3">
//               Select Multiplier
//             </Text>
//             <View className="flex-row flex-wrap gap-3">
//               {multipliers.map((multiplier) => (
//                 <TouchableOpacity
//                   key={multiplier}
//                   onPress={() => setSelectedMultiplier(multiplier)}
//                   disabled={isPlacingBet}
//                   className={`px-6 py-3 rounded-full border-2 ${
//                     selectedMultiplier === multiplier
//                       ? "bg-blue-500 border-blue-500"
//                       : "bg-white border-gray-300"
//                   }`}
//                 >
//                   <Text
//                     className={`font-semibold ${
//                       selectedMultiplier === multiplier
//                         ? "text-white"
//                         : "text-gray-700"
//                     }`}
//                   >
//                     {multiplier}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>

//           {/* Bet Summary */}
//          {/* Bet Summary */}
// <View className="bg-gray-100 rounded-lg p-4 mb-6">
//   <Text className="text-sm text-gray-600 mb-1">Bet Summary:</Text>
//   <Text className="text-lg font-semibold text-gray-800">
//     Amount: {selectedAmount} • Multiplier: {selectedMultiplier}
//   </Text>
//   <Text className="text-lg font-bold text-green-700 mt-1">
//     Final Bet: ₹{getFinalAmount()}
//   </Text>
// </View>


//           {/* Action Buttons */}
//           <View className="flex-row gap-4">
//             <TouchableOpacity
//               onPress={onClose}
//               disabled={isPlacingBet}
//               className="flex-1 bg-gray-300 py-4 rounded-full items-center"
//             >
//               <Text className="text-gray-700 font-bold text-lg">Cancel</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={handlePlaceBet}
//               disabled={isPlacingBet}
//               className={`flex-1 py-4 rounded-full items-center flex-row justify-center ${
//                 isPlacingBet ? "bg-gray-400" : "bg-green-600"
//               }`}
//             >
//               {isPlacingBet ? (
//                 <>
//                   <ActivityIndicator size="small" color="white" className="mr-2" />
//                   <Text className="text-white font-bold text-lg">Placing...</Text>
//                 </>
//               ) : (
//                 <Text className="text-white font-bold text-lg">Place Bet</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default BetModal;

// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   ActivityIndicator,
// } from "react-native";

// interface BetModalProps {
//   visible: boolean;
//   onClose: () => void;
//   selectedAmount: string;
//   selectedMultiplier: string;
//   setSelectedAmount: (amount: string) => void;
//   setSelectedMultiplier: (multiplier: string) => void;
//   onPlaceBet: (amount: number) => Promise<void>;
//   isPlacingBet: boolean;
// }

// const BetModal: React.FC<BetModalProps> = ({
//   visible,
//   onClose,
//   selectedAmount,
//   selectedMultiplier,
//   setSelectedAmount,
//   setSelectedMultiplier,
//   onPlaceBet,
//   isPlacingBet,
// }) => {
//   const amounts = ["₹10", "₹50", "₹100", "₹500", "₹1000"];
//   const multipliers = ["x1", "x2", "x5", "x10", "x20"];

//   const handlePlaceBet = async () => {
//     const numericAmount = parseInt(selectedAmount.replace("₹", ""));
//     const multiplierValue = parseInt(selectedMultiplier.replace("x", ""));
//     const finalAmount = numericAmount * multiplierValue;

//     await onPlaceBet(finalAmount);
//   };

//   // Helper function to calculate final amount
//   const getFinalAmount = () => {
//     const numericAmount = parseInt(selectedAmount.replace("₹", "")) || 0;
//     const multiplierValue = parseInt(selectedMultiplier.replace("x", "")) || 1;
//     return numericAmount * multiplierValue;
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
//         <View className="bg-white rounded-t-3xl p-6">
//           {/* Header */}
//           <View className="flex-row justify-between items-center mb-6">
//             <Text className="text-xl font-bold text-gray-800">Place Your Bet</Text>
//             <TouchableOpacity
//               onPress={onClose}
//               disabled={isPlacingBet}
//               className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
//             >
//               <Text className="text-gray-600 font-bold text-xl">×</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Bet Amount Selection */}
//           <View className="mb-6">
//             <Text className="text-lg font-semibold text-gray-700 mb-3">
//               Select Bet Amount
//             </Text>
//             <View className="flex-row flex-wrap gap-3">
//               {amounts.map((amount) => (
//                 <TouchableOpacity
//                   key={amount}
//                   onPress={() => setSelectedAmount(amount)}
//                   disabled={isPlacingBet}
//                   className={`px-6 py-3 rounded-full border-2 ${
//                     selectedAmount === amount
//                       ? "bg-green-500 border-green-500"
//                       : "bg-white border-gray-300"
//                   }`}
//                 >
//                   <Text
//                     className={`font-semibold ${
//                       selectedAmount === amount
//                         ? "text-white"
//                         : "text-gray-700"
//                     }`}
//                   >
//                     {amount}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>

//           {/* Multiplier Selection */}
//           <View className="mb-8">
//             <Text className="text-lg font-semibold text-gray-700 mb-3">
//               Select Multiplier
//             </Text>
//             <View className="flex-row flex-wrap gap-3">
//               {multipliers.map((multiplier) => (
//                 <TouchableOpacity
//                   key={multiplier}
//                   onPress={() => setSelectedMultiplier(multiplier)}
//                   disabled={isPlacingBet}
//                   className={`px-6 py-3 rounded-full border-2 ${
//                     selectedMultiplier === multiplier
//                       ? "bg-blue-500 border-blue-500"
//                       : "bg-white border-gray-300"
//                   }`}
//                 >
//                   <Text
//                     className={`font-semibold ${
//                       selectedMultiplier === multiplier
//                         ? "text-white"
//                         : "text-gray-700"
//                     }`}
//                   >
//                     {multiplier}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>

//           {/* Bet Summary */}
//           <View className="bg-gray-100 rounded-lg p-4 mb-6">
//             <Text className="text-sm text-gray-600 mb-1">Bet Summary:</Text>
//             <Text className="text-lg font-semibold text-gray-800">
//               Amount: {selectedAmount} • Multiplier: {selectedMultiplier}
//             </Text>
//             <Text className="text-lg font-bold text-green-700 mt-1">
//               Final Bet: ₹{getFinalAmount()}
//             </Text>
//           </View>

//           {/* Action Buttons */}
//           <View className="flex-row gap-4">
//             <TouchableOpacity
//               onPress={onClose}
//               disabled={isPlacingBet}
//               className="flex-1 bg-gray-300 py-4 rounded-full items-center"
//             >
//               <Text className="text-gray-700 font-bold text-lg">Cancel</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={handlePlaceBet}
//               disabled={isPlacingBet}
//               className={`flex-1 py-4 rounded-full items-center ${
//                 isPlacingBet ? "bg-gray-400" : "bg-green-600"
//               }`}
//             >
//               {isPlacingBet ? (
//                 <View className="flex-row items-center">
//                   <ActivityIndicator size="small" color="white" />
//                   <Text className="text-white font-bold text-lg ml-2">Placing...</Text>
//                 </View>
//               ) : (
//                 <Text className="text-white font-bold text-lg">Place Bet</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default BetModal;

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";

// ✅ EXPORT the interface
export interface BetModalProps {
  visible: boolean;
  onClose: () => void;
  selectedAmount: string;
  selectedMultiplier: string;
  setSelectedAmount: (amount: string) => void;
  setSelectedMultiplier: (multiplier: string) => void;
  onPlaceBet: (amount: number) => Promise<void>;
  isPlacingBet: boolean;
}

const BetModal: React.FC<BetModalProps> = ({
  visible,
  onClose,
  selectedAmount,
  selectedMultiplier,
  setSelectedAmount,
  setSelectedMultiplier,
  onPlaceBet,
  isPlacingBet,
}) => {
  const amounts = ["₹10", "₹50", "₹100", "₹500", "₹1000"];
  const multipliers = ["x1", "x2", "x5", "x10", "x20"];

  const handlePlaceBet = async () => {
    const numericAmount = parseInt(selectedAmount.replace("₹", ""));
    const multiplierValue = parseInt(selectedMultiplier.replace("x", ""));
    const finalAmount = numericAmount * multiplierValue;

    await onPlaceBet(finalAmount);
  };

  // Helper function to calculate final amount
  const getFinalAmount = () => {
    const numericAmount = parseInt(selectedAmount.replace("₹", "")) || 0;
    const multiplierValue = parseInt(selectedMultiplier.replace("x", "")) || 1;
    return numericAmount * multiplierValue;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View className="bg-white rounded-t-3xl p-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-gray-800">Place Your Bet</Text>
            <TouchableOpacity
              onPress={onClose}
              disabled={isPlacingBet}
              className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
            >
              <Text className="text-gray-600 font-bold text-xl">×</Text>
            </TouchableOpacity>
          </View>

          {/* Bet Amount Selection */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-3">
              Select Bet Amount
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {amounts.map((amount) => (
                <TouchableOpacity
                  key={amount}
                  onPress={() => setSelectedAmount(amount)}
                  disabled={isPlacingBet}
                  className={`px-6 py-3 rounded-full border-2 ${
                    selectedAmount === amount
                      ? "bg-green-500 border-green-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      selectedAmount === amount
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Multiplier Selection */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-700 mb-3">
              Select Multiplier
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {multipliers.map((multiplier) => (
                <TouchableOpacity
                  key={multiplier}
                  onPress={() => setSelectedMultiplier(multiplier)}
                  disabled={isPlacingBet}
                  className={`px-6 py-3 rounded-full border-2 ${
                    selectedMultiplier === multiplier
                      ? "bg-blue-500 border-blue-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      selectedMultiplier === multiplier
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {multiplier}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bet Summary */}
          <View className="bg-gray-100 rounded-lg p-4 mb-6">
            <Text className="text-sm text-gray-600 mb-1">Bet Summary:</Text>
            <Text className="text-lg font-semibold text-gray-800">
              Amount: {selectedAmount} • Multiplier: {selectedMultiplier}
            </Text>
            <Text className="text-lg font-bold text-green-700 mt-1">
              Final Bet: ₹{getFinalAmount()}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-4">
            <TouchableOpacity
              onPress={onClose}
              disabled={isPlacingBet}
              className="flex-1 bg-gray-300 py-4 rounded-full items-center"
            >
              <Text className="text-gray-700 font-bold text-lg">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePlaceBet}
              disabled={isPlacingBet}
              className={`flex-1 py-4 rounded-full items-center ${
                isPlacingBet ? "bg-gray-400" : "bg-green-600"
              }`}
            >
              {isPlacingBet ? (
                <View className="flex-row items-center">
                  <ActivityIndicator size="small" color="white" />
                  <Text className="text-white font-bold text-lg ml-2">Placing...</Text>
                </View>
              ) : (
                <Text className="text-white font-bold text-lg">Place Bet</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BetModal;