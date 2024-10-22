'use client';

// context/cartContext.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';
import Subscription from '../interfaces/Subscription';

// Define state structure
interface CartState {
	items: Subscription[];
}

// Define actions
type CartAction =
	| { type: 'ADD_TO_CART'; payload: Subscription }
	| { type: 'REMOVE_FROM_CART'; payload: Subscription }
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
			let newData = {
				...state,
				items: state.items.filter(
					(item) =>
						item.cityId != action.payload.cityId &&
						item.optionType != action.payload.optionType &&
						item.duration == action.payload.duration,
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
	addToCart: (subscription: Subscription) => void;
	removeFromCart: (subscription: Subscription) => void;
	clearCart: () => void;
}

// Create Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider component to wrap around the app
export function CartProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	const addToCart = (subscription: Subscription) => {
		dispatch({ type: 'ADD_TO_CART', payload: subscription });
	};

	const removeFromCart = (subscription: Subscription) => {
		dispatch({ type: 'REMOVE_FROM_CART', payload: subscription });
	};

	const clearCart = () => {
		dispatch({ type: 'CLEAR_CART' });
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
