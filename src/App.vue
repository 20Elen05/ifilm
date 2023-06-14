<template>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=BIZ+UDPMincho&family=Satisfy&family=Square+Peg&display=swap" rel="stylesheet">
  </head>
  <standart v-if="$route.path == '/'"></standart>
  <router-view v-if="$route.name == 'movie'"/>
  <router-view v-if="$route.name == 'search'"/>
</template>

<script>

import standart from './components/standart.vue'

export default {
  name: 'App',
  components: {
    standart,
  }
}
</script>

<style>
@font-face {
  font-family: 'MonserratNormal';
  src: url('./assets/Montserrat-Medium.ttf') format('truetype'); 
}

@font-face {
  font-family: 'MonserratLight';
  src: url('./assets/Montserrat-Light.ttf') format('truetype'); 
}

a{
  text-decoration: none !important;
}

body{
  background-color: #18191a;
  font-family: MonserratNormal;
  color: white;
}

ul {
  list-style: none !important;
}

ul > li > button {
  color: white;
  background-color: unset !important;
  border: unset !important;
}

ul {
  background-color: unset !important;
}

.bg-white {
   background-color: unset !important; /*CHJNJES */
}

</style>