<template>
    <div v-click-outside>
        <div class="input">
            <input type="text" :value="formatDate" >
        </div>
        <div class = "pannel" v-if="isVisible">
            <div class="pannel-nav">
                <span @click="prevYear">&lt;</span>
                <span @click="prevMonth">&lt;&lt;</span>
                <span>{{time.year}}</span>
                <span>{{time.month+1}}</span>
                <span  @click="nextMonth">&gt;&gt;</span>
                <span @click="nextYear">&gt;</span>
            </div>
            <div class="pannel-content">
                <div class="days">
                    <!-- 周几 -->
                    <span 
                        v-for="i in 7" :key="`_`+i"
                        class="cellday"
                    >
                        {{weekDays[i-1]}}
                    </span>
                    <!-- 直接列出一个 6*7 列表 -->
                    <!-- 选择日期的方法：chooseDate -->
                    <div v-for="i in 6" :key="i">
                        <span 
                        @click="chooseDate(visibeDays[(i-1)*7+(j-1)])"
                        class="cell"
                        v-for="j in 7" :key="j"
                        :class="[
                            {notCurrentMonth:!isCurrentMonth(visibeDays[(i-1)*7+(j-1)])},
                            {today:isToday(visibeDays[(i-1)*7+(j-1)])},
                            {select: isSelect(visibeDays[(i-1)*7+(j-1)])},
                        ]"
                        >
                            {{visibeDays[(i-1)*7+(j-1)].getDate()}}
                        </span>
                    </div>
                        
                    
                </div>
            </div>
            <div class="pannel-footer">
                今天
            </div>
        </div>
    </div>
</template>
<script>

import * as utils from"./js/util";

export default {
    directives:{
        clickOutside:{  //指令生命周期  @focus="focus" @blur="blur"
            bind(el,bindings,vnode){ //context
                    //把事件绑定给document，看一下点击的是否是当前元素内部
                    let hander = (e)=>{
                        if(el.contains(e.target)){
                            //判断当前面板是否已经显示出来
                            if(!vnode.context.isVisible){
                            vnode.context.focus();
                            // console.log('包含');
                            }
                        }else{
                            if(vnode.context.isVisible){
                            vnode.context.blur();
                            // console.log('不包含')
                            }
                        }
                    }
                    el.hander = hander;
                document.addEventListener('click',hander)
            },
            unbind(el){
                document.removeEventListener('click',el.hander)
            }
        }
    },
    data(){
        let {year,month} = utils.getYearMonthDay(this.value);
        return{
            isVisible:false,//这个变量控制面板是否可见
            time:{year,month},
            weekDays:['日','一','二','三','四','五','六']
        }
    },
    props:{
        value:{
            type:Date,
            default:()=>new Date()//返回的默认值必须是一个函数类型
        }
    },
    mounted(){
        console.log(this.visibeDays.week)
    },
    computed:{
        formatDate(){
            let {year,month,day} = utils.getYearMonthDay(this.value); 
            //getFullYear getMonth getDate
            return `${year}-${month+1}-${day}`
        },
        visibeDays(){
            //获取星期
            let {year,month} = utils.getYearMonthDay(utils.getDate(this.time.year,this.time.month,1));
            //获取月份第一天
            let currentFirstDay = utils.getDate(year,month,0);
            //获取当前是周几 把天数往后移动 几天
            let week = currentFirstDay.getDay();
            console.log(week);
            //当前开始天数
            let startDay = currentFirstDay - week*60*60*1000*24;
            //循环42天
            let arr = [];
            for(let i = 0;i<42;i++){
                arr.push(new Date(startDay+i*60*60*1000*24))
            }
            return arr;
        }

    },
    methods:{
        focus(){
            this.isVisible = true;
        },
        blur(){
            this.isVisible = false;
        },
        isCurrentMonth(date){//判断是否为当前月
            //从d传入值中的月和当前月是否相同
            let {year,month} = utils.getYearMonthDay(this.value);
            let {year:y,month:m} = utils.getYearMonthDay(date);
            return year === y && month ===m;
        },
        isToday(date){
            let {year,month,day} = utils.getYearMonthDay(new Date());
            let {year:y,month:m,day:d} = utils.getYearMonthDay(date);
            return year === y && month===m && day === d;
        },
        chooseDate(date){
            this.$emit('input',date);
            this.time = utils.getYearMonthDay(date);
        },
        isSelect(date){
            //获取当前年月日
            let {year,month,day} = utils.getYearMonthDay(this.value);
            let {year:y,month:m,day:d} = utils.getYearMonthDay(date);
            return year === y && month===m && day === d;
        },
        prevMonth(){
            let d=utils.getDate(this.time.year,this.time.month,1);
            d.setMonth(d.getMonth(d)-1);
            this.time = utils.getYearMonthDay(d);

        },
        nextMonth(){
            let d=utils.getDate(this.time.year,this.time.month,1);
            d.setMonth(d.getMonth(d)+1);
            this.time = utils.getYearMonthDay(d);
        },
        prevYear(){
            let y=utils.getDate(this.time.year,this.time.month,1);
            y.setFullYear(y.getFullYear(y)-1);
            this.time = utils.getYearMonthDay(y);

        },
        nextYear(){
            let y=utils.getDate(this.time.year,this.time.month,1);
            y.setFullYear(y.getFullYear(y)+1);
            this.time = utils.getYearMonthDay(y);
        }
    }
}
</script>
<style>

.pannel{
    position: absolute;
    background-color: #fff;
    box-shadow: 2px 2px 2px  pink,-2px -2px -2px pink;
    width: 60*7px;
    height: 60*7px;
}
.pannel .pannel-nav{
    display: flex;
    justify-content: space-around;
    height: 50px;
}
.pannel .pannel-nav span{
    cursor: pointer;
    user-select: none;
}
/* .panne .pannel-content{
    
} */
.pannel .pannel-footer{
    height: 50px;
    margin: 20px;
    text-align: center;
}
.pannel .pannel-content .cell{
    border: 1px solid;
    box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 60px;
    height: 60px;
}
.pannel .pannel-content .cell:hover{
    border: 1px solid pink;
    box-sizing: border-box;
}
.notCurrentMonth{
    color: gray;
}
.today{
    background: red;
    color: azure;
}
.pannel .pannel-content .cellday{
    border: 1px solid;
    box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 60px;
    height: 40px;
    background: cornflowerblue;
}
.pannel .pannel-content .cellday:hover,.select{
    border: 1px solid pink;
    
}
.input{
    margin: auto;
}

</style>