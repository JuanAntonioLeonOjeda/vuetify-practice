<template>
  <v-app>
    <v-app-bar class="nav-bar" app color="rgb(123, 109, 255)" dark>
      <div id="header" class="d-flex align-center">
        <v-img
          alt="Reboot Logo"
          src="@/assets/reboot.png"
          transition="scale-transition"
          width="100"
        />
        <span style='font-size: 20pt;'>Reboot Practice - Vuetify</span>
      </div>
    </v-app-bar>

    <v-main class="main-content">
      <v-card id="access" class="mt-15" width="500px">
        <v-card-title class="card-title">Signup</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="content">
        <v-form ref="form" v-model="valid">
          <v-text-field outlined label="user@example.com" type="email" prepend-icon="mdi-at" v-model.trim="email" :class="{'wrong': wrongEmail}" :rules="[rules.required, rules.email]" hide-details="auto">
          </v-text-field>
          <v-text-field outlined label="Insert Password" class="mt-5" v-model="password"
            :type="passVisible ? 'text' : 'password'" prepend-icon="mdi-lock"
            :append-icon="passVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
           @click:append="passVisible = !passVisible" :rules="[rules.required, rules.length]"
            hide-details="auto">
          </v-text-field>
          <v-text-field outlined label="Confirm Password" class="mt-5 mb-5" v-model="repPassword"
            :type="passVisible ? 'text' : 'password'" prepend-icon="mdi-lock"
            :append-icon="passVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
           @click:append="passVisible = !passVisible" :rules="[rules.required, (repPassword === password) || 'Passwords don\'t match!']"
            hide-details="auto">
          </v-text-field>
          <v-divider></v-divider>
           <v-select
            :items="countries" item-text="name" class="mt-5" v-model="country"
            label="Select your country" dense outlined prepend-icon="mdi-earth" :rules="[v => !!v || 'Please select a country']"></v-select>
          <span>Choose your gender:</span>
          <v-radio-group v-model="gender" row>
            <v-radio :label="`Female`" value="female" color="rgb(123, 109, 255)" append-icon="mdi-gender-female"></v-radio>
            <v-icon class="gender-icon">mdi-gender-female</v-icon>
            <v-spacer></v-spacer>
            <v-radio :label="`Male`" value="male" color="rgb(123, 109, 255)"></v-radio>
            <v-icon class="gender-icon">mdi-gender-male</v-icon>
            <v-spacer></v-spacer>
            <v-radio :label="`Undisclosed`" value="undisclosed" color="rgb(123, 109, 255)"></v-radio>
            <v-icon class="gender-icon">mdi-gender-non-binary</v-icon>
          </v-radio-group>
          <v-text-field outlined label="Birhdate" type="date" prepend-icon="mdi-cake-variant" v-model="birth"
            :rules="[rules.required, rules.birth]" hide-details="auto">
          </v-text-field>
          <v-checkbox v-model="agree" color="rgb(123, 109, 255)" class="mt-10" hide-details="auto" :rules="[v => !!v || 'You must agree to continue!']">
            <template v-slot:label>
              <div>
                I accept
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a href="https://es.lipsum.com/" target="blank" @click.stop v-on="on" required>
                    Terms and Conditions
                    </a>
                  </template>
                  Opens in new window
                </v-tooltip>
              </div>
            </template>
          </v-checkbox>
          <v-checkbox v-model="mailList" color="rgb(123, 109, 255)" class="mt-0" hide-details="auto">
            <template v-slot:label>
              Join Mailing List
            </template>
          </v-checkbox>
          <v-col class="text-center">
            <v-btn class="white--text" rounded :disabled="!valid" color="rgb(123, 109, 255)" @click="requestAccess">Signup</v-btn>
          </v-col>
          <span class="login-btn">Already a member?<a href="https://es.lipsum.com/" target="blank">Login</a>
          </span>
        </v-form>
        </v-card-text>
      </v-card>
    </v-main>
      <v-footer class="white--text" color="rgb(123, 109, 255)">
        Reboot Academy &copy; 2022
        <v-spacer></v-spacer>

      <v-btn class="white--text" href="https://github.com/JuanAntonioLeonOjeda"
      target="_blank" text>
        <span class="mr-2">Made by Juan Antonio</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
      </v-footer>
  </v-app>
</template>

<script>
import { countries } from '@/countries.js'

export default {
  name: 'App',

  data: () => ({
    valid: true,
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
      },
      length: value => {
        return value.length >= 5 || 'Weak password. At least 5 characters!'
      },
      birth: value => {
        const today = new Date()
        const birthDate = new Date(value)
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }
        return age > 18 || 'User must be at least 18 years old'
      }
    }
    // hint: {
    //   security: value => {
    //     if ((/^(?=.*\d+).{5,10}$/).test(value)) {
    //       return (/^(?=.*\d+).{5,10}$/).test(value)
    //     } else if ((/^(?=.*\W+)(?=.*\d+).{10,}$/).test(value)) {
    //         return (/^(?=.*\W+)(?=.*\d+).{10,}$/).test(value) && 'Hard password. Perfect!'
    //     }
    //   }
    // }
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    check () {
      console.log(this.wrongEmail, this.wrongPass, this.rePass, this.under18, this.agree)
    },
    repeatPassword () {
      this.repPassword !== this.password ? this.repPass = true : this.repPass = false
      this.allOk()
    },
    requestAccess () {
      alert('You are IN!')
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
    }
  }
}
</script>

<style scoped>
#access {
  margin: 0 auto;
  color: white;
}
.nav-bar{
  display: flex;
  justify-content: center;
}
.card-title {
  background-color: rgb(123, 109, 255);
}
/* .content{
  background-color: rgba(0, 0, 0, 0.233);
} */
.main-content{
  background-color: rgba(0, 0, 0, 0.753);
}
.v-input--radio-group.v-input--radio-group--row .v-radio{
  margin-right: 5px;
}
.gender-icon{
  margin-right: 20px;
}
.login-btn{
  display: flex;
  justify-content: center;
}
.footer{
  color: white;
}
footer{
  justify-content: center;
}
.isActive{
  background-color: rgb(123, 109, 255);
  color: white;
}
.inactive{
  background-color: blue;
}
</style>
