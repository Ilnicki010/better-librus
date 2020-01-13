<template>
  <div id="app">
    <main-menu />
    <router-view class="container" />
  </div>
</template>
<script>
import MainMenu from "@/components/MainMenu.vue";
export default {
  components: {
    MainMenu
  }
};
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
  color: #343434;
}
a {
  text-decoration: none;
}
*,
::after,
::before {
  box-sizing: border-box;
}
#app {
  font-family: "Exo", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222;
}
.container {
  padding: 0 6vw;
  margin-top: 20vh;
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
