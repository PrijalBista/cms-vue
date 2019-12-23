<template>
  <div class="container-fluid content">
    <h4 class="d-flex">
      Create Job&nbsp;&nbsp;
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
          :class="title_error ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">Empty Title</div>

        <br />

        <label for="date">
          <b>Last Date</b>
        </label>
        <input
          name="lastDate"
          type="date"
          v-model="lastDate"
          class="form-control"
          :class="lastDate_error ? 'is-invalid': ''"
        />
        <div class="invalid-feedback">Empty Last Application Date</div>

        <br />

        <label for="title">
          <b>Offered Salary</b>
        </label>
        <input
          name="offeredSalary"
          type="text"
          v-model="offeredSalary"
          class="form-control"
          placeholder="NRP 10000 - 50000"
          :class="offeredSalary_error ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">Empty Offered Salary</div>

        <br />

        <label for="career">
          <b>Career Level</b>
        </label>
        <select
          name="careerLevel"
          class="form-control"
          v-model="careerLevel"
          :class="careerLevel_error ? 'is-invalid': ''"
        >
          <option value="Entry Level" selected>Entry Level</option>
          <option value="Professional level">Professional level</option>
          <option value="Mid level">Mid level</option>
          <option value="Senior level">Senior level</option>
        </select>

        <br />

        <label for="title">
          <b>Location</b>
        </label>
        <input
          name="location"
          type="text"
          v-model="location"
          class="form-control"
          placeholder="United Arab Emirates"
          :class="location_error ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">Empty Location</div>

        <br />

        <label for="industry">
          <b>Industry</b>
        </label>
        <select
          name="industry"
          class="form-control"
          v-model="industry"
          :class="industry_error ? 'is-invalid': ''"
        >
          <option value="Welder" selected>Welder</option>
          <option value="1">Professional level</option>
          <option value="Security Guard">Security Guard</option>
          <option value="Salesman">Salesman</option>
        </select>

        <br />
        <label for="experience">
          <b>Experience</b>
        </label>
        <select
          name="experience"
          class="form-control"
          v-model="experience"
          :class="experience_error ? 'is-invalid': ''"
        >
          <option value="0" selected>0 years</option>
          <option value="1">1 year</option>
          <option value="2">2 years</option>
          <option value="3">3 years</option>
          <option value="4">4 years</option>
          <option value="5">5 years</option>
          <option value="6">6 years</option>
          <option value="7">7 years</option>
          <option value="8">8 years</option>
          <option value="9">9 years</option>
          <option value="10">10 years</option>
          <option value="100">10+ years</option>
        </select>
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
  data() {
    return {
      files: [],
      images: [],
      title: "",
      lastDate: "",
      offeredSalary: "",
      careerLevel: "Entry Level",
      location: "",
      industry: "Welder",
      experience: "0",
      content: "",
      editor: null,
      title_error: false,
      lastDate_error: false,
      offeredSalary_error: false,
      careerLevel_error: false,
      location_error: false,
      industry_error: false,
      experience_error: false,
      content_error: false,
      busy: false
    };
  },

  watch: {
    title() {
      this.title_error = this.title.length == 0 ? true : false;
    },
    lastDate() {
      this.lastDate_error = this.lastDate.length == 0 ? true : false;
    },
    offeredSalary() {
      this.offeredSalary_error = this.offeredSalary.length == 0 ? true : false;
    },
    careerLevel() {
      this.careerLevel_error = this.careerLevel.length == 0 ? true : false;
    },
    location() {
      this.location_error = this.location.length == 0 ? true : false;
    },
    industry() {
      this.industry_error = this.industry.length == 0 ? true : false;
    },
    experience() {
      this.experience_error = this.experience.length == 0 ? true : false;
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
      this.$router.push("/jobs");
    },

    submit() {
      this.busy = true;
      let formdata = new FormData();
      formdata.append("title", this.title);
      formdata.append("lastDate", this.lastDate);
      formdata.append("offeredSalary", this.offeredSalary);
      formdata.append("careerLevel", this.careerLevel);
      formdata.append("location", this.location);
      formdata.append("industry", this.industry);
      formdata.append("experience", this.experience);
      formdata.append("content", this.editor.getData());
      this.files.forEach(file => {
        formdata.append("images[]", file);
      });
      fetch(`${this.hostname}/jobs/store`, {
        method: "POST",
        body: formdata
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.title_error) {
            this.title_error = true;
          }
          if (data.lastDate_error) {
            this.lastDate_error = true;
          }
          if (data.offeredSalary_error) {
            this.offeredSalary_error = true;
          }
          if (data.careerLevel_error) {
            this.careerLevel_error = true;
          }
          if (data.location_error) {
            this.location_error = true;
          }
          if (data.industry_error) {
            this.industry_error = true;
          }
          if (data.experience_error) {
            this.experience_error = true;
          }
          if (data.content_error) {
            this.content_error = true;
          }
          if (data.status == 200) {
            this.$router.push("/jobs");
          }
          this.busy = false;
        })
        .catch(err => {
          console.log(err);
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
