import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Eggtray {
    id: number;
    layer: string;
    eggSize: string;
    eggCount: number;
    time: string;
    date: string;
};

export interface EggCountingApparatusState {
    eggCountingApparatusID: string;
    Eggtrays: Eggtray[];
    map_of_counts: {
        [key: string]: number;
    };
};


// Define the initial state
const initialState: EggCountingApparatusState = {
    eggCountingApparatusID: "undefined",
    Eggtrays: [],
    map_of_counts: {
        "S": 0,
        "M": 0,
        "L": 0,
        "XL": 0,
        "J": 0
    },
};

// // Task #1: Print the amount of trays scanned
// // Task #2: Print the amount of tray per size scanned
// Eggtrays.map((eggtray) => {
//     map_of_counts[eggtray.eggSize] += 1;

//     eggtray.eggSize
// })

// Create the slice
export const eggCountingApparatusSlice = createSlice({
    name: "eggCountingApparatus",
    initialState,
    reducers: {
        setEggCountingApparatusID: (state, action: PayloadAction<string>) => {
            state.eggCountingApparatusID = action.payload;
        },
        addEggtray: (state, action: PayloadAction<Eggtray>) => {
            state.Eggtrays.push(action.payload);
            state.map_of_counts[action.payload.eggSize] += 1;
        },
        clearEggtray: (state) => {
            state.Eggtrays = [];
            state.map_of_counts = {
                "S": 0,
                "M": 0,
                "L": 0,
                "XL": 0,
                "J": 0
            };
        },
    },
});

// Export the actions generated from the slice
export const { setEggCountingApparatusID, addEggtray, clearEggtray } = eggCountingApparatusSlice.actions;
export default eggCountingApparatusSlice.reducer;


