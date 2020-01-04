<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/account">Oceny</router-link>|
      <router-link to="/">Terminarz</router-link>|
      <router-link to="/">Plan lekcji</router-link>
      <span v-if="isLoggedIn">
        |
        <a @click="logout">Wyloguj</a>
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
body {
  margin: 0;
  padding: 0;
  color: #343434;
}
*,
::after,
::before {
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222;
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
.expand-enter-active,
.expand-leave-active {
  transition: height 0.2s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>
