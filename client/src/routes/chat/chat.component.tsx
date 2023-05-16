import { BsPencilSquare } from 'react-icons/bs';
import { useState } from 'react';

import SearchInput from '../../components/search-input/searchInput.component';
import FriendChat from '../../components/friend-chat/friend-chat.component';

const friends = ['fezza', 'jessy', 'petra', 'hala', 'fady', 'peter'];

const colors = [
  'bg-red-400',
  'bg-green-400',
  'bg-blue-400',
  'bg-orange-400',
  'bg-yellow-400',
  'bg-cyan-400',
  'bg-voilet-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-rose-400',
];

const getColor = () => colors[Math.floor(Math.random() * colors.length)];

const friendsStats = friends.map((friend) => ({
  name: friend,
  online: Math.random() < 0.5,
  color: getColor(),
  nick: friend.slice(0, 2).toUpperCase(),
}));

const chats = [0, 3, 5];

const groups = [
  [0, 3],
  [2, 4, 6],
];

const Chat = () => {
  const [searchField, setSearchField] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredFriends = friendsStats.filter((friend) =>
    friend.name.startsWith(searchField)
  );

  return (
    <div className="flex h-screen bg-">
      <div className="w-1/3 p-4 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Chats</h1>
          <BsPencilSquare className="cursor-pointer text-xl" />
        </div>
        <SearchInput
          searchField={searchField}
          setSearchField={setSearchField}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
        />

        {searchField
          ? filteredFriends.map((friend) => (
              <FriendChat key={friend.name} friend={friend} />
            ))
          : isFocused
          ? null
          : chats.map((chat) => (
              <FriendChat key={chat} friend={friendsStats[chat]} />
            ))}

        <div className="flex items-center">
          <span className="relative w-10 h-10 mx-3">
            <span className="rounded-full absolute bottom-0 right-0 bg-green-500 w-2/3 h-2/3"></span>
            <span className="rounded-full absolute top-0 left-0 bg-red-500 w-2/3 h-2/3"></span>
          </span>
          <h4 className="text-md">fezza, jessy</h4>
        </div>
      </div>
    </div>
  );
};

export default Chat;
