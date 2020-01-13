<template>
  <nav id="nav" class="main-menu">
    <ul class="menu">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/oceny">Oceny</router-link>
      </li>
      <li>
        <router-link to="/ogloszenia">Ogłoszenia</router-link>
      </li>
      <li>
        <router-link to="/ogloszenia">Ogłoszenia</router-link>
      </li>
      <li>
        <router-link to="/ogloszenia">Ogłoszenia</router-link>
      </li>
      <li v-if="isLoggedIn">
        <button @click="logout">Wyloguj</button>
      </li>
    </ul>
  </nav>
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

<style lang="scss" scoped>
.main-menu {
  padding: 2vh 10vw;
  //   box-shadow: 0 1px 2px rgba(#000000, 0.2);
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
  overflow-x: scroll;
  .menu {
    position: relative;
    display: flex;
    justify-content: space-around;
    list-style: none;
    height: 100%;
    a {
      font-weight: bold;
      color: #2c3e50;
      padding: 10px 30px;
      border-radius: 150px;
      &.router-link-exact-active {
        color: #625a3e;
        background: rgba(#ffe9a0, 0.3);
      }
    }
  }
}
</style>
