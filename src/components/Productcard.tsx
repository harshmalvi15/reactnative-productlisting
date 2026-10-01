import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard= ({ product, onPress }: ProductCardProps) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: product.thumbnail }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {product.title}
                </Text>
                <Text style={styles.category} >
                    {product.category}
                </Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        marginHorizontal: 16,
        elevation: 2,

    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 8,
    },
    content: {
        flex: 1,
        marginTop: 8,
        marginLeft: 12,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#000',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 5,
    },
    category: {
        fontSize: 14,
        color: '#666',
    },
});

export default ProductCard;