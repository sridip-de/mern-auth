import { useFetchUser } from "@/features/user";
import Loader from "@/components/common/Loader/Loader";

const Home = () => {

  const { data: user, isLoading } = useFetchUser();
  //console.log(user)

  if (isLoading) return <Loader />

  return (
    <div className="
  bg-zinc-800
  flex flex-col
  items-center
  justify-center
  h-[calc(100vh-60px)]
  px-4
">
      <div className="
    text-3xl sm:text-4xl md:text-5xl
    text-zinc-100
    mb-6 sm:mb-8
    flex
    flex-col
    items-center
    text-center
  ">
        <img
          src={user?.data?.data?.picture}
          className="rounded-full mb-3 sm:mb-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
          alt="Profile"
        />
        <span className="text-4xl sm:text-8xl md:text-6xl mb-2">👋️</span>
        <span>Hey! {user?.data ? user.data.data.name : "Developer"}</span>
      </div>
      <button className="
    px-6 py-3
    border-2 border-zinc-600
    text-zinc-100
    rounded-md
    hover:bg-zinc-700
    active:bg-zinc-600
    transition-colors
    font-medium
    text-base sm:text-lg
  ">
        Get Started
      </button>
    </div>
  )
}

export default Home
