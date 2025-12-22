import { useAuthContext } from "../contexts/AuthContext"

const Home = () => {

  const { user } = useAuthContext();
  console.log(user)

  return (
    <div className="
      bg-zinc-800
      flex flex-col
      items-center
      justify-center
      h-[calc(100vh-60px)] 
    ">
      <div className="
        text-5xl text-zinc-100
        mb-8
      ">
        👋️ Hey! {user ? user.name : "Developer"}
      </div>
      <button className="
        px-4 py-2
        border-2 border-zinc-600
        text-zinc-100
        rounded-md
        hover:bg-zinc-700
        transition-colors
        font-medium
      ">
        Get Started
      </button>
    </div>
  )
}

export default Home