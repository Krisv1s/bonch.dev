<template>
  <div class="Post">
    <h1>Пост {{ $route.params.idPost }}</h1>
    <p>{{ posts.post.body }}</p>
    Имя: <br />
    <input type="text" v-model="name" />
    <br />
    Комментарий: <br />
    <textarea type="text" v-model="text" rows="5" />
    <br />
    <div v-if="newComm">
      <button class="button" @click="sendComment">Добавить комментарий</button>
    </div>
    <div v-else>
      <button class="button" @click="cancelComment">Отмена</button>
      <button class="button" @click="delComment">Удалить</button
      ><button class="button" @click="sendComment">Обновить</button>
    </div>
    <h3>Комментарии:</h3>
    <div v-for="info in posts.comments" :key="info.id" class="comment">
      Name: {{ info.name }}
      <br />
      {{ info.body }}
      <br />
      <button
        class="button"
        v-on:click="editComment2(info.name, info.body, info.id)"
      >
        Редактирование комментария
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      text: "",
      newComm: true,
      id: 0,
    };
  },
  computed: {
    ...mapState(["posts"]),
  },
  methods: {
    getPost(id) {
      return `/user/${id}/`;
    },
    editComment2(name, text, id) {
      this.name = name;
      this.text = text;
      this.id = id;
      this.newComm = false;
    },
    cancelComment() {
      this.name = "";
      this.text = "";
      this.newComm = true;
    },
    delComment() {
      this.deleteComment(this.id).then(() => {
        this.getComments(this.$route.params.idPost);
      });
      this.name = "";
      this.text = "";
      this.newComm = true;
    },
    sendComment() {
      if (this.newComm)
        this.lastCommentId().then(() => {
          this.addComments([
            this.$route.params.idPost,
            {
              postId: this.$route.params.idPost,
              id: this.posts.lastCommentsId + 1,
              name: this.name,
              body: this.text,
            },
          ]);
        });
      else
        this.editComment([
          this.id,
          {
            postId: this.$route.params.idPost,
            id: this.id,
            name: this.name,
            body: this.text,
          },
        ]).then(() => {
          this.getComments(this.$route.params.idPost);
        });
    },
    ...mapActions([
      "getPost",
      "getComments",
      "addComments",
      "lastCommentId",
      "deleteComment",
      "editComment",
    ]),
  },
  created() {
    this.getComments(this.$route.params.idPost);
    this.getPost(this.$route.params.idPost);
  },
};
</script>

<style lang="less">
.comment {
  width: auto;
  border-width: 1;
  border-color: rgb(190, 190, 190);
  border-style: solid;
  margin-bottom: 20px;
  font-family: Georgia, "Times New Roman", Times, serif;
}
</style>
