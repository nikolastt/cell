import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "../../context/AuthContext";

const Favorites = () => {
  const { onLogout } = useAuth();
  return (
    <View>
      <Button title="Sair" onPress={onLogout} />
    </View>
  );
};

export default Favorites;
