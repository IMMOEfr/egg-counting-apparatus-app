import { useToast } from "@/components/ui/use-toast";
import { addEggtray, Eggtray } from "@/features/egg-counting-apparatus/egg-counting-apparatus-slice";
import { useDispatch } from "react-redux";
import { auth, db, eggTrayRef, crudRef } from "@/store/firebase";
import { addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { software_defined_web_url } from "@/lib/config";


export interface EggtrayFirebase {
    egg_tray_id: string;
    layerHouse: string;
    eggSize: string;
    eggCount: number;
    date: string;
    bestByDate: string;
    timeStamp: string;
    firebaseUrl: string;
};

export const useEggTray = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();

    // CRUD OPERATION FOR EGG TRAY TIMING (DATA COLLECTION)
    const startTimer = () => {
        return new Date().getTime();
    };

    const endTimer = (start: number) => {
        return new Date().getTime() - start;
    };

    const formatDuration = (duration: number, style: string) => {
        try {
            if(style === "seconds") return `${duration / 1000}s`;
            if(style === "minutes") return `${duration / 60000}m`;
            if(style === "hours") return `${duration / 3600000}h`;
            if(style === "milliseconds") return `${duration}ms`;
        } catch(error: unknown) {
            if(error instanceof Error) {
                toast({
                    title: "Error",
                    description: `${error.message}`,
                    variant: "destructive",
                    duration: 5000,
                });
            } else {
                console.error(error);
            }
        }
    };

    

    // STEPS OF HOW THE EGG TRAY ACTUALLY GOES
    const prepareForFirebase = async (
        layerhouseIn: string, eggSizeIn: string, eggCountIn: number,
    ) => {
        try {
            // Step 3: Format the data:
            //      layhouse, eggSize, eggCount,
            //      date, bestByDate, timeStamp,
            //      firebaseUrl ""

            // First we will calcualte the bestByDate, which is usually 2 
            // weeks from the date of scanning.

           
           
            const date = new Date();
            const tempDate = date;
            const timeStamp = date.toLocaleTimeString('it-IT'); // 'it-IT' locale results in 'HH:MM:SS' format
            const bestByDate = new Date(tempDate.setDate(tempDate.getDate() + 14));
            
            // getting ref collection
            // Next we will create the eggtray object.

            // using eggTrayRef <-- pointing to the eggTray collection
            // and using the add() method to create a new document.
            // This will return a promise, which we can await.
            // We will then use the document ID to set the egg_tray_id and also
            

            const eggtray: EggtrayFirebase = {
                layerHouse: layerhouseIn,
                eggSize: eggSizeIn,
                eggCount: eggCountIn,
                date: date.toISOString(),
                bestByDate: bestByDate.toISOString(),
                timeStamp: timeStamp,
                firebaseUrl: "",
                egg_tray_id: "",
            };

            const newDocRef = doc(eggTrayRef);
            await setDoc(newDocRef, eggtray);
            const eggTrayDocId = newDocRef.id;
            const firebaseUrl = `${software_defined_web_url}/eggTray=${eggTrayDocId}`;
            await updateDoc(newDocRef, { firebaseUrl, egg_tray_id: eggTrayDocId });
            return true;
        } catch(error: unknown) {
            if(error instanceof Error) {
                toast({
                    title: "Error",
                    description: `${error.message}`,
                    variant: "destructive",
                    duration: 5000,
                });
            } else {
                console.error(error);
            }
        };
    };

    const updateReduxStore = (eggTray: Eggtray) => {
        try {
            // updating redux of the egg counting apparatus
            dispatch(addEggtray(eggTray));
        } catch(error: unknown) {
            if(error instanceof Error) {
                toast({
                    title: "Error",
                    description: `${error.message}`,
                    variant: "destructive",
                    duration: 5000,
                });
            } else {
                console.error(error);
            }
        }
    };

    const addEggTray = () => {
        try {

        } catch(error: unknown) {
            if(error instanceof Error) {
                toast({
                    title: "Error",
                    description: `${error.message}`,
                    variant: "destructive",
                    duration: 5000,
                });
            } else {
                console.error(error);
            }
        }  
    };


    return { 
        updateReduxStore, addEggTray, prepareForFirebase,
        startTimer, endTimer, formatDuration
     };
};