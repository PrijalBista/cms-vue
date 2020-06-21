<template>
  <div class="content">
    <div class="row">
      <h4>
        Gallery&nbsp;&nbsp;
        <span>Control Panel</span>
      </h4>
      <router-link to="/gallery/new" class="btn btn-primary ml-auto">New</router-link>
    </div>
    <br />
    <div class="input-group mr-auto">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <input type="text" class="form-control" placeholder="Search by Title or Tags" v-model="search" />
    </div>
    <br />

    <div class="input-group">
      <div class="col-sm-6 col-md-2 p-0">
        <select class="custom-select btn mb-3" id="inputGroupSelect01" @change="filterByCategory($event)">
          <option  value="all" selected>Filter By Category</option>
          <option
          v-for="(category,i) in categories"
          :key="`ss-${i}`"
          :value="category">{{ category }}</option>
          <option value="all">All</option>
        </select>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Category</th>
          <th scope="col">Preview</th>
          <th scope="col">Tags</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for="photo in filtered.length>0 ? filtered : photos " :key="photo.id"> -->
          <tr v-for="photo in currentPhotosCollection" :key="photo.id">
            <th scope="row">{{ photo.id }}</th>
            <td>
              <a href="#">{{ photo.title }}</a>
            </td>
            <td>
              <p>{{ photo.category }}</p>
            </td>
            <td>
              <img :src="`${$hostname}${photo.photo_url}`" class="img-fluid" width="200px" />
            </td>

            <td>
              <p v-if="photo.tags">
                <span
                class="badge badge-primary ml-1"
                v-for="(tag,id) in photo.tags.split(',')"
                :key="`tag-${id}`"
                style="background:#5C6BC0;">{{ tag }}</span>
              </p>
            </td>

            <td class="actions">
              <router-link :to="'/gallery/' + photo.id + '/edit'">
                <i class="far fa-edit"></i>
              </router-link>
              <form @submit.prevent="submit(photo)">
                <button type="submit"  :disabled="photo.category !== 'Gallery'" >
                  <a href="#">
                    <i class="fas fa-trash-alt" :style="photo.category !== 'Gallery' ? 'color:#dedede;': ''" ></i>
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
              <h5 class="modal-title">Delete {{photo.title}}</h5>
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
          photos: [],
          photo: {},
          search: "",
          filtered: [],
          categories: [],
      categoryFiltered: [], // will contain photos of specific category according to filterByCategory
    };
  },
  watch: {
    search() {
      let searchFrom = this.photos; // default search from all photos

      if(this.categoryFiltered.length > 0) {
        // search applied to categoryFiltered
        searchFrom = this.categoryFiltered;
      }

      if (this.search.length > 0) {
        this.filtered = searchFrom.filter(photo => {
          return photo.title.toLowerCase().includes(this.search.toLowerCase());
        });

        // also search from tags
        let taggedFilter = searchFrom.filter(photo => {
          return photo.tags && photo.tags.toLowerCase().includes(this.search.toLowerCase());
        });

        // push tagged Filter items to filtered if not already exist
        taggedFilter.forEach(tf => {
          if(this.filtered.findIndex(f => f.id === tf.id) == -1) {
            this.filtered.push(tf);
          }
        });
      }
      else {
        this.filtered = [];
      }
    }
  },
  created() {
    this.$axios.get(`${this.hostname}/photos`)
    .then(res => {
      this.photos = res.data.photos;
      this.categories = res.data.categories;
    })
    .catch(err => {
      console.log(err);
    });
  },

  methods: {
    submit(photo) {
      this.photo = photo;
      $("#warning").modal("show");
    },

    destroy() {
      this.$axios.post(`${this.hostname}/photos/destroy/${this.photo.id}`)
      .then(res => {
        this.photos = this.photos.filter(photo => {
          return photo.id !== this.photo.id;
        });
        this.filtered = this.filtered.filter(photo => {
          return photo.id !== this.photo.id;
        });
        $("#warning").modal("hide");
      })
      .catch(err => {
        console.log(err);
      });
    },

    filterByCategory(event) {

      let category = event.target.value;
      if(category == 'all') {
        this.categoryFiltered = [];
        return;
      }

      this.categoryFiltered = this.photos.filter(photo => {
        return photo.category == category;
      });

    },
  },

  computed: {
    currentPhotosCollection() {
      if(this.search.length > 0) return this.filtered;
      else if(this.categoryFiltered.length > 0) return this.categoryFiltered;
      else return this.photos;
    },
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
