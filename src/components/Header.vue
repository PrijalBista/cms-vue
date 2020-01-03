<template>
  <nav class="navbar navbar-dark">
    <span class="navbar-brand mb-0 mr-auto">
      <i class="fas fa-bars"></i>
    </span>
    <!-- <span class="navbar-brand mb-0 ml-auto">
      <i class="fas fa-envelope"></i>
      <sup>
        <span class="badge badge-danger">10</span>
      </sup>
    </span>-->
    <img
      :src="`${hostname}/dist/avatar.png`"
      alt="avatar"
      class="dropdown-toggle"
      width="35px"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    />
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <!-- <router-link to="/accounts" class="dropdown-item">
        <i class="fas fa-cog"></i>
        <span>Settings</span>
      </router-link>
      <div class="dropdown-divider"></div>-->
      <a class="dropdown-item" href="#" @click="logout">
        <i class="fas fa-power-off"></i>
        <span>Logout</span>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      fetch(`${this.hostname}/pages/logout`, {
        method: "POST"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.status == 200) {
            window.location.href = this.hostname;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #4b7af2;
}

.badge {
  border-radius: 100px;
  padding: 5px;
  font-size: 0.65rem;
}

.dropdown-menu {
  position: absolute;
  margin-left: auto;
  margin-right: 4px;
  width: fit-content;
  border-radius: 0;
  right: 0;
  span {
    margin-left: 8px;
  }
  .dropdown-item {
    display: flex;
  }
  a:active {
    background: #f8f9fa;
    color: #000;
  }
}
</style>
