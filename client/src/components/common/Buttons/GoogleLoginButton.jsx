const GoogleLoginButton = () => {

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_NODE_ENV === 'production' ? 'https://mern-auth-nn1z.onrender.com/api/auth/google' : 'http://localhost:3000/api/auth/google';

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
