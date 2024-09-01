import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { auth, googleProvider } from "@/store/firebase";
import { signInWithRedirect, getRedirectResult, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setStep } from "@/features/auth/auth-slice";

export const useAuth = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginWithGoogle = async () => {
        try {
            const user = await signInWithPopup(auth, googleProvider);
            // we will use the user's credentials to link to
            // firestore. We will take something from the UID of the 
            // egg counting apparatus


            // Finally, wedispatch the update the step
            dispatch(setStep(3));
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Error: ", error.message);
            } else {
                console.log("Internal server error");
            }
        }
    };

    const logout = async () => {
        try {
            await auth.signOut();
            // toast("Logged out successfully");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("Error: ", error.message);
            } else {
                console.log("Internal server error");
            }
        }
    }

    // useEffect(() => {
    //     const handleRedirectResult = async () => {
    //         try {
    //             const result = await getRedirectResult(auth);
    //             if (result) {
    //                 // If we get a valid result, update the step and navigate
    //                 dispatch(setStep(3));
    //                 navigate('/home'); // Change this to your desired post-login path
    //             }
    //         } catch (error: unknown) {
    //             if (error instanceof Error) {
    //                 console.log("Error after redirect: ", error.message);
    //             }
    //         }
    //     };

    //     handleRedirectResult();
    // }, [dispatch, navigate]);

    return { loginWithGoogle, logout };
};
