<template>
    <div style="width: 100%">
        <div v-show="showUpload" class='flex-display'>
            <div class='left-box'>文件上传(input):</div>
            <input type='file' v-on:change='onChange' class='file-ipt' />
        </div>
    <!-- 表头 -->
    <div class="table-header">{{tableHeader}}</div>
    <div class="table-sub-header">{{tableSubHeader}}</div>
    <!-- 数据展示表头 -->
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
        :span-method="handleSpanMethod"
        empty-text="暂无数据..."
        @mouseenter.native="autoScroll(true)"
        @mouseleave.native="autoScroll(false)"
      >
      <el-table-column
        v-if="firstColumn"
        :prop="firstColumn[0].prop"
        :label="firstColumn[0].label"
        style="width: 100%"
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
        </el-table-column>
        <!--  -->
        <template   slot="append">
             <el-table style="width:100%">
                <!-- 合并的表头 -->
                <el-table-column
                    :colSpan=2
                    prop="date"
                    label="第一表头"
                    >
                </el-table-column>
                <el-table-column
                    :colSpan=0
                    prop="date"
                    label=""
                    >
                </el-table-column>
                <!-- 拆分单元格的表头 -->
                <el-table-column
                    :rowSpan=0
                    prop="date"
                    label=""
                    >
                    <el-table-column
                        :rowSpan=0
                        prop="date"
                        label=""
                        >
                        <el-table-column
                            :rowSpan=0
                            prop="date"
                            label=""
                            >
                            
                        </el-table-column>
                        
                    </el-table-column>
                    <el-table-column
                        :rowSpan=0
                        prop="date"
                        label=""
                        >
                        <el-table-column
                            :rowSpan=0
                            prop="date"
                            label=""
                            >
                            
                        </el-table-column>
                        
                    </el-table-column>

                </el-table-column>


            </el-table>
        </template>
      </el-table>
      <!-- 展示 -->
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
        dataStartIndex: 1,//   从第二位开始
        firstColumn: null,
        firstColumnList: [],
        firstColumn: null,
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
        spanArr: [],
        pos: 0,
        };
    },
    mounted(){
        // this.screenListener()
    },
    methods: {
        // 设置合并行
        setrowspans() {
            const columns = JSON.parse(JSON.stringify(this.columns)); // 需要合并的列名
            // 为每个需要合并的列设置默认 rowspan 
            this.showData.forEach(row => {
                columns.forEach(col => {
                    row[col + 'Rowspan'] = 1; // 例如：row['name1Rowspan'] = 1
                });
            });

            columns.forEach((col, index) => {
                for (let i = 0; i < this.showData.length; i++) {
                    // 这里进行判断
                    // 如果当前行的列数据和下一行的列数据相等
                    // 就把当前rowspan + 1，下一行的rowspan - 1
                    for (let j = i + 1; j < this.showData.length; j++) {
                        if (this.showData[i][col] === this.showData[j][col]) {
                            this.showData[i][col + 'Rowspan']++;
                            this.showData[j][col + 'Rowspan']--;
                        } else {
                            break; // 如果不相等，跳出循环，因为已经没有相同的了
                        }
                    }
                    // 这里跳过已经重复的数据
                    i = i + this.showData[i][col + 'Rowspan'] - 1;
                }
            });
        },

        // 合并行
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            // 根据列索引决定合并哪一列
            if (columnIndex === 1 || columnIndex === 3) { // 这里可能需要调整，根据你实际的列数
                return {
                    rowspan: row[column.property + 'Rowspan'],
                    colspan: 1
                };
            }
        }, 

        handleSpanMethod({
        row, // 行
        column, // 列
        rowIndex, // 行索引
        columnIndex, // 列索引
        }) {
            if (columnIndex === 0 || columnIndex === 1) {
                // 获取当前单元格的值
                const currentValue = row[column.property];
        
                // 获取上一行相同列的值
                const preRow = this.showData[rowIndex - 1];
                const preValue = preRow ? preRow[column.property] : null;
        
                // 如果当前值和上一行的值相同，则将当前单元格隐藏
                if (currentValue === preValue) {
                return {
                rowspan: 0, colspan: 0 };
                    } else {
                    // 否则计算当前单元格应该跨越多少行
                    let rowspan = 1;
                    for (let i = rowIndex + 1; i < this.tableData.length; i++) {
                        const nextRow = this.tableData[i];
                        const nextValue = nextRow[column.property];
                        if (nextValue === currentValue) {
                        rowspan++;
                        } else {
                        break;
                        }
                    }
                    return {
                    rowspan, colspan: 1 };
                }
            }
        },

        objectSpanMethod({row, column, rowIndex, columnIndex}){
            console.log(row, column, rowIndex, columnIndex);

            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                
            }
            
        },
        // 合并单元格方法
        getSpanArr(data) {
            //  计算rowSpan
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                
            }
        },
        handleSpan ({ row, column, rowIndex, columnIndex }){
            //只合并列字段为date的行
            if (columnIndex === 0 ) {
                return {
                    //将需要合并的行数赋值给 _row，注意这里由上一个方法的输出[1,1,2,0]可以知道，
                    rowspan: this.spanArr[rowIndex],
                    //colspan有两种情况要不是0不显示，要不是1显示，根据rowspan（ _row）来确定；
                    colspan: _row > 0 ? 1 : 0
                }
            }
        },


        /** 
         * 分隔符
         * 
         * 
         * 分隔符
         * 
        */

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
            
            if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
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
            // console.log('workbook', workbook);
            
            const params = [];
            // 取对应表生成json表格内容
            workbook.SheetNames.forEach(item => {
                console.log('读取到的数据：', utils.sheet_to_json(workbook.Sheets[item]));
                
                const {firstColumnList, columnList, tableData} = this.getHeadersAndData(utils.sheet_to_json(workbook.Sheets[item]))
                // console.log('columns:', columnList, 'data', tableData, 'firstColumnList', firstColumnList);
                
                params.push({
                name: item,
                dataList: tableData
                });
                this.firstColumnList.push(firstColumnList)
                this.columnsList.push(columnList)
                this.tableData.push(tableData);
            });        


            // 该算法仅针对表头无合并的情况
            //  存放全部sheet数据
            this.sheetList = JSON.parse(JSON.stringify(params))
            
            this.sheetLength = params.length
            
            if(params.length > 0){
                console.log('表头', this.columnsList[0]);
                
                this.columns = this.columnsList[0]
                this.tableHeader = params[0].name
                
                
                this.showData = this.tableData[0]
                console.log('展示数据',this.showData);
                
                console.log('第一表格头',this.firstColumnList[0]);
                
                this.firstColumn = this.firstColumnList[0]
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
        getHeadersAndData(data){
            //  增加获取最后两行数据
            // console.log('提取表头', data);
            const oldKey = [];
            const columnList = []
            const firstColumnList = []
            const firstColumnListTemp = []
            const tableData = []
            let rowSpan = 0
            if (data.length > 0) {
                const element = data[0]
                for (const key in element) {
                        const column = {
                            label: key,
                            prop: key
                        }
                        rowSpan++
                    firstColumnListTemp.push(column)
                }
                //  计算行扩展长度
                firstColumnListTemp[0].rowspan = rowSpan
                //  取第一个可以当返回数据
                firstColumnList.push(firstColumnListTemp[0])
            }
            console.log('firstColumnList', firstColumnList);
            
            for (let i = 0; i < data.length; i++) {
                const element = data[i]

                if (i<this.dataStartIndex) {
                    for (const key in element) {
                        if (Object.prototype.hasOwnProperty.call(element, key)) {
                            const item = element[key];
                            oldKey.push(key)
                                const column = {
                                    label: item,
                                    prop: item
                                }
                            columnList.push(column)
                        }
                    }
                }else if (i>this.dataStartIndex && i <data.length-2){
                    
                    const tableItem = {}
                    for (let j = 0; j < oldKey.length; j++) {
                        const key = oldKey[j];
                        const prop = columnList[j].prop
                        // console.log('prop:',prop, 'key:', key, 'value:', element[key]);
                        
                        tableItem[prop] = element[key]
                    }                    
                    tableData.push(tableItem)

                }else if (i>this.dataStartIndex && i >=data.length-2) {
                    console.log('i',i,'data.length',data.length);

                    //  处理最后两行数据
                    console.log('最后两行：', element);
                    //  生成第二表表头
                }
            }
            // console.log('tableData', tableData);
            
            // console.log('columnList', columnList);
            return {
                columnList: columnList,
                tableData:tableData,
                firstColumnList: firstColumnList
            }
        },

        //  分割表格数据方法
        getTableData(data){
            console.log('提取表格数据', data);
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