<template>
	<!-- 详情页面展示-->
  	<div>
    	<el-button v-if="isEdit?true:false" size="mini" type="primary" icon="el-icon-plus"  @click="handleAdd">新增</el-button>
    	<el-table ref="table" 
	      :data="items" 
	      style="width: 100%" 
	      :show-header="isEdit?true:false"
	      >
	      <el-table-column label="时间段" width="180" :formatter='TimeSoltFormat'></el-table-column>
	      <el-table-column prop="DEGREE" label="学位"></el-table-column>
	      <el-table-column prop="SCHOOL" label="毕业院校" width="180"></el-table-column>
	      <el-table-column prop="MAJOR" label="所学专业"> </el-table-column>
	      <el-table-column prop="EDUCATIONTYPE" label="教育类型">
	      		<template slot-scope="props">
			  		{{props.row.EDUCATIONTYPE===0?"全日制":"在职"}}
				</template>
			</el-table-column>
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

	    <el-dialog :title="dialogTitle+'学历教育信息'" :visible.sync="dialogFormVisible" :show-close="false" @close="dialogClose">
	      <el-form label-position="right" inline class="demo-table-expand" label-width="35%" size="small">
	        <el-form-item label="教育类型：">
	            <el-radio-group v-model="formdata.EDUCATIONTYPE">
	              <el-radio :label="0">全日制</el-radio>
	              <el-radio :label="1">在职</el-radio>
	            </el-radio-group>
	        </el-form-item>
	        <el-form-item label="学历名称">
	            <el-autocomplete
	                v-model="formdata.CODE"
	                value-key="showname"
	                :fetch-suggestions="queryCode"
	                placeholder="请输入内容"
	            ></el-autocomplete>
	        </el-form-item>
	        <el-form-item label="学位名称：">
	            <el-autocomplete
	                v-model="formdata.DEGREE"
	                value-key="showname"
	                :fetch-suggestions="queryDegree"
	                placeholder="请输入内容"
	            ></el-autocomplete>
	        </el-form-item>
	        <el-form-item label="学校（单位）及院系：">
	          <el-input v-model="formdata.SCHOOL"></el-input>
	        </el-form-item>
	        <el-form-item label="所学专业：">
	            <el-autocomplete
	                v-model="formdata.MAJOR"
	                value-key="showname"
	                :fetch-suggestions="queryMajor"
	                placeholder="请输入内容"
	            ></el-autocomplete>
	        </el-form-item>
	        <el-form-item label="入学时间：">
	              <el-date-picker
	                v-model="formdata.STARTTIME"
	                type="month"
	                placeholder="选择日期"
	                value-format="yyyy-MM-dd hh:mm:ss"
	                @change="TimeSelect">
	              </el-date-picker>           
	        </el-form-item>
	        <el-form-item label="毕（肄）业时间：">
	            <el-date-picker
	                v-model="formdata.ENDTIME"
	                type="month"
	                placeholder="选择日期"
	                value-format="yyyy-MM-dd hh:mm:ss"
	                @change="TimeSelect">
	              </el-date-picker>
	        </el-form-item>
	        <el-form-item label="学位授予时间：">
	            <el-date-picker
	                v-model="formdata.DEGREETIME"
	                type="month"
	                placeholder="选择日期"
	                value-format="yyyy-MM-dd hh:mm:ss">
	              </el-date-picker>
	        </el-form-item>
	        <el-form-item label="学制年限：">
	          <el-input readonly="true" v-model="formdata.schoolyears"></el-input>
	        </el-form-item> 
	      </el-form>
	      <!-- <el-form :model="form">
	        <el-form-item label="活动名称" >
	          <el-input v-model="form.name" auto-complete="off"></el-input>
	        </el-form-item>
	        <el-form-item label="活动区域">
	          <el-select v-model="form.region" placeholder="请选择活动区域">
	            <el-option label="区域一" value="shanghai"></el-option>
	            <el-option label="区域二" value="beijing"></el-option>
	          </el-select>
	        </el-form-item>
	      </el-form> -->
	      <div slot="footer" class="dialog-footer">
	        <el-button @click="dialogFormVisible = false">取 消</el-button>
	        <el-button type="primary" @click="handleSave">保存</el-button>
	      </div>
	    </el-dialog> 
    </div>
</template>
<script type="">
import dictionary from '@/components/Dictionary'
import { getTreeDic } from '@/api/dictionary'
import {parseTime} from '@/utils'
import { getUserInfo,updateEDUCATIONBACKGROUND,deleteEDUCATIONBACKGROUND } from '@/api/person'
	export default{
		props:["isEdit",'itemData',"personID"],
		data(){
			return{
				items:[],
				formdata:{},
				options:[],
				isAdd:'',
				dialogFormVisible:false
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
		     },
		    codeOptions(){
	  			return this.$store.state.dict.code
	  		},
	  		degreeOptions(){
	  			return this.$store.state.dict.degree
	  		},
	  		majorOptions(){
	  			return this.$store.state.dict.major
	  		}
		},
		/*created(){
		    this.setUserInfo()
		},*/
		watch:{
		  	itemData: function (val) {
		  		const data = JSON.parse(this.itemData)
			    const EduData = data.EDUCATIONBACKGROUND
			    for(var i=0;i<EduData.length;i++){
			        EduData[i].schoolyears = parseTime(EduData[i].ENDTIME,"{y}")-parseTime(EduData[i].STARTTIME,"{y}")
			    }
			    this.items = EduData
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
		        this.dialogFormVisible = true
		        this.isAdd = false
		        const rowString = JSON.stringify(row)
		        this.formdata = JSON.parse(rowString)
		      },
		    handleDelete(index, row) {
		    	this.$confirm('确定删除该记录吗？', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			          deleteEDUCATIONBACKGROUND(row.ID).then(response => {
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
		      this.formdata={}
		      this.item = {}
		      this.dialogFormVisible = false
		      /*this.$refs.table.toggleRowExpansion(row,false);
		      this.items[index].editFlag = false*/
		    
		    },
		    handleAdd(){
		      this.dialogFormVisible = true
		      this.isAdd=true
		      this.formdata.ID = 0
		    },
		    handleSave(){
		      this.formdata.STARTTIME = parseTime(this.formdata.STARTTIME,"{y}-{m}-{d} {h}:{i}:{s}")
		      this.formdata.ENDTIME = parseTime(this.formdata.ENDTIME,"{y}-{m}-{d} {h}:{i}:{s}")
		      this.formdata.DEGREETIME = parseTime(this.formdata.DEGREETIME,"{y}-{m}-{d} {h}:{i}:{s}")
		      this.formdata.BASEINFOID = this.personID
		      //this.formdata.MAJOR = 1//暂无字典表，暂设定为0
		      updateEDUCATIONBACKGROUND(this.formdata).then(response => {
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
		    TimeSelect(value){
		    	this.formdata.schoolyears = parseTime(this.formdata.ENDTIME,"{y}")-parseTime(this.formdata.STARTTIME,"{y}")
		    },
		    dialogClose(){
		    	this.formdata ={}
		    },
		    //获取子弹表
		    queryCode(queryString, cb) {
		        var lists = this.codeOptions;
		        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		    },
		    queryDegree(queryString, cb) {
		        var lists = this.degreeOptions;
		        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		    },
		    queryMajor(queryString, cb) {
		        var lists = this.majorOptions;
		        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		    },
		    createFilter(queryString) {
		        return (list) => {
		          return (list.showname.toLowerCase().indexOf(queryString) === 0);
		        };
		    },
		    clearOption(){
		    	this.options=[]
		    }
		}
	}
</script>

