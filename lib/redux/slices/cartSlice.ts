import { Product } from '@/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductExtends extends Product {
    quantityBuy: number;
}

interface CartSlice {
    items: ProductExtends[];
}

const initialState: CartSlice = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductExtends>) => {
            const existingProduct = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (!existingProduct) {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
        clearCarts: (state) => {
            state.items = [];
        },
        updateQtyBuy: (
            state,
            action: PayloadAction<{
                productId: string;
                dataUpdate: number;
            }>
        ) => {
            const findProduct = state.items.findIndex(
                (item) => item.id === action.payload.productId
            );

            if (findProduct) {
                state.items[findProduct].quantityBuy =
                    action.payload.dataUpdate;
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCarts, updateQtyBuy } =
    cartSlice.actions;

export default cartSlice.reducer;
