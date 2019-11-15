<template>
  <div class="content">
    <div class="row">
      <h4>Carousel&nbsp;&nbsp;<span>Control Panel</span></h4>
      <router-link to="/carousel/new" class="btn btn-primary ml-auto"
        >New</router-link
      >
    </div>
    <br />
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Title</th>
          <th scope="col">Preview</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>2019-11-01</td>
          <td><a href="#">Lorem ipsum dolor sit amet consectetur</a></td>
          <td>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtU0Broqwsd5fEZ51hrnDY06eCUF-Wm_TQoYzowGadTn3NdL4m"
              class="img-fluid"
              width="200px"
            />
          </td>

          <td class="actions">
            <a href="#"><i class="far fa-edit"></i></a>
            <form>
              <button type="submit">
                <a href="#"><i class="fas fa-trash-alt"></i></a>
              </button>
            </form>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>2019-11-02</td>
          <td><a href="#">Lorem ipsum dolor sit amet consectetur</a></td>
          <td>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtU0Broqwsd5fEZ51hrnDY06eCUF-Wm_TQoYzowGadTn3NdL4m"
              class="img-fluid"
              width="200px"
            />
          </td>
          <td class="actions">
            <a href="#"><i class="far fa-edit"></i></a>
            <form>
              <button type="submit">
                <a href="#"><i class="fas fa-trash-alt"></i></a>
              </button>
            </form>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>2019-11-03</td>
          <td><a href="#">Lorem ipsum dolor sit amet consectetur</a></td>
          <td>
            <img
              src="https://neilpatel.com/wp-content/uploads/2018/10/blog.jpg"
              class="img-fluid"
              width="200px"
            />
          </td>
          <td class="actions">
            <a href="#"><i class="far fa-edit"></i></a>
            <form>
              <button type="submit">
                <a href="#"><i class="fas fa-trash-alt"></i></a>
              </button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

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
}
</style>
