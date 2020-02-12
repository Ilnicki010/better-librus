<template>
  <nav id="nav" class="mainMenuWrapper">
    <button
      class="hamburger"
      :aria-expanded="String(openMenu)"
      :class="{ 'hamburger--active': openMenu }"
      @click="toggleMenuHandler"
    >
      <span class="sr-only">Open/Close menu</span>
      <span class="hamburger__box">
        <span class="hamburger__inner"></span>
      </span>
    </button>
    <div class="navigation" :class="{ 'navigation--active': openMenu }">
      <ul class="navigation__list">
        <li class="navigation__item" @click="toggleMenuHandler">
          <router-link to="/" class="navigation__link">
            <img src="@/assets/icons/home.svg" alt />
            <span>Home</span>
          </router-link>
        </li>
        <li class="navigation__item" @click="toggleMenuHandler">
          <router-link to="/oceny" class="navigation__link">
            <img src="@/assets/icons/grades.svg" alt />
            <span>Oceny</span>
          </router-link>
        </li>
        <li class="navigation__item" @click="toggleMenuHandler">
          <router-link to="/ogloszenia" class="navigation__link">
            <img src="@/assets/icons/annoucements.svg" alt />
            <span>Ogłoszenia</span>
          </router-link>
        </li>
        <li v-if="isLoggedIn" class="navigation__item">
          <button
            @click="logout"
            class="navigation__link navigation__link--logout"
          >
            Wyloguj
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      openMenu: false
    };
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    toggleMenuHandler() {
      this.openMenu ? (this.openMenu = false) : (this.openMenu = true);
    },
    logout: function() {
      this.$store.dispatch("LOGOUT_REQUEST").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  max-height: 30px;
}
.mainMenuWrapper {
  display: flex;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hamburger {
  display: none;
}
.navigation {
  flex: 1;
}
.navigation__list {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
}
.navigation__item {
  margin: 0 5%;

  .navigation__link {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 20px;
    text-decoration: none;
    font-weight: 600;
    background: rgba(255, 233, 160, 0.2);
    border-radius: 100px;
    color: #000;
    &.router-link-exact-active {
      background: rgba(167, 152, 104, 0.2);
    }
    &.navigation__link--logout {
      border: 1px solid #222;
      background: transparent;
    }
  }
}

.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
@media screen and (max-width: 720px) {
  .hamburger {
    padding: 30px;
    display: inline-block;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    margin-left: auto;
    z-index: 999;
  }
  .hamburger,
  .navigation {
    transition: transform 0.2s 0.1s ease-in-out, visibility 0.2s 0.4s;
  }
  .hamburger__box {
    width: 35px;
    height: 24px;
    display: inline-block;
    position: relative;
  }
  @mixin hamburger-line {
    width: 100%;
    height: 3px;
    border-radius: 10px;
    background-color: #000;
    position: absolute;
  }
  .hamburger__inner {
    @include hamburger-line;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: background-color 0.1s 0.2s ease-in-out;
  }
  .hamburger__inner::before,
  .hamburger__inner::after {
    @include hamburger-line;
    content: "";
    left: 0;
    transition: transform 0.2s 0.2s ease-in-out;
  }
  .hamburger__inner::before {
    top: -10px;
  }
  .hamburger__inner::after {
    top: 10px;
  }
  .hamburger--active .hamburger__inner {
    background-color: transparent;
  }
  .hamburger--active .hamburger__inner:before {
    transform: translateY(10px) rotate(45deg);
  }
  .hamburger--active .hamburger__inner:after {
    transform: translateY(-10px) rotate(-45deg);
  }
  .navigation {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    right: 0;
    visibility: hidden;
    display: none;
    background: #fff;
    z-index: 99;
    transform: translateY(100vh);
  }
  .navigation--active {
    transition: transform 0.3s 0.1s ease-in-out, visibility 0s 0s;
    transform: translateY(0px);
    visibility: visible;
    display: flex;
  }
  .navigation__list {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40%;
    justify-content: space-around;
  }
  .navigation__item {
    .item__link {
      padding: 20px;
      text-decoration: none;
      color: #000;
      font-weight: 600;
      font-size: 1.6rem;
    }
  }
}
@keyframes shake {
  0% {
    transform: rotate(30deg);
  }
  50% {
    transform: rotate(-30deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
