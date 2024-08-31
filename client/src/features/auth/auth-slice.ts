import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
    step: number;
    pin: string;
    firstVisit: boolean;
};

// Define the initial state using that type
const initialState: AuthState = {
    step: 1,
    pin: "",
    firstVisit: true,
};

export const authSlice = createSlice({
    name: "auth",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        setPin: (state, action: PayloadAction<string>) => {
            state.pin = action.payload;
        },
        setFirstVisit: (state, action: PayloadAction<boolean>) => {
            state.firstVisit = action.payload;
        }
    },
});

export const { setStep, setPin, setFirstVisit } = authSlice.actions;
export default authSlice.reducer;