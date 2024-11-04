<template>
  <div>
    <!-- 文件导入组件 -->
    <template>
    <!-- 上传按钮 -->
    <!-- <template> -->
      <!-- <div>
        <div class="flex-display">
          <div class="left-box">表格上传(ElementUI):</div>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="handleChange"
            :file-list="fileList"
            class="el-upload"
          >
            <el-button size="small" type="primary" class="el-btn"
              >点击上传</el-button
            >
            <div slot="tip" class="el-upload-tip">
              只能上传xlsx文件,且不超过5MB
            </div>
          </el-upload>
        </div>
        <el-table v-if="tableHead.length" :data="tableData[0]" style="width: 100%">
          <el-table-column
            v-for="(data, key) in tableHead"
            :prop="data"
            :label="data"
            :key="key"
            width="180"
          >
          </el-table-column>
        </el-table>
        <div class="flex-display">
          <div class="left-box">文件上传(input)：</div>
          <input type="file" v-on:change="onChange" class="file-ipt" />
        </div>
      </div> -->
      <br/>
    <!-- </template> -->
      <el-upload action="#" :auto-upload="false" :on-change="handleFileSelect" accept=".xls,.xlsx">
        <el-button type="primary">上传excel</el-button>
      </el-upload>

      <!-- 新的导入方法 -->
      <!-- <el-button v-waves :loading='downloadLoading' class='filter-item' type='primary' icon='el-icon-download' @click='daoru'>
        导入
      </el-button> -->
      <el-dialog title="导入文件" :visible.sync="excelImportShow">
        <a href="javascript:;" rel="external nofollow"  class="file">
          <input id="upload" type="file" @change="importfxx(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        </a>
        <div id="demo"></div>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="excelImportShow = false">取消</el-button>
          <el-button type="primary" @click.native="submit">提交</el-button>
        </div>
      </el-dialog>
    <!-- 表格 -->

    <!-- 表头 -->
    <div class="table-header">{{tableHeader}}</div>
    <div class="table-sub-header">{{tableSubHeader}}</div>
      <el-table
        v-loading="false"
        ref="scroll_table"
        :columns="columns"
        :data="tableData"
        style="width: 100%"
        width="100%"
        max-height="500px"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
        empty-text="暂无数据..."
        @mouseenter.native="autoScroll(true)"
        @mouseleave.native="autoScroll(false)"
      >
        <el-table-column
          v-for="item in columns" 
          :key="item.index"
          sortable
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
        </el-table-column>
      </el-table>
    </template>





    <vue-seamless-scroll :data="tableData" class="warp">
      <ul class="item">
        <li v-for="(item, index) in tableData" :key="index">
          <span class="title" v-text="item.prop"></span>
          <span class="date" v-text="item.date"></span>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import * as xlsx from 'xlsx'
// import fileExcel from "@/assets/excelFile/data.xlsx"

// // 表格数据
// const tableData = ref([])
// // 表格标题
// const columns = ref([])



const handleFileSelect = (event) => {
  const { name, raw: file } = event
  console.log('文件名称', name)

  const reader = new FileReader()
  // 处理文件内容
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result)
    // 获取表格中所欲 Sheet
    const workbook = xlsx.read(data, { type: 'array' })
    // 获取第一个sheet
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]

    // 获取所有数据
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 })

    const _dataTable = []
    // 获取文件标题
    let headers = jsonData[0]
    // 设置表格标题
    const _columns = []
    headers.forEach((item) => {
      console.log(1, item.length)

      _columns.push({
        label: item,
        prop: item,
        width: item.length * 20
      })
    })

    // 设置对应标题数据
    jsonData.slice(1).forEach((row) => {
      const rowData = row.reduce((accumulator, item, index) => {
        let column = headers[index]
        accumulator[column] = item
        return accumulator
      }, {})
      // 更新标题

      // 赋值所有数据
      _dataTable.push(rowData)
    })

    columns.value = [..._columns]

    // 赋值表格数据
    this.tableData = [..._dataTable]
  }
  // 读取文件内容
  reader.readAsArrayBuffer(file)
}

export default {
  name: 'HelloWorld',
  components:{
    'vue-seamless-scroll': vueSeamlessScroll
  },
  props: {
    msg: String
  },
  data () {
      return {
        fileList: [], //上传文件列表
        tableHead: [], //表头
        tableData: [], // 表数据
        /**
         * 分隔符
         */
        scrolltimer: null,
        // tableData: [],
        //  中文标题
        tableHeader: "爆发力测试 ———— 坐姿胸推传球 （男子 < 14岁）",
        // 英文标题
        tableSubHeader: "Power Test ———— Seated Chest Press （Mela < 14 Years Old）",
        // 表头
        columns: [],

        listData: [{
          'title': '无缝滚动第一行无缝滚动第一行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第二行无缝滚动第二行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第三行无缝滚动第三行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第四行无缝滚动第四行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第五行无缝滚动第五行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第六行无缝滚动第六行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第七行无缝滚动第七行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第八行无缝滚动第八行',
          'date': '2017-12-16'
        }, {
          'title': '无缝滚动第九行无缝滚动第九行',
          'date': '2017-12-16'
        }],
      }
    },
  mounted(){
    console.log(11111)
  },
  methods:{
    //  设置自动滚动
    autoScroll(stop){
      console.log(stop);
      
      const table = this.$refs.scroll_table
      console.log(table);
      
      // 拿到表格中承载数据的div元素
      const divData = table.$refs.bodyWrapper
      console.log(divData);
      
      // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果
      if(stop){
        
        window.clearInterval(this.scrolltimer)
      }else{
        this.scrolltimer = window,setInterval(()=>{
          //  元素自增距离顶部1像素
          divData.scrollTop += 1
          //console.log('scroll',divData.scrollTop);

          //  判断元素是否滚动到底部
          if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
            //  重置table距离顶部距离
            divData.scrollTop = 0
            //  更改sheet数据


          }
        }, 150)// 滚动速度
      }
    },
    //  获取文件数据方法
    handleFileSelect(event) {
      const { name, raw: file } = event
      console.log('文件名称', name)

      const reader = new FileReader()
      // 处理文件内容
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        // 获取表格中所欲 Sheet
        const workbook = xlsx.read(data, { type: 'array' })
        // 获取第一个sheet
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]

        // 获取所有数据
        const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 })

        const _dataTable = []
        // 获取文件标题
        let headers = jsonData[0]
        // 设置表格标题
        const _columns = []
        headers.forEach((item) => {
          console.log(1, item.length)

          _columns.push({
            label: item,
            prop: item,
            width: item.length * 20
          })
        })

        // 设置对应标题数据
        jsonData.slice(1).forEach((row) => {
          const rowData = row.reduce((accumulator, item, index) => {
            let column = headers[index]
            accumulator[column] = item
            return accumulator
          }, {})
          // 更新标题

          // 赋值所有数据
          _dataTable.push(rowData)
        })

        this.columns = [..._columns]
        

        // 赋值表格数据
        this.tableData = [..._dataTable]
        console.log(this.tableData);
        
      }
      // 读取文件内容
      reader.readAsArrayBuffer(file)
      this.$forceUpdate()
    },
    //  导入多sheet方法
          // 导入
    
  }
}
</script>

<style lang="scss" scoped>
  .table-header{
    font-size: 40px;
  }
  .table-sub-header{
    font-size: 30px;
  }
  .warp {
    height: 270px;
    width: 360px;
    margin: 0 auto;
    overflow: hidden;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      li,
      a {
        display: block;
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
      }
    }
  }
</style>

