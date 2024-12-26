import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import paymentsReducer from "./reducers";

export const store = configureStore({
  reducer: paymentsReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
