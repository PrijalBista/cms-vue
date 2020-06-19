<template>
  <div class="container-fluid content">
    <h4 class="d-flex">
      Create Blog Post&nbsp;&nbsp;
      <span>Control Panel</span>
      <div class="spinner-border ml-auto text-danger" v-show="busy"></div>
    </h4>
    <br />
    <form @submit.prevent="submit()">
      <div class="form-group">
        <label for="title">
          <b>Project Title</b>
        </label>
        <input
          name="title"
          type="text"
          v-model="title"
          class="form-control"
          placeholder="Lorem ipsum dolor sit amet consectetur"
          :class="errors.get('title') ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">{{errors.get('title')}}</div>

        <br />
        <label for="content">
          <b>Content</b>
        </label>
        <div class="row">
          <div class="col-12">
            <textarea
              class="form-control"
              :class="errors.get('content') ? 'is-invalid' : ''"
              name="content"
              id="editor"
              ref="content"
            ></textarea>
            <div class="invalid-feedback">{{errors.get('content')}}</div>
          </div>
        </div>
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

      <input type="file" name="file" @change="fileHandle" accept="image/*" />

      <br />
      <br />

      <button type="submit" class="btn btn-primary" :disabled="busy">Save</button>
      <button class="btn btn-danger" @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from 'axios';
let fileReader = new FileReader();
class Errors {

  constructor() {
    this.errors = {};
  }

  get(field) {
    if(this.errors[field]) {
      return this.errors[field][0];
    }
  }

  record(errors) {
    this.errors = errors.errors;
  }
}

export default {
  data() {
    return {
      files: [],
      images: [],
      title: "",
      content: "",
      editor: null,
      title_error: false,
      content_error: false,
      busy: false,
      errors: new Errors()
    };
  },

  watch: {
    title() {
      this.title_error = this.title.length == 0 ? true : false;
    }
  },

  mounted() {
    ClassicEditor.create(this.$refs.content).then(neweditor => {
      this.editor = neweditor;
    });
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
      this.$router.push("/blogs");
    },

    submit() {
      let formdata = new FormData();
      formdata.append("title", this.title);
      formdata.append("content", this.editor.getData());
      this.files.forEach(file => {
        formdata.append("images[]", file);
      });
      this.busy = true;
      console.log('requesting' + `${this.hostname}/posts/store`);


      axios.post(`${this.hostname}/posts/store`, formdata)
        .then(res => {
          this.$router.push("/blogs");
        })
        .catch(err => {
          this.errors.record(err.response.data);
          this.busy = false;
        });
      // fetch(`${this.hostname}/posts/store`, {
      //   headers: {
      //     'Accept': 'application/json',
      //   },
      //   method: "POST",
      //   body: formdata
      // })
      //   .then(res => {
      //     return res.json();
      //   })
      //   .then(data => {
      //     console.log(data);

      //     if (data.title_error) {
      //       this.title_error = true;
      //     }
      //     if (data.content_error) {
      //       this.content_error = true;
      //     }
      //     if (data.status == 200) {
      //       this.$router.push("/blogs");
      //     }
      //     this.busy = false;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     console.log('error occured');
      //     this.errors.record(err.response.data);
      //     console.log('errors variable', this.errors.get('title'));
      //     // console.log('error occured');
      //     this.busy = false;
      //   });
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
