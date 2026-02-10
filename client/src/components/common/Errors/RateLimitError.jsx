const RateLimitError = () => {
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
          Please wait a moment before trying again
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

  )
}

export default RateLimitError
