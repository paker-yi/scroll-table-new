<template>
    <div style="width: 100%">
        <div v-show="showUpload" class='flex-display'>
            <div class='left-box'>文件上传(input):</div>
            <input type='file' v-on:change='onChange' class='file-ipt' />
        </div>

    <!-- <el-upload action="#" :auto-upload="false" :on-change="onChange" accept=".xls,.xlsx">
        <el-button type="primary">上传excel</el-button>
    </el-upload> -->

    <!-- 表头 -->
    <div class="table-header">{{tableHeader}}</div>
    <div class="table-sub-header">{{tableSubHeader}}</div>
    <el-table
        v-loading="false"
        ref="scroll_table"
        :columns="columns"
        :data="showData"
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
    </div>
</template>

<script>
    import Vue from 'vue';
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    import { read, utils } from 'xlsx';


    Vue.use(ElementUI);
    export default {
    data() {
        return {
        showUpload: true,
        tableSubHeader:'',
        tableHeader: '',
        fileList: [], //上传文件列表
        tableHead: [], //表头
        tableData: [], // 表数据
        sheetList: [],
        sheetLength: 0,
        showData: [],
        columns: [],
        columnsList: [],
        currentSheetIndex: 0,
        };
    },
    mounted(){
        // this.screenListener()
    },
    methods: {
        // 合并单元格方法

        /**
         * 合并单元格
         * TableData:传递过来的表格数据
         * itemName：属性名
         * rowIndex：行索引值
         * */
        MergeCol: (TableData, itemName, rowIndex) => {
            // 合并单元格
            // id：属性名
            // rowIndex：行索引值
            var idName = TableData[rowIndex][itemName]; // 获取当前单元格的值
            if (rowIndex > 0) {
            // 判断是不是第一行
            // eslint-disable-next-line eqeqeq
            if (TableData[rowIndex][itemName] != TableData[rowIndex - 1][itemName]) {
                // 先判断当前单元格的值是不是和上一行的值相等
                var i = rowIndex;
                var num = 0; // 定义一个变量i，用于记录行索引值并进行循环，num用于计数
                while (i < TableData.length) {
                // 当索引值小于table的数组长度时，循环执行
                if (TableData[i][itemName] === idName) {
                    // 判断循环的单元格的值是不是和当前行的值相等
                    i++; // 如果相等，则索引值加1
                    num++; // 合并的num计数加1
                } else {
                    i = TableData.length; // 如果不相等，将索引值设置为table的数组长度，跳出循环
                }
                }
                return {
                rowspan: num, // 最终将合并的行数返回
                colspan: 1,
                };
            } else {
                return {
                rowspan: 0, // 如果相等，则将rowspan设置为0
                colspan: 1,
                };
            }
            } else {
            // 如果是第一行，则直接返回
            let i = rowIndex;
            let num = 0;
            while (i < TableData.length) {
                // 当索引值小于table的数组长度时，循环执行
                if (TableData[i][itemName] === idName) {
                i++;
                num++;
                } else {
                i = TableData.length;
                }
            }
            return {
                rowspan: num,
                colspan: 1,
            };
            }
        },

        //  读取文件成功后，全屏显示，隐藏上传按钮
        changeFullscreen() {
            var docElm = document.documentElement;
            //W3C
            if(docElm.requestFullscreen) {
            docElm.requestFullscreen();
            }

            //FireFox
            else if(docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
            }

            //Chrome等
            else if(docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
            }

            //IE11
            else if(elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
            }
            this.showUpload = false

        },
        //  设置自动滚动
        autoScroll(stop){
        
        const table = this.$refs.scroll_table
        
        // 拿到表格中承载数据的div元素
        const divData = table.$refs.bodyWrapper
        
        // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果
        if(stop){
            window.clearInterval(this.scrolltimer)
        }else{
            this.scrolltimer = window.setInterval(()=>{
            //  元素自增距离顶部1像素
            divData.scrollTop += 1
            // console.log('scroll',divData.scrollTop);

            //  判断元素是否滚动到底部
            // console.log(divData.clientHeight + divData.scrollTop, divData.scrollHeight);
            
            if (divData.clientHeight + divData.scrollTop == divData.scrollHeight - 0.25) {
                //  重置table距离顶部距离
                divData.scrollTop = 0
                //  更改sheet数据
                this.changeData()

            }
            }, 50)// 滚动速度
        }
        },
        //  更改展示数据
        changeData(){
            const newIndex = (this.currentSheetIndex + 1)%this.sheetLength
            if (this.sheetList.length>0) {
                this.columns = this.columnsList[newIndex]
                this.tableHeader = this.sheetList[newIndex].name
                this.showData = this.sheetList[newIndex].dataList
                this.currentSheetIndex = newIndex
            }

        },
        //  读取文件
        onChange(e) {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = ev => {
            try {
            const data = ev.target.result;
            const workbook = read(data, { type: 'binary' });
            const params = [];
            // 取对应表生成json表格内容
            workbook.SheetNames.forEach(item => {
                params.push({
                name: item,
                dataList: utils.sheet_to_json(workbook.Sheets[item])
                });
                this.tableData.push(utils.sheet_to_json(workbook.Sheets[item]));
            });
            

            // 该算法仅针对表头无合并的情况
            if (this.tableData.length > 0) {
                this.sheetLength = this.tableData.length
                // 获取excel中第一个表格数据tableData[0][0]，并且将表头提取出来
                for (let i = 0; i < this.tableData.length; i++) {
                    
                    const columns = []
                    const element = this.tableData[i]
                    for (const key in this.tableData[i][0]) {
                        const column = {
                            label: key,
                            prop: key,
                        }
                        columns.push(column)
                    }
                    // for (let i = 0; i < columns.length; i++) {
                    //     const element = columns[i];
                    //     element.width = 100/columns.length + '%'
                    // }
                    this.columnsList.push(columns)
                }
                
                for (const key in this.tableData[0][0]) {
                this.tableHead.push(key);
                }
            }            
            //  存放全部sheet数据
            this.sheetList = JSON.parse(JSON.stringify(params))
            
            this.sheetLength = params.length
            
            if(params.length > 0){
                this.columns = this.columnsList[0]
                this.tableHeader = params[0].name
                this.showData = params[0].dataList
            }
            this.changeFullscreen()
            //  赋值sheetName
            return params;
            // 重写数据
            } catch (e) {
            console.log('error:' + e);
            return false;
            }
        };
        
        fileReader.readAsBinaryString(file);
        },
        handleChange(res, file, fileList) {
            // 将文件放入
            for (let i = 0; i < fileList.length; i++) {
                if (file.name != fileList[i].name) {
                this.fileList.push({
                    name: file.name,
                    url: '',
                    uid: file.uid
                });
                }
            }
            // this.fileList = fileList.slice(-3);
            const files = { 0: file };
            this.readExcel(files);
        },
        readExcel(file) {
        const fileReader = new FileReader();
            fileReader.onload = ev => {
                try {
                const data = ev.target.result;
                const workbook = read(data, { type: 'binary' });
                const params = [];
                
                // 取对应表生成json表格内容
                workbook.SheetNames.forEach(item => {
                    params.push({
                    name: item,
                    dataList: utils.sheet_to_json(workbook.Sheets[item])
                    });
                    this.tableData.push(utils.sheet_to_json(workbook.Sheets[item]));
                });
                // 该算法仅针对表头无合并的情况
                if (this.tableData.length > 0) {
                    // 获取excel中第一个表格数据tableData[0][0]，并且将表头提取出来
                    for (const key in this.tableData[0][0]) {
                    this.tableHead.push(key);
                    }
                }
                return params;
                // 重写数据
                } catch (e) {
                console.log('error:' + e);
                return false;
                }
            };
            fileReader.readAsBinaryString(file[0].raw);
        },
        //  获取表头方法
        getColumns(dataList){
            if (dataList) {
                let columns = []
                for (let i = 0; i < dataList.length; i++) {
                    const item = dataList[i];
                    const column = {
                        label: item,
                        prop: item,
                        width: item.length * 20
                    }
                    columns.push(column)
                }
                return columns
            }else{
                return []
            }
        },
        screenListener(){
            document.addEventListener('fullscreenchange', this.showInput);  
            },
        showInput(){
            console.log(111111);
            
            if (document.fullscreenElement) {  
                console.log('全屏模式已开启'); 
                this. showUpload = false
            } else {  
                console.log('全屏模式已关闭');  
                this.showUpload = true
            } 
        }
    }
};
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

<style lang="scss" scoped>
.upload-demo {
  width: 100%;
}
.flex-display {
  margin: 50px 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  .left-box {
    margin: 20 30;
    height: 36px;
    line-height: 36px;
  }
}
.el-upload {
  margin-left: 40px;
  .el-btn {
    font-size: 16px;
  }
  .el-upload-tip {
    display: inline;
    font-size: 12px;
  }
}
.file-ipt {
  width: 200px;
  height: 36px;
  line-height: 36px;
  button {
    background-color: #409eff;
  }
}
input #file-upload-button {
  background-color: #409eff;
}
</style>