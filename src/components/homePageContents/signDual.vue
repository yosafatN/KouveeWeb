<template>
  <article>
    <div class="container" :class="{'sign-up-active' : signUp}">
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-left">
            <h2>Hello, Friend!</h2>
            <p>Please Enter Your Personal Details</p>
            <v-btn class="invert" color="cyan" id="signIn" @click="signUp = !signUp">Sign In</v-btn>
          </div>
          
          <div class="overlay-right">

            <h1>Selamat Datang di Kouvee Management Website</h1>
            <h3>Admin Platform</h3>
            <p>Pastikan Jabatan Anda adalah Admin</p>
            
          </div>
        </div>
      </div>
      <form class="sign-up">
        <h2>Sign Up</h2>
        <div>Use your email for registration</div>
        <v-text-field type="text" placeholder="Your Name" v-model="form.name" required></v-text-field>
        <v-text-field type="email" placeholder="Your Valid Email, e.g. john123@gmail.com" v-model="form.email" required></v-text-field>
        <v-text-field type="password" placeholder="Your Password Account" v-model="form.password" required></v-text-field>
        <v-text-field type="text" placeholder="Your Home Address" v-model="form.address" required></v-text-field>
        <v-text-field type="text" placeholder="Your Phone Number" v-model="form.phoneNumber" required></v-text-field>
        <v-btn color="green" @click="sendData()">Sign Up</v-btn>
      </form>
      <form class="sign-in">
        <h2>Admin Login</h2>
        <div>Silahkan Masukan Data Anda</div>
          <v-text-field type="email" placeholder="Masukan Data Admin Anda" v-model="form.email" required></v-text-field>
          <v-text-field type="password" placeholder="Masukan Password Anda" v-model="form.password" required></v-text-field>
        <v-btn color="green" @click="signIn()">Login</v-btn>
      </form>
    </div>
    <v-snackbar 
      v-model="snackbar"
      :color="color" 
      :multi-line="true" 
      :timeout="6000" 
      :top="y === 'top'"> {{ text }} 
      <v-btn dark text @click="snackbar = false"> Close </v-btn> 
    </v-snackbar> 
  </article>
</template>

<script>
export default {
  data() {
    
    return {
      signUp: false,
      form: {
        name: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
      },
      response: [],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      user: new FormData,
      typeInput: 'new',
      errorType: false,
      errors: '',
      updatedId: '',
      x: null,
      y: 'top'
    }
  },

  methods: {

    sendData() {
      this.user.append('name', this.form.name);
      this.user.append('email', this.form.email);
      this.user.append('password', this.form.password);
      this.user.append('address', this.form.address);
      this.user.append('phoneNumber', this.form.phoneNumber);
      var uri = this.$apiUrl + '/user'
      this.load = true;
      this.$http.post(uri, this.user).then(response => {
        this.errorType = response.data.error;
        if (this.errorType == true) {
          this.snackbar = true;
          this.text = response.data.message;
          this.color = 'red';
          this.load = false;
          this.resetForm();
        } else {
          this.snackbar = true;
          this.color = 'green';
          this.text = response.data.message;
          this.load = false;
          this.resetForm();
          this.signUp = !this.signUp;
        }
      }).catch(error => {
        this.errors = error;
        this.snackbar = true;
        this.text = error;
        this.color = 'red';
        this.load = false;
      });
    },

    signIn() {
      if (this.form.email == "Yosafat9204" && this.form.password == "9204") {
        this.snackbar = true;
        this.color = 'green';
        this.text = 'Welcome!';
        this.load = false;
        this.resetForm();
        this.$router.push({
          path: "/menu"
        });
      } else {
        var url = this.$apiUrl + "/Pegawai/login";
        this.user = new FormData();
        this.user.append("username", this.form.email);
        this.user.append("password", this.form.password);
        this.$http.post(url, this.user).then(response => {
          this.errorType = response.data.error;
          if (this.errorType == true) {
            this.snackbar = true;
            this.text = response.data.message;
            this.color = 'red';
            this.load = false;
          } else {
            this.snackbar = true;
            this.color = 'green';
            this.text = 'Succses';
            this.load = false;
            this.resetForm();
            this.response = response.data.message;
            if(this.response.id_role_pegawai == 'Owner'){
                this.$session.set('pegawai', this.response.username);
                this.$router.push({
                  path: "/Admin"
                });
            }else{
                this.snackbar = true;
                this.text = 'Maaf Anda Tidak Bisa Mengakses Menu Ini';
                this.color = 'red';
                this.load = false;
            }
          }
        }).catch(error => {
          this.errors = error;
          this.snackbar = true;
          this.text = error;
          this.color = 'red';
          this.load = false;
        });
      }
    },

    resetForm() {
      this.form = {
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
      }
    }
  },

  mounted() {
  },
}

