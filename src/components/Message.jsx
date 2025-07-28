export default function Message({ msg, user }) {
  const isOwn = msg.uid === user.uid;
  return (
    <div className={`flex items-start my-2 ${isOwn ? "justify-end" : "justify-start"}`}>
      {!isOwn && <img src={msg.photoURL} className="w-8 h-8 rounded-full mr-2" />}
      <div className={`px-4 py-2 rounded-lg max-w-xs ${isOwn ? "bg-purple-100 dark:bg-purple-600 text-right" : "bg-gray-200 dark:bg-gray-700"}`}>
        <p className="text-sm">{msg.text}</p>
        <p className="text-[10px] text-right text-gray-500 dark:text-gray-300">{msg.name}</p>
      </div>
      {isOwn && <img src={msg.photoURL} className="w-8 h-8 rounded-full ml-2" />}
    </div>
  );
}
