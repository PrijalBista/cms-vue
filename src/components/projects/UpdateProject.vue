<template>
  <div class="container-fluid content">
    <h4>Edit Project&nbsp;&nbsp;<span>Control Panel</span></h4>
    <br />
    <form @submit.prevent="submit()">
      <div class="form-group">
        <label for="title"><b>Project Title</b></label>
        <input
          name="title"
          type="text"
          class="form-control"
          placeholder="Lorem ipsum dolor sit amet consectetur"
        />
        <br />
        <label for="content"><b>Content</b></label>
        <div class="row">
          <div class="col-12">
            <textarea
              class="form-control"
              name="content"
              id="editor"
              ref="content"
            ></textarea>
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

      <button type="submit" class="btn btn-primary">
        Save
      </button>
      <button type="submit" class="btn btn-danger">
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
let fileReader = new FileReader();

export default {
  data() {
    return {
      files: [],
      images: [
        {
          src:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtU0Broqwsd5fEZ51hrnDY06eCUF-Wm_TQoYzowGadTn3NdL4m",
          name: "blogpost"
        },
        {
          src:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1a1rZ_v2kvhYWOs5-xeEhdLkdNYNDDmCJsO0oCV0jwkzlbMsr",
          name: "blogpost2"
        }
      ]
    };
  },
  mounted() {
    ClassicEditor.create(this.$refs.content);
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

    submit() {}
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
