<template>
  <div id="test" >
    <Anchor :items="items" :classname="classname" :idname="idname" :scrollT= scrollT></Anchor>
    <div @scroll="handleScroll" ref="content" class="scroll">
      <div class="test">哎呀</div>
      <div class="test">哎呀</div>
      <div class="test">哎呀</div>
      <div class="test">哎呀</div>
      <div class="test">哎呀</div>
      <div class="test">哎呀</div>
    </div>
  </div>
</template>

<script>
import Anchor from "./Anchor";
export default {
  components: {
    Anchor,
  },
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6],
      idname: "test",
      classname: "test",
      scrollT:0
    };
  },
  methods:{
      handleScroll (el) {
          debugger
        this.scrollT = this.$refs.content.scrollTop
        console.log(this.scrollT)
      },
  }
};
</script>

<style>
.test {
  height: 500px;
  width: 500px;
  border: 1px solid;
}
.scroll{
    overflow-y: scroll;
}
</style>