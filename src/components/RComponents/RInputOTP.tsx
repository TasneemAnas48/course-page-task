import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

const RInputOtp = ({ maxLength, pattern, ...props }: { maxLength: number, pattern?: string }) => {
    return (
        <InputOTP maxLength={maxLength} pattern={pattern ? pattern : REGEXP_ONLY_DIGITS_AND_CHARS} {...props}>
            <InputOTPGroup>
                {Array.from({ length: maxLength }, (_, index) => (
                    <InputOTPSlot key={index} index={index} />
                ))}
            </InputOTPGroup>
        </InputOTP>
    )
}
export default RInputOtp;