<template>
<v-layout row wrap align="center">
    <v-flex xs12 class="my-2">
     
        <v-img :src="images" height="170px" width="140px"></v-img>  
        <v-col>
          <v-btn icon color="green"  @click="sendKembali">
            <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
          </v-btn>
        </v-col>
        <h2 row wrap align="center">Transaksi</h2>
        <v-container >
            <v-col cols="12" >
              <v-text-field
                label="Nomor Telepon"
                outlined
                dense>
              </v-text-field>
            </v-col>
          <v-checkbox 
          v-model="checkbox"
          :rules="[v => !!v]"
          label="Member"
          required>
          </v-checkbox>
          <v-btn depressed rounded style="text-transform: none !important;" color="soft blue"
            @click="sendDetilLayanan">Transaksi Layanan
          </v-btn>
         <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
            @click="sendDetilPenjualan">Transaksi Penjualan
          </v-btn>
      </v-container>
  
      </v-flex>   
  </v-layout>
</template>

<script>
export default {    
    data () {       
        return {         
            dialog: false,         
            keyword: '',         
            headers: [             
                {               
                    text: 'ID',               
                    value: 'id',             
                },   
                {               
                    text: 'Nomor Telepon',               
                    value: 'no_telp'             
                },          
                {               
                    text: 'Member',               
                    value: 'id_member'             
                },                        
            ],
            requests: [],

            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                no_telp : '',   
                id_member : '',                      
            },         

            request : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '', 

        }     
    },     
    methods: {
        
    getData(){             
            var uri = this.$apiUrl + '/DetilLayanan'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message;
            })
        },

    getTransaksiPenjualan(){             
            var uri = this.$apiUrl + '/DetilPenjualan'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message;
            })
        }, 

    getMember(){             
            var uri = this.$apiUrl + '/Member'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message;
            })
        }, 

    sendKembali(){
        this.request.append('created_by', 'Ajeng9999');               
        var uri =this.$apiUrl + '/TransaksiLayanan'             
        this.load = true             
        this.$http.post(uri,this.request).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm(); 
                this.$router.push({
                path: "/dashboardAdmin/adminTransaksiController"
        });          
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },
     

    sendDetilLayanan(){
        this.request.append('created_by', 'Ajeng9999');               
        var uri =this.$apiUrl + '/TransaksiLayanan'             
        this.load = true             
        this.$http.post(uri,this.request).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm(); 
                this.$router.push({
                path: "/dashboardAdmin/adminAllLayanan"
        });          
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },

    sendDetilPenjualan(){
        this.request.append('created_by', 'Ajeng9999');               
        var uri =this.$apiUrl + '/TransaksiPenjualan'             
        this.load = true             
        this.$http.post(uri,this.request).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm(); 
                this.$router.push({
                path: "/dashboardAdmin/adminAllProduk"
        });          
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },

     setForm(){             
            if (this.typeInput === 'new') {               
                this.sendData()             
            } else {               
                this.updateData()             
            }         
        },   

        resetForm(){             
            this.form = {                
                no_telp : '',                                
            }         
        },
        
        onFileChange() {
            let reader = new FileReader()
            reader.onload = () => {
                this.imageUrl = reader.result
            }
            reader.readAsDataURL(this.form.url_gambar)
        },
    },
    mounted(){ 
        this.getData();
    }, 
}
</script>

<style lang="scss" scoped>
.v-layout{
  background-color: orange;
  color: orange;
}
.v-card {
  align-content: center;
  padding: 2%;
  margin-left: 8%;
  margin-right: 8%;
  margin-top: 1%;
}

</style>
