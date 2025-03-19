'use client';

// context/cartContext.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';


export interface CartSubscription {
	startDate: Date;
	endDate: Date;
	optionType: string;
	duration: number;
	price: number;
	cityId: number;
	cityImg: string | File;
	cityName: string;
	cityAdress: string;
	stripeId: string
}

// Define state structure
export interface CartState {
	items: CartSubscription[];
}

// Define actions
type CartAction =
	| { type: 'ADD_TO_CART'; payload: CartSubscription }
	| { type: 'REMOVE_FROM_CART'; payload: CartSubscription }
	| { type: 'CLEAR_CART' };

// Initial state for the cart
const savedCart = typeof window !== "undefined" && window.localStorage.getItem('cart');
const initialState: CartState = savedCart
	? JSON.parse(savedCart)
	: {
		items: [],
	};

// Cart reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case 'ADD_TO_CART':
			let newItems = state.items.filter(
				(item) => item.cityId != action.payload.cityId,
			);
			newItems.push(action.payload);
			let data = {
				...state,
				items: newItems,
			};
			return data;
		case 'REMOVE_FROM_CART':
			const newData = {
				...state,
				items: state.items.filter(
					(item) =>
						item.cityId !== action.payload.cityId ||
						item.optionType !== action.payload.optionType ||
						item.duration !== action.payload.duration
				),
			};

			if (typeof window !== 'undefined') {
				window.localStorage.setItem('cart', JSON.stringify(newData));
			}

			return newData;
		case 'CLEAR_CART':
			if (typeof window !== 'undefined') {
				window.localStorage.removeItem('cart');
			}
			return {
				items: [],
			};
		default:
			return state;
	}
}

// Create Cart Context type
interface CartContextType {
	state: CartState;
	addToCart: (subscription: CartSubscription) => void;
	removeFromCart: (subscription: CartSubscription) => boolean;
	clearCart: () => void;
}

// Create Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider component to wrap around the app
export function CartProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	const addToCart = (subscription: CartSubscription): boolean => {
		const existingItemIndex = state.items.findIndex(
			(item) => item.cityId === subscription.cityId
		);

		let newItems;
		if (existingItemIndex !== -1) {
			// Remove the existing item and add the new one
			newItems = state.items.filter((item) => item.cityId !== subscription.cityId);
		} else {
			newItems = [...state.items];
		}

		newItems.push(subscription);

		const updatedCart = { ...state, items: newItems };

		if (typeof window !== 'undefined') {
			window.localStorage.setItem('cart', JSON.stringify(updatedCart));
		}

		dispatch({ type: 'ADD_TO_CART', payload: subscription });

		// Check if the item exists in the cart after adding
		return updatedCart.items.some((item) => item.cityId === subscription.cityId);
	};

	const removeFromCart = (subscription: CartSubscription): boolean => {
		const existingItemIndex = state.items.findIndex(
			(item) =>
				item.cityId === subscription.cityId &&
				item.optionType === subscription.optionType &&
				item.duration === subscription.duration
		);

		if (existingItemIndex === -1) {
			return false; // Item not found in the cart
		}

		const newItems = state.items.filter(
			(item) =>
				item.cityId !== subscription.cityId ||
				item.optionType !== subscription.optionType ||
				item.duration !== subscription.duration
		);

		const updatedCart = { ...state, items: newItems };

		if (typeof window !== 'undefined') {
			window.localStorage.setItem('cart', JSON.stringify(updatedCart));
		}

		dispatch({ type: 'REMOVE_FROM_CART', payload: subscription });

		return !updatedCart.items.some(
			(item) =>
				item.cityId === subscription.cityId &&
				item.optionType === subscription.optionType &&
				item.duration === subscription.duration
		);
	};

	const clearCart = (): boolean => {
		if (state.items.length === 0) {
			return false; // Cart is already empty
		}

		if (typeof window !== 'undefined') {
			window.localStorage.removeItem('cart');
		}

		dispatch({ type: 'CLEAR_CART' });

		return state.items.length === 0; // Should return true after clearing
	};

	return (
		<CartContext.Provider
			value={{ state, addToCart, removeFromCart, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
}

// Custom hook to use the cart context
export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
