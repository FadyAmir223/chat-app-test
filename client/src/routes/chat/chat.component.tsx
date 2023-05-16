import { BsPencilSquare } from 'react-icons/bs';
import { useState } from 'react';

import SearchInput from '../../components/search-input/searchInput.component';
import UserChats from '../../components/user-chats/user-chats.component';

const friends = ['fezza', 'jessy', 'petra', 'hala', 'fady', 'peter'];

const colors = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-cyan-500',
  'bg-voilet-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-rose-500',
];

const getColor = () => colors[Math.floor(Math.random() * colors.length)];

const friendsStats = friends.map((friend) => ({
  name: friend,
  online: Math.random() < 0.99,
  color: getColor(),
  nick: friend.slice(0, 2).toUpperCase(),
}));

const chats = [0, 3, 5];

const groups = [
  [0, 3],
  [2, 4, 6],
];

const chats_groups = [0, 3, [0, 3], 5, [2, 4, 6]];

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
              <UserChats key={friend.name} friend={friend} />
            ))
          : isFocused
          ? null
          : chats.map((chat) => (
              <UserChats key={chat} friend={friendsStats[chat]} />
            ))}

        {groups.map((group, idx) => {
          const friend_1 = friendsStats[group[0]];
          const friend_2 = friendsStats[group[1]];

          return (
            <div key={idx} className="flex items-center">
              <div className="relative w-10 h-10 mx-3">
                {[friend_1, friend_2].map((friend, idx) => (
                  <span
                    key={friend.name}
                    className={`rounded-full absolute w-2/3 h-2/3 border border-black text-sm grid place-items-center ${
                      friend.color
                    } ${idx === 0 ? 'bottom-0 right-0' : 'top-0 left-0'} ${
                      friend.online
                        ? 'before:bg-green-400 before:rounded-full before:w-[10px] before:h-[10px] before:absolute before:-bottom-[2px] before:-right-[2px]'
                        : ''
                    }`}
                  >
                    {friend.nick}
                  </span>
                ))}
              </div>
              <h4 className="text-md">{`${friend_1.name}, ${friend_2.name}${
                group.length > 2 ? ', ..' : ''
              }`}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
