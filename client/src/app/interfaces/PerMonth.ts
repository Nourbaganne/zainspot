export default interface PerMonth {
	duration?: number; // !
	amount?: number; // !
	tax?: number;
	stripePriceId?: string; // !
	stripeLookupKey?: string; // !
}

// TODO: remove ? from highlighted fields
// ? Gold Price have a default duration of 1 year
