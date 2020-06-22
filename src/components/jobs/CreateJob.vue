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
          :class="errors.get('title') ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">{{errors.get('title')}}</div>

        <br />

        <label for="date">
          <b>Last Date</b>
        </label>
        <input
          name="lastDate"
          type="date"
          v-model="lastDate"
          class="form-control"
          :class="errors.get('lastDate') ? 'is-invalid': ''"
        />
        <div class="invalid-feedback">{{errors.get('lastDate')}}</div>

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
          :class="errors.get('offeredSalary') ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">{{errors.get('offeredSalary')}}</div>

        <br />

        <label for="career">
          <b>Career Level</b>
        </label>
        <select
          name="careerLevel"
          class="form-control"
          v-model="careerLevel"
          :class="errors.get('careerLevel') ? 'is-invalid': ''"
        >
          <option value="Entry Level" selected>Entry Level</option>
          <option value="Professional level">Professional level</option>
          <option value="Mid level">Mid level</option>
          <option value="Senior level">Senior level</option>
        </select>

        <br />

        <label for="location">
          <b>Location</b>
        </label>
        <select
          name="location"
          class="form-control"
          v-model="location"
          :class="errors.get('location') ? 'is-invalid': ''"
        >
          <option disabled selected>Choose Country</option>
          <option value="Qatar">Qatar</option>
          <option value="Malaysia">Malaysia</option>
          <option value="UAE">UAE</option>
          <option value="Kuwait">Kuwait</option>
          <option value="Oman">Oman</option>
          <option value="Japan">Japan</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="Korea">Korea</option>
        </select>
        <div class="invalid-feedback">{{errors.get('location')}}</div>

        <br />

        <label for="industry">
          <b>Industry</b>
        </label>
        <select
          name="industry"
          class="form-control"
          v-model="industry"
          :class="errors.get('industry') ? 'is-invalid': ''"
        >
                <option value="Labour">Labour</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Helper">Helper</option>
                <option value="Sweeper">Sweeper</option>
                <option value="Watchman">Watchman</option>
                <option value="Office Boy">Office Boy</option>
                <option value="Washing Worker">Washing Worker</option>
                <option value="Building Worker">Building Worker</option>
                <option value="Construction Worker">Construction Worker</option>
                <option value="Bell man">Bell man</option>
                <option value="Room Attendant">Room Attendant</option>
                <option value="Mason">Mason</option>
                <option value="BlockMakers">BlockMakers</option>
                <option value="Plaster Worker">Plaster Worker</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Mechanical Helper">Mechanical Helper</option>
                <option value="Electrical Worker">Electrical Worker</option>
                <option value="Steel Fixture">Steel Fixture</option>
                <option value="Tile Fixture">Tile Fixture</option>
                <option value="Plumber">Plumber</option>
                <option value="Pipe Fitter">Pipe Fitter</option>
                <option value="Welder">Welder</option>
                <option value="Scaffolder">Scaffolder</option>
                <option value="A/C Mechanic">A/C Mechanic</option>
                <option value="Electricians">Electricians</option>
                <option value="Tailors">Tailors</option>
                <option value="Assistant Tailors">Assistant Tailors</option>
                <option value="Laundary Man">Laundary Man</option>
                <option value="Washer Man">Washer Man</option>
                <option value="Barbers">Barbers</option>
                <option value="Shop Assistant">Shop Assistant</option>
                <option value="Messenger">Messenger</option>
                <option value="Technicians">Technicians</option>
                <option value="Digger">Digger</option>
                <option value="Ceramic Worker">Ceramic Worker</option>
                <option value="Painter">Painter</option>
                <option value="Gardeners">Gardeners</option>
                <option value="Reinforce Fitter">Reinforce Fitter</option>
                <option value="Construction">Construction</option>
                <option value="Cabling Technician">Cabling Technician</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Designer">Designer</option>
                <option value="Professional">Professional</option>
                <option value="Cashier">Cashier</option>
                <option value="Telephone Operator">Telephone Operator</option>
                <option value="Salesman">Salesman</option>
                <option value="Assistant Cook">Assistant Cook</option>
                <option value="Typist">Typist</option>
                <option value="Bakers">Bakers</option>
                <option value="Assistant Bakers">Assistant Bakers</option>
                <option value="Drivers Light">Drivers Light</option>
                <option value="Waiter">Waiter</option>
                <option value="Cook">Cook</option>
                <option value="Security Guard">Security Guard</option>
                <option value="Beautician">Beautician</option>
                <option value="Driver Light GCC">Driver Light GCC</option>
                <option value="Store Keeper">Store Keeper</option>
                <option value="Machine Operator">Machine Operator</option>
                <option value="Computer Operator">Computer Operator</option>
                <option value="Photographer">Photographer</option>
                <option value="Correspondent">Correspondent</option>
                <option value="Medical Assistant">Medical Assistant</option>
                <option value="Driver Heavy">Driver Heavy</option>
                <option value="Driver Heavy">Driver Light</option>
                <option value="Front Office Personnel">Front Office Personnel</option>
                <option value="Sales Executive">Sales Executive</option>
                <option value="Sales Representative">Sales Representative</option>
                <option value="Clerk">Clerk</option>
                <option value="Secretary">Secretary</option>
                <option value="Driver Heavy GCC">Driver Heavy GCC</option>
                <option value="Representative">Representative</option>
                <option value="Business Executive">Business Executive</option>
                <option value="Administrative">Administrative</option>
                <option value="Translator">Translator</option>
                <option value="Foreman">Foreman</option>
                <option value="Plant Operators">Plant Operators</option>
                <option value="Construction Supervisor">Construction Supervisor</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Laboratory Technician">Laboratory Technician</option>
                <option value="Overseer">Overseer</option>
                <option value="Construction Equipment Operators">Construction Equipment Operators</option>
                <option value="Scaffolding Supervisor">Scaffolding Supervisor</option>
                <option value="Draughtsman">Draughtsman</option>
                <option value="Computer Engineer">Computer Engineer</option>
                <option value="Accountant">Accountant</option>
                <option value="Physiotherapist">Physiotherapist</option>
                <option value="Nurse">Nurse</option>
                <option value="Civil Engineer">Civil Engineer</option>
                <option value="Electrical Engineer">Electrical Engineer</option>
                <option value="Mechanical Engineer">Mechanical Engineer</option>
                <option value="Electronics Engineer">Electronics Engineer</option>
                <option value="Telecom Engineer">Telecom Engineer</option>
                <option value="Safety Engineer">Safety Engineer</option>
                <option value="HR Executive">HR Executive</option>
                <option value="Manager">Manager</option>
                <option value="General Manager">General Manager</option>
                <option value="Generak Physician">Generak Physician</option>
                <option value="Doctor">Doctor</option>
                <option value="Chartered Accountant">Chartered Accountant</option>

                <option value="Continental Cook">Continental Cook</option>
                <option value="Manufacturing Worker">Manufacturing Worker</option>
                <option value="Manicurist">Manicurist</option>
                <option value="Merchandiser">Merchandiser</option>
                <option value="Car Delivery Driver">Car Delivery Driver</option>
                <option value="Motorbike Delivery Driver">Motorbike Delivery Driver</option>
                <option value="Regular Cook">Regular Cook</option>
                <option value="Restaurant Helper">Restaurant Helper</option>
                <option
                  value="Heavy Ventilation Air Condition Technician"
                >Heavy Ventilation Air Condition Technician</option>
                <option value="Housekeeping Attendant">Housekeeping Attendant</option>
                <option value="Commis Chef">Commis Chef</option>
                <option value="Appliance Technician">Appliance Technician</option>
                <option value="Heavy Driver">Heavy Driver</option>
                <option value="Multi Technician">Multi Technician</option>
                <option value="Bartender">Bartender</option>
                <option value="Head Waiter">Head Waiter</option>
                <option value="Junior Waiter">Junior Waiter</option>
                <option value="Barback">Barback</option>
                <option value="Brick Mason">Brick Mason</option>
                <option value="Factory Worker">Factory Worker</option>
                <option value="Lead Technician">Lead Technician</option>
                <option value="Assistant Technician">Assistant Technician</option>
                <option value="House Electrician">House Electrician</option>
                <option value="Power Generation Electricians">Power Generation Electricians</option>
                <option value="Elevator Installers">Elevator Installers</option>
                <option value="Packing Staff">Packing Staff</option>
                <option value="Kitchen Crew">Kitchen Crew</option>
                <option value="Masseur">Masseur</option>
                <option value="Junior Chef">Junior Chef</option>
                <option value="Chef De Partie">Chef De Partie</option>
                <option value="Demi Chef">Demi Chef</option>
                <option value="GMAW Welder">GMAW Welder</option>
                <option value="Spa Therapist">Spa Therapist</option>
                <option value="Butcher">Butcher</option>
                <option value="Juice Maker">Juice Maker</option>
                <option value="Fish Salesman Helper">Fish Salesman Helper</option>
                <option value="Loading and Unloading">Loading and Unloading</option>
                <option value="Salon Worker">Salon Worker</option>
                <option value="Barista">Barista</option>
        </select>

        <br />
        <label for="experience">
          <b>Experience</b>
        </label>
        <select
          name="experience"
          class="form-control"
          v-model="experience"
          :class="errors.get('experience') ? 'is-invalid': ''"
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
      location: "Qatar",
      industry: "Supervisor",
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
      busy: false,
      errors: new this.$ErrorsClass(),
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

      this.$axios.post(`${this.hostname}/jobs/store`, formdata)
        .then(res => {
          this.busy = false;
          if (res.status == 200) {
            this.$router.push("/jobs");
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
