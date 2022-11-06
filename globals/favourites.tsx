import { createSlice } from "@reduxjs/toolkit";

export interface FilterObject {
	favourites: any;
}

const initialState: FilterObject = {
	favourites: [],
};

export const favouriteSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		addFavourites: (state, action) => {
			let check = true;
			if (state.favourites.length) {
				state.favourites.map((o: any, key: number) => {
					if (o.id == action.payload.id) {
						state.favourites.splice(key, 1);

						check = false;
					}
				});
				if (check) {
					state.favourites.push(action.payload);
				}
			} else {
				state.favourites.push(action.payload);
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { addFavourites } = favouriteSlice.actions;

export default favouriteSlice.reducer;
