<template>
  <v-container fluid>
    <v-data-iterator :items="books" :search="search" hide-default-footer >
      <template v-slot:header>
        <v-toolbar class="mb-2" color="white" flat >
          <v-toolbar-title>Book List</v-toolbar-title>
          <v-text-field class="ml-12" v-model="search" append-icon="mdi-search-web" label="Search" single-line hide-details></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-row>
            <v-col v-for="item in props.items" :key="item.title" cols="12" sm="6" md="4" lg="3">
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
                    </v-list>

                    <v-divider></v-divider>
                    
                    <v-card-actions>
                        <v-btn color="blue" @click="borrow(item.book_id)" dark>Borrow</v-btn>
                    </v-card-actions>
                </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    <v-snackbar 
      v-model="snackbar"
      :color="color" 
      :multi-line="true" 
      :timeout="6000" 
      :top="y === 'top'"> {{ text }} 
      <v-btn dark text @click="snackbar = false"> Close </v-btn> 
    </v-snackbar> 
  </v-container>
</template>

<script>
export default {
        data() {
            return {
                dialog: false,
                keyword: '',
                books: [],
                snackbar: false,
                search: '',
                color: null,
                text: '',
                errors: '',
                updatedId: '',
                load: false,
                request : new FormData,
                x: null,
                y: 'top'
            }
        },
        methods: {
            getData() {
                var uri = this.$apiUrl + '/book'
                this.$http.get(uri).then(response => {
                    this.books = response.data.message
                })
            },

            borrow(id){
                this.request.append('user_id', this.$session.get('user_id'));
                this.request.append('book_id', id);
                var uri =this.$apiUrl + '/borrowlist'         
                this.$http.post(uri,this.request).then(response =>{               
                    this.snackbar = true; //mengaktifkan snackbar               
                    this.color = 'green'; //memberi warna snackbar               
                    this.text = response.data.message; //memasukkan pesan ke snackbar            
                    this.load = false;
                    this.getData();
                }).catch(error =>{               
                    this.errors = error               
                    this.snackbar = true;               
                    this.text = 'Try Again';               
                    this.color = 'red';
                    this.load = false;           
                })
            },

            link(item) {
              var path = "http://backend.pawdelapan.online/upload/product/" + item.book_image;
              return path;
            }
        },
        mounted() {
            this.getData();
        },
    }
</script>