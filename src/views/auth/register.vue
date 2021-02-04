<template>
  <div class="margin">
    <form autocomplete="off" style="border-radius:28px;" class="shadow-lg p-5 mb-5 bg-white" @submit.prevent="registerData">
     <router-link to="/"><i class="goBack fas fa-chevron-left fa-lg"></i></router-link> <h3 class="text-center text-register">Register</h3>

      <div class="mb-3 mt-4">
        <span style="font-size:14px;">Let’s create your account!</span><br>
        <label for="input-name" class="form-label label-name">Name</label>
        <Input v-model="name" id="input-name" type="text" placeholder="Input your name" @keyup="checkName"/>
        <span style="color:red; font-size:14px;">{{nameError}}</span>
        <!-- <input v-model="name" type="text" id="input-name" class="form-control input-name" placeholder="Input your name" required> -->
      </div>

      <div class="mb-3">
          <label for="input-email" class="form-label label">Email</label>
          <Input v-model="email" id="input-email" type="email" placeholder="Input your email"/>
          <span style="color:red; font-size:14px;">{{emailError}}</span>
      </div>

      <div class="mb-3 form-password">
        <label for="input-password" class="form-label label">Password</label>
        <Input v-model="password" id="input-password" :type="type" placeholder="Input your password" @keyup="checkPassword"/>
        <i @click="showPW" :class="icon"></i>
      <span style="color:red; font-size:14px;">{{passwordError}}</span>
      </div>

      <div class="text-center mt-5">
        <button type="submit" class="btn btn-register">Register</button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Input from '../../components/auth/base/Input'
export default {
  name: 'Register',
  components: {
    Input
  },
  data () {
    return {
      nameError: '',
      emailError: '',
      passwordError: '',
      type: 'password',
      icon: 'far fa-eye',
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['register']),
    checkName (e) {
      const inputName = e.target.value
      if (inputName.length === 0) {
        this.nameError = 'name can not be empty'
      } else if (inputName.length <= 4) {
        this.nameError = 'at least 5 characters'
      } else if (inputName.length >= 5) {
        this.nameError = ''
      }
    },
    checkPassword (e) {
      const inputPass = e.target.value
      if (inputPass.length === 0) {
        this.passwordError = 'password can not be empty'
      } else if (inputPass.length <= 7) {
        this.passwordError = 'at least 8 characters'
      } else if (inputPass.length >= 8) {
        this.passwordError = ''
      }
    },
    registerData () {
      if (this.name.length === 0) {
        return this.$swal.fire({
          title: 'Warning!',
          text: 'name can not be empty',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
      } else if (this.name.length <= 4) {
        return this.$swal.fire({
          title: 'Warning!',
          text: 'name minimum 5 character',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
      } else if (this.password.length === 0) {
        return this.$swal.fire({
          title: 'Warning!',
          text: 'password can not be empty',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
      } else if (this.password.length <= 7) {
        return this.$swal.fire({
          title: 'Warning!',
          text: 'password minimum 8 character',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
      }

      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.register(payload)
        .then((res) => {
          if (res.status === 'warning') {
            this.$swal.fire({
              title: 'Warning',
              text: `${res.message}`,
              icon: 'warning',
              confirmButtonText: 'Ok'
            })
          } else {
            this.$swal.fire({
              title: 'success',
              text: `${res.message}`,
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            this.$router.push({ path: '/' })
          }
        })
        .catch((err) => {
          console.log(err)
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
.text-register, input , .label, .label-email{
  font-family: 'Rubik', sans-serif;
}
.margin {
  margin: 6% 34% 0 34%;
}
.goBack{
  position:absolute;
  margin: 5px;
  color: #7E98DF;
}
.text-register {
  color: #7E98DF;
  font-size:22px;
}
.label-name{
  margin-top:35px;
}
.label, .label-name{
  color: #848484;
  font-size: 14px;
}
.form-password {
  position: relative;
}
 button:focus{
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

  .btn-register , .btn-register:hover{
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
