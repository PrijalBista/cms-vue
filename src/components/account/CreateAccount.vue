<template>
  <div class="container-fluid content">
    <h4 class="d-flex">
      Create Account&nbsp;&nbsp;
      <span>Control Panel</span>
      <div class="spinner-border ml-auto text-danger" v-show="busy"></div>
    </h4>
    <br />
    <div v-if="fail" class="alert alert-danger fade show" role="alert">Failed to create account!</div>

    <form @submit.prevent="submit()">
      <div class="form-group">
        <label for="name">
          <b>Name</b>
        </label>
        <input
          name="name"
          type="text"
          v-model="name"
          class="form-control"
          placeholder="John Doe"
          :class="errors.get('name') ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">{{ errors.get('name') }}</div>

        <br />

        <label for="email">
          <b>Email</b>
        </label>
        <input
          name="email"
          type="email"
          v-model="email"
          class="form-control"
          placeholder="example@domain.com"
          :class="errors.get('email') ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">{{ errors.get('email') }}</div>

        <br />

        <label for="role">
          <b>Role</b>
        </label>
        <select class="form-control" v-model="role">
          <option value="employee" selected>Employee</option>
          <option value="admin">Admin</option>
        </select>

        <br />
        <label for="password">
          <b>Set Password</b>
        </label>
        <input
          name="password"
          type="text"
          v-model="password"
          class="form-control"
          :class="errors.get('password') ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">{{ errors.get('password') }}</div>
      </div>

      <br />

      <button type="submit" class="btn btn-primary" :disabled="busy">Save</button>
      <button class="btn btn-danger" @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      role: "employee",
      busy: false,
      name_error: false,
      email_error: false,
      password_error: false,
      fail: false,
      errors: new this.$ErrorsClass(),
    };
  },

  watch: {
    name() {
      this.name_error = this.name.length == 0 ? true : false;
    },
    email() {
      this.email_error = this.email.length == 0 ? true : false;
    },
    password() {
      this.password_error = this.password.length == 0 ? true : false;
    }
  },

  methods: {
    cancel() {
      this.$router.push("/accounts");
    },

    submit() {
      this.busy = true;

      let formdata = new FormData();
      formdata.append("name", this.name);
      formdata.append("role", this.role);
      formdata.append("email", this.email);
      formdata.append("password", this.password);

      this.$axios.post(`${this.hostname}/users/store`, formdata)
        .then(res => {
          this.busy = false;
          if (res.status == 200) {
            this.$router.push("/accounts");
          }
        })
        .catch(err => {
          this.errors.record(err.response.data);
          this.busy = false;

          this.fail = true;
          setTimeout(() => {
            this.fail = false;
          }, 2000);

        });
    }
  }
};
</script>

<style lang="scss" scoped>
.col-12 {
  padding: 0;
}
.content {
  padding: 1.25rem;
}

#preview {
  display: flex;
  flex-wrap: wrap;
  span {
    background-color: #000;
    color: #fff;
    font-weight: 700;
  }
  div {
    width: 200px;
    height: 100px;
    margin-right: 1rem;
    margin-bottom: 1rem;
    background-size: cover;
    background-position: center;
    background-color: #e3e3e3;
    i {
      color: #f63951;
      float: right;
      font-size: 2rem;
      margin-top: -0.7rem;
      margin-right: -0.5rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
