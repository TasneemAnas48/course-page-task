import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage
import authReducer from '@/store/slices/authSlice';

// Configure persist for the `user` slice only
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // Only persist the `user` slice
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
