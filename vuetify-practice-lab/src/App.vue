<template>
  <v-app>
    <v-app-bar
      app
      color="rgb(123, 109, 255)"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-card id="access" class="mt-15" width="500px">
        <v-card-title class="card-title">Signup</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
        <v-form>
          <v-text-field outlined label="Insert Email" type="email" prepend-icon="mdi-at" v-model.trim="email" :class="{'wrong': wrongEmail}" :rules="[rules.required, rules.email]" hide-details="auto">
          </v-text-field>
          <span class="wrong" v-if="wrongEmail">Invalid email format</span>
          <v-text-field outlined label="Insert Password" class="mt-5"
          :type="passVisible ? 'text' : 'password'" prepend-icon="mdi-lock"
          :append-icon="passVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
           @click:append="passVisible = !passVisible" :rules="[rules.required]" hide-details="auto"></v-text-field>
        </v-form>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { countries } from '@/countries.js'

export default {
  name: 'App',

  data: () => ({
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
    passVisible: false,
    rules: {
      required: value => !!value || 'Required',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    }
  }),
  methods: {
    checkEmail () {
      if (!(/^(\w+)@(\w+)\.(\w\w+)$/).test(this.email) && this.email.length !== 0) {
        this.wrongEmail = true
      } else {
        this.wrongEmail = false
      }
      this.allOk()
    },
    checkPassword () {
      if (this.password.length < 5 && this.password.length !== 0) {
        this.wrongPass = true
        this.secure = 'weak'
      } else if ((/^(?=.*\d+).{5,10}$/).test(this.password) && this.password.length !== 0) {
        this.wrongPass = false
        this.secure = 'medium'
      } else if ((/^(?=.*\W+)(?=.*\d+).{10,}$/).test(this.password) && this.password.length !== 0) {
        this.wrongPass = false
        this.secure = 'hard'
      } else {
        this.wrongPass = false
      }
      this.allOk()
    },
    repeatPassword () {
      this.repPassword !== this.password ? this.repPass = true : this.repPass = false
      this.allOk()
    },
    requestAccess () {
      this.canSubmit ? alert('You are IN!') : alert('Access Denied')
    },
    checkAge () {
      const today = new Date()
      const birthDate = new Date(this.birth)
      let age = today.getFullYear() - birthDate.getFullYear()
      const month = today.getMonth() - birthDate.getMonth()
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      age < 18 && this.birth !== '' ? this.under18 = true : this.under18 = false
      this.allOk()
    },
    agreement () {
      this.agree = !this.agree
      setTimeout(() => {
        this.allOk()
      }, 200)
    },
    changeGender () {
      setTimeout(() => {
        this.allOk()
      }, 200)
    },
    acceptMail () {
      this.mailList = !this.mailList
    },
    changeToLogin () {
      this.state = 'login'
    },
    changeToSignup () {
      this.state = 'signup'
    },
    allOk () {
      if (this.email.length === 0 || this.password.length === 0 || this.repPassword.length === 0 || this.country === '' || this.gender === '' || this.birth === '') {
        this.canSubmit = false
        return
      }
      if (!this.wrongEmail && !this.wrongPass && !this.repPass && !this.under18 && this.agree) {
        this.canSubmit = true
      } else {
        this.canSubmit = false
      }
    }
  }
}
</script>

<style scoped>
#access {
  margin: 0 auto;
  color: white;
}
.card-title {
  background-color: rgb(123, 109, 255);
}
</style>
