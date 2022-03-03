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
      country: ''
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
    allOk() {
      if(this.email.length === 0 || this.password.length === 0 || this.repPassword.length === 0) {
        return
      }
      if (!this.wrongEmail && !this.wrongPass && !this.repPass) {
        this.canSubmit = true
      } else {
        this.canSubmit = false
      }
    }
  },
  template: `
  <section class="access">
    <input v-model.trim="email" :class="{'wrong': wrongEmail}" type="email" placeholder="Insert email" @keyup="checkEmail()">
    <br>
    <input v-model="password" :class="{'wrong': wrongPass}" type="password" placeholder="Insert password" @keyup="checkPassword()">
    <br>
    <input v-model="repPassword" :class="{'wrong': repPass}" type="password" placeholder="Repeat password" @keyup="repeatPassword()">
    <br>
    <br>
    <select v-model="country">
      <option v-for="(country, idx) in countries" :key="idx" :value="country.name"> {{ country.name }} </option>
    </select>
    <button @click="requestAccess(canSubmit)" :class="{'isActive': canSubmit}">Sign Up</button>
  </section>`
})

const app = new Vue({
  el: '#app',
})