import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const useAuth = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const loginWithGoogle = (path: string) => {
        try {

            
        } catch(error: unknown) {
            if(error instanceof Error) {
                // toast({
                //     title: "Error",
                //     message: `${error.message}`,
                //     variant: "destructive"
                // });
                console.log("Error: ", error.message);
            } else {
                console.log("internal server error");
            }
        } finally {

        };
    };


    return {};
};