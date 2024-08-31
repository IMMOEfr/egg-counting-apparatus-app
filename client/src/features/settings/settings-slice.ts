import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
    language: string;
    pin: string;
};

// Define the initial state
const initialState: SettingsState = {
    language: "english",
    pin: "1234",
};


// Create the slice 
export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
        setPin: (state, action: PayloadAction<string>) => {
            state.pin = action.payload;
        },
    },
});

// Export the actions generated from the slice
export const { setLanguage, setPin } = settingsSlice.actions;
export default settingsSlice.reducer;