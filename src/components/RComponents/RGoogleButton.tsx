import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import RFlex from "./RFlex"
import GoogleIcon from "@/assets/icons/Google.png"

interface RGoogleButtonProps {
    onClick: () => void
    isLoading?: boolean
    text: string
    className?: string
}

const RGoogleButton = ({ 
    onClick, 
    isLoading = false, 
    text, 
    className = "" 
}: RGoogleButtonProps) => {
    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            type="button"
            className={`w-full bg-white text-foreground border border-input rounded-[15px] h-[50px] font-normal flex items-center gap-2 ${className}`}
        >
            {isLoading ? (
                <RFlex className="justify-center items-center">
                    <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
                    {text}
                    <Loader className="w-4 h-4 animate-spin" />
                </RFlex>
            ) : (
                <>
                    <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
                    {text}
                </>
            )}
        </Button>
    )
}

export default RGoogleButton;