


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: number | string; // API theke _id (string) ashe, tai number | string both support kora holo
        productID: string;     // ✅ নতুন
    variantID?: string;    // ✅ নতুন
    name: string;
    price: number;
    mrp: number;
    image: string;
    category: string;
    quantity: number;
    thumbnail?: string;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
    isMiniCartOpen: boolean;
}

const CART_STORAGE_KEY = 'sobjihaat_cart';

// ---------- localStorage helpers (SSR-safe) ----------
const loadCartFromStorage = (): CartItem[] => {
    if (typeof window === 'undefined') return []; // SSR এ localStorage থাকে না

    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (err) {
        console.error('Failed to load cart from storage:', err);
        return [];
    }
};

const saveCartToStorage = (items: CartItem[]) => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
        console.error('Failed to save cart to storage:', err);
    }
};

const calculateTotals = (items: CartItem[]) => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { totalQuantity, totalPrice };
};

// ---------- Initial state: cart লোড হয় localStorage থেকে (থাকলে) ----------
const initialItems = loadCartFromStorage();
const initialTotals = calculateTotals(initialItems);

const initialState: CartState = {
    items: initialItems,
    totalQuantity: initialTotals.totalQuantity,
    totalPrice: initialTotals.totalPrice,
    isMiniCartOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // ✅ fix: quantity প্যারামিটার সাপোর্ট করে, যাতে ProductModal থেকে সরাসরি
        // নির্দিষ্ট quantity (যেমন ৩টা) একবারে add করা যায়
        addToCart: (
            state,
            action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>
        ) => {
            const qtyToAdd = action.payload.quantity ?? 1;
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += qtyToAdd;
            } else {
                state.items.push({ ...action.payload, quantity: qtyToAdd });
            }

            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
            saveCartToStorage(state.items); // ✅ persist
        },

        removeFromCart: (state, action: PayloadAction<number | string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);

            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
            saveCartToStorage(state.items);
        },

        increaseQuantity: (state, action: PayloadAction<number | string>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }

            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
            saveCartToStorage(state.items);
        },

        decreaseQuantity: (state, action: PayloadAction<number | string>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter(i => i.id !== action.payload);
                }
            }

            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
            saveCartToStorage(state.items);
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            saveCartToStorage(state.items);
        },

        updateQuantity: (state, action: PayloadAction<{ id: number | string; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item && action.payload.quantity > 0) {
                item.quantity = action.payload.quantity;
            }

            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
            saveCartToStorage(state.items);
        },

        openMiniCart: (state) => {
            state.isMiniCartOpen = true;
        },

        closeMiniCart: (state) => {
            state.isMiniCartOpen = false;
        },

        toggleMiniCart: (state) => {
            state.isMiniCartOpen = !state.isMiniCartOpen;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    updateQuantity,
    openMiniCart,
    closeMiniCart,
    toggleMiniCart,
} = cartSlice.actions;

export default cartSlice.reducer;