import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const LaayoutProduct = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
};

export default LaayoutProduct;
