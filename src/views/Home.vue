<template>
  <div class="home">
    <h1>Home</h1>
    <section>
      <h2>Ostatnio dodane</h2>
      <div class="whats-new">
        <article>
          <h3>Oceny</h3>
          <div class="latest-grades">
            <span
              v-for="grade in latestGrades.slice(0, 3)"
              :key="grade.Id"
              class="latest-grades__grade"
            >
              <span class="grade__item grade__item--color">{{
                grade.grade.Grade
              }}</span>
              <div class="grade__item">
                <span class="grade__label">Kategoria</span>
                <span>{{ grade.category.Name }}</span>
              </div>
              <div class="grade__item">
                <span class="grade__label">Waga</span>
                <span>{{ grade.category.Weight }}</span>
              </div>
            </span>
          </div>
        </article>
        <article>
          <h3>Ogłoszenia</h3>
          <div class="latest-grades">
            <div
              v-for="notice in latestNews.slice(0, 2)"
              :key="notice.Id"
              class="notice"
            >
              <time :datetime="notice.CreationDate" class="notice__date">
                {{ notice.CreationDate }}
              </time>
              <h4 class="notice__title">{{ notice.Subject }}</h4>
              <p class="notice__content">{{ notice.Content }}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from "axios";
import { mapState } from "vuex";
// @ is an alias to /src
export default {
  name: "home",
  components: {},
  data() {
    return {
      latestGrades: [],
      latestNews: []
    };
  },
  computed: {
    ...mapState(["grades", "annocements"])
  },
  created() {
    if (!this.annocements.annocements.length || !this.annocements.annocements) {
      this.$store
        .dispatch("fetchAllAnnocements")
        .then(() => (this.latestNews = this.annocements.annocements));
    } else {
      this.latestNews = this.annocements.annocements;
    }
    if (!this.grades.grades.length || !this.grades.grades) {
      this.$store
        .dispatch("fetchGrades")
        .then(() => (this.latestGrades = this.grades.grades));
    } else {
      this.latestGrades = this.grades.grades;
    }
  }
};
</script>
<style lang="scss" scoped>
.whats-new {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  .latest-grades {
    .latest-grades__grade {
      background: $gray;
      display: flex;
      position: relative;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 70px;
      margin: 10px 0;
      padding: 0 20px;
      border-radius: 15px;
      border: none;
      font-size: 1.2em;
      font-weight: 900;
      .grade__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0.8em;
        font-weight: 400;
        .grade__label {
          font-size: 0.65em;
          opacity: 0.7;
          margin-right: auto;
          padding: 5px 0;
        }
        &.grade__item--color {
          border-radius: 50%;
          color: #313030;
          background: $primary;
          border: 3px solid transparent;
          width: 40px;
          height: 40px;
          font-weight: 900;
          font-size: 1em;
        }
      }
    }
  }
}
.notice {
  text-align: left;
  background: #f5f5f5;
  margin: 20px 0;
  padding: 15px 15px 15px 20px;
  border-radius: 10px;
  .notice__date {
    opacity: 0.7;
    font-size: 0.8em;
  }
  .notice__content {
    white-space: pre-wrap;
  }
}
@media screen and (min-width: 720px) {
  .whats-new {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
