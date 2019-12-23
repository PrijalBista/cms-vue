<template>
  <div class="content">
    <div class="row">
      <h4>
        Jobs&nbsp;&nbsp;
        <span>Control Panel</span>
      </h4>

      <router-link to="/jobs/new" class="btn btn-primary ml-auto">New</router-link>
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
          <th scope="col">Last Date</th>
          <th scope="col">Title</th>
          <th scope="col">Offered Salary</th>
          <th scope="col">Career Level</th>
          <th scope="col">Location</th>
          <th scope="col">Industry</th>
          <th scope="col">Experience</th>
          <th scope="col">Description</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in search.length>0 ? filtered : jobs " :key="job.id">
          <th scope="row">{{ job.id }}</th>

          <td>
            <span>{{ job.lastDate }}</span>
          </td>
          <td>
            <a href="#">{{ job.title }}</a>
          </td>
          <td>
            <span>{{ job.offeredSalary }}</span>
          </td>
          <td>
            <span>{{ job.careerLevel }}</span>
          </td>
          <td>
            <span>{{ job.location }}</span>
          </td>
          <td>
            <span>{{ job.industry }}</span>
          </td>
          <td>
            <span>{{ job.experience }} years</span>
          </td>
          <td>
            <span v-html="job.content.substring(0, 100) + '...'"></span>
          </td>

          <td class="actions">
            <router-link :to="'/jobs/' + job.id + '/edit'">
              <i class="far fa-edit"></i>
            </router-link>
            <form @submit.prevent="submit(job)">
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
            <h5 class="modal-title">Delete {{job.title}}</h5>
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
      jobs: [],
      job: {},
      search: "",
      filtered: []
    };
  },
  watch: {
    search() {
      if (this.search.length > 0) {
        this.filtered = this.jobs.filter(job => {
          return job.title.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    }
  },
  created() {
    fetch(`${this.hostname}/jobs`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.jobs = data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    submit(job) {
      this.job = job;
      $("#warning").modal("show");
    },

    destroy() {
      fetch(`${this.hostname}/jobs/destroy/${this.job.id}`, {
        method: "POST"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if ((data.status = 200)) {
            this.jobs = this.jobs.filter(job => {
              return job.id !== this.job.id;
            });
            this.filtered = this.filtered.filter(job => {
              return job.id !== this.job.id;
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
