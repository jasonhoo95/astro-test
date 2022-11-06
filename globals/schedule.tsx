import { createSlice } from "@reduxjs/toolkit";

export interface ScheduleObject {
	value: any;
}

const initialState: ScheduleObject = {
	value: [],
};

export const scheduleSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		schedulelist: (state, action) => {
			state.value = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { schedulelist } = scheduleSlice.actions;

export default scheduleSlice.reducer;
