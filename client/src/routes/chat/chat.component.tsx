import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { BsPencilSquare } from 'react-icons/bs';

import SearchInput from '../../components/search-input/searchInput.component';
import UserChat from '../../components/user-chat/user-chats.component';
import UserGroup from '../../components/user-group/user.group';
import ChatWindow from '../../components/chat-window/chat-window.component';

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

const friends = ['fezza', 'jessy', 'petra', 'hala', 'fady', 'peter'];

const getColor = () => colors[Math.floor(Math.random() * colors.length)];

const friendsStats = friends.map((friend) => ({
  name: friend,
  online: Math.random() < 0.5,
  color: getColor(),
  nick: friend.slice(0, 2).toUpperCase(),
}));

const chats_groups = [
  0,
  3,
  [0, 3],
  5,
  [2, 4, 6],
  [1],
  0,
  3,
  [0, 3],
  5,
  [2, 4, 6],
  [1],
];

const Chat = () => {
  const [searchField, setSearchField] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentChatID, setCurrentChatID] = useState(0);
  const filteredFriends = friendsStats.filter((friend) =>
    friend.name.startsWith(searchField)
  );

  return (
    <div className="flex min-h-screen h-full">
      <div className="w-1/3 min-w-[250px] px-4 pb-4 bg-gray-100 border-r border-r-gray-300">
        <div className="sticky top-0 bg-gray-100 z-50 py-4">
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
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-135px)]">
          {searchField
            ? filteredFriends.map((friend) => (
                <UserChat key={uuid()} friend={friend} />
              ))
            : isFocused
            ? null
            : chats_groups.map((chatBox) =>
                typeof chatBox === 'number' ? (
                  <UserChat key={uuid()} friend={friendsStats[chatBox]} />
                ) : chatBox?.length === 1 ? (
                  <UserChat key={uuid()} friend={friendsStats[chatBox[0]]} />
                ) : (
                  <UserGroup
                    key={uuid()}
                    group={[friendsStats[chatBox[0]], friendsStats[chatBox[1]]]}
                    membersNo={chatBox.length}
                  />
                )
              )}
        </div>
      </div>
      <ChatWindow friend={friendsStats[currentChatID]} />
    </div>
  );
};

export default Chat;
