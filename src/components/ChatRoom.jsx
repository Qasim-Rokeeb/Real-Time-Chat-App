import { useEffect, useState, useRef } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";

export default function ChatRoom({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesRef = collection(db, "messages");
  const bottomRef = useRef(null);

  useEffect(() => {
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      await addDoc(messagesRef, {
        text,
        uid: user.uid,
        photoURL: user.photoURL,
        name: user.displayName,
        createdAt: serverTimestamp(),
      });
      setText("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <div className="bg-white dark:bg-gray-800 h-[70vh] overflow-y-auto rounded-lg p-4 shadow-sm">
        {messages.map(msg => <Message key={msg.id} msg={msg} user={user} />)}
        <div ref={bottomRef}></div>
      </div>
      <form onSubmit={sendMessage} className="flex mt-4 gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
}
