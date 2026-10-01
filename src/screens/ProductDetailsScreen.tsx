import React, {useEffect, useState} from "react";
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View} from "react-native";

import {Product} from "../types/product";

const ProductDetailsScreen = ({route}: any) => {
    const {productId} = route.params;
    const [loading, setLoading] = useState(true);
    const [productDetails, setProductDetails] = useState<Product | null>(null);


    const [error, setError] = useState('');

    const loadProductDetails = async () => {
        try {
            setError('');
            const response = await fetch(`https://dummyjson.com/products/${productId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const data = await response.json();
            setProductDetails(data);
        } catch (error) {
            setError('Failed to fetch product details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProductDetails();
    }, [productId]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading product details...</Text>
            </View>
        );
    }

    if (error || !productDetails) {
        return (
            <View style={styles.center}>
                <Text>{error || 'Product details not found.'}</Text>
            </View>
        );
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{uri: productDetails.thumbnail}} style={styles.image} />
            <Text style={styles.title}>{productDetails.title}</Text>
            <Text style={styles.description}>{productDetails.description}</Text>
            <Text style={styles.price}>Price: ${productDetails.price}</Text>
            <Text style={styles.category}>Category: {productDetails.category}</Text>
            <Text style={styles.rating}>Rating: {productDetails.rating}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    category: {
        fontSize: 16,
        marginBottom: 8,
    },
    rating: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default ProductDetailsScreen;