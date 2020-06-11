<template>
    <v-container>
        <v-row>
            <v-col cols="1">
                <v-btn @click="back()">
                    <span class="black--text">Kembali</span>
                </v-btn>
            </v-col>
        </v-row>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Pegawai</h2>
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
                                <td>{{ item.tanggal_lahir }}</td>
                                <td>{{ item.alamat }}</td>
                                <td>{{ item.no_telp }}</td>
                                <td>{{ item.id_role_pegawai }}</td>
                                <td>{{ item.username }}</td>
                                <td>{{ item.password }}</td>
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
                    <span class="headline">Pegawai</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="nama" v-model="form.nama" required></v-text-field>
                                
                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="form.tanggal_lahir" transition="scale-transition" offset-y min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="form.tanggal_lahir" label="Tanggal Lahir" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="form.tanggal_lahir" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(form.tanggal_lahir)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                                
                                <v-text-field label="alamat" v-model="form.alamat" required></v-text-field>
                                <v-text-field label="no_telp" v-model="form.no_telp" required></v-text-field>
                                <v-select :items="role_pegawai_keterangan" label="Role Pegawai" v-model="form.id_role_pegawai"></v-select>
                                    <v-text-field label="Username" v-model="form.username" required></v-text-field>
                                    <v-text-field 
                                        label="Password" 
                                        v-model="form.password" 
                                        required 
                                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="showPassword ? 'text' : 'password'"
                                        counter
                                        @click:append="showPassword = !showPassword"
                                        >
                                    </v-text-field>
                            </v-col>
                        </v-row>
                        <small>*menandakan data tersebut perlu</small>
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
                    text: 'Tanggal Lahir',               
                    value: 'tanggal_lahir',             
                },             
                {               
                    text: 'Alamat',               
                    value: 'alamat'             
                }, 
                {               
                    text: 'Nomor Telepon',               
                    value: 'no_telp'             
                },
                {               
                    text: 'Role Pegawai',               
                    value: 'id_role_pegawai'             
                },
                {               
                    text: 'Username',               
                    value: 'username'             
                }, 
                {               
                    text: 'Aksi',               
                    value: null             
                },                                
            ],
            requests: [],

            role_pegawai: [],
            role_pegawai_keterangan: [],

            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',                 
                tanggal_lahir : '',
                alamat : '',
                no_telp : '',
                id_role_pegawai : '',
                username: '',
                password: ''
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
        back(){
            this.$router.push({
                path: "/Admin/pengelolaan"
            });
        },          
        getData(){             
            var uri = this.$apiUrl + '/Pegawai'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message             
            })               
        },

        getRolePegawai(){             
            var uri = this.$apiUrl + '/RolePegawai'             
            this.$http.get(uri).then(response =>{
                this.role_pegawai=response.data.message;
                this.role_pegawai_keterangan=response.data.message.map(x => x.keterangan);
            })
        },

        dialogTambah(){
            this.resetForm();
            this.dialog = true;
            this.tambah = true;
        },

        sendData(){
            var i;
            var role_pegawai_selected;

            for(i = 0; i < this.role_pegawai.length; i++) {
                if (this.role_pegawai.map(x => x.keterangan)[i] === this.form.id_role_pegawai) {
                    role_pegawai_selected = this.role_pegawai.map(x => x.id)[i];
                }
            }

            this.request.append('nama', this.form.nama);
            this.request.append('tanggal_lahir', this.form.tanggal_lahir); 
            this.request.append('alamat', this.form.alamat); 
            this.request.append('no_telp', this.form.no_telp); 
            this.request.append('id_role_pegawai', role_pegawai_selected);
            this.request.append('username', this.form.username);
            this.request.append('password', this.form.password);
            this.request.append('created_by', this.pegawai);               
            var uri =this.$apiUrl + '/Pegawai'             
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
            var i;
            var role_pegawai_selected;

            for(i = 0; i < this.role_pegawai.length; i++) {
                if (this.role_pegawai.map(x => x.keterangan)[i] === this.form.id_role_pegawai) {
                    role_pegawai_selected = this.role_pegawai.map(x => x.id)[i];
                }
            }

            this.request.append('nama', this.form.nama);
            this.request.append('tanggal_lahir', this.form.tanggal_lahir);
            this.request.append('alamat', this.form.alamat); 
            this.request.append('no_telp', this.form.no_telp);
            this.request.append('id_role_pegawai', role_pegawai_selected); 
            this.request.append('username', this.form.username);
            this.request.append('password', this.form.password);
            this.request.append('updated_by', this.pegawai);
            var uri = this.$apiUrl + '/Pegawai/' + this.updatedId;             
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
            this.form.tanggal_lahir = item.tanggal_lahir;
            this.form.alamat = item.alamat;
            this.form.no_telp = item.no_telp;
            this.form.id_role_pegawai = item.id_role_pegawai;
            this.form.username = item.username;
            this.form.password = item.password;
            this.updatedId = item.id;
        },

        deleteData(deleteId){ //mengahapus data
            var uri = this.$apiUrl + '/Pegawai/delete/' + deleteId; //data dihapus berdasarkan id 
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
                tanggal_lahir : '',
                alamat : '',
                no_telp : '',
                id_role_pegawai : '',
                username : '',
                password : ''           
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
        this.getRolePegawai();
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>