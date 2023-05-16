import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { BsPencilSquare } from 'react-icons/bs';
import { RiAttachment2, RiSendPlane2Line } from 'react-icons/ri';

import SearchInput from '../../components/search-input/searchInput.component';
import UserChat from '../../components/user-chat/user-chats.component';
import UserGroup from '../../components/user-group/user.group';

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

const chat = [
  {
    id: 1,
    sender: 'John',
    content: 'Hello, how are you?',
    timestamp: '2023-05-16T10:30:00Z',
  },
  {
    id: 2,
    sender: 'Jane',
    content: 'I am doing great, thank you! How about you?',
    timestamp: '2023-05-16T10:31:00Z',
  },
  {
    id: 3,
    sender: 'John',
    content: 'I am good too. Just enjoying the day.',
    timestamp: '2023-05-16T10:32:00Z',
  },
  {
    id: 4,
    sender: 'Jane',
    content: 'That sounds wonderful!',
    timestamp: '2023-05-16T10:33:00Z',
  },
  {
    id: 5,
    sender: 'John',
    content: 'By the way, have you seen the latest movie?',
    timestamp: '2023-05-16T10:34:00Z',
  },
  {
    id: 6,
    sender: 'Jane',
    content: 'Yes, I watched it last weekend. It was amazing!',
    timestamp: '2023-05-16T10:35:00Z',
  },
  {
    id: 7,
    sender: 'John',
    content: 'I need to watch it soon. Thanks for the recommendation!',
    timestamp: '2023-05-16T10:36:00Z',
  },
  {
    id: 8,
    sender: 'Jane',
    content: "You're welcome! Let me know your thoughts after watching it.",
    timestamp: '2023-05-16T10:37:00Z',
  },
  {
    id: 9,
    sender: 'Jane',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, saepe architecto magnam ducimus consequuntur dolor alias quam laudantium molestiae magni consequatur. Deserunt fugiat maiores tempora ipsum aperiam repudiandae id a.',
    timestamp: '2023-05-16T10:37:00Z',
  },
];

const sender = 'John';

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

      <div className=" flex flex-col flex-1 overflow-y-auto max-h-screen">
        <div className="bg-gray-50 sticky top-0 py-1 px-4">
          <UserChat friend={friendsStats[currentChatID]} />
        </div>
        <div className="p-3 flex-col flex-1 bg-white">
          {chat.map((message) => (
            <div
              key={message.id}
              className={`flex mb-3 last:mb-0 ${
                message.sender === sender ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`rounded-lg p-2 max-w-[70%] ${
                  message.sender === sender
                    ? 'bg-gray-100'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 sticky bottom-0 flex items-center bg-white">
          <input
            type="text"
            name=""
            placeholder="Type your message here"
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none flex-1"
          />
          <button className="mx-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
            <RiAttachment2 size={18} />
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            <RiSendPlane2Line size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
