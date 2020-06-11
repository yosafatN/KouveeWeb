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
                <h2 class="text-md-center">Log Member</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
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
                                <td>{{ item.keterangan }}</td>
                                <td>{{ item.Time }}</td>
                                <td>{{ item.pegawai }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </v-container>
        </v-card>
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
                    text: 'Nama Member',               
                    value: 'nama'             
                },
                {               
                    text: 'Keterangan',               
                    value: 'keterangan'             
                },       
                {               
                    text: 'Time',               
                    value: 'Time'             
                },       
                {               
                    text: 'Pegawai',               
                    value: 'pegawai'             
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
        }     
    },
    
    methods:{         
        getData(){             
            var uri = this.$apiUrl + '/Log/member'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message             
            })               
        },

        back(){
            this.$router.push({
                path: "/Admin/log"
            });
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
            this.request.append('created_by', 'Ajeng9999');               
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
            this.request.append('updated_by', 'Ajeng9999');
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
            this.request.append('updated_by', 'Ajeng9999');
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