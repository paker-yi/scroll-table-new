<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ScrollTable></ScrollTable>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ScrollTable from "./components/scrollTable.vue"

export default {
  name: 'App',
  components: {
    HelloWorld,
    ScrollTable
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
