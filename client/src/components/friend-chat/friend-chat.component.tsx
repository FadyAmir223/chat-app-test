type FriendChatProps = {
  friend: {
    name: string;
    online: boolean;
    color: string;
    nick: string;
  };
};

const FriendChat = ({
  friend: { name, online, color, nick },
}: FriendChatProps) => {
  return (
    <div className="flex items-center mb-1 py-2 last:mb-0 cursor-pointer hover:bg-gray-200 rounded">
      <span
        className={`relative select-none w-10 h-10 rounded-full mx-3 grid place-items-center ${
          online
            ? 'before:bg-green-400 before:rounded-full before:w-3 before:h-3 before:absolute before:bottom-0 before:right-0'
            : ''
        } ${color}`}
      >
        {nick}
      </span>
      <h4 className="text-xl">{name}</h4>
    </div>
  );
};

export default FriendChat;
