<template>
  <div class="Profile">
    <h1>User {{ $route.params.id }}</h1>
    <div
      v-for="(info, index) in getTodoById(+$route.params.id)"
      :key="index"
      class="post"
    >
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
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["getTodoById"]),
  },
  methods: {
    getPost(id, idPost) {
      return `/user/${id}/post/${idPost}`;
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
