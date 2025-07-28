import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Navbar({ user }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold text-purple-700 dark:text-purple-300">💬 Q-Chat</h1>
      <div className="flex items-center gap-3">
        <button onClick={() => setDark(!dark)}>
          {dark ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-600" />}
        </button>
        {user ? (
          <>
            <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full" />
            <button onClick={() => signOut(auth)} className="px-3 py-1 bg-purple-600 text-white rounded">
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signInWithPopup(auth, provider)}
            className="px-3 py-1 bg-purple-600 text-white rounded"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
