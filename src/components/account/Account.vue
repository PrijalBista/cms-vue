<template>
  <div class="content">
    <div class="row">
      <h4>Account Settings&nbsp;&nbsp;<span>Control Panel</span></h4>
    </div>
    <br />
    <form>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control is-invalid"
          id="password"
          placeholder="Password"
        />
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm-Password</label>
        <input
          type="password"
          class="form-control"
          id="confirm-password"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn btn-primary" disabled>
        Change Password
      </button>
    </form>
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
    }
  }
}
</style>
