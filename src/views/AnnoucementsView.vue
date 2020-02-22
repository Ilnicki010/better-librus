<template>
  <div class="notices-wrapper">
    <h1>Ogłoszenia</h1>
    <div class="all-notices">
      <div
        v-for="notice in annocements.annocements"
        :key="notice.Id"
        class="notice"
      >
        <time :datetime="notice.CreationDate" class="notice__date">
          <span v-if="getTeacherById(notice.AddedBy.Id)">
            {{ getTeacherById(notice.AddedBy.Id).FirstName }}
            {{ getTeacherById(notice.AddedBy.Id).LastName }}
          </span>
          |
          {{ notice.CreationDate }}
        </time>
        <h2 class="notice__title">{{ notice.Subject }}</h2>
        <p class="notice__content">{{ notice.Content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data: function() {
    return {
      allNotices: []
    };
  },
  computed: {
    ...mapGetters(["getTeacherById"]),
    ...mapState(["annocements"])
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
    if (this.annocements.annocements.length === 0) {
      this.$store.dispatch("fetchAllAnnocements").then(() => {
        this.$store.dispatch("fetchTeachers");
      });
    }
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
