<template>
  <div class="container-fluid content">
    <h4 class="d-flex">
      Edit Share&nbsp;&nbsp;
      <span>Control Panel</span>
      <div class="spinner-border ml-auto text-danger" v-show="busy"></div>
    </h4>
    <br />
    <form @submit.prevent="submit()">
      <div class="form-group">
        <label for="title">
          <b>Share Title</b>
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
        <label for="content">
          <b>Content</b>
        </label>
        <div class="row">
          <div class="col-12">
            <textarea
              class="form-control"
              :class="content_error ? 'is-invalid' : ''"
              name="content"
              id="editor"
              ref="content"
            ></textarea>
            <div class="invalid-feedback">Empty Content</div>
          </div>
        </div>
      </div>

      <div id="preview">
        <div v-for="image in images" :key="image.name">
          <i class="fas fa-times" @click="removeFile(image)"></i>

          <span>{{ image.name }}</span>
        </div>
      </div>
      <br />

      <input type="file" name="file" @change="fileHandle" />

      <br />
      <br />

      <button type="submit" class="btn btn-primary" :disabled="busy">Save</button>
      <button class="btn btn-danger" @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
let fileReader = new FileReader();

export default {
  props: ["id"],
  data() {
    return {
      files: [],
      editor: null,
      title: "",
      images: [
        // {
        //   src:
        //     "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtU0Broqwsd5fEZ51hrnDY06eCUF-Wm_TQoYzowGadTn3NdL4m",
        //   name: "blogpost"
        // },
      ],
      title_error: false,
      content_error: false,
      busy: true,
      errors: new this.$ErrorsClass(),
    };
  },

  watch: {
    title() {
      this.title_error = this.title.length == 0 ? true : false;
    }
  },

  mounted() {
    ClassicEditor.create(this.$refs.content).then(newEditor => {
      this.editor = newEditor;
    });
  },

  created() {
    this.$axios.get(`${this.hostname}/shares/show/${this.id}`)
      .then(res => {
        this.busy = false;
        let data = res.data;
        this.title = data.title;
        this.editor.setData(data.content);
        data.medias.forEach(image => {
          this.images.push({
            src: `${this.$hostname}${image.photo_url}`,
            name: image.title
          });
        });

      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    cancel() {
      this.$router.push("/shares");
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
      formdata.append("content", this.editor.getData());

      this.images.forEach(image => {
        formdata.append("items[]", image.name);
      });

      this.files.forEach(file => {
        formdata.append("images[]", file);
      });

      this.$axios.post(`${this.hostname}/shares/update/${this.id}`, formdata)
        .then(res => {
          this.busy = false;
          if (res.status == 200) {
            this.$router.push("/shares");
          }
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
