import {Product} from '../types/product';

const API_BASE_URL = 'https://dummyjson.com/products';

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.products;
}