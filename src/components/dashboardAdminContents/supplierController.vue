<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Supplier</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Data
                        </v-btn>
                        <v-btn depressed rounded style="text-transform: none !important;" color="red accent-3"
                            @click="pdf()" class="ml-5">
                            <v-icon size="18" class="mr-2">mdi-file-pdf</v-icon>
                            Convert to PDF
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
                                <td>{{ item.alamat }}</td>
                                <td>{{ item.kota }}</td>
                                <v-img class="white--text align-end" height="70px" width="50px" :src="link(item)"></v-img>
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
                    <span class="headline">Book Data</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Nama" v-model="form.nama" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="No Telepon" v-model="form.no_telp" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Alamat" v-model="form.alamat" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Kota" v-model="form.kota" required></v-text-field>
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
                    text: 'No Telepon',               
                    value: 'no_telp'             
                },       
                {               
                    text: 'Alamat',               
                    value: 'alamat'             
                },       
                {               
                    text: 'Kota',               
                    value: 'kota'             
                },                    
            ],
            requests: [],
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',                 
                book_image : null,
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
            var uri = this.$apiUrl + '/Supplier'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message             
            })               
        },

        link(item) {
            var path = "http://backend.pawdelapan.online/upload/product/" + item.book_image;
            return path;
        },

        sendData(){             
            this.request.append('nama', this.form.nama);
            this.request.append('no_telp', this.form.no_telp); 
            this.request.append('alamat', this.form.alamat); 
            this.request.append('kota', this.form.kota);  
            this.request.append('created_by', 'Ajeng9999');               
            var uri =this.$apiUrl + '/Supplier'             
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
            this.request.append('alamat', this.form.alamat); 
            this.request.append('kota', this.form.kota);  
            this.request.append('id', this.updatedId);
            this.request.append('updated_by', 'Ajeng9999');
            var uri = this.$apiUrl + '/Supplier/' + this.updatedId;             
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
            this.dialog = true;           
            this.form.nama = item.nama;      
            this.form.no_telp = item.no_telp;
            this.form.alamat = item.alamat;
            this.form.kota = item.kota;  
            this.updatedId = item.id;
        },
        
        deleteData(deleteId){ //mengahapus data
            var uri = this.$apiUrl + '/Supplier/delete/' + deleteId; //data dihapus berdasarkan id 
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
                no_telp : '',               
                alamat : '',
                kota : ''                        
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
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>