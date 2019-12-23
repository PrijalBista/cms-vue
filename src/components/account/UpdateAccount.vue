<template>
  <div class="content">
    <div class="row">
      <h4>
        Account Settings&nbsp;&nbsp;
        <span>Control Panel</span>
      </h4>
    </div>
    <br />

    <div
      v-if="success"
      class="alert alert-success fade show"
      role="alert"
    >Account updated successfully!</div>
    <div
      v-if="fail"
      class="alert alert-danger fade show"
      role="alert"
    >Account account update failed!</div>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label>Account</label>
        <select class="form-control" name="id" v-model="id" @change="updateAccount">
          <option v-for="user in users" :value="user.id" :key="user.id">{{user.email}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="password">Name</label>
        <input
          type="text"
          class="form-control"
          id="text"
          placeholder="John Doe"
          v-model="name"
          :class="name_err ? 'is-invalid' : ''"
        />
      </div>

      <div class="form-group">
        <label>Role</label>
        <select class="form-control" name="id" v-model="role">
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
      </div>

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
          :class="confirmPassword_err ? 'is-invalid' : ''"
          id="confirm-password"
          placeholder="Confirm Password"
          v-model="confirmPassword"
        />
      </div>
      <button type="submit" class="btn btn-primary" :disabled="!isValid">Update Account</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      id: null,
      name: "",
      role: "",
      password: "",
      confirmPassword: "",
      confirmPassword_err: false,
      name_err: false,
      success: false,
      fail: false
    };
  },
  computed: {
    isValid() {
      return (
        this.confirmPassword == this.password &&
        this.name != "" &&
        this.id != null
      );
    }
  },
  methods: {
    submit() {
      let formData = new FormData();
      formData.append("id", this.id);
      formData.append("name", this.name);
      formData.append("role", this.role);
      formData.append("password", this.password);
      formData.append("confirm_password", this.confirmPassword);

      fetch(`${this.hostname}/pages/update`, {
        method: "POST",
        body: formData
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.name_err = data.name_err;
          this.confirmPassword_err = data.confirmPassword_err;
          if (data.status == 200) {
            this.password = "";
            this.confirmPassword = "";
            this.id = null;
            this.name = "";
            this.role = "";
            this.success = true;
            setTimeout(() => {
              this.success = false;
            }, 2000);
          } else if (data.status == 500) {
            this.fail = true;
            setTimeout(() => {
              this.fail = false;
            }, 2000);
          }
        })
        .catch(err => {
          this.fail = true;
          console.log(err);
        });
    },

    updateAccount() {
      let user = this.users.filter(user => {
        return user.id == this.id;
      })[0];
      this.name = user.name;
      this.role = user.role;
    }
  },

  mounted() {
    fetch(`${this.hostname}/pages/users`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.users = data;
      });
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
