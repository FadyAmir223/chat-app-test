type friends = {
  name: string;
  online: boolean;
  color: string;
  nick: string;
};

type UserGroupProps = {
  group: number[];
  friendsStats: friends[];
};

const UserGroup = ({ group, friendsStats }: UserGroupProps) => {
  const friend_1 = friendsStats[group[0]];
  const friend_2 = friendsStats[group[1]];

  return (
    <div className="flex items-center">
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
};

export default UserGroup;
