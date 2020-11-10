<template>
  <base-card>
    <section>
      <h2>Register as a coach now!</h2>
      <coach-form
        @save-data="saveData"
        @register-coach="registerCoach"
      ></coach-form>
    </section>
  </base-card>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";
export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(formData) {
      this.$store.dispatch("coaches/addCoach", formData);
    },
    registerCoach() {
      this.$store.dispatch("coaches/setAsRegistered", true);
    },
  },
};
</script>

<style></style>
