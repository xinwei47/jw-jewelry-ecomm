const cleanUserFn = (reqUserData) => {
  const user = JSON.parse(JSON.stringify(reqUserData)); // hack to copy the req.user inro a new object
  const cleanUser = Object.assign({}, user);
  delete cleanUser.hash;
  delete cleanUser.salt;
  return cleanUser;
};

export default cleanUserFn;
