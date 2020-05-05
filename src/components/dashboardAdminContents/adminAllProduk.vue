<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">PRODUK KAMI</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <!-- <v-combobox v-model="keyword" :items="review_category" label="Category"></v-combobox> -->
                        <v-select class="align-center" :items="kategori_produk_keterangan" v-model="filter" label="Filter Kategori Produk" outlined clearable="true"></v-select>
                    </v-flex>
                </v-layout>
                <template>
                    <v-layout row wrap align-center :search="keyword">
                            <v-flex>
                                <div v-for="item in filteredItems" :key="item.id" class="mb-3">
                                    <v-card class="mx-auto" max-width="750" outlined>
                                        <v-list-item three-line>
                                            <v-layout>
                                                <v-flex>
                                                    <v-list-item-content>
                                                        <v-list-item-title style="font-size:22px">{{ item.nama }}</v-list-item-title>
                                                       
                                                        <v-list-item-title style="font-size:22px">Stok = {{ item.jmlh }} buah</v-list-item-title>
                                                        <v-list-item-title style="font-size:22px">Harga = Rp {{ item.harga }} </v-list-item-title>
                                                        <v-list-item-subtitle class="font-weight-medium" style="font-size:15px">{{ item.description }}</v-list-item-subtitle>
                                                    </v-list-item-content>
                                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                                        <v-icon>mdi-pencil</v-icon>
                                                    </v-btn>
                                                    <v-btn icon color="error" light @click="deleteData(item.id)">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                    
                                                </v-flex>
                                                
                                                <v-flex>
                                                    <v-list-item-content>
                                                        <v-list-item-subtitle class="font-weight-light align-end">Kategori Produk</v-list-item-subtitle>
                                                        
                                                        <v-list-item-subtitle style="font-size:18px" class="font-weight-regular align-end">{{ item.id_kategori_produk }}</v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-flex>
                                                <v-flex xs1>
                                                    <v-list-item-content v-if="myusername == item.username">
                                                        <v-menu bottom left>
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn dark icon v-on="on" class="align-start">
                                                                    <v-icon color="grey">mdi-dots-vertical</v-icon>
                                                                </v-btn>
                                                            </template>

                                                            <v-list>
                                                                <div>
                                                                    <v-list-item @click="editHandler(item)">
                                                                        <v-list-item-title>
                                                                            Edit
                                                                            
                                                                        </v-list-item-title>
                                                                        <v-icon class="ml-3">mdi-pencil</v-icon>
                                                                    </v-list-item>
                                                                </div>
                                                                <div>
                                                                    <v-list-item @click="deleteData(item.id)">
                                                                        <v-list-item-title>
                                                                            Delete
                                                                            
                                                                        </v-list-item-title>
                                                                        <v-icon class="ml-3">mdi-delete</v-icon>
                                                                    </v-list-item>
                                                                </div>
                                                                
                                                            </v-list>
                                                        </v-menu>
                                                    </v-list-item-content>
                                                </v-flex>
                                            </v-layout>
                                        </v-list-item>
                                    </v-card>
                                </div>
                            </v-flex>
                        </v-layout>
                </template>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title> <span class="headline">Pembelian Produk</span> </v-card-title>
                <v-card-text>
                    <v-subheader>Masukan Jumlah Barang Yang Ingin Dibeli</v-subheader>
                    <v-container>
                        <v-row>

                            <v-col cols="12">
                                <v-text-field label="Jumlah Barang" v-model="form.description"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container> <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark text
                @click="snackbar = false"> Close </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            keyword: '',
            review_category: [
                'Makanan',
                'Minuman',
                'Vitamin',
                'Aksesoris',
                'Shampoo'
            ],
            settings: [
                {
                    title: 'Edit',
                    icon: 'mdi-pencil',
                    action: 'editHandler(item)'
                },
                {
                    title: 'Delete',
                    icon: 'mdi-delete',
                    action: 'deleteData(item.id)'
                }
            ],
            reviews: [],

            kategori_produk: [],
            kategori_produk_keterangan: [],

            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                rate: '',
                category: '',
                description: ''
            },
            review: new FormData,
            typeInput: 'new',
            errors: '',
            updatedId: '',
            myusername: '',
            filter: ''
        }
    },
    computed:{
        filteredItems() {
            return this.reviews.filter((i) => {
                return !this.filter || (i.id_kategori_produk === this.filter);
            })
        }
    },
    methods: {
        getData() {
            var uri = this.$apiUrl + '/produk'
            this.$http.get(uri).then(response => {
                this.reviews = response.data.message
            })
        },

         getKategoriProduk(){             
            var uri = this.$apiUrl + '/KategoriProduk'             
            this.$http.get(uri).then(response =>{
                this.kategori_produk=response.data.message;
                this.kategori_produk_keterangan=response.data.message.map(x => x.keterangan);
            })
        },
        sendData() {
            var i;
            var kategori_produk_selected;

            for(i = 0; i < this.kategori_produk.length; i++) {
                if (this.kategori_produk.map(x => x.keterangan)[i] === this.form.id_kategori_produk) {
                    kategori_produk_selected = this.kategori_produk.map(x => x.id)[i];
                }
            }

            this.review.append('username', this.myusername);
            this.review.append('rate', this.form.rate);
            this.review.append('category', this.form.category);
            this.review.append('description', this.form.description);
            var uri = this.$apiUrl + '/review'
            this.load = true 
            this.$http.post(uri, this.review).then(response => {
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
            this.review.append('rate', this.form.rate);
            this.review.append('category', this.form.category);
            this.review.append('description', this.form.description);           
            var uri = this.$apiUrl + '/review/' + this.updatedId;             
            this.load = true             
            this.$http.post(uri,this.review).then(response =>{ 
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
            this.form.username = item.username;           
            this.form.rate = item.rate;           
            this.form.category = item.category;
            this.form.description = item.description;           
            this.updatedId = item.id         
        },         
        deleteData(deleteId){ //mengahapus data             
            var uri = this.$apiUrl + '/review/' + deleteId; //data dihapus berdasarkan id 
            this.$http.delete(uri).then(response => {
                this.snackbar = true;
                this.text = response.data.message;
                this.color = 'green'
                this.deleteDialog = false;
                this.getData();
            }).catch(error => {
                this.errors = error 
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
            })
        }, 
        setForm() {
            if (this.typeInput === 'new') {
                this.sendData()
            } else {
                //console.log("dddd")
                this.updateData()
            }
        }, 
        resetForm() {
            this.form = {
                rate: '',
                category: '',
                description: ''
            }
        }
    }, 
    mounted() {
        this.getData();
        this.getKategoriProduk();
        this.myusername = window.atob(localStorage.getItem("user_username"));
    },
} 
</script>