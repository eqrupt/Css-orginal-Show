<template>
  <div class="container">
    <h2 class="mb-4">用户管理</h2>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>用户名</th>
            <th>身份</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.username">
            <td>{{ user.username }}</td>
            <td>{{ user.identity }}</td>
            <td>
              <button class="btn btn-danger btn-sm" @click="handleDeleteUser(user.username)">
                删除用户
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface User {
  username: string;
  password: string;
  identity: string; 
  token: string;
}

const users = ref<User[]>([]);

const handleDeleteUser = (username: string) => {
  if(confirm('确定要删除该用户吗?')) {
    const index = users.value.findIndex(user => user.username === username);
    if(index !== -1) {
      users.value.splice(index, 1);
      localStorage.setItem('Users', JSON.stringify(users.value));
    }
  }
};

onMounted(() => {
  const storedUsers = localStorage.getItem('users');
  if(storedUsers) {
    users.value = JSON.parse(storedUsers);
  }
});
</script>

<style scoped>
.table th {
  background-color: #f8f9fa;
}
</style>
