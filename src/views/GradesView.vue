<template>
  <div class="grades-view-wrapper">
    <h1 class="title">Oceny</h1>
    <carousel :perPage="1" :minSwipeDistance="100">
      <slide v-for="semester in [1, 2]" :key="semester" class="subjects">
        <div class="semesters">
          <span :class="`subjects__semester--${semester}`"
            >Semestr {{ semester }}</span
          >
        </div>
        <div
          v-for="subject in subjects.subjects"
          :key="subject.Id"
          class="subjects__single-subject"
        >
          <header
            class="single-subject__header"
            @click="
              show = !show;
              selected = subject.Id;
            "
          >
            <img
              class="single-subject__grade-icon"
              alt
              :src="
                isSubjectIlustration(subject.Short)
                  ? require(`../assets/icons/${subject.Short}.svg`)
                  : require('../assets/icons/other.svg')
              "
            />
            <h2 class="single-subject__title">
              {{ subject.Name }} ({{
                getGradesBySubjectAndSemester(subject.Id, semester).length
              }})
            </h2>
            <i
              class="fa fa-angle-down single-subject__icon"
              :class="{ rotate: selected == subject.Id && show }"
            ></i>
          </header>
          <transition
            name="expand"
            @before-enter="beforeEnter"
            @enter="enter"
            @before-leave="beforeLeave"
            @leave="leave"
          >
            <div
              class="single-subject__body"
              v-if="show && subject.Id === selected"
            >
              <div class="single-subject__body-inner">
                <div class="single-subject__grades">
                  <div
                    v-for="grade in getGradesBySubjectAndSemester(
                      subject.Id,
                      semester
                    )"
                    :key="grade.Id"
                  >
                    <button
                      @click="getGradeDesc(grade)"
                      v-if="getColorById(grade.category.Color.Id)"
                      class="single-subject__grade"
                    >
                      <span
                        class="grade__item grade__item--color"
                        :style="{
                          backgroundColor: `#${
                            getColorById(grade.category.Color.Id).RGB
                          }`
                        }"
                        >{{ grade.grade.Grade }}</span
                      >
                      <div class="grade__item">
                        <span class="grade__label">Kategoria</span>
                        <span>{{ grade.category.Name }}</span>
                      </div>
                      <div class="grade__item">
                        <span class="grade__label">Waga</span>
                        <span>{{ grade.category.Weight }}</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </slide>
    </carousel>
    <img src="@/assets/pattern3.png" alt class="decoral-pattern" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import axios from "axios";
export default {
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      currentCatgory: null,
      currentColor: "#bada55",
      colors: [],
      selected: null,
      gradeDesc: null,
      isActive: false,
      show: false,
      ilustartions: [
        "bio",
        "niem",
        "mat",
        "che",
        "inf",
        "wf",
        "fiz",
        "geo",
        "pol",
        "hist",
        "jang",
        "rel",
        "gw"
      ]
    };
  },
  methods: {
    getMoreInfoAboutGrade(categoryId) {
      this.$store
        .dispatch("fetchCategoryById", categoryId)
        .then(categoryData => categoryData);
    },
    getColorById(colorId) {
      return this.colors.find(color => color.Id === colorId);
    },
    isSubjectIlustration(subjectName) {
      return this.ilustartions.find(el => el === subjectName) ? true : false;
    },
    getGradeDesc(grade) {
      this.isActive = !this.isActive;
      this.selected = grade;
      this.gradeDesc = grade;
    },
    //expand animation methods
    beforeEnter: function(el) {
      el.style.height = "0";
    },
    enter: function(el) {
      el.style.height = el.scrollHeight + "px";
    },
    beforeLeave: function(el) {
      el.style.height = el.scrollHeight + "px";
    },
    leave: function(el) {
      el.style.height = "0";
    }
  },
  computed: {
    ...mapGetters([
      "getGradesBySubjectAndSemester",
      "getFinalAndPropositionGrades",
      "getCategoryById",
      "getAllGrades"
    ]),
    ...mapState(["subjects", "grades"]),
    formatDate: () => date => {
      const datePart = date.match(/\d+/g),
        month = datePart[1],
        day = datePart[2],
        hour = datePart[3],
        secounds = datePart[4];
      console.log("test");
      return `${day}/${month} ${hour}:${secounds}`;
    }
  },
  mounted() {
    this.$store.dispatch("fetchSubjects").then(() => {
      this.$store.dispatch("fetchGrades").then(() => {
        axios
          .get(
            `${process.env.VUE_APP_CORS_SERVER_URL}/https://api.librus.pl/2.0/Colors`
          )
          .then(data => {
            this.colors = data.data.Colors;
          });
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.grades-view-wrapper {
  width: 100%;
  position: relative;
  .subjects {
    position: relative;
  }
  .semesters {
    color: #797050;
    opacity: 0.8;
    font-size: 1em;
    .subjects__semester--1,
    .subjects__semester--2 {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        width: 50vw;
        height: 3px;
        background: #797050;
      }
    }
     .subjects__semester--1::after {
      left: 120%;
    }
    .subjects__semester--2::after {
      right: 120%;
    }
  }

  .subjects__single-subject {
    display: flex;
    position: relative;
    flex-direction: column;
    margin: 25px auto;
    width: 100%;
    background: #f5f5f5;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    height: auto;
    .single-subject__header {
      display: flex;
      align-items: center;
      padding: 0 40px 0 20px;
      position: relative;
      cursor: pointer;
      .single-subject__grade-icon {
        width: 45px;
      }
      .single-subject__title {
        font-size: 1em;
        padding: 10px 7px;
        text-align: left;
      }
      .single-subject__icon {
        position: relative;
        margin-left: auto;
        transform: rotate(0deg);
        transition-duration: 0.3s;
        background: #ffe9a0;
        padding: 5px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        &.rotate {
          transform: rotate(180deg);
          transition-duration: 0.3s;
        }
      }
    }

    .single-subject__body {
      overflow: hidden;
      background: #e7e7e7;
      border-top: 0;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      width: 100%;
      height: auto;
      .single-subject__body-inner {
        padding: 40px 30px;
      }
    }

    .single-subject__grades {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;

      .single-subject__grade {
        background: #fff;
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
}
.decoral-pattern {
  position: fixed;
  display: none;
  bottom: 0;
  width: 40vw;
  right: -70px;
  z-index: -9999;
}
@media (min-width: 720px) {
  .grades-view-wrapper .subjects__single-subject {
    .single-subject__grades {
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 15px;
      .single-subject__grade {
        margin: 0;
      }
    }
  }
}
</style>
