import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Touchable,
} from "react-native";
import React from "react";
import { Product } from "../types/product";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface CardItemProps {
  product: Product;
}

const CardItem = ({ product }: CardItemProps) => {
  return (
    <Link
      href={{ pathname: "/(product)/[id]", params: { id: product.id } }}
      asChild
    >
      <Pressable style={styles.container}>
        <View style={styles.containerButton} className="bg-slate-700 rounded">
          <TouchableOpacity style={styles.buttonOpacity}>
            <Ionicons name="heart" color="white" size={20} />
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: product.images[0] }}
          style={{ resizeMode: "contain" }}
          className="w-full rounded-lg h-[150px] self-center"
        />

        <Text className="text-white">{product.title}</Text>
        <View className="text-white flex-row">
          <Text className="text-sm text-white self-end font-thin mr-1">R$</Text>

          <Text className="text-xl font-bold text-white">{product.price}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#5298fc",
    margin: 12,
    borderRadius: 16,
    gap: 12,
    position: "relative",
  },
  buttonOpacity: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  containerButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
  },
});
