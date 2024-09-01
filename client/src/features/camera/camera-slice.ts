import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CameraState {
    picture: string;
    windowSize: { width: number; height: number };
};

const initialState: CameraState = {
    picture: "",
    windowSize: { width: 1280, height: 720 },
};

export const cameraSlice = createSlice({
    name: "camera",
    initialState,
    reducers: {
        setPicture: (state, action: PayloadAction<string>) => {
            state.picture = action.payload;
        },
        setWindowSize: (state, action: PayloadAction<{ width: number; height: number }>) => {
            state.windowSize = action.payload;
        },
        // captureImage: (state) => {
        //     const screenshot = state.webcamRef?.current?.getScreenshot();
        //     if (screenshot) {
        //         const image = new Image();
        //         image.src = screenshot;
        //         image.onload = () => {
        //             const canvas = state.canvasRef.current;
        //             if (canvas) {
        //                 const context = canvas.getContext("2d");
        //                 if (context) {
        //                     canvas.width = image.width;
        //                     canvas.height = image.height;
        //                     context.drawImage(image, 0, 0);
        //                     canvas.toBlob((blob: Blob | MediaSource) => {
        //                         if (blob) {
        //                             const url = URL.createObjectURL(blob);
        //                             state.picture = url;
        //                         }
        //                     }, "image/jpeg");
        //                 }
        //             }
        //         };
        //     }
        // },
        
        
    },
});

export const { setPicture, setWindowSize } = cameraSlice.actions;
export default cameraSlice.reducer;