<template>
  <div class="container-fluid content">
    <h4>Create Vacancy&nbsp;&nbsp;<span>Control Panel</span></h4>
    <br />
    <form @submit.prevent="submit()">
      <div class="form-group">
        <label for="title"><b>Vacancy Title</b></label>
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
    return {};
  },
  mounted() {
    ClassicEditor.create(this.$refs.content);
  },

  methods: {
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
</style>
