<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Hewan</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialogTambah()">
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
                                <td>{{ item.id_jenis_hewan }}</td>
                                <td>{{ item.tanggal_lahir }}</td>
                                
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
                    <span class="headline">Hewan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="nama" v-model="form.nama" required></v-text-field>
                                <v-select :items="jenis_hewan_keterangan" label="Id Jenis Hewan" v-model="form.id_jenis_hewan"></v-select>

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
                    text: 'Jenis Hewan',               
                    value: 'id_jenis_hewan'             
                },
                {               
                    text: 'Tanggal Lahir',               
                    value: 'tanggal_lahir',             
                },             
               
                {               
                    text: 'Aksi',               
                    value: null             
                },                                
            ],
            requests: [],

            jenis_hewan: [],
            jenis_hewan_keterangan: [],

            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                nama : '',  
                id_jenis_hewan : '',               
                tanggal_lahir : '',
               
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
            var uri = this.$apiUrl + '/Hewan'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message             
            })               
        },

        getJenisHewan(){             
            var uri = this.$apiUrl + '/JenisHewan'             
            this.$http.get(uri).then(response =>{
                this.jenis_hewan=response.data.message;
                this.jenis_hewan_keterangan=response.data.message.map(x => x.keterangan);
            })
        },

        dialogTambah(){
            this.resetForm();
            this.dialog = true;
            this.tambah = true;
        },

        sendData(){
            var i;
            var jenis_hewan_selected;

            for(i = 0; i < this.jenis_hewan.length; i++) {
                if (this.jenis_hewan.map(x => x.keterangan)[i] === this.form.id_jenis_hewan) {
                    jenis_hewan_selected = this.jenis_hewan.map(x => x.id)[i];
                }
            }

            this.request.append('nama', this.form.nama);
            this.request.append('id_jenis_hewan', jenis_hewan_selected);
            this.request.append('tanggal_lahir', this.form.tanggal_lahir); 
            this.request.append('created_by', 'Yosafat9204');               
            var uri =this.$apiUrl + '/Hewan'             
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
            var jenis_hewan_selected;

            for(i = 0; i < this.jenis_hewan.length; i++) {
                if (this.jenis_hewan.map(x => x.keterangan)[i] === this.form.id_jenis_hewan) {
                    jenis_hewan_selected = this.jenis_hewan.map(x => x.id)[i];
                }
            }

            this.request.append('nama', this.form.nama);
            this.request.append('id_jenis_hewan', jenis_hewan_selected);
            this.request.append('tanggal_lahir', this.form.tanggal_lahir); 
            this.request.append('updated_by', 'Yosafat9204');  
            var uri = this.$apiUrl + '/Hewan/' + this.updatedId;             
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
            this.form.id_jenis_hewan = item.id_jenis_hewan;    
            this.form.tanggal_lahir = item.tanggal_lahir;
            
            this.updatedId = item.id;
        },

        deleteData(deleteId){ //mengahapus data
            var uri = this.$apiUrl + '/Hewan/delete/' + deleteId; //data dihapus berdasarkan id 
            this.request.append('updated_by', 'Yosafat9204');
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
                id_jenis_hewan : '',        
                tanggal_lahir : '',
                          
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
        this.getJenisHewan();
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>