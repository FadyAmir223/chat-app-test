type UserGroupProps = {
  group: {
    name: string;
    online: boolean;
    color: string;
    nick: string;
  }[];
  membersNo: number;
};

const UserGroup = ({ group, membersNo }: UserGroupProps) => {
  return (
    <div className="flex items-center cursor-pointer hover:bg-gray-200 py-2">
      <div className="relative w-10 h-10 mx-3">
        {group.map((friend, idx) => (
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
      <h4 className="text-md">{`${group[0].name}, ${group[1].name}${
        membersNo > 2 ? `, ${membersNo - 2} others` : ''
      }`}</h4>
    </div>
  );
};

export default UserGroup;
