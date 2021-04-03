<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Имя</th>
          <th>Сумма</th>
          <th>Описание</th>
          <th>Редактирование</th>
        </tr>
      </thead>
      <tbody id="table-body">
        <tr
          v-for="(info, index) in todos"
          :key="index"
          :style="getClasses(info.type)"
        >
          <th>{{ new Date(info.date).toLocaleDateString("ru") }}</th>
          <th>{{ info.name }}</th>
          <th>{{ info.sum }}</th>
          <th>{{ info.desc || "" }}</th>
          <th>
            <button
              class="button"
              @click="
                openModal(
                  info.type,
                  info.name,
                  info.sum,
                  info.desc,
                  info.date,
                  index
                )
              "
            >
              Edit
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["todos"],
  data() {
    return {};
  },
  methods: {
    openModal(type, name, sum, desc, date, i) {
      this.$emit("openModal", type, name, sum, desc, date, true, i);
    },
    getClasses(type) {
      if (type === 1) return "background-color:green";
      else return "background-color:red";
    }
  }
};
</script>

<style>
.table {
  width: 100%;
  border: none;
  margin-bottom: 20px;
  font-family: Georgia, "Times New Roman", Times, serif;
}
.table thead th {
  font-weight: bold;
  text-align: left;
  border: none;
  padding: 10px 15px;
  background: #d8d8d8;
  font-size: 14px;
}
.table tr th:first-child {
  border-radius: 8px 0 0 8px;
}
.table tr th:last-child {
  border-radius: 0 8px 8px 0;
}
.table tbody td {
  text-align: left;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  vertical-align: top;
}
.table tbody tr:nth-child(even) {
  background: #f3f3f3;
}
.table tbody tr td:first-child {
  border-radius: 8px 0 0 8px;
}
.table tbody tr td:last-child {
  border-radius: 0 8px 8px 0;
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
