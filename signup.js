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
      age < 18 ? this.under18 = true : this.under18 = false
      this.allOk()
    },
    allOk() {
      if(this.email.length === 0 || this.password.length === 0 || this.repPassword.length === 0 || this.country === '' || this.gender === '' || this.birth === '') {
        return
      }
      if (!this.wrongEmail && !this.wrongPass && !this.repPass && !this.under18) {
        this.canSubmit = true
      } else {
        this.canSubmit = false
      }
    },
  },
  template: `
  <section class="access">
    <input v-model.trim="email" :class="{'wrong': wrongEmail}" type="email" placeholder="Insert email" @keyup="checkEmail()">
    <br>

    <input v-model="password" :class="{'wrong': wrongPass}" type="password" placeholder="Insert password" @keyup="checkPassword()">
    <br>

    <input v-model="repPassword" :class="{'wrong': repPass}" type="password" placeholder="Repeat password" @keyup="repeatPassword()">
    <br>

    <select v-model="country" @click="allOk()">
      <option v-for="(country, idx) in countries" :key="idx" :value="country.name"> {{ country.name }} </option>
    </select>

    <p>Choose a gender:</p>
    <input type="radio" v-model="gender" id="female" value="Female" @click="allOk()">
    <label for="female">Female</label>
    <input type="radio" v-model="gender" id="male" value="Male" @click="allOk()">
    <label for="male">Male</label>
    <input type="radio" v-model="gender" id="undisclosed" value="Undisclosed" @click="allOk()">
    <label for="undisclosed">Undisclosed</label>
    
    <input type="date" v-model.date="birth" @keyup="checkAge()" @click="checkAge()">

    <button @click="requestAccess(canSubmit)" :class="{'isActive': canSubmit}">Sign Up</button>
  </section>`
})

const app = new Vue({
  el: '#app',
})