<template>
  <v-container fluid>
    <v-data-iterator :items="books" :search="search" hide-default-footer >
      <template v-slot:header>
        <v-toolbar class="mb-2" color="white" flat >
          <v-toolbar-title>Borrow List</v-toolbar-title>
          <v-text-field class="ml-12" v-model="search" append-icon="mdi-search-web" label="Search" single-line hide-details></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-row>
            <v-col v-for="item in props.items" :key="item.book_id" cols="12" sm="6" md="4" lg="3"> 
                <v-card>
                    <v-img class="white--text align-end" height="200px" :src="link(item)"></v-img>

                    <v-divider></v-divider>

                    <v-list dense>
                        <v-list-item>
                            <v-list-item-content>Book Title</v-list-item-content>
                            <v-list-item-content class="align-end">: {{ item.title }}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>Authors</v-list-item-content>
                            <v-list-item-content class="align-end">: {{ item.authors }}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>Publisher</v-list-item-content>
                            <v-list-item-content class="align-end">: {{ item.publisher }}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>Category</v-list-item-content>
                            <v-list-item-content class="align-end">: {{ item.category }}</v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>Status</v-list-item-content>
                            <v-list-item-content class="align-end">: {{ item.status }}</v-list-item-content>
                        </v-list-item>
                    </v-list>
                    
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn color="blue" @click="dialog = true" dark>Review</v-btn>
                    </v-card-actions>

                    <v-dialog v-model="dialog" persistent max-width="600px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">Review</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field label="Review*" v-model="form.review" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field label="Rating ( 1 - 5 )*" v-model="form.rating" required></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                <v-btn color="blue darken-1" text @click="sendData(item)">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
        data() {
            return {
                dialog: false,
                keyword: '',
                books: [],
                book: [],
                snackbar: false,
                search: '',
                color: null,
                text: '',
                load: false,
                form: {
                    review : '',           
                    rating : ''    
                },         
                request: new FormData,
                typeInput: 'new',
                errors: '',
                book_id: '',
                i: 0
            }
        },
        methods: {
            getData() {
                this.book = []
                this.books = []
                var uri = this.$apiUrl + '/borrowlist'
                this.$http.get(uri).then(response => {
                    this.book = response.data.message
                    for (this.i = 0; this.i < this.book.length; this.i++) {
                        if(this.book[this.i].user_id === this.$session.get('user_id')){
                            this.books.push(this.book[this.i])
                        }
                    }
                })
            },

            link(item) {
              var path = "http://backend.pawdelapan.online/upload/product/" + item.book_image;
              return path;
            },

            review($id){
                this.book_id = $id;
                this.dialog = true;
            },

            sendData(item){
                this.request.append('review', this.form.review);      
                this.request.append('rating', this.form.rating);    
                this.request.append('book_id', item.book_id);
                console.log(item['.key'])
                this.request.append('user_id', this.$session.get('user_id'));
                var uri =this.$apiUrl + '/review'        
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

            resetForm(){             
                this.form = {               
                    review : '',           
                    rating : ''  
                }         
            },
        },

        mounted() {
            this.getData();
        },
    }
</script>