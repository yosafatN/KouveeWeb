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
                                        <h1 class="flex my-4 default--text" style="margin-top:20px" align="center">Edit
                                            Profile</h1>
                                        <br>

                                    </div>
                                    <v-file-input append-icon="mdi-camera-party-mode" name="image"
                                        label="Select your image" v-model="user_profile"
                                        accept="image/png, image/jpeg, image/bmp, image/jpg" height="34"></v-file-input>

                                    <v-text-field append-icon="mdi-heart" name="name" label="Nama" type="text"
                                        v-model="name" height="34"></v-text-field>
 
                                    <v-text-field append-icon="mdi-lock" name="address" label="Address" type="text"
                                        v-model="address" height="34"></v-text-field>

                                    <v-text-field append-icon="mdi-cellphone-iphone" name="phoneNumber"
                                        label="Phone Number" type="text" v-model="phoneNumber" height="34">
                                    </v-text-field>

                                    <div class="login-btn" style="margin-left: 0px;">
                                        <br>
                                        <br>
                                        <v-flex xs12 sm8 md8>
                                            <v-btn block color="primary" @click="updateData()" class="elevation-0">Save
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
                dialog: false,
                keyword: '',
                i: 0,
                name: '',
                user_profile: null,
                address: '',
                phoneNumber: '',
                email: '',

                request: new FormData,   
                
                snackbar: false,
                color: null,
                text: '',
                load: false,
                errors: '',
                updatedId: '',
                users: []
            };
        },
        methods: {
            getData(){
                this.users = []
                var uri = this.$apiUrl + '/user'
                this.$http.get(uri).then(response => {
                    this.users = response.data.message
                    for (this.i = 0; this.i < this.users.length; this.i++) {
                        if(this.users[this.i].user_id === this.$session.get('user_id')){
                            
                            this.name = this.users[this.i].name
                            this.email = this.users[this.i].email
                            this.phoneNumber = this.users[this.i].phoneNumber
                            this.address = this.users[this.i].address
                        }
                    }
                })
            },

            updateData(){             
                this.request.append('name', this.name);             
                this.request.append('email', this.email);             
                this.request.append('address', this.address);
                this.request.append('phoneNumber', this.phoneNumber);  
                this.request.append('user_profile', this.user_profile); 
                this.request.append('user_id', this.$session.get('user_id'));              
                var uri = this.$apiUrl + '/user/' + this.$session.get('user_id');             
                this.load = true             
                this.$http.post(uri,this.request).then(response =>{ 
                    this.snackbar = true; //mengaktifkan snackbar               
                    this.color = 'green'; //memberi warna snackbar               
                    this.text = response.data.message; //memasukkan pesan ke snackbar               
                    this.load = false; 
                    this.$router.push('/dashboardUser/userAccount');
                }).catch(error =>{               
                    this.errors = error               
                    this.snackbar = true;               
                    this.text = 'Try Again';               
                    this.color = 'red';               
                    this.load = false;            
                })         
            },
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