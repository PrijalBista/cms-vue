<template>
  <div class="container-fluid content">
    <h4 class="d-flex">
      Edit Vacancy Post&nbsp;&nbsp;
      <span>Control Panel</span>
      <div class="spinner-border ml-auto text-danger" v-show="busy"></div>
    </h4>
    <br />
    <form @submit.prevent="submit()">
      <div class="form-group">
        <label for="title">
          <b>Job Title</b>
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

      <button type="submit" class="btn btn-primary" :disabled="busy">Save</button>
      <button type="submit" class="btn btn-danger" @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  props: ["id"],
  data() {
    return {
      editor: null,
      title: "",
      title_error: false,
      content_error: false,
      complete: 0,
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
    this.$axios(`${this.hostname}/vacancies/show/${this.id}`)
      .then(res => {
        this.busy = false;
        let data = res.data;
        this.complete = data.complete;
        this.title = data.title;
        this.editor.setData(data.content);
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    cancel() {
      this.$router.push("/vacancies");
    },

    toggle() {
      this.complete = 1 - this.complete;
    },

    submit() {
      this.busy = true;
      let formdata = new FormData();
      formdata.append("title", this.title);
      formdata.append("complete", this.complete);
      formdata.append("content", this.editor.getData());

      this.$axios.post(`${this.hostname}/vacancies/update/${this.id}`, formdata)
        .then(res => {
          this.busy = false;
          if (res.status == 200) {
            this.$router.push("/vacancies");
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
</style>

