<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input
        v-model.trim="firstName.value"
        type="text"
        id="firstname"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">First name cannot be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastName">Lastname</label>
      <input
        v-model.trim="lastName.value"
        type="text"
        id="lastname"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Last name cannot be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        v-model.trim="description.value"
        id="description"
        rows="5"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">Description cannot be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        v-model.number="rate.value"
        type="number"
        id="rate"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.isValid">Rate must be greater then 0</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of expertise</h3>
      <div class="filter-option">
        <input
          v-model="areas.value"
          type="checkbox"
          id="frontend"
          value="frontend"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend</label>
      </div>
      <div class="filter-option">
        <input
          v-model="areas.value"
          type="checkbox"
          id="backend"
          value="backend"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend</label>
      </div>
      <div class="filter-option">
        <input
          v-model="areas.value"
          type="checkbox"
          id="career"
          value="career"
          @blur="clearValidity('areas')"
        />
        <label for="career"> Career</label>
        <p v-if="!areas.isValid">Select atleast one area of expertise</p>
      </div>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ["save-data", "register-coach"],
  data() {
    return {
      firstName: {
        value: "",
        isValid: true,
      },
      lastName: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      rate: {
        value: null,
        isValid: true,
      },
      areas: {
        value: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      this.registerCoach();
      const formData = {
        first: this.firstName,
        last: this.lastName,
        desc: this.description,
        rate: this.rate,
        areas: this.areas,
      };
      this.$emit("save-data", formData);
      this.goToPage("/coaches");
    },
    validateForm() {
      this.formIsValid = true;
      if (!this.firstName.value) {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (!this.lastName.value) {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (!this.description.value) {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.value || this.rate.value < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
      if (this.formIsValid === true) {
        return;
      }
    },
    goToPage(link) {
      return this.$router.replace(link);
    },
    registerCoach() {
      this.$emit("register-coach");
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
