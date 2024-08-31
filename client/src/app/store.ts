import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { userSlice } from "@/features/user/user-slice";
import { settingsSlice } from "@/features/settings/settings-slice";
import { eggCountingApparatusSlice } from "@/features/egg-counting-apparatus/egg-counting-apparatus-slice";

const reducer = combineReducers({
    user: userSlice.reducer,
    settings: settingsSlice.reducer,
    eggCountingApparatus: eggCountingApparatusSlice.reducer,
});

const persistedReducer = persistReducer(
    {
        transforms: [
            encryptTransform({
                secretKey: `${import.meta.env.SUPER_SECRET_KEY}`,
                onError: function (error) {
                    console.error('Error in encryptTransform', error);
                },
            }),
        ],
        storage,
        version: 1,
        key: "root"
    },
    // @ts-ignore
    reducer
);

export const store = configureStore({
    reducer: {
        reducer: persistedReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;