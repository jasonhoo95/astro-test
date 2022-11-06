import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FilterObject {
	value: any;
}

const initialState: FilterObject = {
	value: null,
};

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		addFilter: (state, action) => {
			state.value = { ...state.value, ...action.payload };
		},
		clearFilter: (state) => {
			state.value = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addFilter, clearFilter } = counterSlice.actions;

export default counterSlice.reducer;
