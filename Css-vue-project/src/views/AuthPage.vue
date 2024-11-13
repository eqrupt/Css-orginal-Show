<template>
  <div>
    <h1>Login / Register</h1>
    <AuthForm />
  </div>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue"; // Form for login or registration

export default {
  name: "AuthPage",
  components: {
    AuthForm
  }
};
</script>

