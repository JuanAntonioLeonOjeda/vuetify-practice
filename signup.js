import {countries} from "./countries.js"

Vue.component('form-template', {
  data() {
    return {
      email: '',
      password: '',
      repPassword: '',
      wrongEmail: false,
      wrongPass: false,
      repPass: false,
      canSubmit: false,
      countries: countries,
      country: '',
      gender: '',
      birth: '',
      under18: false,
      agree: false,
      mailList: false,
      state: 'signup',
      secure: '',
    }
  },
  methods: {
    checkEmail() {
      if (!(/^(\w+)@(\w+)\.(\w\w+)$/).test(this.email) && this.email.length !== 0) {
        this.wrongEmail = true
      } else {
        this.wrongEmail = false
      }
      this.allOk()
    },
    checkPassword() {
      if (this.password.length < 5 && this.password.length !== 0) {
        this.wrongPass = true
        this.secure = 'weak'
      } else if ((/^(?=.*\d+).{5,10}$/).test(this.password) && this.password.length !== 0) {
        this.wrongPass = false
        this.secure = 'medium'
      } else if ((/^(?=.*\W+)(?=.*\d+).{10,}$/).test(this.password) && this.password.length  !== 0) {
        this.wrongPass = false
        this.secure = 'hard'
      } else {
        this.wrongPass = false
      }
      this.allOk()
    },
    repeatPassword() {
      this.repPassword !== this.password ?  this.repPass = true : this.repPass = false
      this.allOk()
    },
    requestAccess() {
      this.canSubmit ? alert('You are IN!') : alert('Access Denied')
    },
    checkAge() {
      let today = new Date()
      let birthDate = new Date(this.birth)
      let age = today.getFullYear() - birthDate.getFullYear()
      let month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }   
      age < 18 && this.birth !== '' ? this.under18 = true : this.under18 = false
      this.allOk()
    },
    agreement() {
      !this.agree
      let timerId = setTimeout(() => {
        this.allOk()},200)
    },
    changeGender(){
      let timerId = setTimeout(() => {
        this.allOk()},200)
    },
    acceptMail() {
      !this.mailList
    },
    changeToLogin(){
      this.state = 'login'
    },
    changeToSignup(){
      this.state= 'signup'
    },
    allOk() {
      if(this.email.length === 0 || this.password.length === 0 || this.repPassword.length === 0 || this.country === '' || this.gender === '' || this.birth === '') {
        this.canSubmit = false
        return
      }
      if (!this.wrongEmail && !this.wrongPass && !this.repPass && !this.under18 && this.agree) {
        this.canSubmit = true
      } else {
        this.canSubmit = false
      }
    },
  },
  template: `
  <section class="access">
    // <input v-model.trim="email" :class="{'wrong': wrongEmail}" type="email" placeholder="Insert email" @keyup="checkEmail()">
    <br>
    <span class="wrong" v-if="wrongEmail">Invalid email format</span>
    <input v-model="password" :class="{'wrong': wrongPass}" type="password" placeholder="Insert password" @keyup="checkPassword()">
    <br>
    <div class='signup' v-if="state === 'signup'">
      <span v-if="secure === 'weak'" class='wrong'> WEAK </span>
      <span v-else-if="secure === 'medium'" class='medium'> MEDIUM </span>
      <span v-else-if="secure === 'hard'" class='hard'> HARD </span>
      <input v-model="repPassword" :class="{'wrong': repPass}" type="password" placeholder="Repeat password" @keyup="repeatPassword()">
      <br>
      <span class="wrong" v-if="repPass">Passwords don't match!</span>
      <select v-model="country" @click="allOk()">
        <option v-for="(country, idx) in countries" :key="idx" :value="country.name"> {{ country.name }} </option>
      </select>

      <div class="gender-select">
        <p>Choose a gender:</p>
        <input type="radio" v-model="gender" id="female" value="Female" @click="changeGender()">
        <label for="female">Female</label>
        <input type="radio" v-model="gender" id="male" value="Male" @click="changeGender()">
        <label for="male">Male</label>
        <input type="radio" v-model="gender" id="undisclosed" value="Undisclosed" @click="changeGender()">
        <label for="undisclosed">Undisclosed</label>
      </div>

      <div class="birth-date">
        Birthdate:
        <input type="date" :class="{'underAge': under18}" v-model.date="birth" @keyup="checkAge()" @click="checkAge()">
        <br>
        <span class="wrong" v-if="under18">User must be at least 18 years old!</span>
      </div>

      <div class="terms-conditions">
        <input type="checkbox" v-model="agree" @click="agreement()"><span>Accept the Terms and Conditions</span>
        <br>
        <input v-model="mailList" type="checkbox" @click="acceptMail()"><span>Join Mailing List</span>
      </div>

      <button @click="requestAccess(canSubmit)" :class="{'isActive': canSubmit}">Sign Up</button>

      <span>Already a member? <button @click="changeToLogin()">Login</button></span>
    </div>

    <div class='login' v-if="state === 'login'">
      <span>Don't have an account? <button @click="changeToSignup()">Signup</button></span>
    </div>
  </section>`
})

const app = new Vue({
  el: '#app',
})