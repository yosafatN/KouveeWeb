<template>
    <v-app>
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="7" md="7">
                        <v-card class="elevation-1 pa-3 login-card">
                            <div class="form">
                                <v-card-text align="center">
                                    <div class="layout column header" style="margin-bottom: 30px">
                                        <h1 class="flex my-4 default--text" style="margin-top:20px" align="center">
                                            Profile</h1>
                                        <br>
                                        <v-img :src="link()" style="top: 20px" width="150px" height="100px"></v-img>

                                    </div>

                                    <v-text-field append-icon="mdi-heart" name="name" label="Nama" type="text"
                                        v-model="name" height="34" disabled="disabled"></v-text-field>

                                    <v-text-field append-icon="mdi-account" name="login" label="Email" type="text"
                                        v-model="email" height="34" disabled="disabled"></v-text-field>

                                    <v-text-field append-icon="mdi-lock" name="address" label="Address" type="text"
                                        v-model="address" height="34" disabled="disabled"></v-text-field>

                                    <v-text-field append-icon="mdi-cellphone-iphone" name="phoneNumber"
                                        label="Phone Number" type="text" v-model="phoneNumber" height="34"
                                        disabled="disabled"></v-text-field>

                                    <div class="login-btn" style="margin-left: 0px;">
                                        <br>
                                        <br>
                                        <v-flex xs12 sm8 md8>
                                            <v-btn block color="primary" @click="edit()" class="elevation-0">Edit
                                            </v-btn>
                                        </v-flex>
                                    </div>
                                </v-card-text>

                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            user: [],
            name: '',
            email: '',
            address: '',
            phoneNumber: '',
            user_profile: '',
            i: 0,
        };
    },
    methods: { 
        getData(){
            this.user = []
            var uri = this.$apiUrl + '/user'
            this.$http.get(uri).then(response => {
                this.user = response.data.message
                for (this.i = 0; this.i < this.user.length; this.i++) {
                    if(this.user[this.i].user_id === this.$session.get('user_id')){
                        
                        this.name = this.user[this.i].name
                        this.email = this.user[this.i].email
                        this.phoneNumber = this.user[this.i].phoneNumber
                        this.address = this.user[this.i].address
                        this.user_profile = this.user[this.i].user_profile
                    }
                }
            })
        },

        link() {
            var path = "http://backend.pawdelapan.online/upload/profile/" + this.user_profile;
            return path;
        },

        edit() {
            this.$router.push('/dashboardUser/userAccount/userAccountEdit')
        }
    },
    mounted() {
        this.getData();
    },
};
</script>

<style scoped lang="css">
.v-img {
  margin-left: 25%;
  margin-right: 25%;
}
.v-btn {
  width: 50%;
  align-self: center;
}
</style>