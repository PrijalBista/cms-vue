<template>
  <div class="container-fluid content">
    <h4 class="d-flex">
      Edit Media&nbsp;&nbsp;
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
        type="file"
        name="file"
        @change="fileHandle"
        accept="image/*"
        :disabled="images.length == 1 || files.length == 1"
      />

      <br />
      <br />

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="(images.length !=1 && files.length !=1) || busy"
      >Save</button>
      <button class="btn btn-danger" @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
let fileReader = new FileReader();

export default {
  props: ["id"],
  data() {
    return {
      files: [],
      title: "",
      images: [
        // {
        //   src:
        //     "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtU0Broqwsd5fEZ51hrnDY06eCUF-Wm_TQoYzowGadTn3NdL4m",
        //   name: "blogpost"
        // },
      ],
      title_error: false,
      image_error: false,
      errors: new this.$ErrorsClass(),
      busy: true
    };
  },

  watch: {
    title() {
      this.title_error = this.title.length == 0 ? true : false;
    }
  },

  created() {

    this.$axios.get(`${this.hostname}/photos/show/${this.id}`)
      .then(res => {
        let data = res.data;
        this.busy = false;
        this.title = data.title;
        this.images.push({
          src: `${this.$hostname}${data.photo_url}`,
          name: data.title
        });

      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    cancel() {
      this.$router.push("/gallery");
    },
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

    submit() {
      this.busy = true;

      let formdata = new FormData();
      formdata.append("title", this.title);

      if(this.files[0]) {
        formdata.append("image", this.files[0]);
      }

      this.$axios.post(`${this.hostname}/photos/update/${this.id}`, formdata)
        .then(res => {
          this.busy = false;
          this.$router.push("/gallery");
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
    width: 200px;
    height: 100px;
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