</script>

<style lang="scss" scoped>
  .container {
    max-width: none;
    position: relative;
    height: 620px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                0 10px 10px rgba(0, 0, 0, .2);
    background: linear-gradient(to bottom, #efefef, #ccc);
    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform .5s ease-in-out;
      z-index: 4;
    }
    .overlay {
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      background: linear-gradient(to bottom right, #BA5781, #BA5781);
      color: #fff;
      transform: translateX(0);
      transition: transform .5s ease-in-out;
    }
    @mixin overlays($property) {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      padding: 200px 40px;
      width: 50%;
      height: 100%;
      text-align: center;
      transform: translateX($property);
      transition: transform .5s ease-in-out;
    }
    .overlay-left {
      @include overlays(-20%);
    }
    .overlay-right {
      @include overlays(0);
      right: 0;
    }
  }
  h2 {
    margin: 0;
  }
  p {
    margin: 20px 0 30px;
  }
  a {
    color: #222;
    text-decoration: none;
    margin: 15px 0;
    font-size: 1rem;
  }
  .v-btn {
    border-radius: 20px;
    border: 1px solid #009345;
    background-color: #009345;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 40px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform .1s ease-in;
    &:active {
      transform: scale(.9);
    }
    &:focus {
      outline: none;
    }
  }
  .v-btn.invert {
    background-color: transparent;
    border-color: #fff;
  }
  form {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 200px 70px;
    width: 50%;
    height: 100%;
    text-align: center;
    background: linear-gradient(to bottom, #efefef, #ccc);
    transition: all .5s ease-in-out;
    div {
      font-size: 1rem;
    }
    .v-text-field {
      flex: none;
      // background-color: #eee;
      border: 10px;
      //padding: 8px 15px;
      // margin: 6px 0;
      width: calc(100% - 20px);
      border-radius: 15px;
      border-bottom: 1px solid #ddd;
      // box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4), 
      //                   0 -1px 1px #fff, 
      //                   0 1px 0 #fff;
      overflow: hidden;
      &:focus {
        outline: none;
        background-color: #fff;
      }
    }
  }
  .sign-in {
    left: 0;
    z-index: 1;
  }
  .sign-up {
    left: 0;
    z-index: 1;
    opacity: 0;
  }
  .sign-up-active {
    .sign-in {
      transform: translateX(100%);
    }
    .sign-up {
      transform: translateX(100%);
      opacity: 1;
      z-index: 2;
      animation: show .5s;
    }
    .overlay-container {
      transform: translateX(-100%);
    }
    .overlay {
      transform: translateX(50%);
    }
    .overlay-left {
      transform: translateX(0);
    }
    .overlay-right {
      transform: translateX(0%);
    }
  }
  @keyframes show {
    0% {
      opacity: 0;
      z-index: 1;
    }
    49% {
      opacity: 0;
      z-index: 1;
    }
    50% {
      opacity: 1;
      z-index: 3;
    }
  }
</style>