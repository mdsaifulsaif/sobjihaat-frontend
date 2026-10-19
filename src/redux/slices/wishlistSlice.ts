import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
    id: string | number;
    productID?: string;
    name: string;
    price: number;
    mrp?: number;
    regularPrice?: number;
    image: string;
    thumbnail?: string;
    category?: string;
    rating?: number;
    unit?: string;
    stock?: number;
    discountPercent?: number;
}

interface WishlistState {
    items: WishlistItem[];
    totalItems: number;
}

const WISHLIST_STORAGE_KEY = 'sobjihaat_wishlist';

const loadWishlistFromStorage = (): WishlistItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (err) {
        console.error('Failed to load wishlist from storage:', err);
        return [];
    }
};

const saveWishlistToStorage = (items: WishlistItem[]) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
        console.error('Failed to save wishlist to storage:', err);
    }
};

const initialItems = loadWishlistFromStorage();

const initialState: WishlistState = {
    items: initialItems,
    totalItems: initialItems.length,
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
            const exists = state.items.find(item => String(item.id) === String(action.payload.id));
            if (!exists) {
                state.items.push(action.payload);
                state.totalItems = state.items.length;
                saveWishlistToStorage(state.items);
            }
        },

        removeFromWishlist: (state, action: PayloadAction<string | number>) => {
            state.items = state.items.filter(item => String(item.id) !== String(action.payload));
            state.totalItems = state.items.length;
            saveWishlistToStorage(state.items);
        },

        toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
            const index = state.items.findIndex(item => String(item.id) === String(action.payload.id));
            if (index !== -1) {
                state.items.splice(index, 1);
            } else {
                state.items.push(action.payload);
            }
            state.totalItems = state.items.length;
            saveWishlistToStorage(state.items);
        },

        clearWishlist: (state) => {
            state.items = [];
            state.totalItems = 0;
            saveWishlistToStorage(state.items);
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
