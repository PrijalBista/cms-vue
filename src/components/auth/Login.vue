<template>
	<div class="content">
		<div id="login">
		    <form @submit.prevent="login()">
		        <div id="logo">
		            <img :src="`${$hostname}/dist/theGimmickBox.png`" width="128px" />
		        </div>
		        <br>
		        <div class="form-group">
		            <input type="email" name="email"
		            v-model="email" class="form-control"
		            :class=" errors.get('email') ? 'is-invalid' : '' " id="email" placeholder="Enter email">
		            <div class="invalid-feedback">{{ errors.get('email') }}</div>
		        </div>
		        <div class="form-group">
		            <input type="password" name="password"
		            v-model="password" class="form-control"
		            :class=" errors.get('password') ? 'is-invalid' : '' " id="password" placeholder="Password">
		            <div class="invalid-feedback">{{ errors.get('password') }}</div>
		        </div>

		        <div class="text-danger text-center my-2" style="font-size: 80%;">{{ errors.get('auth_fail') }}</div>
		        <button type="submit" class="btn btn-primary btn-block">Login</button>
		    </form>
		</div>
	</div>
</template>
<style scoped="true" >
	#login {
	  height: 100vh;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  background-color: #e3e3e3;
	}
	#login form {
	  margin-top: -5rem;
	}
	#login .form-control {
	  border-radius: 0;
	}
	#login #logo {
	  text-align: center;
	}
	#login button {
	  border-radius: 0 !important;
	}
</style>
<script>
	export default {
		
		created() {
			const authUser = JSON.parse(localStorage.getItem('authUser'));
			if(authUser && authUser.accessToken) this.$router.push('/');
		},

		data() {
			return {
				email: '',
				password: '',
				errors: new this.$ErrorsClass(),
			}
		},

		methods: {
			login() {
				let formData = new FormData();
				formData.append('email', this.email);
				formData.append('password', this.password);

				this.$axios.post(`${this.hostname}/users/login`, formData)
					.then(res => {
						if(res.status === 200) {
							localStorage.setItem('authUser', JSON.stringify(res.data));
							// set the bearer token in axios globally 
							// axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
							this.$axios.defaults.headers.common = {'Accept': 'application/json', 'Authorization': `Bearer ${res.data.accessToken}`};
							this.$router.replace('/');
						}
					})
					.catch(err => {
						this.errors.record(err.response.data);
					});
			}
		}
	}
</script>