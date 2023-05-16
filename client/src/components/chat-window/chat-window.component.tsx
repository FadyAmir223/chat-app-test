import { RiAttachment2, RiSendPlane2Line } from 'react-icons/ri';
import axios from 'axios';

import UserChat from '../user-chat/user-chats.component';
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

type ChatWindowProps = {
  friend: {
    name: string;
    online: boolean;
    color: string;
    nick: string;
  };
};

const chat_ = [
  {
    id: 1,
    sender: 'sender',
    content: 'Hello, how are you?',
    timestamp: '2023-05-16T10:30:00Z',
  },
  {
    id: 2,
    sender: 'reciver',
    content: 'I am doing great, thank you! How about you?',
    timestamp: '2023-05-16T10:31:00Z',
  },
  {
    id: 3,
    sender: 'sender',
    content: 'I am good too. Just enjoying the day.',
    timestamp: '2023-05-16T10:32:00Z',
  },
  {
    id: 4,
    sender: 'reciver',
    content: 'That sounds wonderful!',
    timestamp: '2023-05-16T10:33:00Z',
  },
  {
    id: 5,
    sender: 'sender',
    content: 'By the way, have you seen the latest movie?',
    timestamp: '2023-05-16T10:34:00Z',
  },
  {
    id: 6,
    sender: 'reciver',
    content: 'Yes, I watched it last weekend. It was amazing!',
    timestamp: '2023-05-16T10:35:00Z',
  },
  {
    id: 7,
    sender: 'sender',
    content: 'I need to watch it soon. Thanks for the recommendation!',
    timestamp: '2023-05-16T10:36:00Z',
  },
  {
    id: 8,
    sender: 'reciver',
    content: "You're welcome! Let me know your thoughts after watching it.",
    timestamp: '2023-05-16T10:37:00Z',
  },
  {
    id: 9,
    sender: 'reciver',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, saepe architecto magnam ducimus consequuntur dolor alias quam laudantium molestiae magni consequatur. Deserunt fugiat maiores tempora ipsum aperiam repudiandae id a.',
    timestamp: '2023-05-16T10:37:00Z',
  },
];

const username = 'sender';

const url = import.meta.env.VITE_SERVER_URL;

const ChatWindow = ({ friend }: ChatWindowProps) => {
  const [chat, setChat] = useState(chat_);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = chatContainerRef.current;
    if (div) div.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [chat]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFile(event.target.files[0]);
  };

  const handleSendMessage = () => {
    setMessage('');
    setChat((prev) => [
      ...prev,
      {
        id: prev[prev.length - 1].id + 1,
        sender: username,
        content: message,
        timestamp: new Date().toString(),
      },
    ]);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const handleSubmitImage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    const fileName = `${username}-${file.name}`;
    formData.append('file', file, fileName);

    try {
      const { data } = await axios.post(`${url}/api/file`, formData);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRetrieveImage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!filename) return;

    try {
      const { data, headers } = await axios.get(`${url}/api/file/${filename}`, {
        responseType: 'blob',
      });

      const blob = new Blob([data]);
      const fileUrl = URL.createObjectURL(blob);
      const contentType = headers['content-type'];

      contentType.includes('text/plain')
        ? console.log(await blob.text())
        : setFileUrl(fileUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" flex flex-col flex-1 overflow-y-auto max-h-screen">
      <div className="bg-gray-50 sticky top-0 py-1 px-4">
        <UserChat friend={friend} />
      </div>
      <div className="px-3 flex-col flex-1 bg-white">
        {chat.map((message) => (
          <div
            key={message.id}
            className={`flex last:mb-0 mb-3 ${
              message.sender === username ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-lg p-2 max-w-[70%] ${
                message.sender === username
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={chatContainerRef}></div>
      </div>
      <div className="p-3 sticky bottom-0 flex items-center bg-white">
        <input
          type="text"
          name=""
          autoFocus
          placeholder="Type your message here"
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="mx-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input">
            <RiAttachment2 size={18} />
          </label>
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={handleSendMessage}
        >
          <RiSendPlane2Line size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
