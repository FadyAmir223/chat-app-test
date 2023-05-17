import User from './users.mongo.js';

/*
 .create(user); // insert

 .fine({ filter_prop: val | regex | $gte },
  'include_field -execlude_field')

  .update
  .updateOne({ filter_prop: val }, data, { upsert: true })
  // if not exist create
*/

const findOrCreateUser = async (user) => {
  return await User.findOneAndUpdate({ username: user.username }, user, {
    upsert: true,
  });
};

const getUser = async (username) => {
  return await User.findOne({ username }, '-_id -__v');
};

const getUsers = async () => {
  return await User.find({}, '-_id -__v');
};

const updateUser = async (user) => {
  const { username, ...data } = user;
  await User.updateOne({ username }, { $set: data });
};

export { findOrCreateUser, getUser, getUsers, updateUser };
