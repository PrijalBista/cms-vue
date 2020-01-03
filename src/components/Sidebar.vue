<template>
  <div class="menu">
    <h5>
      <img :src="`${hostname}/dist/theGimmickBox.png`" width="25px" />
      &nbsp;
      <span>Gimmick</span>
      Admin
    </h5>

    <ul class="list-group list-group-flush">
      <router-link to="/" active-class="active" exact>
        <li class="list-group-item">
          <i class="fas fa-tachometer-alt"></i> &nbsp;&nbsp;Dashboard
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>

      <router-link to="/emails" active-class="active">
        <li class="list-group-item">
          <i class="far fa-envelope"></i>&nbsp;&nbsp;Emails
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>

      <!-- <router-link to="/blogs" active-class="active">
        <li class="list-group-item">
          <i class="fas fa-blog"></i>&nbsp;&nbsp;Blog Posts
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>-->

      <router-link to="/feeds" active-class="active">
        <li class="list-group-item">
          <i class="far fa-newspaper"></i>&nbsp;&nbsp;News Feed
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>
      <router-link to="/gallery" active-class="active">
        <li class="list-group-item">
          <i class="fas fa-photo-video"></i>&nbsp;&nbsp; Gallery
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>
      <router-link to="/jobs" active-class="active">
        <li class="list-group-item">
          <i class="fas fa-user-tie"></i>&nbsp;&nbsp;Jobs
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>
      <!-- <router-link to="/vacancies" active-class="active">
        <li class="list-group-item">
          <i class="fas fa-briefcase"></i>&nbsp;&nbsp;Vacancy
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>-->
      <router-link to="/feedbacks" active-class="active">
        <li class="list-group-item">
          <i class="far fa-comment-dots"></i>&nbsp;&nbsp;Feedbacks
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>
      <router-link to="/carousel" active-class="active">
        <li class="list-group-item">
          <i class="far fa-image"></i>&nbsp;&nbsp;Carousel
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>
      <router-link to="/covers" active-class="active">
        <li class="list-group-item">
          <i class="fas fa-camera-retro"></i>&nbsp;&nbsp;Covers
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>
      <router-link to="/shares" active-class="active">
        <li class="list-group-item">
          <i class="fas fa-cloud"></i>&nbsp;&nbsp;Shares
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>
      <!-- <router-link to="/projects" active-class="active">
        <li class="list-group-item">
          <i class="fas fa-tasks"></i>&nbsp;&nbsp;Projects
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>-->
      <!-- <router-link to="/accounts" active-class="active">
        <li class="list-group-item">
          <i class="fas fa-user-cog"></i>&nbsp;&nbsp;Account
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>-->
    </ul>
  </div>
</template>

<style scoped lang="scss">
.menu {
  background-color: #242933;
  position: relative;
  color: #fff;
  padding: 1rem;
  min-height: 100vh;
  min-width: 220px;
  h5 {
    text-align: center;
    padding-bottom: 1rem;
    span {
      font-size: 1.2rem;
      font-weight: 700;
    }
  }
  ul {
    a {
      text-decoration: none;
    }
    .active {
      li {
        color: #fff !important;
      }
    }
    li {
      font-size: 0.85rem;
      i {
        font-size: 1.15rem;
      }
      padding: 1rem 4px;
      background-color: #242933;
      color: #687384;
      display: flex;
      &:hover {
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
