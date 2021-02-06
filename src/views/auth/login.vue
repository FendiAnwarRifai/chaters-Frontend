<template>
  <div class="margin">
    <form autocomplete="off" style="border-radius:28px;" class="shadow-lg p-5 mb-5 bg-white" @submit.prevent="LoginData">
      <h3 class="text-center text-login">Login</h3>

      <div class="mb-3 mt-4">
        <span style="font-size:14px;">Hi, Welcome back!</span><br>
        <label for="input-email" class="form-label label-email">Email</label>
        <Input v-model="email" id="input-email" type="email" placeholder="Input your email" @keyup="checkEmail" />
        <span style="color:red; font-size:14px;">{{emailError}}</span>
      </div>

      <div class="mb-3 form-password">
        <label for="input-password" class="form-label label">Password</label>
        <Input v-model="password" id="input-password" :type="type" placeholder="Input your password" @keyup="checkPassword" />
        <i @click="showPW" :class="icon"></i>
         <span style="color:red; font-size:14px;">{{passwordError}}</span>
      </div>

      <div class="mb-3 forgot">
        <router-link to="/" class="link">Forgot password?</router-link>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-login">Login</button>
        <div class="signup">
          Don’t have an account? <router-link to="Register" class="link">Sign Up?</router-link>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Input from '../../components/auth/base/Input'
export default {
  name: 'Login',
  components: {
    Input
  },
  data () {
    return {
      type: 'password',
      icon: 'far fa-eye',
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    checkEmail (e) {
      const inputName = e.target.value
      if (inputName.length === 0) {
        this.emailError = 'email can not be empty'
      } else {
        this.emailError = ''
      }
    },
    checkPassword (e) {
      const inputPass = e.target.value
      if (inputPass.length === 0) {
        this.passwordError = 'password can not be empty'
      } else {
        this.passwordError = ''
      }
    },
    LoginData () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.login(payload)
        .then((res) => {
          this.$swal.fire({
            title: 'Success',
            text: 'Login successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.$router.push({ path: '/main' })
        })
        .catch((err) => {
          this.$swal.fire({
            title: 'Warning',
            text: `${err.response.data.message}`,
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        })
    },
    showPW () {
      if (this.type === 'password') {
        this.type = 'text'
        this.icon = 'far fa-eye-slash'
      } else {
        this.type = 'password'
        this.icon = 'far fa-eye'
      }
    }
  }

}
</script>

<style scoped>
.text-login, input , .label, .label-email{
  font-family: 'Rubik', sans-serif;
}
.margin {
  margin: 6% 34% 0 34%;
}
.text-login {
  color: #7E98DF;
  font-size:22px;
}
.label-email{
  margin-top:35px;
}
.label, .label-email{
  color: #848484;
  font-size: 14px;
}
.form-password {
  position: relative;
}
.input-password, .input-email{
  font-size: 16px;
  outline:0;
  border-width: 0 0 2px;
  border-color: rgba(169, 169, 169, 0.8);
  border-radius: 0;
}
.input-password:focus, .input-email:focus, button:focus{
  box-shadow: inset 0 -1px 0 #ddd;
}
.fa-eye, .fa-eye-slash{
  position: absolute;
  right: 10px;
  top: 40px;
  cursor: pointer;
}
::placeholder {
    color: rgba(169, 169, 169, 0.8) !important;
    font-size: 14px;
  }
  .forgot {
    text-align: right;
  }
  .link {
    color: #7E98DF;
    font-size: 14px;
  }
  .signup{
    margin-top:20px;
    color: #313131;
    font-size: 14px;
  }
  .btn-login , .btn-login:hover{
    background: #7E98DF;
    font-size: 14px;
    color: white;
    width: 90%;
    padding: 12px;
    font-weight: bold;
    border-radius:25px;
    border: none;
  }
  @media only screen and (max-width: 1300px) {
  .margin {
  margin: 6% 28% 0 28%;
}
}
  @media only screen and (max-width: 880px) {
  .margin {
  margin: 6% 18% 0 18%;
}
}
  @media only screen and (max-width: 600px) {
  .margin {
  margin: 6% 5% 0 5%;
}
}
</style>
