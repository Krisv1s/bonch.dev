<template>
  <div>
    <h1>Главная страница</h1>
    <div v-for="(info, index) in todos" :key="index" class="post">
      <router-link :to="getAuthor(info.id)">Ссылка на автора</router-link>
      <br />
      {{ new Date(info.date).toLocaleDateString("ru") }}
      <br />
      {{ info.text }}
      <br />
      <router-link :to="getPost(info.id, info.idPost)"
        >Ссылка на пост</router-link
      ><br />
      <button class="button" v-if="info.id !== 0" @click="addToFavorite(info)">
        Добавить в избранное
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "mainPage",
  computed: {
    ...mapState(["todos"]),
    ...mapGetters(["myPost"]),
  },
  methods: {
    getPost(id, idPost) {
      return `/user/${id}/post/${idPost}`;
    },
    getAuthor(id) {
      return `/user/${id}/`;
    },
    ...mapMutations(["addToFavorite"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.post {
  width: auto;
  border-width: 1;
  border-color: rgb(190, 190, 190);
  border-style: solid;
  margin-bottom: 20px;
  font-family: Georgia, "Times New Roman", Times, serif;
}
</style>
