<template>
    <v-container>
        <v-card flat>
                    <v-row>
                        <v-col cols="6" sm="3">
                            <v-btn icon color="green" @click="sendKembali()">
                                <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Member</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialogTambah()">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Data
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-magnify" label="Cari" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="requests" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.nama }}</td>
                                <td>{{ item.no_telp }}</td>
                                <td>{{ item.tanggal }}</td>
                                <td>{{ item.alamat }}</td>
                               
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteData(item.id)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Member</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="nama" v-model="form.nama" required></v-text-field>
                                 <v-text-field label="no_telp" v-model="form.no_telp" required></v-text-field>
                                 
                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="form.tanggal" transition="scale-transition" offset-y min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="form.tanggal" label="Tanggal Lahir" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="form.tanggal" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(form.tanggal)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                                
                                <v-text-field label="alamat" v-model="form.alamat" required></v-text-field>
                               
                                
                            </v-col>
                        </v-row>
                        <small>*indicates required field</small>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
            {{ text }}
            <v-btn dark text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>

export default {    
    data () {       
        return {         
            dialog: false,
            tambah: false,
            menu: false,
            showPassword : false,     
            keyword: '',         
            headers: [             
                {               
                    text: 'ID',               
                    value: 'id',             
                },             
                {               
                    text: 'Nama',               
                    value: 'nama'             
                },  
                {               
                    text: 'Nomor Telepon',               
                    value: 'no_telp'             
                },
                {               
                    text: 'Tanggal Lahir',               
                    value: 'tanggal',             
                },             
                {               
                    text: 'Alamat',               
                    value: 'alamat'             
                }, 
                
               
                {               
                    text: 'Aksi',               
                    value: null             
                },                                
            ],
            requests: [],

            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',     
                no_telp : '',            
                tanggal : '',
                alamat : '',
                
               
            },         
            request : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '', 
            imageUrl : null, 
            pegawai : '',         
        }     
    },
    
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/Member'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message             
            })               
        },

        sendKembali() {
            this.$router.push('/CS')
        },
        
        dialogTambah(){
            this.resetForm();
            this.dialog = true;
            this.tambah = true;
        },

        sendData(){
            

            this.request.append('nama', this.form.nama);
            this.request.append('no_telp', this.form.no_telp); 
            this.request.append('tanggal', this.form.tanggal); 
            this.request.append('alamat', this.form.alamat); 
            this.request.append('created_by', this.pegawai);               
            var uri =this.$apiUrl + '/Member'             
            this.load = true             
            this.$http.post(uri,this.request).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },

        updateData(){
           

            this.request.append('nama', this.form.nama);
            this.request.append('no_telp', this.form.no_telp); 
            this.request.append('tanggal', this.form.tanggal); 
            this.request.append('alamat', this.form.alamat);
            this.request.append('updated_by', this.pegawai);
            var uri = this.$apiUrl + '/Member/' + this.updatedId;             
            this.load = true             
            this.$http.post(uri,this.request).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();               
                this.typeInput = 'new';           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;               
                this.typeInput = 'new';           
            })         
        },   

        editHandler(item){           
            this.typeInput = 'edit';
            this.tambah = false;      
            this.dialog = true;           
            this.form.nama = item.nama; 
            this.form.no_telp = item.no_telp;     
            this.form.tanggal = item.tanggal;
            this.form.alamat = item.alamat;
         
            this.updatedId = item.id;
        },

        deleteData(deleteId){ //mengahapus data
            var uri = this.$apiUrl + '/Member/delete/' + deleteId; //data dihapus berdasarkan id 
            this.request.append('updated_by', this.pegawai);
            this.$http.post(uri,this.request).then(response =>{                 
                this.snackbar = true;                 
                this.text = response.data.message;                 
                this.color = 'green'                 
                this.deleteDialog = false;                 
                this.getData();             
            }).catch(error =>{                 
                this.errors = error                 
                this.snackbar = true;                 
                this.text = 'Try Again';                 
                this.color = 'red'; 
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
                nama : '',  
                no_telp : '',               
                tanggal: '',
                alamat : '',
                
                     
            }         
        },

        onFileChange() {
            let reader = new FileReader()
            reader.onload = () => {
                this.imageUrl = reader.result
            }
            reader.readAsDataURL(this.form.book_image)
        },

        pdf(){
            var uri = this.$apiUrl + '/bookpdf';
            window.open(uri);
        }
    },     
    mounted(){     
        this.pegawai = this.$session.get("pegawai");
        this.getData();     
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>