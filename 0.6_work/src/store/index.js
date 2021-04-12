import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 0,
        idPost: 421,
        text: "Сегодня я сходил в театр!",
        date: 1618137146452,
      },
      { id: 0, idPost: 212, text: "Завтра дождь(", date: 1612117146452 },
      {
        id: 2,
        idPost: 211,
        text: "У меня замечательное настроение!",
        date: 1602117146452,
      },
    ],
    favorite: [],
  },
  getters: {
    getTodoById: (state) => (id) => {
      let base = [];
      for (const key of state.todos) {
        if (key.id === id) base.push(key);
      }
      return base;
    },
    getPostById: (state) => (id) => {
      return state.todos.find((todo) => todo.idPost === id);
    },
  },
  mutations: {
    updateBase(state) {
      state.favorite = JSON.parse(localStorage["base"]);
    },
    addToFavorite(state, post) {
      state.favorite.push(post);
      localStorage["base"] = JSON.stringify(state.favorite);
    },
    deleteFavorite(state, i) {
      state.favorite.splice(i, 1);
      localStorage["base"] = JSON.stringify(state.favorite);
    },
  },
  actions: {},
  modules: {},
});
