<template>
	<div>
  	
	<div v-if="isEdit?false:true" class="attrStyle">
		<p>优点：</p>
        <p>{{ items[items.length-1].RELATIVE }}</p>
        <p>不足：</p>
        <p>{{ items[items.length-1].MERITS }}</p>
	</div>
	<div v-else>
	<el-button  size="mini" type="primary" icon="el-icon-plus"  @click="handleAdd" style="float: right">新增</el-button>	
  	<el-table ref="table" 
    :data="items" 
    style="width: 100%" >
	    <el-table-column prop="RELATIVE" label="优点"></el-table-column>
	    <el-table-column prop="MERITS" label="不足"></el-table-column>
	    <el-table-column prop="TIME" label="时间" :formatter="TIMEFormat"> </el-table-column>
	    <el-table-column label="操作" v-if="isEdit?true:false">
	      <template slot-scope="scope">
	        <el-button
	          size="mini"
	          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	        <el-button
	          size="mini"
	          type="danger"
	          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  </div>
	  <el-dialog title="新增干部特点" :visible.sync="dialogFormVisible" :show-close="false" >
	    <el-form label-position="right" label-width="25%" size="small">
          <el-form-item label="优点">
              <el-input type="textarea" v-model="formdata.RELATIVE" :rows="10"></el-input>
          </el-form-item>
          <el-form-item label="不足">
              <el-input type="textarea" v-model="formdata.MERITS" :rows="10"></el-input>
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
import {parseTime} from '@/utils'
import { getUserInfo,updateRELATIVEMERITS,deleteRELATIVEMERITS } from '@/api/person'
export default {
  	name: 'attributeitem',
  	props:["isEdit"],
  	data(){
  		return {
  			formdata:{},
	        items:[],
	        expands: [],
	        dialogFormVisible:false,
	        personID:""
	  	}
	},
	created(){
	    this.setUserInfo()
	  },
  methods:{
  	setUserInfo(){
      	this.personID = this.$route.params.id
      	getUserInfo(this.personID).then(response => {
        	const attributeData = response.obj.RELATIVEMERITS
  		    this.items = attributeData
          this.$emit('datachange',JSON.stringify(response.obj))
      	})
    },
    handleEdit(index, row) {
        const rowString = JSON.stringify(row)
     	this.formdata = JSON.parse(rowString)
     	this.dialogFormVisible = true
    },
    handleAdd(index,row){
      this.formdata = {}
      this.formdata.ID = 0
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      this.$confirm('确定删除该记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRELATIVEMERITS(row.ID).then(response => {
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
      this.formdata={}
    },
    handleSave(index, row){
        //保存数据，向后台取数据
        const now = new Date();
        this.formdata.TIME = parseTime(now,"{y}-{m}-{d} {h}:{i}:{s}")
        updateRELATIVEMERITS(this.formdata).then(response => {
	        this.$message({
	          message: response.msg,
	          type: 'success'
	        });
	        this.setUserInfo()
	    })
    },
    handleADDSave(){
      const now = new Date();
      this.formdata.TIME = parseTime(now,"{y}-{m}-{d} {h}:{i}:{s}")
      this.formdata.BASEINFOID = this.personID
      updateRELATIVEMERITS(this.formdata).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        });
        this.dialogFormVisible = false
        this.setUserInfo()
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
    TIMEFormat:function(row, column, cellValue, index){
      return parseTime(cellValue,'{y}-{m}-{d}')
    },
}
}
</script>
<style type="">
  .attrStyle{
    font-size: 14px;
    line-height: 25px;
    color: #606266;
  }
</style>