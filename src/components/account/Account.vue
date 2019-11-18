<template>
  <div class="content">
    <div class="row">
      <h4>
        Account Settings&nbsp;&nbsp;
        <span>Control Panel</span>
      </h4>
    </div>
    <br />
    <div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
      Password Changed Successfully
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div v-if="fail" class="alert alert-danger alert-dismissible fade show" role="alert">
      Password Change Failed
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm-Password</label>
        <input
          type="password"
          class="form-control"
          :class="confirmPasswordError ? 'is-invalid' : ''"
          id="confirm-password"
          placeholder="Confirm Password"
          v-model="confirmPassword"
        />
      </div>
      <button type="submit" class="btn btn-primary" :disabled="!valid">Change Password</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
      confirmPasswordError: false,
      valid: false,
      success: false,
      fail: false
    };
  },
  watch: {
    confirmPassword() {
      if (this.password != this.confirmPassword) {
        this.confirmPasswordError = true;
        this.valid = false;
      } else {
        this.confirmPasswordError = false;
        this.valid = true;
      }
    },
    password() {
      if (this.password != this.confirmPassword) {
        this.valid = false;
      } else {
        this.confirmPasswordError = false;
        this.valid = true;
      }
    }
  },
  methods: {
    submit() {
      let formData = new FormData();
      formData.append("password", this.password);
      formData.append("confirm_password", this.confirmPassword);

      fetch(`${this.hostname}/pages/changePassword`, {
        method: "POST",
        body: formData
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.status == 200) {
            this.success = true;
            this.password = "";
            this.confirmPassword = "";
          } else if (data.status == 500) this.fail = true;
        })
        .catch(err => {
          this.fail = true;
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 1.25rem;

  a {
    text-decoration: none;
  }
  .actions {
    display: flex;
  }
  form {
    button {
      border: 0;
    }
  }
}

.alert {
  border-radius: 0;
}
</style>
