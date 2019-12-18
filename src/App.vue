<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/account">Konto</router-link>
      <span v-if="isLoggedIn">
        |
        <a @click="logout">Logout</a>
      </span>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("LOGOUT_REQUEST").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
