<template>
  <div class="notices-wrapper">
    <h1>Ogłoszenia</h1>
    <div class="all-notices">
      <div v-for="notice in allNotices" :key="notice.Id" class="notice">
        <h2 class="notice__title">{{ notice.Subject }}</h2>
        <p class="notice__content">{{ notice.Content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      allNotices: []
    };
  },
  methods: {
    shorten(text, max) {
      return text && text.length > max
        ? text
            .slice(0, max)
            .split(" ")
            .slice(0, -1)
            .join(" ")
        : text;
    }
  },
  created() {
    axios
      .get(
        `${process.env.VUE_APP_CORS_SERVER_URL}/https://api.librus.pl/2.0/SchoolNotices`
      )
      .then(data => {
        this.allNotices = data.data.SchoolNotices;
      });
  }
};
</script>

<style lang="scss" scoped>
.all-notices {
  display: flex;
  flex-direction: column;
  .notice {
    text-align: left;
    background: #f5f5f5;
    margin: 20px 0;
    padding: 15px 15px 15px 20px;
    border-radius: 10px;
    .notice__content {
      white-space: pre-wrap;
    }
  }
}
</style>
