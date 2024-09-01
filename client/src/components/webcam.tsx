// import { useState, useRef, useEffect } from "react";
// import Webcam from "react-webcam";
// import { useWindowSize } from "@/hooks/useWindowSize";

// export const WebCamComponent = () => {
//     const [picture, setPicture] = useState("");
//     const windowSize = useWindowSize();
//     const webcamRef = useRef<Webcam>(null);
//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     // Adjust video constraints based on window size
//     const videoConstraints = {
//         width: windowSize.width || 1280,
//         height: windowSize.height || 720,
//         facingMode: "user"
//     };

//     // function handleCapture(){
//     //     const screenshot = webcamRef.current?.getScreenshot();
//     //     if (screenshot) {
//     //         const image = new Image();
//     //         image.src = screenshot;
//     //         image.onload = () => {
//     //             const canvas = canvasRef.current;
//     //             if (canvas) {
//     //                 const context = canvas.getContext("2d");
//     //                 if (context) {
//     //                     canvas.width = image.width;
//     //                     canvas.height = image.height;
//     //                     context.drawImage(image, 0, 0);
//     //                     canvas.toBlob((blob) => {
//     //                         if (blob) {
//     //                             const url = URL.createObjectURL(blob);
//     //                             // setPicture(url);
                                
//     //                         }
//     //                     }, "image/jpeg");
//     //                 }
//     //             }
//     //         };
//     //     }
//     // };

    // const handleDownload = () => {
    //     if (picture) {
    //         const link = document.createElement("a");
    //         link.href = picture;
    //         link.download = "image.jpg";
    //         link.click();
    //     }
    // };

//     // useEffect(() => {
//     //     // take a picture once, and download it
//     //     handleCapture();
//     //     handleDownload();
//     // }, [])

//     return (
//         <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-800">
//             <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 videoConstraints={videoConstraints}
//                 className="w-full h-full object-cover"
//             />
//             <canvas ref={canvasRef} style={{ display: "none" }} />

//         </div>
//     );
// };



import { useDispatch } from "react-redux";
// import { captureImage, setWebcamRef, setCanvasRef } from "@/features/camera/camera-slice";
import Webcam from "react-webcam";
import { useAppSelector } from "@/app/hooks";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useRef, useEffect } from "react";
// import { useWebcamContext } from "@/context/WebcamContext";
import { useWebcamContext } from "@/lib/webcam-provider";

export const WebCamComponent = () => {
    const { webcamRef, canvasRef } = useWebcamContext() || {};
    const dispatch = useDispatch();
    // const webcamRef = useRef<Webcam>(null);
    // const canvasRef = useRef<HTMLCanvasElement>(null);
    const windowSize = useWindowSize();

    const videoConstraints = {
        width: windowSize.width || 1280,
        height: windowSize.height || 720,
        facingMode: "user"
    };

    // useEffect(() => {
    //     dispatch(setWebcamRef(webcamRef));
    //     dispatch(setCanvasRef(canvasRef));
    
    // }, [dispatch, webcamRef, canvasRef]);

    // const handleCapture = () => {
    //     dispatch(captureImage());
    // };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-800">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            {/* <button onClick={handleCapture}>Capture Image</button> */}
        </div>
    );
};
