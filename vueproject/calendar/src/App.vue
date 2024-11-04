<template>
  <div id="app" class="clander">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <!-- <DatePicker v-model="now"></DatePicker> -->
    <!-- <Calendar 
    ></Calendar> -->
    <Test></Test>
  </div>
</template>

<script>
// import { component } from 'vue/types/umd';
import Test from './components/test'
import DatePicker from'./components/date-picker';
import Calendar from'./components/Calendar';

export default {
  name: 'App',
  components:{
    Test,
    DatePicker,
    Calendar,
  },
  data(){
    return{
      now: new Date()
    }
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.calendar{
  width: 800px;
  height: 500px;
}
</style>
