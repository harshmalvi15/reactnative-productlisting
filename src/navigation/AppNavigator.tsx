import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";

export type RootStackParamList = {
    ProductList: undefined;
    ProductDetails: { productId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="ProductList">
            <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Products' }} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
        </Stack.Navigator>
    );
};

export default AppNavigator;