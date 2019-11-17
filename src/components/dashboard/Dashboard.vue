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
          <h4>1000</h4>Blogs
        </span>
      </div>
      <div class="panel">
        <i class="fas fa-newspaper"></i>
        <span>
          <h4>500</h4>News
        </span>
      </div>
      <div class="panel">
        <i class="fas fa-photo-video"></i>
        <span>
          <h4>50000</h4>Pictures
        </span>
      </div>
      <!-- <div class="panel">
        <i class="fas fa-envelope"></i>
        <span>
          <h4>500</h4>Emails
        </span>
      </div>-->
      <div class="panel">
        <i class="fas fa-briefcase"></i>
        <span>
          <h4>10</h4>Vacancy
        </span>
      </div>
      <div class="panel">
        <i class="fas fa-image"></i>
        <span>
          <h4>5</h4>Carousel
        </span>
      </div>
      <div class="panel">
        <i class="fas fa-camera-retro"></i>
        <span>
          <h4>50</h4>Covers
        </span>
      </div>
      <div class="panel">
        <i class="fas fa-tasks"></i>
        <span>
          <h4>500</h4>Projects
        </span>
      </div>
    </div>
    <br />
    <div class="row items">
      <div class="col-sm-6 col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Latest Blog</h5>
            <br />
            <img
              src="https://specials-images.forbesimg.com/imageserve/5c0077cc31358e5b43383ffc/960x0.jpg?fit=scale"
              class="img-fluid"
            />
            <br />
            <br />
            <h5>
              Pilot
              <span>-2019/11/14</span>
            </h5>
            <p class="card-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Doloribus, laboriosam fuga non magni corrupti culpa ex quod
              beatae quas. Deleniti natus voluptatibus, molestiae culpa
              vel excepturi minima accusantium labore atque. Lorem ipsum,
              dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Latest News</h5>
            <br />
            <img
              src="https://www.hays.com.au/cs/groups/hays_common/@nz/@content/documents/webassets/hays_1982857.jpg"
              class="img-fluid"
            />
            <br />
            <br />
            <h5>
              Pilot
              <span>-2019/11/14</span>
            </h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to
              additional content. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis voluptate voluptatibus dolore
              at distinctio qui est omnis placeat non ullam esse neque
              minus obcaecati quisquam, sequi assumenda odio molestias
              consectetur! Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Distinctio, quae mollitia? Exercitationem,
              delectus. Eum, est. Animi quae, ratione non tempore rem
              voluptatem aspernatur similique ut voluptate? Possimus
              incidunt eaque rem.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
    .col-sm-6 {
      padding-left: 0;
      display: flex;
    }
    .card {
      border-radius: 0;
    }
  }
}
</style>