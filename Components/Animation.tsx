import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing } from 'react-native';

const ScrollingText = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    if (textWidth > 0 && containerWidth > 0) {
      // Start from container width (right side) and move to negative text width (completely off left)
      animatedValue.setValue(containerWidth);

      // Calculate space between repeated text (adjust this value to control spacing)
      const spacing = 50; // Space between the end of text and start of next repetition
      const totalDistance = textWidth + spacing;

      const animation = Animated.loop(
        Animated.timing(animatedValue, {
          toValue: -totalDistance,
          duration: 12000, // Medium speed - adjust to make faster/slower
          useNativeDriver: true,
          easing: Easing.linear, // Constant speed for smooth scrolling
        })
      );

      animationRef.current = animation;
      animation.start();

      return () => {
        animation.stop();
      };
    }
  }, [textWidth, containerWidth, animatedValue]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  const textContent = "Play at your own Risk. It may be Addictive. Please gamble responsibly and within your limits.";

  return (
    <View className="bg-white p-2 rounded-full flex-row my-2 mb-5">
      <View
        className="h-8 overflow-hidden flex-1 mr-2"
        onLayout={(e) => {
          setContainerWidth(e.nativeEvent.layout.width);
        }}
      >
        <Animated.View
          style={{
            flexDirection: "row",
            transform: [{ translateX: animatedValue }],
          }}
        >
          {/* First instance of text */}
          <Text
            className="text-gray-800 font-medium text-sm leading-8"
            onLayout={(e) => {
              setTextWidth(e.nativeEvent.layout.width);
            }}
          >
            {textContent}
          </Text>
          
          {/* Add spacing */}
          <View style={{ width: 50 }} />
          
          {/* Second instance of text for seamless loop */}
          <Text className="text-gray-800 font-medium text-sm leading-8">
            {textContent}
          </Text>
          
          {/* Add spacing */}
          <View style={{ width: 50 }} />
          
          {/* Third instance for extra smoothness */}
          <Text className="text-gray-800 font-medium text-sm leading-8">
            {textContent}
          </Text>
        </Animated.View>
      </View>
      <View className="bg-green-500 p-1 px-2 rounded-full">
        <Text className="text-white font-bold text-xs">🔥Details</Text>
      </View>
    </View>
  );
};

export default ScrollingText;