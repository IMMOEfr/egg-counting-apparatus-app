import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SettingsButtonProps {
    onClick: () => void;
    isOpen: boolean;
};

export const SettingsButton = ({ onClick, isOpen }: SettingsButtonProps) => (
    // <Button
    //   onClick={onClick}
    //   className={`fixed top-1/2 -translate-y-1/2 h-20 w-0 z-50 transition-colors ${
    //     isOpen
    //       ? "right-0 bg-black text-white text-primary-foreground rounded-l-full"
    //       : "left-0 bg-black text-white text-primary-foreground rounded-r-full"
    //   }`}
    //   aria-label={isOpen ? "Close Settings" : "Open Settings"}
    // >
    //   {isOpen ? <ChevronLeft className="text-white" size={24} /> : <ChevronRight className = "text-white" size={24} />}
    // </Button>
    <>
      <div 
        className = {`w-2 h-full bg-black absolute
          z-50 transition-colors ${
          isOpen
            ? "right-0"
            : "left-0"
        }`}/>
      <Button
        onClick={onClick}
        className={` select-none fixed top-1/2 -translate-y-1/2 h-20 w-10 z-50 transition-colors ${
          isOpen
            ? "right-0 bg-black text-white text-primary-foreground rounded-l-full"
            : "left-0 bg-black text-white text-primary-foreground rounded-r-full"
        }`}
        aria-label={isOpen ? "Close Settings" : "Open Settings"}
      >
        {isOpen ? <ChevronLeft className="text-white" size={24} /> : <ChevronRight className = "text-white" size={24} />}
      </Button>

    </> 
);