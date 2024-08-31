import { Button } from "@/components/ui/button";
import { Globe, User } from "lucide-react";

interface SettingsTabProps {
    currentView: string;
    setCurrentView: (view: string) => void;
};

export const SettingsTab = ({ currentView, setCurrentView }: SettingsTabProps) => (
    <div className="w-64 bg-gray-300 h-full p-4 space-y-2">
        <Button
            onClick={() => setCurrentView("preferences")}
            variant={currentView === "preferences" ? "secondary" : "ghost"}
            className="w-full justify-start"
        >
            <Globe className="mr-2 h-4 w-4" />
            Preferences
        </Button>
        <Button
            onClick={() => setCurrentView("accountSettings")}
            variant={currentView === "accountSettings" || currentView === "pinEntry" ? "secondary" : "ghost"}
            className="w-full justify-start"
        >
            <User className="mr-2 h-4 w-4" />
            Account Settings
        </Button>
    </div>
);