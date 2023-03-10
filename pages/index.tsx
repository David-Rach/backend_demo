import { signIn, signOut, useSession } from "next-auth/react"
import { Inter } from 'next/font/google'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="relative h-screen py-16 bg-gradient-to-br from-sky-50 to-gray-200">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="space-y-4">
                <img src={session?.user?.image ? session.user.image : `https://tailus.io/sources/blocks/social/preview/images/icon.svg`} loading="lazy" className="w-16 rounded-full" alt="tailus logo" />
                <h2 className="mb-8 text-2xl text-cyan-900 font-bold">{`${session?.user ? `Welcome ${session.user.name}!` : `Please login!`}`}</h2>
              </div>
              <div className="mt-16 grid space-y-4">

                {!session?.user ? <button onClick={() => { signIn("google") }} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                  <div className="relative flex items-center space-x-4 justify-center">
                    <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="absolute left-0 w-5" alt="google logo" />
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
                  </div>
                </button> :
                  <button onClick={() => { signOut() }} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                    <div className="relative flex items-center space-x-4 justify-center">
                      <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Logout</span>
                    </div>
                  </button>}

              </div>

              <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
                <p className="text-xs">{`Hey future me! If you're wondering why we get to this page, its because in the future, we might want to add support for more providers e.g Github or facebook`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}