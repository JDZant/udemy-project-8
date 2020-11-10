<template>
  <div>
    <form @submit.prevent="this.validation">
      <div class="form-control" :class="{ invalid: !email.isValid }">
        <label for="email">Email adress</label>
        <input
          type="email"
          id="email"
          v-model.trim="email.value"
          @blur="clearValidity('email')"
        />
        <p class="errors" v-if="!email.isValid">Enter a valid email adress</p>
      </div>
      <div class="form-control" :class="{ invalid: !message.isValid }">
        <label for="message">Message</label>
        <textarea
          rows="5"
          id="message"
          v-model.trim="message.value"
          @blur="clearValidity('message')"
        ></textarea>
        <p class="errors" v-if="!message.isValid">Fill in a message</p>
      </div>
      <div class="actions">
        <base-button>Send message</base-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: true,
      email: {
        value: "",
        isValid: true,
      },
      message: {
        value: "",
        isValid: true,
      },
    };
  },
  methods: {
    validation() {
      this.formIsValid = true;
      if (!this.email.value) {
        this.email.isValid = false;
        this.formIsValid = false;
      } else {
        this.email.isValid = true;
      }
      if (!this.message.value) {
        this.message.isValid = false;
        this.formIsValid = false;
      } else {
        this.message.isValid = true;
        this.submitForm(this.email.value, this.message.value);
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    submitForm(email, message) {
      const formData = {
        coachId: this.$route.params.id,
        email,
        message,
      };
      this.$store.dispatch("requests/contactCoach", formData);
      this.$router.replace("/coaches");
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.invalid label {
  color: red;
}
</style>
