import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { SetStateAction, useState } from "react";
interface PinCodeEntryProps {
    onCorrectPin: () => void;
};

export const PinCodeEntry = ({ onCorrectPin }: PinCodeEntryProps) => {
    const [pin, setPin] = useState("")
  
    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault()
      if (pin === "1234") {
        onCorrectPin()
      } else {
        alert("Incorrect PIN")
        setPin("")
      }
    }
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="pin" className="text-secondary-foreground">Enter PIN</Label>
          <Input
            id="pin"
            type="password"
            value={pin}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPin(e.target.value)}
            className="bg-secondary-foreground/10 border-secondary-foreground/20"
            maxLength={4}
          />
        </div>
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    )
}