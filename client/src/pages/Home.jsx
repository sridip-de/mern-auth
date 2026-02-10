import { useFetchUser } from "@/features/user";
import Loader from "@/components/common/Loader/Loader";
import ProfilePicture from "@/features/user/components/ProfilePicture";

const Home = () => {
  const { data: user, isLoading, isError, error } = useFetchUser();

  if (isLoading) return <Loader />

  if (isError) {
    //const errorCode = error?.errorCode;

    //if (errorCode === 429 || errorCode === "TOO_MANY_REQUESTS") {
    return (
      <div className="
          bg-zinc-800
          flex flex-col
          items-center
          justify-center
          h-[calc(100vh-60px)]
          px-4
        ">
        <div className="text-center text-zinc-100">
          <h2 className="text-2xl sm:text-3xl mb-4">⏱️ Too Many Requests</h2>
          <p className="text-zinc-400 mb-6">
            {error?.message || "Please wait a moment before trying again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="
                px-6 py-3
                border-2 border-zinc-600
                text-zinc-100
                rounded-md
                hover:bg-zinc-700
                active:bg-zinc-600
                transition-colors
                font-medium
              "
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  //   return (
  //     <div className="text-center text-zinc-100 p-4">
  //       <p>Error: {error?.message || "Something went wrong"}</p>
  //     </div>
  //   );
  // }

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
        <ProfilePicture />
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
