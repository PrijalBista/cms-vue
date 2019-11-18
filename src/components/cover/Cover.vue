<template>
  <div class="content">
    <div class="row">
      <h4>
        Covers&nbsp;&nbsp;
        <span>Control Panel</span>
      </h4>
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
          <th scope="col">Title</th>
          <th scope="col">Preview</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="photo in search.length>0 ? filtered : photos " :key="photo.id">
          <th scope="row">{{ photo.id }}</th>
          <td>
            <a href="#">{{ photo.title }}</a>
          </td>
          <td>
            <img :src="`${hostname}/images/${photo.url}`" class="img-fluid" width="200px" />
          </td>

          <td class="actions">
            <router-link :to="'/covers/' + photo.id + '/edit'">
              <i class="far fa-edit"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      photos: [],
      photo: {},
      search: "",
      filtered: []
    };
  },
  watch: {
    search() {
      if (this.search.length > 0) {
        this.filtered = this.photos.filter(photo => {
          return photo.title.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    }
  },
  created() {
    fetch(`${this.hostname}/covers`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.photos = data;
      })
      .catch(err => {
        console.log(err);
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
