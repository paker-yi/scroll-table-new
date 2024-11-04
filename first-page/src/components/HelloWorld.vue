<template>
  <div>
    <Envelope v-if="showEnvelope"></Envelope>
    <Content v-if="showContent"></Content>
  </div>
  <!-- <div class="hello">
    <button @click="changeView">打开</button>
    <Envelope v-if="showEnvelope"></Envelope>
    <Content></Content>
  </div> -->
</template>

<script>
import Envelope from "./Envelope.vue";
import Content from "./ContentNew.vue";
export default {
  name: "HelloWorld",
  components: {
    Envelope,
    Content,
  },
  data() {
    return {
      showEnvelope: false,
      showContent: true,
      msg: "Welcome to Your Vue.js App",
    };
  },
  methods: {
    changeView() {
      this.showEnvelope = !this.showEnvelope;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
