export const getUserKey = (user, key) => {
  if (!user) return key;
  return `${key}_${user.email}`;
};

export const getStorage = (user, key) => {
  const data = localStorage.getItem(getUserKey(user, key));
  return data ? JSON.parse(data) : null;
};

export const setStorage = (user, key, value) => {
  localStorage.setItem(
    getUserKey(user, key),
    JSON.stringify(value)
  );
};