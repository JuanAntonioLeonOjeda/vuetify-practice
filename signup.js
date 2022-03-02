Vue.component('form-template', {
  data() {
    return {
      email: '',
      password: '',
      wrongEmail: false,
      wrongPass: false,
      canSubmit: false
    }
  },
  methods: {
    checkEmail(email) {
      if (!(/^(\w+)@(\w+)\.(\w\w+)$/).test(email) && email.length !== 0) {
        this.wrongEmail = true
      } else {
        this.wrongEmail = false
      }
      this.allOk()
    },
    checkPassword(password) {
      if (password.length < 5 && password.length !== 0) {
        this.wrongPass = true
      } else {
        this.wrongPass = false
      }
      this.allOk()
    },
    requestAccess(canSubmit) {
      canSubmit ? alert('You are IN!') : alert('Access Denied')
    },
    allOk() {
      if(this.email.length === 0 || this.password.length === 0) {
        return
      }
      if (!this.wrongEmail && !this.wrongPass) {
        this.canSubmit = true
      }
    }
  },
  template: `
  <section class="access">
    <input v-model.trim="email" :class="{'wrong': wrongEmail}" type="email" placeholder="Insert email" @keyup="checkEmail(email)">
    <br>
    <input v-model="password" :class="{'wrong': wrongPass}" type="password" placeholder="Insert password" @keyup="checkPassword(password)">
    <br>
    <button @click="requestAccess(canSubmit)" :class="{'isActive': canSubmit}">Sign Up</button>
  </section>`
})

const app = new Vue({
  el: '#app',
})

