<template>
  <div class="container-fluid content">
    <h4>
      Create Media&nbsp;&nbsp;
      <span>Control Panel</span>
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
          :class="title_error ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">Empty Title</div>

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
        :class="image_error ? 'is-invalid' : ''"
      />
      <div class="invalid-feedback">Empty Content</div>

      <br />
      <br />

      <button type="submit" class="btn btn-primary" :disabled="files.length == 0">Save</button>
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
      image_error: false
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
      let formdata = new FormData();
      formdata.append("title", this.title);
      formdata.append("images[]", this.files[0]);
      fetch("http://localhost/jinmvc/photos/store", {
        method: "POST",
        body: formdata
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          if (data.title_error) {
            this.title_error = true;
          }
          if (data.image_error) {
            this.image_error = true;
          }
          if (data.status == 200) {
            this.$router.push("/gallery");
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
