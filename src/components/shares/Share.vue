<template>
  <div class="content">
    <div class="row">
      <h4>
        Shares&nbsp;&nbsp;
        <span>Control Panel</span>
      </h4>

      <router-link to="/shares/new" class="btn btn-primary ml-auto">New</router-link>
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
          <th scope="col" style="width: 350px">Files</th>
          <th scope="col">Description</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="share in search.length>0 ? filtered : shares " :key="share.id">
          <th scope="row">{{ share.id }}</th>
          <td>{{ share.created_at }}</td>
          <td>
            <a href="#">{{ share.title }}</a>
          </td>
          <td>
            <ul class="p-0" style="list-style-type: none">
              <li v-for="file in share.photos" :key="file.url">
                <a :href="`${hostname}/images/${file.url}`" target="_blank">
                  <i class="fas fa-download"></i>
                  {{file.url}}
                </a>
              </li>
            </ul>
          </td>
          <td>
            <span v-html="share.content.substring(0, 100) + '...'"></span>
          </td>

          <td class="actions">
            <router-link :to="'/shares/' + share.id + '/edit'">
              <i class="far fa-edit"></i>
            </router-link>
            <form @submit.prevent="submit(share)">
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
            <h5 class="modal-title">Delete {{share.title}}</h5>
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
      shares: [],
      share: {},
      search: "",
      filtered: []
    };
  },
  watch: {
    search() {
      if (this.search.length > 0) {
        this.filtered = this.shares.filter(share => {
          return share.title.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    }
  },
  created() {
    fetch(`${this.hostname}/shares`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.shares = data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    submit(share) {
      this.share = share;
      $("#warning").modal("show");
    },

    destroy() {
      fetch(`${this.hostname}/shares/destroy/${this.share.id}`, {
        method: "POST"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if ((data.status = 200)) {
            this.shares = this.shares.filter(share => {
              return share.id !== this.share.id;
            });
            this.filtered = this.filtered.filter(share => {
              return share.id !== this.share.id;
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
