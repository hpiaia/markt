const LOCALSTORAGE_TOKEN_KEY = '@marktchat/auth/token';
const LOCALSTORAGE_USER_KEY = '@marktchat/auth/user';

export interface User {
  name: string
  email: string
}

function getToken() {
  const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  return token;
}

function getUser() {
  const user = localStorage.getItem(LOCALSTORAGE_USER_KEY);

  return user ? JSON.parse(user) as User : null;
}

export function getFromStorage() {
  return {
    token: getToken(),
    user: getUser(),
  };
}

export function saveToStorage(token: string, user: User) {
  localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
  localStorage.setItem(LOCALSTORAGE_USER_KEY, JSON.stringify(user));
}

export function clearStorage() {
  localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
  localStorage.removeItem(LOCALSTORAGE_USER_KEY);
}
