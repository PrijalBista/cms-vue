<template>
  <div class="content">
    <div class="row">
      <h4>
        News Feeds&nbsp;&nbsp;
        <span>Control Panel</span>
      </h4>

      <router-link to="/feeds/new" class="btn btn-primary ml-auto">New</router-link>
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
        <tr v-for="feed in search.length>0 ? filtered : feeds " :key="feed.id">
          <th scope="row">{{ feed.id }}</th>
          <td>{{ feed.created_at }}</td>
          <td>
            <a href="#">{{ feed.title }}</a>
          </td>
          <td>
            <span v-html="feed.content.substring(0, 100) + '...'"></span>
          </td>

          <td class="actions">
            <router-link :to="'/feeds/' + feed.id + '/edit'">
              <i class="far fa-edit"></i>
            </router-link>
            <form @submit.prevent="submit(feed)">
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
            <h5 class="modal-title">Delete {{feed.title}}</h5>
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
      feeds: [],
      feed: {},
      search: "",
      filtered: []
    };
  },
  watch: {
    search() {
      if (this.search.length > 0) {
        this.filtered = this.feeds.filter(feed => {
          return feed.title.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    }
  },
  created() {
    this.$axios.get(`${this.hostname}/feeds`)
      .then(res => {
        this.feeds = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    submit(feed) {
      this.feed = feed;
      $("#warning").modal("show");
    },

    destroy() {
      this.$axios.post(`${this.hostname}/feeds/destroy/${this.feed.id}`)
        .then(res => {
          if ((res.status = 200)) {
            this.feeds = this.feeds.filter(feed => {
              return feed.id !== this.feed.id;
            });
            this.filtered = this.filtered.filter(feed => {
              return feed.id !== this.feed.id;
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
