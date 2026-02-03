import {CONSTANTS} from '@/constants'
console.log(CONSTANTS);

const GoogleLoginButton = () => {

  const handleGoogleLogin = () => {
    window.location.href = CONSTANTS.GOOGLE_AUTH_URI;

  }

  return (
    <button onClick={handleGoogleLogin} className="
      p-2
      text-white
      border
      rounded-lg
      border-zinc-500
    ">
      Login with Google
    </button>
  )
}

export default GoogleLoginButton
