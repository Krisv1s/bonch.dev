<template>
  <div>
    <transition v-if="show" name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot v-if="typeExp === 'add'" name="header">
                Добавление комментария
              </slot>
              <slot v-else name="header"> Редактирование комментария </slot>
            </div>

            <div class="modal-body">
              <slot v-if="typeExp === 'add'" name="body">
                <p>idUser:</p>
                <input type="text" v-model="idExp"
              /></slot>
              <slot name="body">
                <p>Текст поста:</p>
                <textarea rows="5" type="text" v-model="bodyExp" />
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="modal-default-button" @click="closeModal">
                  Отмена
                </button>
                <button
                  v-if="typeExp === 'add'"
                  class="modal-default-button"
                  @click="saveModal"
                >
                  OK
                </button>
                <button
                  v-else
                  class="modal-default-button"
                  @click="saveEditModal"
                >
                  Сохранить
                </button>
                <button
                  v-if="typeExp === 'edit'"
                  class="modal-default-button"
                  @click="deleteModal"
                >
                  Удалить
                </button>
                <br />
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <h1>Главная страница</h1>
    <button class="button" v-on:click="openModal('', '', '', 'add')">
      Добавить пост
    </button>
    <div
      v-for="info in getPosts(+$route.params.num)"
      :key="info.id"
      class="post"
    >
      {{ info.body }}
      <br />
      <router-link :to="getPost(info.id)">Ссылка на пост</router-link><br />
      <button
        class="button"
        v-on:click="openModal(info.userId, info.body, info.id, 'edit')"
      >
        Редактирование поста
      </button>
    </div>
    <span v-for="(info, index) in getLinks()" :key="index" class="link">
      <router-link :to="getLink(info)">{{ info }}</router-link></span
    >
    <br />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "mainPage",
  data() {
    return {
      show: false,
      idExp: "",
      bodyExp: "",
      typeExp: "edit",
      idPostExp: "",
    };
  },
  computed: {
    ...mapState(["posts"]),
  },
  methods: {
    openModal(id, body, idPost, type) {
      this.idExp = id;
      this.bodyExp = body;
      this.idPostExp = idPost;
      this.typeExp = type;
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    deleteModal() {
      this.deletePost(this.idPostExp).then(() => {
        this.loadPosts();
      });
      this.show = false;
    },
    saveModal() {
      this.createPost({
        userId: +this.idExp,
        id: this.posts.posts[this.posts.posts.length - 1].id + 1,
        body: this.bodyExp,
      }).then(() => {
        this.loadPosts();
      });
      this.show = false;
    },
    saveEditModal() {
      this.editPost([
        this.idPostExp,
        {
          userId: +this.idExp,
          id: this.idPostExp,
          body: this.bodyExp,
        },
      ]).then(() => {
        this.loadPosts();
      });
      this.show = false;
    },
    getLinks() {
      const links = [];
      for (let i = 1; i <= Math.ceil(this.posts.posts.length / 5); i++) {
        links.push(i);
      }
      return links;
    },
    getLink(num) {
      return `/${num}`;
    },
    getPosts(num) {
      const postNow = [];
      for (let i = (num - 1) * 5; i < num * 5; i++) {
        if (this.posts.posts[i]) postNow.push(this.posts.posts[i]);
      }
      return postNow;
    },
    getPost(idPost) {
      return `/post/${idPost}`;
    },
    ...mapActions(["loadPosts", "createPost", "editPost", "deletePost"]),
  },
  mounted() {
    this.updateBase();
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
  margin: 10px;
  font-family: Georgia, "Times New Roman", Times, serif;
}
.link {
  margin: 2px;
}
.button {
  border-radius: 10px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
