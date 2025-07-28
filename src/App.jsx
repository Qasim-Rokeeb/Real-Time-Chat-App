import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import ChatRoom from "./components/ChatRoom";
import Navbar from "./components/Navbar";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar user={user} />
      {user ? <ChatRoom user={user} /> : <div className="text-center mt-32 text-gray-500 dark:text-white">Login to start chatting</div>}
    </div>
  );
}
