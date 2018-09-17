<template>
	<!-- 详情页面展示-->
  <div>
  <el-button v-if="isEdit?true:false"  size="mini" type="primary" icon="el-icon-plus"  @click="handleAdd" style="float: right">新增</el-button>
	<el-table ref="table" 
    :data="items" 
    style="width: 100%" 
    :show-header="isEdit?true:false">
    <el-table-column label="时间段" width="180" :formatter='TimeSoltFormat'></el-table-column>
    <el-table-column prop="CONTENT" label="内容"> </el-table-column>
    <el-table-column label="操作" v-if="isEdit?true:false" width="180">
      <template slot-scope="scope">
        <el-button
          v-if='!scope.row.editFlag'
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          v-if='!scope.row.editFlag'
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :title="dialogTitle+'简历事项'" :visible.sync="dialogFormVisible" :show-close=false @close="dialogClose">
    <el-form label-position="right" inline class="demo-table-expand" label-width="35%" size="small">
      <el-form-item label="开始时间：">
            <el-date-picker
                v-model="formdata.STARTTIME"
                type="month"
                placeholder="选择日期"
                value-format="yyyy-MM-dd hh:mm:ss">
              </el-date-picker>  
      </el-form-item>
      <el-form-item label="结束时间：">
            <el-date-picker
                v-model="formdata.ENDTIME"
                type="month"
                placeholder="选择日期"
                value-format="yyyy-MM-dd hh:mm:ss">
              </el-date-picker>  
      </el-form-item>
      <el-form-item label="内容：">
          <el-input type="textarea" v-model="formdata.CONTENT"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import {isEmpty,getfullyear,getmonth,parseTime } from '@/utils'
import { getUserInfo,updateRESUME,deleteRESUME } from '@/api/person'
export default {
  name: 'experienceitem',
  props:["isEdit","itemData","personID"],
  data(){
  	return {
        formdata:{},
        items:[],
        isAdd:'',
        dialogFormVisible:false,    
  	}
  },
  computed:{
    dialogTitle:function(){
      var title = ''
      if(this.isAdd){
        title = "新增"
      }else{
        title = "编辑"
      }
      return title
     }
  },
  watch: {
    itemData: function (val) {
      const data = JSON.parse(val)
      const experienceData = data.RESUME
      if(experienceData.length>0){
        for(var i=0;i<experienceData.length;i++){
          experienceData[i].STARTTIME = parseTime(experienceData[i].STARTTIME,"{y}-{m}")
          experienceData[i].ENDTIME = parseTime(experienceData[i].ENDTIME,"{y}-{m}")     
        }          
      }

      this.items = experienceData
    }
  },
  methods:{
    setUserInfo(){
      getUserInfo(this.personID).then(response => {
          //this.itemData = JSON.stringify(response.obj)
          this.$emit('datachange',JSON.stringify(response.obj))
      })
    },  
    handleEdit(index, row) {
      //this.$refs.table.toggleRowExpansion(row,true);
      this.isAdd=false
      this.dialogFormVisible = true
      const rowString = JSON.stringify(row)
      this.formdata = JSON.parse(rowString)
    },
    handleAdd(index,row){
      this.isAdd = true
      this.formdata.ID = 0
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      
      this.$confirm('确定删除该记录吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
      }).then(() => {
        deleteRESUME(row.ID).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          });
          this.setUserInfo()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleCancel(index, row) {
      this.dialogFormVisible = false
    },
    handleSave(index, row){
        //保存数据，向后台取数据
      this.formdata.STARTTIME = parseTime(this.formdata.STARTTIME,"{y}-{m}-{d} {h}:{i}:{s}")
      this.formdata.ENDTIME = parseTime(this.formdata.ENDTIME,"{y}-{m}-{d} {h}:{i}:{s}")
      this.formdata.BASEINFOID = this.personID
      updateRESUME(this.formdata).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        });
        this.dialogFormVisible = false
        this.setUserInfo()
      }) 
    },
    TimeSoltFormat(row, column, cellValue, index){
        return parseTime(row.STARTTIME,"{y}-{m}")+"-"+parseTime(row.ENDTIME,"{y}-{m}")
    },
    dialogClose(){
      this.formdata ={}
    }
  }
}
</script>
<style>
/*.cell-edit-input .el-input, .el-input__inner {
  width:100px;
}
.cell-icon{
  cursor:pointer;
  color:#fff;
}*/

</style>

