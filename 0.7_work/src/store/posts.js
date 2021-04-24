import axios from "axios";

const state = {
  posts: [],
  post: {},
  comments: [],
  lastCommentsId: 0,
};
const getters = {};
const actions = {
  loadPosts({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:3000/posts")
        .then((response) => {
          commit("SET_POSTS", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createPost({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3000/posts", data)
        .then((response) => {
          commit("GET_POSTS", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editPost({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`http://localhost:3000/posts/${data[0]}`, data[1])
        .then((response) => {
          commit("GET_POSTS", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deletePost({ commit }, idPost) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`http://localhost:3000/posts/${idPost}`)
        .then((response) => {
          commit("GET_POSTS", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getPost({ commit }, idPost) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:3000/posts/${idPost}`)
        .then((response) => {
          commit("GET_POST", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getComments({ commit }, idPost) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:3000/posts/${idPost}/comments`)
        .then((response) => {
          commit("GET_COMMENTS", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  addComments({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:3000/posts/${data[0]}/comments`, data[1])
        .then((response) => {
          commit("NEW_COMMENT", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  lastCommentId({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:3000/comments`)
        .then((response) => {
          commit("GET_COUNT_COMMENTS", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteComment({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`http://localhost:3000/comments/${id}`)
        .then((response) => {
          commit("GET_POSTS", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  editComment({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`http://localhost:3000/comments/${data[0]}`, data[1])
        .then((response) => {
          commit("GET_POSTS", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
const mutations = {
  SET_POSTS(state, payload) {
    state.posts = payload;
    state.posts.push(payload);
    state.posts.pop();
  },
  GET_POSTS(state, payload) {
    console.log(state, payload);
  },
  GET_POST(state, payload) {
    state.post = payload;
  },
  GET_COMMENTS(state, payload) {
    state.comments = payload;
  },
  NEW_COMMENT(state, payload) {
    state.comments.push(payload);
  },
  GET_COUNT_COMMENTS(state, payload) {
    state.lastCommentsId = payload[payload.length - 1].id;
  },
};

export default {
  namespaces: true,
  state,
  getters,
  actions,
  mutations,
};
