import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getProduct } from "../../utils/functions/Products";
import { Product as ProductType } from "../../types/product";
import { Ionicons } from "@expo/vector-icons";

// const mock = {
//   id: 1,
//   title: "iPhone 9",
//   description: "An apple mobile which is nothing like apple",
//   price: 549,
//   discountPercentage: 12.96,
//   rating: 4.69,
//   stock: 94,
//   brand: "Apple",
//   category: "smartphones",
//   thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//   images: [
//     "https://i.dummyjson.com/data/products/1/1.jpg",
//     "https://i.dummyjson.com/data/products/1/2.jpg",
//     "https://i.dummyjson.com/data/products/1/3.jpg",
//     "https://i.dummyjson.com/data/products/1/4.jpg",
//     "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//   ],
// };

export default function Product() {
  const [product, setProduct] = useState<ProductType>();
  const [imageSelected, setImageSelected] = useState<string | undefined>();

  const dimensions = Dimensions.get("window");

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    setImageSelected(product?.images[0]);
  }, [product]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: id,
    });
  }, []);

  useEffect(() => {
    const get = async () => {
      try {
        const productResponse = await getProduct(Number(id));
        setProduct(productResponse);
        navigation.setOptions({
          title: productResponse.title,
        });
      } catch (err) {
        console.log(err);
      }
    };
    get();
  }, []);

  return (
    <View style={{ padding: 12 }} className="gap-3">
      <Image
        style={{ alignSelf: "center" }}
        source={{
          uri: imageSelected,
          width: (dimensions.width * 80) / 100,
          height: 300,
        }}
      />

      <View
        className="flex-row gap-3 w-full justify-center "
        style={{ marginTop: 12 }}
      >
        {product?.images.map((image, i) => {
          if (i + 1 === product.images.length) {
            return;
          } else {
            return (
              <TouchableOpacity
                key={image}
                onPress={() => setImageSelected(image)}
                style={imageSelected === image ? styles.containerImage : {}}
              >
                <Image source={{ uri: image, width: 50, height: 50 }} />
              </TouchableOpacity>
            );
          }
        })}
      </View>
      <Text className="text-white font-bold text-xl">{product?.title}</Text>

      <View
        className="flex-row w-full   items-center "
        style={{ justifyContent: "space-between" }}
      >
        <View className="flex-row">
          <Text className="text-sm text-white self-end font-thin mr-1">R$</Text>

          <Text className="text-xl font-bold text-white">{product?.price}</Text>
        </View>

        <View className="flex-row items-center gap-3">
          <Ionicons name="star" color="yellow" size={20} />
          <Text className="text-white font-bold">{product?.rating}</Text>
        </View>
      </View>

      <View>
        <Text className="text-xl font-bold text-white">Descrição</Text>
        <Text className="text-white">{product?.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    borderWidth: 1,
    borderColor: "white",
    padding: 3,
    borderRadius: 8,
    overflow: "hidden",
  },
});
