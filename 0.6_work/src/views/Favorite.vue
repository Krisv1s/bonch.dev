<template>
  <div class="Favorite">
    <h1>Мои любимые посты</h1>
    <div v-for="(info, index) in favorite" :key="index" class="post">
      <router-link :to="getAuthor(info.id)">Ссылка на автора</router-link>
      <br />
      {{ new Date(info.date).toLocaleDateString("ru") }}
      <br />
      {{ info.text }}
      <br />
      <router-link :to="getPost(info.id, info.idPost)"
        >Ссылка на пост</router-link
      ><br />
      <button
        class="button"
        v-if="info.id !== 0"
        @click="deleteFavorite(index)"
      >
        Удалить из избранных
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["getPostById"]),
    ...mapState(["favorite"]),
  },
  methods: {
    getAuthor(id) {
      return `/user/${id}/`;
    },
    getPost(id, idPost) {
      return `/user/${id}/post/${idPost}`;
    },
    ...mapMutations(["deleteFavorite"]),
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
