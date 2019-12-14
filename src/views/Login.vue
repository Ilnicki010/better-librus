<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input
        required
        v-model="user.username"
        type="text"
        placeholder="Snoopy"
      />
      <label>Password</label>
      <input
        required
        v-model="user.password"
        type="password"
        placeholder="Password"
      />
      <hr />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login: function() {
      this.$store.dispatch("AUTH_REQUEST", this.user).then(() => {
        this.$router.push("/account");
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
