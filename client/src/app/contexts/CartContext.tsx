'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

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
	stripeId: string;
}

interface CartState {
	items: CartSubscription[];
}

type CartAction =
	| { type: 'ADD_TO_CART'; payload: CartSubscription }
	| { type: 'REMOVE_FROM_CART'; payload: CartSubscription }
	| { type: 'CLEAR_CART' };

interface CartContextType {
	state: CartState;
	addToCart: (subscription: CartSubscription) => void;
	removeFromCart: (subscription: CartSubscription) => boolean;
	clearCart: () => void;
}

const initialState: CartState = { items: [] };


function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case 'ADD_TO_CART':
			return {
				...state,
				items: [...state.items.filter((item) => item.cityId !== action.payload.cityId), action.payload],
			};
		case 'REMOVE_FROM_CART':
			return {
				...state,
				items: state.items.filter(
					(item) =>
						item.cityId !== action.payload.cityId ||
						item.optionType !== action.payload.optionType ||
						item.duration !== action.payload.duration
				),
			};
		case 'CLEAR_CART':
			return { items: [] };
		default:
			return state;
	}
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};


export function CartProvider({ children }: { children: ReactNode }) {
	// Initialize cart from localStorage
	const [state, dispatch] = useReducer(cartReducer, initialState, () => {
		if (typeof window !== 'undefined') {
			const savedCart = localStorage.getItem('cart');
			if (savedCart) {
				try {
					const parsedCart = JSON.parse(savedCart, (key, value) => {
						// Convert date strings back to Date objects
						if (key === 'startDate' || key === 'endDate') {
							return new Date(value);
						}
						return value;
					});
					return parsedCart;
				} catch (error) {
					console.error('Failed to parse cart from localStorage:', error);
				}
			}
		}
		return initialState;
	});

	// Save cart to localStorage whenever it changes
	useEffect(() => {
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem('cart', JSON.stringify(state));
			} catch (error) {
				console.error('Failed to save cart to localStorage:', error);
			}
		}
	}, [state.items]);

	const addToCart = (subscription: CartSubscription): void => {
		dispatch({ type: 'ADD_TO_CART', payload: subscription });
	};

	const removeFromCart = (subscription: CartSubscription): boolean => {
		const itemExists = state.items.some(
			(item) =>
				item.cityId === subscription.cityId &&
				item.optionType === subscription.optionType &&
				item.duration === subscription.duration
		);
		if (!itemExists) return false;

		dispatch({ type: 'REMOVE_FROM_CART', payload: subscription });
		return true;
	};

	const clearCart = (): void => {
		dispatch({ type: 'CLEAR_CART' });
	};

	return (
		<CartContext.Provider value={{ state, addToCart, removeFromCart, clearCart }}>
			{children}
		</CartContext.Provider>
	);
}

