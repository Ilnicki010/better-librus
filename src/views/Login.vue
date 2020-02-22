<template>
  <div>
    <h1>Zaloguj się</h1>
    <form class="login-form" @submit.prevent="login">
      <div class="login-form__field">
        <label class="login-form__label"
          >Nazwa użytkownika Librus Synergia</label
        >
        <input
          class="login-form__input"
          required
          v-model="user.username"
          type="text"
          placeholder="13335"
        />
      </div>
      <div class="login-form__field">
        <label class="login-form__label">Hasło</label>
        <input
          class="login-form__input"
          required
          v-model="user.password"
          type="password"
          placeholder="librus11"
        />
      </div>
      <button type="submit" class="login-form__button">Zaloguj</button>
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
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  .login-form__field {
    display: flex;
    margin-bottom: 20px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  .login-form__input {
    border: none;
    background-image: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    padding: 20px;
    width: 100%;
    margin-top: 5px;
    font-size: 1rem;
    background: $gray;
    &:focus {
      border: none;
      border-bottom: 6px solid $primary;
      outline: none;
    }
  }
  .login-form__label {
    opacity: 0.8;
  }
  .login-form__button {
    background: $primary;
    padding: 20px 30px;
    width: 100%;
  }
}
</style>
