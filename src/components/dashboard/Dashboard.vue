<template>
  <div class="content">
    <h4>
      Dashboard&nbsp;&nbsp;
      <span>Control Panel</span>
    </h4>
    <br />
    <div class="stats">
       <div class="panel">
        <i class="fas fa-blog"></i>
        <span>
          <h4>{{posts}}</h4>Blogs
        </span>
      </div>
      <div class="panel">
        <i class="far fa-envelope"></i>
        <span>
          <h4>{{emails}}</h4>Emails
        </span>
      </div>
      <div class="panel">
        <i class="fas fa-newspaper"></i>
        <span>
          <h4>{{feeds}}</h4>News
        </span>
      </div>
      <div class="panel">
        <i class="fas fa-photo-video"></i>
        <span>
          <h4>{{photos}}</h4>Pictures
        </span>
      </div>
      <div class="panel">
        <i class="fas fa-user-tie"></i>
        <span>
          <h4>{{jobs}}</h4>Jobs
        </span>
      </div>
       <div class="panel">
        <i class="fas fa-briefcase"></i>
        <span>
          <h4>{{vacancies}}</h4>Vacancy
        </span>
      </div>
      <div class="panel">
        <i class="fas fa-image"></i>
        <span>
          <h4>{{carousels}}</h4>Carousel
        </span>
      </div>
      <div class="panel">
        <i class="fas fa-camera-retro"></i>
        <span>
          <h4>{{covers}}</h4>Covers
        </span>
      </div>
      <div class="panel">
        <i class="far fa-comment-dots"></i>
        <span>
          <h4>{{feedbacks}}</h4>Feedbacks
        </span>
      </div>
       <div class="panel">
        <i class="fas fa-tasks"></i>
        <span>
          <h4>{{projects}}</h4>Projects
        </span>
      </div>
      <div class="panel">
        <i class="fas fa-download"></i>
        <span>
          <h4>{{shares}}</h4>Files
        </span>
      </div>
    </div>
    <br />
    <hr />
    <br />

    <div class="row items">
      <div class="col-12">
        <h3>Latest Blog Posts</h3>
        <br />
        <div class="list-group">
          <a
            href="#"
            class="list-group-item list-group-item-action"
            v-for="post in latest_posts"
            :key="post.id"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{post.title}}</h5>
              <small class="text-muted">{{post.created_at}}</small>
            </div>
            <span class="subcontent" v-html="`${post.content.substr(0,250)}`"></span>
          </a>
        </div>
      </div>
    </div>

    <br />
    <br />
    <br />

    <div class="row items">
      <div class="col-12">
        <h3>Latest News Feeds</h3>
        <br />
        <div class="list-group">
          <a
            href="#"
            class="list-group-item list-group-item-action"
            v-for="feed in latest_feeds"
            :key="feed.id"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{feed.title}}</h5>
              <small class="text-muted">{{feed.created_at}}</small>
            </div>
            <span class="subcontent" v-html="`${feed.content.substr(0,250)}`"></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: 0,
      feeds: 0,
      jobs: 0,
      feedbacks: 0,
      vacancies: 0,
      photos: 0,
      covers: 0,
      carousels: 0,
      projects: 0,
      shares: 0,
      emails: 0,

      latest_posts: [],
      latest_feeds: []
    };
  },

  created() {
    fetch(`${this.hostname}/dashboard`)
      .then(res => res.json())
      .then(data => {
        this.posts = data.posts;
        this.feeds = data.feeds;
        this.feedbacks = data.feedbacks;
        this.jobs = data.jobs;
        this.vacancies = data.vacancies;
        this.photos = data.photos;
        this.covers = data.covers;
        this.carousels = data.carousels;
        this.projects = data.projects;
        this.shares = data.shares;
        this.emails = data.emails;
      });

    fetch(`${this.hostname}/posts/page/1`)
      .then(res => res.json())
      .then(data => {
        this.latest_posts = data.data;
      });

    fetch(`${this.hostname}/feeds/page/1`)
      .then(res => res.json())
      .then(data => {
        this.latest_feeds = data.data;
      });
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 1.25rem;

  .stats {
    display: flex;
    flex-wrap: wrap;
    color: #fff;
    .panel:nth-child(1),
    .panel:nth-child(4),
    .panel:nth-child(7) {
      background-color: #4b7af2;
    }

    .panel:nth-child(2),
    .panel:nth-child(5),
    .panel:nth-child(8) {
      background-color: #f63951;
    }
    .panel {
      margin-left: 0.2rem;
      margin-right: 0.2rem;
      margin-bottom: 0.4rem;
      background-color: #9b4fd7;
      padding: 1rem;
      border-radius: 0;
      display: flex;
      width: 160px;
      h4 {
        margin: 0;
      }
      i {
        padding-top: 4px;
        flex: 1;
        font-size: 2rem;
      }
      span {
        text-align: right;
        flex: 1;
      }
    }
  }

  .items {
    .col-12 {
      padding: 0;
    }
    .list-group-item {
      border-radius: 0 !important;
    }
  }
}
</style>