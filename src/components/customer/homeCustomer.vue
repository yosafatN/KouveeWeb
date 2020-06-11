<template>
  <div class="heroBlock">
    <v-carousel cycle hide-delimiters>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-row class="title fill-height hidden-xs-only" align="center" justify="center">{{ item.title }}</v-row>
      </v-carousel-item>
    </v-carousel>
    <v-container>
      <h2 class="text-center">Sekilas Layanan dan Produk </h2>
      <v-row>
        <v-col v-for="item in grid" :key="item.id" class="d-flex child-flex" cols="6" sm="4">
          <v-card flat tile class="d-flex">
            <v-img :src="item.src" aspect-ratio="1" class="grey lighten-2">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
export default {
  name: "Hero",
  data() {
    return {
      items: [
        {
          src: require('./foto1.jpg'),
          title: ""
        },
        {
          src: require('./foto2.jpg'),
          title: ""
        },
        {
          src: require('./foto3.jpg'),
          title: ""
        }
      ],
      grid: [
        {
          id: 1,
          src: require('./home1.jpg')
        },
        {
          id: 2,
          src: require('./home2.jpg')
        },
        {
          id: 3,
          src: require('./home3.jpg')
        },
        {
          id: 4,
            src: require('./home4.jpg')
        },
        {
          id: 5,
          src: require('./home5.jpg')
        },
        {
          id: 6,
         src: require('./home6.jpg')
        },
        {
          id: 7,
         src: require('./home7.jpg')
        },
        {
          id: 8,
          src: require('./home8.jpg')
        },
        {
          id: 9,
          src: require('./home9.jpg')
        }
      ]
    };
  }
};
</script>