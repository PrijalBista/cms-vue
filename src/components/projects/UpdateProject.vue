
<template>
  <div class="container-fluid content">
    <h4 class="d-flex">
      Edit Project&nbsp;&nbsp;
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
      <br />
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="complete"
          name="complete"
          :checked="complete == 1"
          @click="toggle"
        />
        <label class="custom-control-label" for="complete">Complete</label>
      </div>
      <br />
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
let fileReader = new FileReader();

export default {
  props: ["id"],
  data() {
    return {
      files: [],
      editor: null,
      title: "",
      complete: 0,
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
    this.$axios.get(`${this.hostname}/projects/show/${this.id}`)
      .then(res => {
        this.busy = false;
        let data = res.data;
        this.title = data.title;
        this.editor.setData(data.content);
        this.complete = data.complete;
        data.photos.forEach(image => {
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
      this.$router.push("/projects");
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
      formdata.append("complete", this.complete);

      this.images.forEach(image => {
        formdata.append("items[]", image.name);
      });

      this.files.forEach(file => {
        formdata.append("images[]", file);
      });

      this.$axios.post(`${this.hostname}/projects/update/${this.id}`, formdata)
        .then(res => {
          this.busy = false;
          if (res.status == 200) {
            this.$router.push("/projects");
          }
        })
        .catch(err => {
          this.errors.record(err.response.data);
          this.busy = false;
        });
    },

    toggle() {
      this.complete = 1 - this.complete;
    },
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
