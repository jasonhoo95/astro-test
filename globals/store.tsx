import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import filterReducer from "./filter";
import favouriteReducer from "./favourites";
import scheduleReducer from "./schedule";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
	key: "root",
	storage,
};

const schedulePersistConfig = {
	key: "schedule",
	storage,
};

const persistedReducer = persistReducer(persistConfig, favouriteReducer);
const schedulePersisted = persistReducer(
	schedulePersistConfig,
	scheduleReducer
);

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		favourites: persistedReducer,
		schedule: schedulePersisted,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
