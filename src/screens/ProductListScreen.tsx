import React, {useEffect, useMemo, useState} from "react";
import {ActivityIndicator,FlatList, StyleSheet, View, RefreshControl,Text,TextInput} from "react-native";
import ProductCard from "../components/Productcard";
import {getProducts} from "../services/productApi";
import {Product} from "../types/product";

const ProductListScreen = ({navigation}: any) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    const loadProducts = async () => {
        try {
            setError('');
            const data = await getProducts();
            setProducts(data);
        }
        catch (error) {
            setError('Failed to fetch products. Please try again later.');
        }
        finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []); 

    const filteredProducts = useMemo(() => {
        const query = search.toLowerCase();

        if (!query) {
            return products;
        }

        return products.filter(product =>
            product.title.toLowerCase().includes(query), );
    }, [products, search]);

    const handleRefresh = () => {
        setRefreshing(true);
        loadProducts();
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading products...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
                <Text style={styles.retry} onPress={loadProducts}>Tap to retry</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search products..."
            style={styles.searchInput}
            />
            
            {filteredProducts.length === 0 ? (
                <View style={styles.center}>
                    <Text>No products found.</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                        <ProductCard product={item} onPress={() => navigation.navigate('ProductDetails', {productId: item.id})} />
                    )
                }
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1, 
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    center: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,
    
    },  
    message: {
        fontSize: 16,
        color: '#333',
    },
    error: {
        fontSize: 16,
        color: '#d32f2f',
    },
    retry: {
        fontSize: 16,
        color: '#1976d2',
    },
});

export default ProductListScreen;
