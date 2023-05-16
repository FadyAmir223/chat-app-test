import { BsPencilSquare } from 'react-icons/bs';
import { useState } from 'react';

import SearchInput from '../../components/search-input/searchInput.component';
import UserChat from '../../components/user-chat/user-chats.component';
import UserGroup from '../../components/user-group/user.group';

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
              <UserChat key={friend.name} friend={friend} />
            ))
          : isFocused
          ? null
          : chats_groups.map((chatBox, idx) =>
              typeof chatBox === 'number' ? (
                <UserChat key={chatBox} friend={friendsStats[chatBox]} />
              ) : (
                <UserGroup
                  key={idx}
                  group={chatBox}
                  friendsStats={friendsStats}
                />
              )
            )}
      </div>
    </div>
  );
};

export default Chat;
