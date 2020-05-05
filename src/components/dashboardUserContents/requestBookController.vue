<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Wish List</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed rounded style="text-transform: none !important;" color="blue accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Make your Request
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table :headers="headers" :items="requests" :search="keyword" :loading="load">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_wish">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.title }}</td>
                                <td>{{ item.authors}}</td>
                                <td>{{ item.publisher }}</td>
                                <td>{{ item.category }}</td>
                                <td class="text-center">
                                    <v-btn icon color="indigo" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="error" light @click="deleteData(item.id_wish)">
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
                    <span class="headline">Book List</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Book Title*" v-model="form.title" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Authors*" v-model="form.authors" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Publisher*" v-model="form.publisher" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Category*" v-model="form.category" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                </v-card-actions>
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
                    text: 'No',               
                    value: 'no',             
                },             
                {               
                    text: 'Book Title',               
                    value: 'title'             
                },             
                {               
                    text: 'Authors',               
                    value: 'authors'             
                },             
                {               
                    text: 'Publisher',               
                    value: 'publisher'             
                },
                {               
                    text: 'Category',               
                    value: 'category'             
                },          
                {               
                    text: 'Aksi',
                    value: null,
                    sortable: false
                },         
            ],         
            requests: [],
            book: [],
            i: 0,      
            snackbar: false,          
            color: null,         
            text: '',          
            load: false, 
            form: {            
                title : '',           
                authors : '',           
                publisher : '',
                category : ''        
            },         
            request : new FormData,         
            typeInput: 'new',        
            errors : '',         
            updatedId : '',       
        }     
    },     
    methods:{         
        getData(){
            this.book = []
            this.requests = []
            var uri = this.$apiUrl + '/requestlist'             
            this.$http.get(uri).then(response =>{
                this.book = response.data.message
                    for (this.i = 0; this.i < this.book.length; this.i++) {
                        if(this.book[this.i].user_id === this.$session.get('user_id')){
                            this.requests.push(this.book[this.i])
                        }
                    }          
            })               
        },         
        sendData(){
            this.request.append('title', this.form.title);      
            this.request.append('authors', this.form.authors);       
            this.request.append('publisher', this.form.publisher);
            this.request.append('category', this.form.category);
            this.request.append('user_id', this.$session.get('user_id'));
            var uri =this.$apiUrl + '/requestlist'             
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
            this.request.append('title', this.form.title);             
            this.request.append('authors', this.form.authors);             
            this.request.append('publisher', this.form.publisher);
            this.request.append('category', this.form.category);
            this.request.append('user_id', this.$session.get('user_id'));
            var uri = this.$apiUrl + '/requestlist/' + this.updatedId;             
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
            this.form.title = item.title;           
            this.form.authors = item.authors;           
            this.form.publisher = item.publisher,
            this.form.category = item.category,        
            this.updatedId = item.id_wish
        },
        
        deleteData(deleteId) { //mengahapus data             
            var uri = this.$apiUrl + '/requestlist/' + deleteId; //data dihapus berdasarkan id_wish
            this.$http.delete(uri).then(response =>{                 
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
                title : '',               
                authors : '',               
                publisher : '',
                category : ''     
            }         
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