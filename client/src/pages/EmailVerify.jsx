// import { useRef } from "react"
// import { useEmailVerify } from "@/features/auth";
import { useSendOtp } from "@/features/auth/hooks/useSendOtp";
// import { useNavigate } from "react-router";
// import APP_ROUTES from "@/constants/app.routes";
import { toast } from "react-toastify";
import { OtpForm } from "@/features/auth/components/OtpForm";

const EmailVerify = () => {

  const { mutate: sendOtp, isPending: isSendingOtpPending } = useSendOtp({
    onSuccess: (data) => {
      toast.success('Otp sent Successfully')
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const handleSendOtp = () => {
    sendOtp();
  }

  return (
    <div className="
       bg-zinc-800
      flex flex-col
      items-center
      justify-center
      h-[calc(100vh-60px)]
    ">
      <button className={`p-2 ${isSendingOtpPending ? 'bg-zinc-500' : 'bg-zinc-200'} mb-4`} onClick={(event) => handleSendOtp(event)} disabled={isSendingOtpPending}>Send Otp</button>
      <OtpForm />
    </div>
  )
}

export default EmailVerify
