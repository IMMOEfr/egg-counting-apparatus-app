import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Settings } from "./settings-page";
import { useState, useEffect } from "react";
import { SettingsButton } from "../components/settings-button";
import { Label } from "@radix-ui/react-label";
import { WebCamComponent } from "@/components/webcam";
import { useAppSelector } from "@/app/hooks";
import { useDispatch } from "react-redux";
import { useWebcamContext } from "@/lib/webcam-provider";
import { setPicture } from "@/features/camera/camera-slice";
import { useToast } from "@/components/ui/use-toast";
import { useEggTray } from "@/hooks/useEggTray";
import { addEggtray } from "@/features/egg-counting-apparatus/egg-counting-apparatus-slice";
import axios from "axios";

export const ScanPage = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const { webcamRef, canvasRef } = useWebcamContext() || {};
    const language = useAppSelector((state) => state.reducer.settings?.language);
    const picture = useAppSelector((state) => state.reducer.camera?.picture);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { prepareForFirebase, startTimer, endTimer, formatDuration } = useEggTray();


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                setIsCameraOn(true);
            })
            .catch(() => {
                setIsCameraOn(false);
            });
    }, []);

    const handleCameraPermission = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(() => {
                setIsCameraOn(true);
            })
            .catch(() => {
                alert("Please allow camera permissions to continue.");
                setIsCameraOn(false);
            });
    };

    const handleConfirm = async () => { 
        try {
            // Capture the image            
            if (webcamRef && canvasRef) {
                const screenshot = webcamRef.current?.getScreenshot();
                if (screenshot) {
                    const image = new Image();
                    image.src = screenshot;
                    image.onload = () => {
                        const canvas = canvasRef.current;
                        if (canvas) {
                            const context = canvas.getContext("2d");
                            if (context) {
                                canvas.width = image.width;
                                canvas.height = image.height;
                                context.drawImage(image, 0, 0);
                                canvas.toBlob((blob: Blob) => {
                                    if (blob) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            const base64data = reader.result as string;
                                            dispatch(setPicture(base64data));  // Save Base64 image to Redux state
                                        };
                                        reader.readAsDataURL(blob);  // Convert blob to Base64
                                    }
                                }, "image/jpeg");
                            }
                        }
                    };
                }
            }
    
            if (picture) {
                // console.log("picture:", picture);
    
                // Prepare FormData with the Base64 image string
                const byteString = atob(picture.split(',')[1]);
                const mimeString = picture.split(',')[0].split(':')[1].split(';')[0];
                const arrayBuffer = new ArrayBuffer(byteString.length);
                const uint8Array = new Uint8Array(arrayBuffer);
    
                for (let i = 0; i < byteString.length; i++) {
                    uint8Array[i] = byteString.charCodeAt(i);
                }
    
                const imageBlob = new Blob([arrayBuffer], { type: mimeString });
                
                // Prepare FormData with the image blob
                const formData = new FormData();
                formData.append('image', imageBlob, 'egg_image.jpg');
                const startTime = startTimer();
                
                // Step 1: Count the Eggs in an egg tray
                const res = await axios.post("http://127.0.0.1:1110/count_eggs", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                

                // Step 3: Format the data:
                //      layhouse, eggSize, eggCount,
                //      date, bestByDate, timeStamp,
                //      firebaseUrl ""

                const layer = document.getElementById("layerHouse") as HTMLSelectElement;
                const size = document.getElementById("size") as HTMLSelectElement;
                const success = await prepareForFirebase(layer.value, size.value, res.data.count);
                if(!success) throw new Error("Failed to log the egg tray.");
                const endTime = endTimer(startTime);
                const durationInSeconds = formatDuration(endTime, "seconds");
                const durationInMS = formatDuration(endTime, "milliseconds");

                console.log(
                    `Logged Egg Tray: ${layer.value}, ${size.value}, ${res.data.eggCount} eggs, ${durationInSeconds} (${durationInMS})`
                );

                

                // Step 2: Save the data to the Redux store
                
                // Update Redux store
                
                
                // dispatch(addEggtray({
                //     layer: layer.value,
                //     eggSize: size.value,
                //     eggCount: res.data.eggCount,
                //     date: new Date().toLocaleDateString(),
                //     // bestByDate: new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString(),
                //     timeStamp: new Date().toLocaleTimeString(),
                //     id: Math.floor(Math.random() * 1000),
                //     // firebaseUrl: ""
                // }));
                
                // Step 4: Classify the eggs into sizes
                // Step 4.1: Format Prediction Data:
                //        referenceTrayID, 
                //        eggSize,
                //         [  ][][][][][]
                //         [  ][][][][][]
                //         [  ][][][][][]       ^
                //         [  ][][][][][]       |
                //         [^>][][][][][]       |
                // 5x6
                // Size Excepted
                

                // Step 5: CRUD OPERATION TIMER STUFF
                // Step 5.1: Send to firebase to retrieve 
                // the Document ID of the Egg Tray
                // Step 5.2: Log the Crud Operation into
                // collection

                // Step 6: Generate QR Code (a unique url to firebase)
                
                // Step 7: Print QR Code
                
                // Display success toast
                toast({
                    title: "Success",
                    className: "bg-green-500 text-white",
                    description: `Eggs counted successfully!`,
                    duration: 4000
                });
            }
        } catch(error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error(error);
            }
            setIsAlertOpen(true)
        } 
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <SettingsButton onClick={() => setIsSettingsOpen(!isSettingsOpen)} isOpen={isSettingsOpen} />
            <AnimatePresence initial={false}>
                <motion.div
                    key="content"
                    initial={{ x: isSettingsOpen ? "100%" : 0 }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`flex flex-col md:flex-row w-full md:h-full h-1/5  bg-black/10`}
                    style={{ position: isSettingsOpen ? "absolute" : "relative", right: 0 }}
                >
                    {/* Left view (form) */}
                    <div className="ml-4 flex-1 flex flex-col p-8 backdrop-blur-sm ">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold">{language === "english" ? "Insert Egg Tray" : "Ibutang ang Egg Tray"}</h1>
                        </div>
                        <div className="space-y-6 max-w-md">
                            <div>
                                <Label htmlFor="layerHouse">Layer House</Label>
                                <select
                                    id="layerHouse"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                    defaultValue="layer1"
                                >
                                    <option value="layer1">Layer House 1</option>
                                    <option value="layer2">Layer House 2</option>
                                    <option value="layer3">Layer House 3</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="size">Size</Label>
                                <select
                                    id="size"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                    defaultValue="small"
                                >
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                    <option value="xlarge">Extra Large</option>
                                    <option value="jumbo">Jumbo</option>
                                </select>
                            </div>

                            <Button className="w-full" onClick={handleConfirm}>
                                {language === "english" ? "Confirm" : "Kompirma"}
                            </Button>
                        </div>
                    </div>

                    {/* Right view (WebCamComponent) */}
                    <div className="flex-1 bg-muted h-1/2 md:h-full relative">
                        <div className="camera_component h-full object-cover bg-black flex items-center justify-center">
                            {isCameraOn ? (
                                <WebCamComponent />
                            ) : (
                                <div className="text-white text-center">
                                    <p className="mb-4">Camera is off</p>
                                    <Button onClick={handleCameraPermission}>
                                        Turn on camera
                                    </Button>
                                </div>
                            )}
                        </div>
                        {!isCameraOn && (
                            <div
                                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full cursor-pointer"
                                onClick={handleCameraPermission}
                            >
                                <CameraOffIcon className="h-6 w-6" />
                            </div>
                        )}
                    </div>
                </motion.div>

                {isSettingsOpen && (
                    <motion.div
                        key="settings"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute inset-0 bg-background z-40"
                    >
                        <Settings />
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Logged Succesfully!</AlertDialogTitle>
                        <AlertDialogDescription>
                            Printing QR...
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog> */}

            {/* <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>  
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Print Successful!</AlertDialogTitle>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog> */}

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Log Unsuccessful</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please Try Again.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setIsAlertOpen(false)}>Okay</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

function CameraOffIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="2" x2="22" y1="2" y2="22" />
            <path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" />
            <path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" />
            <path d="M14.121 15.121A3 3 0 1 1 9.88 10.88" />
        </svg>
    );
}
// 

// export const SomeComponent = () => {
//     const picture = useAppSelector((state) => state.camera.picture);

//     return (
//         <div>
//             {picture && <img src={picture} alt="Captured" />}
//         </div>
//     );
// };
