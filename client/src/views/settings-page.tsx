import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogOut, Trash2, Key } from "lucide-react";
import { useState } from "react";
import { PinCodeEntry } from "../components/pin-code-entry";
import { SettingsTab } from "../components/settings-tab";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks";
import { setLanguage, setPin } from "@/features/settings/settings-slice";


export const Settings = () => {
  const [currentView, setCurrentView] = useState("preferences")
  // const [language, setLanguage] = useState("english")
  const language = useAppSelector((state) => state.reducer.settings?.language)
  
  const [isPinVerified, setIsPinVerified] = useState(false)
  const dispatch = useDispatch();

  const renderView = () => {
    switch (currentView) {
      case "preferences":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">{language == "english" ? "Language Preferences" : "Gipili na Lengguwahe"}</h3>
              <RadioGroup value={language} onValueChange={(e: string) => dispatch(setLanguage(e))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="english" id="english" />
                  <Label htmlFor="english">English</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cebuano" id="cebuano"/>
                  <Label htmlFor="cebuano">Cebuano</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )
      case "accountSettings":
        if (!isPinVerified) {
          return <PinCodeEntry onCorrectPin={() => setIsPinVerified(true)} />
        }
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">{language=="english"? "Account Settings" : "Mga Settings sa Account Diba"}</h3>
            <Button className="w-full flex items-center justify-start space-x-2" variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              <span>{language=="english"? "Sign Out" : "Logout"}</span>
            </Button>
            <Button className="w-full flex items-center justify-start space-x-2" variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>{language=="english"? "Delete Account" : "Walaon ni nga Account"}</span>
            </Button>
            <Button className="w-full flex items-center justify-start space-x-2" variant="outline">
              <Key className="mr-2 h-4 w-4" />
              <span>{language=="english"? "Change PIN" : "Bagohon ang PIN"}</span>
            </Button>
          </div>
        );
      default:
        return null
    }
  }

  return (
    <div className="flex h-full bg-background text-foreground bg-white">
      <SettingsTab currentView={currentView} setCurrentView={(view) => {
        setCurrentView(view)
        if (view !== "accountSettings") {
          setIsPinVerified(false)
        }
      }} />
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        {renderView()}
      </div>
    </div>
  )
};