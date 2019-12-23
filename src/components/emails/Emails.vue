<template>
  <div class="content">
    <div class="row">
      <h4>
        Emails&nbsp;&nbsp;
        <span>Control Panel</span>
      </h4>
    </div>
    <br />
    <div class="input-group mr-auto">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <input type="text" class="form-control" placeholder="Search" v-model="search" />
    </div>
    <br />
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">From</th>
          <th scope="col">Message</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="email in search.length>0 ? filtered : emails " :key="email.id">
          <th scope="row">{{ email.id }}</th>
          <td>{{ email.created_at }}</td>
          <td>
            <a href="#">{{ email.name }},</a>
            <br />
            <a :href="`mailto:${email.email}`">{{ email.email }}</a>
          </td>
          <td>
            <span v-html="email.message"></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      emails: [],
      email: {},
      search: "",
      filtered: []
    };
  },
  watch: {
    search() {
      if (this.search.length > 0) {
        this.filtered = this.emails.filter(email => {
          return email.name.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    }
  },
  created() {
    fetch(`${this.hostname}/emails`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.emails = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 1.25rem;

  a {
    text-decoration: none;
  }
  .actions {
    display: flex;
  }
  form {
    button {
      border: 0;
      background: none;
    }
  }
  .fa-trash-alt {
    color: #dc3545;
  }
  .modal-content,
  .input-group-prepend {
    border-radius: 0;
  }
}
</style>
