<template>
	<!-- 详情页面展示-->
  <div>
  <el-button v-if="isEdit?true:false"  size="mini" type="primary" icon="el-icon-plus"  @click="handleAdd"></el-button>
	<el-table ref="table" 
    :data="items" 
    style="width: 100%" 
    :show-header="isEdit?true:false"
    :row-key="getRowKeys"
    :expand-row-keys="expands"
    @current-change="toggleExpansion">
    <el-table-column v-if="isEdit?true:false" type="expand" width="30">
      <template slot-scope="props">
        <el-form label-position="right" inline class="demo-table-expand" label-width="35%" size="small">
          <el-form-item label="开始时间：">
            <span v-if="!props.row.editFlag">{{ props.row.STARTTIME}}</span>
            <span v-else>
               <el-date-picker
                v-model="formdata.STARTTIME"
                type="month"
                placeholder="选择日期"
                value-format="yyyy-MM-dd 00:00:00">
              </el-date-picker>  
            </span>
          </el-form-item>
          <el-form-item label="结束时间：">
            <span v-if="!props.row.editFlag">{{ props.row.ENDTIME }}</span>
            <span v-else>
               <el-date-picker
                v-model="formdata.ENDTIME"
                type="month"
                placeholder="选择日期"
                value-format="yyyy-MM-dd 00:00:00">
              </el-date-picker>  
            </span>
          </el-form-item>
          <el-form-item label="内容：">
            <span v-if="!props.row.editFlag">{{ props.row.CONTENT }}</span>
            <span v-else>
              <el-input type="textarea" v-model="formdata.CONTENT"></el-input>
            </span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="时间段" width="180" :formatter="dateFormat"></el-table-column>
    <el-table-column prop="CONTENT" label="内容"> </el-table-column>
    <el-table-column label="操作" v-if="isEdit?true:false">
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
        <el-button
          v-if='scope.row.editFlag'
          size="mini"
          type="success"
          @click="handleSave(scope.$index, scope.row)">保存</el-button>
        <el-button
          v-if='scope.row.editFlag'
          size="mini"
          @click="handleCancel(scope.$index, scope.row)">取消</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="新增简历事项" :visible.sync="dialogFormVisible" :show-close=false >
    <el-form label-position="right" inline class="demo-table-expand" label-width="35%" size="small">
      <el-form-item label="开始时间：">
            <el-date-picker
                v-model="formdata.STARTTIME"
                type="month"
                placeholder="选择日期"
                value-format="yyyy-MM-dd 00:00:00">
              </el-date-picker>  
      </el-form-item>
      <el-form-item label="结束时间：">
            <el-date-picker
                v-model="formdata.ENDTIME"
                type="month"
                placeholder="选择日期"
                value-format="yyyy-MM-dd 00:00:00">
              </el-date-picker>  
      </el-form-item>
      <el-form-item label="内容：">
          <el-input type="textarea" v-model="formdata.CONTENT"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false;formdata={}">取 消</el-button>
      <el-button type="primary" @click="handleADDSave">保存</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import {isEmpty,getfullyear,getmonth,parseTime } from '@/utils'
import { updateRESUME,deleteRESUME } from '@/api/person'
export default {
  name: 'experienceitem',
  props:["isEdit","personID","itemData"],
  data(){
  	return {
        formdata:{},

        test:[],
        expands: [],
        dialogFormVisible:false,
        getRowKeys(row) {
            return row.id;
        }     
  	}
  },
  computed:{
    items: function(){
      if(this.test.length>0){
        for(var i=0;i<this.test.length;i++){
          this.test[i].editFlag = false
          this.test[i].STARTTIME = parseTime(this.test[i].STARTTIME,"{y}-{m}")
          this.test[i].ENDTIME = parseTime(this.test[i].ENDTIME,"{y}-{m}")     
        }          
      }
      return this.test
    }
  },
  watch: {
    itemData: function (val) {
      const data = JSON.parse(val)
      const experienceData = data.RESUME
      this.test = experienceData
      console.log(this.test)
    }
  },  
  methods:{
    handleEdit(index, row) {
      //this.$refs.table.toggleRowExpansion(row,true);
      this.items[index].editFlag = true
      for(var i=0;i<this.items.length;i++){
        if(i!=index){
          this.items[i].editFlag = false
        }
      }
      this.$refs.table.toggleRowExpansion(row,true);
      const rowString = JSON.stringify(row)
      this.formdata = JSON.parse(rowString)
    },
    handleAdd(index,row){
      this.formdata = {}
      this.formdata.ID = 0
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      deleteRESUME(row.ID).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        });
        this.items.splice(index, 1); 
      })
    },
    handleCancel(index, row) {
      this.$refs.table.toggleRowExpansion(row,false);
      this.items[index].editFlag = false
    
    },
    handleSave(index, row){
        //保存数据，向后台取数据
      this.formdata.STARTTIME = parseTime(this.formdata.STARTTIME,"{y}-{m}-{d} {h}:{i}:{s}")
      this.formdata.ENDTIME = parseTime(this.formdata.ENDTIME,"{y}-{m}-{d} {h}:{i}:{s}")
      updateRESUME(this.formdata).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        });
        this.$refs.table.toggleRowExpansion(row,false);
        this.formdata.STARTTIME = parseTime(this.formdata.STARTTIME,"{y}-{m}")
        this.formdata.ENDTIME = parseTime(this.formdata.ENDTIME,"{y}-{m}")
        const formdataString = JSON.stringify(this.formdata)
        this.items[index] = JSON.parse(formdataString)
        this.items[index].editFlag = false
        this.formdata={}
      }) 
    },
    handleADDSave(){
      this.formdata.STARTTIME = parseTime(this.formdata.STARTTIME,"{y}-{m}-{d} {h}:{i}:{s}")
      this.formdata.ENDTIME = parseTime(this.formdata.ENDTIME,"{y}-{m}-{d} {h}:{i}:{s}")
      this.formdata.BASEINFOID = this.personID
      updateRESUME(this.formdata).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        });
        this.dialogFormVisible = false
        this.formdata.STARTTIME = parseTime(this.formdata.STARTTIME,"{y}-{m}")
        this.formdata.ENDTIME = parseTime(this.formdata.ENDTIME,"{y}-{m}")
        this.items.push(this.formdata)
        this.formdata = {}
      })
    },
    toggleExpansion(currentRow, oldCurrentRow){
        /*if(this.expands[0]===currentRow.id){
          this.expands = []
        }else{
          this.expands = []
          this.expands.push(currentRow.id)
        }*/
        this.expands = []
        this.expands.push(currentRow.id)
        for(var i=0;i<this.items.length;i++){
          if(currentRow.id!=this.items[i].id){
            this.items[i].editFlag = false
          }
        }
    },
    dateFormat:function(row, column, cellValue, index){
      return row.STARTTIME+" - "+row.ENDTIME
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

