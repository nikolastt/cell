import { FlatList } from "react-native";

import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../utils/functions/Products";
import { Product } from "../../types/product";
import CardItem from "../../components/CardItem";

export default function Products() {
  const [allProducts, setAllProducts] = useState<Product[]>();
  useEffect(() => {
    const getAll = async () => {
      try {
        const products = await getAllProducts();
        setAllProducts(products);
      } catch (err) {
        console.log(err);
      }
    };

    getAll();
  }, []);

  return (
    <View className="flex-1">
      <FlatList
        data={allProducts}
        numColumns={2}
        horizontal={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CardItem product={item} />}
      />
    </View>
  );
}
