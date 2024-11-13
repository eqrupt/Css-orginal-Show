<template>
  <div>
    <form @submit.prevent="submitForm">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AuthForm",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    submitForm() {
      console.log("Login submitted with", this.username, this.password);
    }
  }
};
</script>
