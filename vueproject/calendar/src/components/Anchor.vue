<template>
  <div class="anchor">
    
    <div
      style="padding:0 20px;left:20px"
      v-for="(item, index) in items"
      :key="index"
      @click="jump(index)"
      :class="{ select: index == activeStep }"
    >
      <div :class="{'bar':index == activeStep}"></div>{{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    classname: {
      type: String,
      default: "",
    },
    inname: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      scrollT:1000,
      activeStep: 0,
    };
  },
  mounted: function () {
    this.$nextTick(function () {
      window.addEventListener("scroll", this.onScroll);
    });
  },
  methods: {
    onScroll() {
      let _article = document.querySelectorAll("." + this.classname);
    //   console.log(_article)
      _article.forEach((item, index) => {
        if (this.scrollT >= item.offsetTop) {
          this.activeStep = index;
        }
        // if (index*500 >= item.offsetTop) {
        //   this.activeStep = index;
        //   console.log("off"+item.offsetTop)
        //   console.log("ind"+index*500)
        //   console.log(this.activeStep)
        // }
      });
    },
    jump(index) {
      // 用 class="d_jump" 添加锚点
      let jump = document.querySelectorAll("." + this.classname);
      let total = jump[index].offsetTop;
      let distance =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50;
      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
        smoothUp();
      }
      function smoothDown() {
        if (distance < total) {
          distance += step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          window.pageYOffset = distance;
          setTimeout(smoothDown, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
          window.pageYOffset = total;
        }
      }
      function smoothUp() {
        if (distance > total) {
          distance -= step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          window.pageYOffset = distance;
          setTimeout(smoothUp, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
          window.pageYOffset = total;
        }
      }
    },
  },
};
</script>

<style>
.select {
  color: brown;
}
.anchor{
    position: fixed;
    left: 50px;
    top: 0;
    border-left: 1px solid;
}
.bar{
    display: inline-block;
    position: relative;
    height: 10px;
    width: 10px;
    background-color: chartreuse;
    left: -25px;
    /* top: 15px; */
}
</style>