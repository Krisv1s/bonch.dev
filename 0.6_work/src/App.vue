<template>
  <div id="app">
    <router-link to="/">Главная страничка</router-link> |
    <router-link to="/user/0">Мой профиль</router-link> |
    <router-link to="/favorite">Избранное</router-link>
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  // data() {
  //   return {
  //     base: JSON.parse(localStorage["base"] || "[]"),
  //     show: false,
  //   };
  // },
  methods: {
    ...mapMutations(["updateBase"]),
  },
  mounted() {
    if (!localStorage["base"]) localStorage["base"] = "[]";
    this.updateBase();
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
