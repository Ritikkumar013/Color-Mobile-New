import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Request permission to access the photo library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "You need to allow access to your photos.");
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Crop the image to a square
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex items-center">
      <TouchableOpacity onPress={pickImage}>
        <Image
          className="w-32 h-32 rounded-full"
          source={selectedImage ? { uri: selectedImage } : require("../assets/images/user.png")}
          resizeMode="cover"
        />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={pickImage} className="mt-4 bg-green-600 px-4 py-2 rounded-full">
        <Text className="text-white">Change Profile Picture</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Upload;
