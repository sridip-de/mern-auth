const GoogleLoginButton = () => {

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google'
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