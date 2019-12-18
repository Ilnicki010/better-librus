<template>
  <div>
    <div
      v-for="subject in this.$store.state.subjects.subjects"
      :key="subject.Id"
    >
      <h1>{{ subject.Name }}</h1>
      <ul>
        <li v-for="grade in getGradesBySubjectId(subject.Id)" :key="grade.Id">
          {{ grade.Grade }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      grades: []
    };
  },
  computed: mapGetters(["getGradesBySubjectId"]),
  mounted() {
    this.$store.dispatch("fetchSubjects").then(() => {
      this.$store.dispatch("fetchGrades");
    });
  }
};
</script>

<style lang="scss" scoped></style>
