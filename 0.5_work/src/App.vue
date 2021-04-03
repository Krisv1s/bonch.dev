<template>
  <div id="app">
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
      <div class="modal">
        <div class="modal-close" @click="closeModal">&#10006;</div>
        <slot name="title">
          <h3 class="modal-title">Добавление</h3>
        </slot>
        <slot name="body">
          <div class="modal-content">
            <p>Название:</p>
            <input type="text" v-model="nameExp" />
            <p>Цена:</p>
            <input type="text" v-model="sumExp" />
            <p>Описание:</p>
            <input type="text" v-model="descExp" />
            <p>Тип:</p>
            <input type="radio" id="one" value="1" v-model="typeExp" />
            <label for="one">Доход</label>
            <br />
            <input type="radio" id="two" value="2" v-model="typeExp" />
            <label for="one">Расход</label>
            <br />
          </div>
        </slot>
        <slot name="footer">
          <div class="modal-footer">
            <button class="modal-footer__button" @click="saveModal">
              Сохранить
            </button>
            <button
              v-if="needExp"
              class="modal-footer__button"
              @click="deleteModal"
            >
              Удалить
            </button>
          </div>
        </slot>
      </div>
    </div>
    <h1>Итоговый баланс: {{ getBalance()[0] - getBalance()[1] }}</h1>
    <p>Доходов: {{ getBalance()[0] }}</p>
    <p>Расходов: {{ getBalance()[1] }}</p>
    <expenses v-bind:todos="todos" @openModal="openModal" />
    <button class="button" v-on:click="openModal('1', '', '', '', 0, false, 0)">
      Добавить
    </button>
  </div>
</template>

<script>
import expenses from "@/components/Exp";

export default {
  name: "App",
  data() {
    return {
      todos: JSON.parse(localStorage["balanceHistory"] || "[]"),
      show: false,
      typeExp: "1",
      nameExp: "",
      descExp: "",
      sumExp: "",
      dateExp: 0,
      index: 0,
      needExp: false,
    };
  },
  methods: {
    getBalance() {
      let profit = 0;
      let cost = 0;
      for (const key of JSON.parse(localStorage["balanceHistory"] || "[]")) {
        if (key.type === 1) profit += key.sum;
        else cost += key.sum;
      }
      return [profit, cost];
    },
    openModal(type, name, sum, desc, date, need, i) {
      this.nameExp = name;
      this.typeExp = type;
      this.sumExp = sum;
      this.descExp = desc;
      this.dateExp = date;
      this.needExp = need;
      this.index = i;
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    deleteModal() {
      this.todos.splice(this.index, 1);
      localStorage["balanceHistory"] = JSON.stringify(this.todos);
      this.show = false;
    },
    saveModal() {
      if (!(this.nameExp && +this.typeExp && +this.sumExp && this.descExp))
        return;
      if (this.needExp) {
        this.todos[this.index] = {
          name: this.nameExp,
          type: +this.typeExp,
          sum: +this.sumExp,
          desc: this.descExp,
          date: this.dateExp || +new Date(),
        };
        this.todos.reverse();
        this.todos.reverse();
      } else {
        this.todos.reverse();
        this.todos.push({
          name: this.nameExp,
          type: +this.typeExp,
          sum: +this.sumExp,
          desc: this.descExp,
          date: this.dateExp || +new Date(),
        });
        this.todos.reverse();
      }
      localStorage["balanceHistory"] = JSON.stringify(this.todos);
      this.show = false;
    },
  },
  components: {
    expenses: expenses,
  },
};
</script>
<style lang="scss">
* {
  font-family: monospace;
}
.button {
  border-radius: 10px;
}
</style>

<style scoped lang="scss">
.modal-shadow {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.39);
}

.modal {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  min-width: 420px;
  max-width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &-close {
    border-radius: 50%;
    color: #fff;
    background: #2a4cc7;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 7px;
    right: 7px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  &-title {
    color: #0971c7;
  }

  &-content {
    margin-bottom: 20px;
  }

  &-footer {
    &__button {
      background-color: #0971c7;
      color: #fff;
      border: none;
      text-align: center;
      padding: 8px;
      font-size: 17px;
      font-weight: 500;
      border-radius: 8px;
      min-width: 150px;
    }
  }
}
</style>
