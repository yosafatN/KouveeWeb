<template>
    <v-card class="mx-auto" max-width="1980">
        <v-container fluid>
            <v-row dense>
                <v-col cols="3"></v-col>
                <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                    <v-card>
                        <v-card-text>
                            <v-row>
                                <v-col cols="1"></v-col>
                                <v-col cols="10">
                                    <v-img :src="card.src" class="white--text align-end"></v-img>
                                </v-col>
                                <v-col cols="1"></v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="#f37900" dark @click="action(card.link)">{{card.title}}</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Add Member</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-text-field label="Nama" v-model="form.nama_hewan" required></v-text-field>
                            </v-row>
                            <v-row>
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
                            </v-row>
                            <v-row>
                                <v-text-field label="Alamat" v-model="form.nama_hewan" required></v-text-field>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">Jangan</v-btn>
                            <v-btn color="error darken-1" text @click="batal()" danger>Batalkan Transaksi</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </v-card>
</template>
<script>
export default {    
    data: () => ({
      cards: [
        { title: 'Add Member', src: 'https://png.pngtree.com/svg/20150911/yz_user_management_117401.png', flex: 3, link: '/CS/member'},
        { title: 'Transaksi', src: 'https://static.thenounproject.com/png/417261-200.png', flex: 3, link: '/CS/transaksi'}
      ],
      dialog : false,
      form: {
            nama: '',
            tanggal_lahir: '',
            alamat: ''
        },
      }
    ),

    methods:{
        action(link) {
                this.$router.push({
                path: link
            });
        }
    }
  }
</script> 