<template>
  <div class="content">
    <div class="row">
      <h4>
        Accounts&nbsp;&nbsp;
        <span>Control Panel</span>
      </h4>

      <router-link to="/accounts/new" class="btn btn-primary ml-auto">New</router-link>
      <router-link to="/accounts/update" class="btn btn-primary ml-1">Settings</router-link>
    </div>
    <br />
    <div class="input-group mr-auto">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <input type="text" class="form-control" placeholder="Search" v-model="search" />
    </div>
    <br />
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in search.length>0 ? filtered : users " :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.created_at }}</td>
          <td>
            <a href="#">{{ user.name }}</a>
          </td>
          <td>{{user.email}}</td>
          <td>{{user.role}}</td>

          <td class="actions">
            <form v-if="user.email !== userEmail" @submit.prevent="submit(user)">
              <button type="submit">
                <a href="#">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </button>
            </form>
            <button v-else class="disabled-button"  disabled>
              <i class="fas fa-trash-alt" style="color: #d3d3d3;"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="warning" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete {{user.name}}</h5>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" @click="destroy">Confirm Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      users: [],
      user: {},
      search: "",
      filtered: []
    };
  },
  watch: {
    search() {
      if (this.search.length > 0) {
        this.filtered = this.users.filter(user => {
          return user.name.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    }
  },
  created() {
    this.$axios.get(`${this.hostname}/users`)
      .then(res => {
        this.users = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    submit(user) {
      this.user = user;
      $("#warning").modal("show");
    },

    destroy() {
      this.$axios.post(`${this.hostname}/users/destroy/${this.user.id}`)
        .then(res => {
          if ((res.status = 200)) {
            this.users = this.users.filter(user => {
              return user.id !== this.user.id;
            });
            this.filtered = this.filtered.filter(user => {
              return user.id !== this.user.id;
            });
            $("#warning").modal("hide");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    userEmail() {
      const authUser = JSON.parse(localStorage.getItem('authUser'));
      return authUser ? authUser.userEmail : '';
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
      background: none;
    }
  }
  .disabled-button {
    border: 0;
    background: none;
  }
  .fa-trash-alt {
    color: #dc3545;
  }
  .modal-content,
  .input-group-prepend {
    border-radius: 0;
  }
}
</style>
