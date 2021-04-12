<template>
  <div class="Post">
    <h1>User {{ $route.params.id }}</h1>
    {{
      new Date(getPostById(+$route.params.idPost).date).toLocaleDateString("ru")
    }}
    <br />
    {{ getPostById(+$route.params.idPost).text }}
    <br />
    <router-link :to="getAuthor($route.params.id)"
      >Ссылка на автора</router-link
    >
    <br />
    <button
      class="button"
      v-if="getPostById(+$route.params.idPost).id !== 0"
      @click="addToFavorite(getPostById(+$route.params.idPost))"
    >
      Добавить в избранное
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["getPostById"]),
  },
  methods: {
    getAuthor(id) {
      return `/user/${id}/`;
    },
    ...mapMutations(["addToFavorite"]),
  },
};
</script>

<style lang="less">
.post {
  width: auto;
  border-width: 1;
  border-color: rgb(190, 190, 190);
  border-style: solid;
  margin-bottom: 20px;
  font-family: Georgia, "Times New Roman", Times, serif;
}
</style>
