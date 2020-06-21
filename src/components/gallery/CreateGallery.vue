<template>
  <div class="container-fluid content">
    <h4 class="d-flex">
      Create Media&nbsp;&nbsp;
      <span>Control Panel</span>
      <div class="spinner-border ml-auto text-danger" v-show="busy"></div>
    </h4>
    <br />
    <form @submit.prevent="submit()">
      <div class="form-group">
        <label for="title">
          <b>Media Title</b>
        </label>
        <input
          name="title"
          type="text"
          v-model="title"
          class="form-control"
          placeholder="Lorem ipsum dolor sit amet consectetur"
          :class="errors.get('title') ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">{{ errors.get('title') }}</div>

        <br />
      </div>

      <div id="preview">
        <div
          v-for="image in images"
          :key="image.name"
          :style="'background-image: url(' + image.src + ')'"
        >
          <i class="fas fa-times" @click="removeFile(image)"></i>

          <span>{{ image.name }}</span>
        </div>
      </div>
      <br />

      <input
        :disabled="files.length > 0"
        type="file"
        name="file"
        @change="fileHandle"
        accept="image/*"
        :class="errors.get('images.0') ? 'is-invalid' : ''"
      />
      <div class="invalid-feedback">{{ errors.get('images.0') }}</div>

      <br />
      <br />

      <button type="submit" class="btn btn-primary" :disabled="files.length == 0 || busy">Save</button>
      <button class="btn btn-danger" @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
let fileReader = new FileReader();

export default {
  data() {
    return {
      files: [],
      images: [],
      title: "",
      title_error: false,
      image_error: false,
      errors : new this.$ErrorsClass(),
      busy: false
    };
  },

  watch: {
    title() {
      this.title_error = this.title.length == 0 ? true : false;
    }
  },

  methods: {
    fileHandle(f) {
      this.files.push(f.target.files[0]);
      fileReader.onload = e => {
        this.images.push({
          name: f.target.files[0].name,
          src: e.srcElement.result
        });
      };

      fileReader.readAsDataURL(f.target.files[0]);
    },

    removeFile(image) {
      this.images = this.images.filter(e => {
        return e.name !== image.name;
      });
      this.files = this.files.filter(e => {
        return e.name !== image.name;
      });
    },

    cancel() {
      this.$router.push("/gallery");
    },

    submit() {
      this.busy = true;
      let formdata = new FormData();
      formdata.append("title", this.title);
      formdata.append("images[]", this.files[0]);

      this.$axios.post(`${this.hostname}/photos/store`, formdata)
        .then(res => {
          this.busy = false;
          this.$router.push('/gallery');
        })
        .catch(err => {
          this.errors.record(err.response.data);
          this.busy = false;
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
    width: 512px;
    height: 256px;
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
