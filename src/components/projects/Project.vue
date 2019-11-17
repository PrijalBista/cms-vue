<template>
  <div class="content">
    <div class="row">
      <h4>
        Projects&nbsp;&nbsp;
        <span>Control Panel</span>
      </h4>
      <router-link to="/projects/new" class="btn btn-primary ml-auto">New</router-link>
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
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in search.length>0 ? filtered : projects " :key="project.id">
          <th scope="row">{{ project.id }}</th>
          <td>{{ project.created_at }}</td>
          <td>
            <a href="#">{{ project.title }}</a>
          </td>
          <td>
            <span v-html="project.content.substring(0, 100) + '...'"></span>
          </td>

          <td class="actions">
            <router-link :to="'/projects/' + project.id + '/edit'">
              <i class="far fa-edit"></i>
            </router-link>
            <form @submit.prevent="submit(project)">
              <button type="submit">
                <a href="#">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="warning" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete {{project.title}}</h5>
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
      projects: [],
      project: {},
      search: "",
      filtered: []
    };
  },
  watch: {
    search() {
      if (this.search.length > 0) {
        this.filtered = this.projects.filter(project => {
          return project.title
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      }
    }
  },
  created() {
    fetch("http://localhost/jinmvc/projects")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.projects = data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    submit(project) {
      this.project = project;
      $("#warning").modal("show");
    },

    destroy() {
      fetch(`http://localhost/jinmvc/projects/destroy/${this.project.id}`, {
        method: "POST"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if ((data.status = 200)) {
            this.projects = this.projects.filter(project => {
              return project.id !== this.project.id;
            });
            this.filtered = this.filtered.filter(project => {
              return project.id !== this.project.id;
            });
            $("#warning").modal("hide");
          }
        })
        .catch(err => {
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
      background: none;
    }
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
