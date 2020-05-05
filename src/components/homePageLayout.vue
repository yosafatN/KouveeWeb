<template>
  <v-app>
    <v-app-bar app color="#f37900" class="white--text" height="75">
      <v-toolbar-title class="font-weight-medium display-1">
        <span class="ml-5">Kouvee Petshop</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-toolbar-items>
        <v-btn text router to="/">Home</v-btn>
      </v-toolbar-items>
      
      <v-toolbar-items>
        <v-btn text router to="/aboutUs">About Us</v-btn>
      </v-toolbar-items>

      <v-toolbar-items>
        <v-btn text router to="/signDual">Admin</v-btn>
      </v-toolbar-items>

      <v-toolbar-items>
        <v-btn text router to="/loginCs">Customer Service</v-btn>
      </v-toolbar-items>

      <v-toolbar-items>
        <v-btn text router to="/loginKasir">Kasir</v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<style lang="scss" scoped>
.v-btn {
  color: white;
}
</style>

<script>
export default {
 name: 'app'
}
</script>