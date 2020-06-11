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
                <h2 class="text-md-center">Log Layanan</h2>
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
            keyword: '',         
            headers: [             
                {               
                    text: 'ID',               
                    value: 'id',             
                },             
                {               
                    text: 'Nama Layanan',               
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

            ukuran_hewan: [],
            ukuran_hewan_nama: [],

            jenis_layanan: [],
            jenis_layanan_nama: [],

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
            var uri = this.$apiUrl + '/Log/Layanan'             
            this.$http.get(uri).then(response =>{                 
                this.requests=response.data.message;
            })
        },
        
        getUkuranHewan(){             
            var uri = this.$apiUrl + '/UkuranHewan'             
            this.$http.get(uri).then(response =>{
                this.ukuran_hewan=response.data.message;
                this.ukuran_hewan_nama=response.data.message.map(x => x.nama);
            })
        },

        getJenisLayanan(){             
            var uri = this.$apiUrl + '/JenisLayanan'             
            this.$http.get(uri).then(response =>{
                this.jenis_layanan=response.data.message;
                this.jenis_layanan_nama=response.data.message.map(x => x.nama);
            })
        },

        back(){
            this.$router.push({
                path: "/Admin/log"
            });
        }, 

        sendData(){
            var i;
            var jenis_layanan_selected;
            var ukuran_hewan_selected;
            for(i = 0; i < this.jenis_layanan.length; i++) {
                if (this.jenis_layanan.map(x => x.nama)[i] === this.form.id_layanan) {
                    jenis_layanan_selected = this.jenis_layanan.map(x => x.id)[i];
                }
            }

            for(i = 0; i < this.ukuran_hewan.length; i++) {
                if (this.ukuran_hewan.map(x => x.nama)[i] === this.form.id_ukuran_hewan) {
                    ukuran_hewan_selected = this.ukuran_hewan.map(x => x.id)[i];
                }
            }

            this.request.append('harga', this.form.harga);
            this.request.append('id_ukuran_hewan', ukuran_hewan_selected); 
            this.request.append('id_layanan', jenis_layanan_selected); 
            this.request.append('created_by', 'Ajeng9999');               
            var uri =this.$apiUrl + '/Layanan'             
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
            var jenis_layanan_selected;
            var ukuran_hewan_selected;
            for(i = 0; i < this.jenis_layanan.length; i++) {
                if (this.jenis_layanan.map(x => x.nama)[i] === this.form.id_layanan) {
                    jenis_layanan_selected = this.jenis_layanan.map(x => x.id)[i];
                }
            }

            for(i = 0; i < this.ukuran_hewan.length; i++) {
                if (this.ukuran_hewan.map(x => x.nama)[i] === this.form.id_ukuran_hewan) {
                    ukuran_hewan_selected = this.ukuran_hewan.map(x => x.id)[i];
                }
            }

            this.request.append('harga', this.form.harga);
            this.request.append('id_ukuran_hewan', ukuran_hewan_selected);
            this.request.append('id_layanan', jenis_layanan_selected); 
            this.request.append('id', this.updatedId);
            this.request.append('updated_by', 'Ajeng9999');
            var uri = this.$apiUrl + '/Layanan/' + this.updatedId;             
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
            this.form.harga = item.harga;      
            this.form.id_ukuran_hewan = item.id_ukuran_hewan;
            this.form.id_layanan = item.id_layanan;
            this.updatedId = item.id;
        },
        
        deleteData(deleteId){ //mengahapus data
            var uri = this.$apiUrl + '/Layanan/delete/' + deleteId; //data dihapus berdasarkan id 
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
                harga : '',               
                id_ukuran_hewan : '',               
                id_layanan : '',                       
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
        this.getUkuranHewan();
        this.getJenisLayanan();
        }, 
    } 
</script> 
<style lang="scss" scoped>
.v-btn {
  color : white;
}
</style>