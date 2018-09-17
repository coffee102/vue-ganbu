<template>
  	<div>
  	<el-button v-if="isEdit?true:false" size="mini" type="primary" icon="el-icon-plus"  @click="handleAdd" style="float: right">新增</el-button>
    
	<el-table :data="familyItems" style="width: 100%">
	    <el-table-column prop="TITLE" label="称谓" width="80px"></el-table-column>
	    <el-table-column prop="NAME" label="姓名" width="80px"></el-table-column>
	    <el-table-column prop="age" label="年龄" width="80px"></el-table-column>
	    <el-table-column prop="BIRTHDAY" label="出生年月" :formatter='monthFormat' width="80px"></el-table-column>
	    <el-table-column prop="POLITICALSTATUS" label="政治面貌" width="100px"></el-table-column>
	    <el-table-column prop="WORKUNIT" label="工作单位及职务"></el-table-column>
	    <el-table-column label="是否在国外" width="80"> 
			<template slot-scope="props">
  				{{props.row.FOREIGN===0?"否":"是"}}
			</template>
	    </el-table-column>
   		<el-table-column prop="COUNTRYLEVEL" width="80" label="是否县级以上干部" >
   			<template slot-scope="props">
  				{{props.row.COUNTRYLEVEL===0?"否":"是"}}
			</template>
   		</el-table-column>
	    <el-table-column label="操作" v-if="isEdit?true:false" width="180px"> 
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
	    
	<el-dialog :title="dialogTitle+'家庭成员'" :visible.sync="dialogFormVisible" :show-close="false" @close="dialogClose">
	    <el-form label-position="left" inline class="demo-table-expand" label-width="25%" size="small" v-model="formdata">
	      <el-form-item label="称谓">
	          <el-autocomplete
	                v-model="formdata.TITLE"
	                value-key="showname"
	                :fetch-suggestions="queryTitle"
	                placeholder="请输入内容"
	            ></el-autocomplete>
	      </el-form-item>
	      <el-form-item label="姓名">
	        <el-input v-model="formdata.NAME"></el-input>
	      </el-form-item>
	      <el-form-item label="出生年月">
	         	<el-date-picker
	                v-model="formdata.BIRTHDAY"
	                type="month"
	                placeholder="选择日期"
	                value-format="yyyy-MM-dd hh:mm:ss"
	               	@change="BIRTHDAYSelect">
	            </el-date-picker>
	      </el-form-item>
	      <el-form-item label="年龄">
	        <el-input v-model="formdata.age" readonly="true"></el-input>
	      </el-form-item>
	      <el-form-item label="政治面貌">
	          <el-autocomplete
	                v-model="formdata.POLITICALSTATUS"
	                value-key="showname"
	                :fetch-suggestions="queryPoliticalstatus"
	                placeholder="请输入内容"
	            ></el-autocomplete>
	      </el-form-item>
	      <el-form-item label="工作单位及职务">
	          <el-input type="textarea" v-model="formdata.WORKUNIT"></el-input>
	      </el-form-item>
	      <el-form-item label="是否在国外">
	          <el-radio-group v-model="formdata.FOREIGN">
	            <el-radio :label="1">是</el-radio>
	            <el-radio :label="0">否</el-radio>
	          </el-radio-group>
	      </el-form-item>
	      <el-form-item label="是否县级以上干部">
	          <el-radio-group v-model="formdata.COUNTRYLEVEL">
	            <el-radio :label="1">是</el-radio>
	            <el-radio :label="0">否</el-radio>
	          </el-radio-group>
	      </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button @click="dialogFormVisible = false;formdata={}">取 消</el-button>
	      <el-button type="primary" @click="handleSave">保存</el-button>
	    </div>
	  </el-dialog>
  </div>
</template>

<script>
import dictionary from '@/components/Dictionary'
import { getTreeDic } from '@/api/dictionary'
import {parseTime,GetAge} from '@/utils'
import { getUserInfo,updateFAMILY,deleteFAMILY } from '@/api/person'
export default {
	props:["isEdit","itemData","personID"],
  data(){
  	return {
  		familyItems:[],
  		options:[],
  		formdata:{},
  		dialogFormVisible:false,

  		isAdd:true,
  	}
  },
  computed:{
    dialogTitle:function(){
    	if(this.isAdd){
    		return "新增"
    	}else{
    		return "编辑"
    	}
    },
    titleOptions(){
    	return this.$store.state.dict.title
    },
    politicalstatusOptions(){
    	return this.$store.state.dict.politicalstatus
    }
  },
  watch:{
  	itemData: function (val) {
  		const data = JSON.parse(this.itemData)
	    const fData = data.FAMILY
	    for(var i=0;i<fData.length;i++){
	        fData[i].BIRTHDAY= parseTime(fData[i].BIRTHDAY,"{y}-{m}")
	        fData[i].age = GetAge(fData[i].BIRTHDAY)
	    }
	    this.familyItems = fData
    }
  },
  methods:{
  	setUserInfo(){
	    this.personID = this.$route.params.id
	    getUserInfo(this.personID).then(response => {
	        //this.itemData = JSON.stringify(response.obj)
	        this.$emit('datachange',JSON.stringify(response.obj))

	    })
  	},	
  	handleDelete(index,row){
	    this.$confirm('确定删除该记录吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
      }).then(() => {
        deleteFAMILY(row.ID).then(response => {
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
  	handleEdit(index,row){
  		this.isAdd = false
		this.dialogFormVisible = true
		var string = JSON.stringify(row)
		this.formdata = JSON.parse(string)
  	},
  	handleAdd(index,row){
  		this.isAdd = true
		this.dialogFormVisible = true
		this.formdata.ID=0
  	},
  	handleSave(){
  		this.formdata.BASEINFOID = this.personID
  		this.formdata.BIRTHDAY = parseTime(this.formdata.BIRTHDAY,"{y}-{m}-{d} {h}:{i}:{s}")
  		updateFAMILY(this.formdata).then(response => {
	        this.$message({
	          message: response.msg,
	          type: 'success'
	        });
	       	this.dialogFormVisible = false
	       	this.setUserInfo()
    	})
  	},
  	monthFormat:function(row, column, cellValue, index){
      return parseTime(cellValue,"{y}-{m}")
    },
    dialogClose(){
    	this.formdata ={}
    },
    //获取子弹表
    queryPoliticalstatus(queryString, cb) {
        var lists = this.politicalstatusOptions;
        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    queryTitle(queryString, cb) {
        var lists = this.titleOptions;
        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    createFilter(queryString) {
        return (list) => {
          return (list.showname.toLowerCase().indexOf(queryString) === 0);
        };
    },
    BIRTHDAYSelect(value){
    	this.formdata.age = GetAge(value)
    }


  	
  }
}
</script>
