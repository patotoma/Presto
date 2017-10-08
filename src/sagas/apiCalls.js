import api from '../services/api.js';
import { apiBase } from '../constants.js';

export function login(email, password) {
  return Promise.resolve({
    token: 'abc',
    user: { id: 'abc', name: 'John Doe', email: 'john@doe.com' },
  });
}

export function logout() {
  return Promise.resolve();
}

export function getPosts() {
  return api.get({url: `${apiBase}/posts`});
}

export function getComments() {
  return api.get({url: `${apiBase}/comments`});
}