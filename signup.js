Vue.component('input-email', {
  data() {
    return {
      email: '',
      isFalse: false
    }
  },
  methods: {
    checkEmail(email) {
      if (!(/^(\w+)@(\w+)\.(\w\w+)$/).test(email)&& email.length !== 0) {
        this.isFalse = true
      } else {
        this.isFalse = false
      }
    }
  },
  template: `<input v-model="email" :class="{'wrong': isFalse}" type="email" placeholder="Insert email" @keydown="checkEmail(email)">`
})

Vue.component('input-password', {
  data() {
    return {
      password: '',
      isFalse: false
    }
  },
  methods: {
    checkPassword(password) {
      if (!(/^.{4,}/).test(password) && password.length !== 0) {
        this.isFalse = true
      } else {
        this.isFalse = false
      }
    }
  },
  template: `<input v-model="password" :class="{'wrong': isFalse}" type="password" placeholder="Insert password" @keydown="checkPassword(password)">`
})

Vue.component('submit-button', {
  data(){
    return {
      canSubmit: false
    }
  },
  methods: {
    requestAccess(canAccess) {
      if(canAccess){console.alert('You are IN')}
    }
  },
  template: `<button @click="requestAccess(canAccess)" :class="{'isActive': canSubmit}">Sign Up</button>`
})

const app = new Vue({
  el: '#access',
  data: {
    canAccess: false
  },
  computed: {
    checkAccess() {

    }
  }
})

