<template>
  <div id="organization">
  	<el-col :span="7">
  		<orgtree v-on:NodeClick="getDepartmentDetail"></orgtree>
  	</el-col>
    <el-col :span="17" v-if='isExit'>
    	<el-card class="box-card">
	    	<div slot="header" class="clearfix">
			    <span>{{title}}</span>
			    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
			    <el-dropdown @command="handleCommand" style="float: right; padding: 3px 0" v-if="!isEdit">
				  <span class="el-dropdown-link">
				    操作<i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item command="add">新增子单位</el-dropdown-item>
				    <el-dropdown-item command="edit">编辑</el-dropdown-item>
				    <el-dropdown-item command="delete">删除</el-dropdown-item>
				    <el-dropdown-item command="count">统计分析</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
	    	<el-form label-position="right" inline class="demo-table-expand" label-width="35%" size="small" v-if="isShow">
	          <el-form-item label="机构名称：">
	            <span v-if="!isEdit">{{ item.name }}</span>
	            <span v-else>
	               <el-input v-model="formdata.name"></el-input>
	            </span>
	          </el-form-item>
	          <el-form-item label="机构简称：">
	            <span v-if="!isEdit">{{ item.short_name }}</span>
	            <span v-else>
	               <el-input v-model="formdata.short_name"></el-input>
	            </span>
	          </el-form-item>
	          <el-form-item label="机构编码：">
	            <span v-if="!isEdit">{{ item.code }}</span>
	            <span v-else>
	               <el-input v-model="formdata.code"></el-input>
	            </span>
	          </el-form-item>
			  <el-form-item label="所在政区：">
		            <span v-if="!isEdit">{{ item.politicalString }}</span>
		            <span v-else>
		              <!-- <el-select filterable placeholder="请选择" v-model="formdata.political">
		                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
		                </el-option>
		              </el-select> -->
		              <dictionary type=1 v-on:formvalue="setPoliticalValue" :SelectValue="formdata.political" ></dictionary>
		            </span>
		        </el-form-item>
		        <el-form-item label="隶属关系：">
		            <span v-if="!isEdit">{{ item.lsgxString }}</span>
		            <span v-else>
		              <el-select filterable placeholder="请选择" v-model="formdata.lsgx">
		                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
		                </el-option>
		              </el-select>
		            </span>
		        </el-form-item>
				<el-form-item label="机构级别：">
		            <span v-if="!isEdit">{{ item.levelString }}</span>
		            <span v-else>
		              <el-select filterable placeholder="请选择" v-model="formdata.level">
		                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
		                </el-option>
		              </el-select>
		            </span>
		        </el-form-item>
		        <el-form-item label="机构类别：">
		            <span v-if="!isEdit">{{ item.categoryString }}</span>
		            <span v-else>
		              <el-select filterable placeholder="请选择" v-model="formdata.category">
		                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
		                </el-option>
		              </el-select>
		            </span>
		        </el-form-item>
		        <el-form-item label="法人单位标识：">
		            <span v-if="!isEdit">{{ item.unitidString }}</span>
		            <span v-else>
		              <el-select filterable placeholder="请选择" v-model="formdata.unitid">
		                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
		                </el-option>
		              </el-select>
		            </span>
		        </el-form-item>
				<el-form-item label="行政编制数：">
		            <span v-if="!isEdit">{{ item.xzbz }}</span>
		            <span v-else>
		               <el-input v-model="formdata.xzbz"></el-input>
		            </span>
		        </el-form-item>
		        <el-form-item label="事业编制数（参考）：">
		            <span v-if="!isEdit">{{ item.sybz_g }}</span>
		            <span v-else>
		               <el-input v-model="formdata.sybz_g"></el-input>
		            </span>
		        </el-form-item>
		        <el-form-item label="事业编制数（非参考）：">
		            <span v-if="!isEdit">{{ item.sybz_fg }}</span>
		            <span v-else>
		               <el-input v-model="formdata.sybz_fg"></el-input>
		            </span>
		        </el-form-item>
		        <el-form-item label="工勤编制数：">
		            <span v-if="!isEdit">{{ item.gqbz }}</span>
		            <span v-else>
		               <el-input v-model="formdata.gqbz"></el-input>
		            </span>
		        </el-form-item>
		        <el-form-item label="其他编制数：">
		            <span v-if="!isEdit">{{ item.qtbz }}</span>
		            <span v-else>
		               <el-input v-model="formdata.qtbz"></el-input>
		            </span>
		        </el-form-item>
		        <el-form-item label="参照公务员法管理审批时间：">
		        	<span v-if="!isEdit">{{ item.sptime }}</span>
		            <span v-else>
		              <!-- <el-col :span="7">
		                <el-input v-model="formdata.byear" placeholder="年份"></el-input>
		              </el-col>
		              <el-col class="line" :span="1">-</el-col>
		              <el-col :span="7">
		                <el-input v-model="formdata.bmonth" placeholder="月份"></el-input>
		              </el-col>
		              <el-col class="line" :span="1">-</el-col>
		              <el-col :span="7">
		                <el-input v-model="formdata.bmonth" placeholder="日"></el-input>
		              </el-col> -->
		              <el-date-picker
				          v-model="formdata.sptime"
				          type="date"
				          placeholder="选择日期"
				          value-format="yyyy-MM-dd hh:mm:ss">
				        </el-date-picker>
		            </span>
		        </el-form-item>
		        <el-form-item label="参照公务员法管理审批文号：">
		            <span v-if="!isEdit">{{ item.spwh }}</span>
		            <span v-else>
		               <el-input v-model="formdata.spwh"></el-input>
		            </span>
		        </el-form-item>
		        <el-form-item label="内设机构领导职数：">
		            <span v-if="!isEdit">{{ item.nsjgld }}</span>
		            <span v-else>
		               <el-input v-model="formdata.nsjgld"></el-input>
		            </span>
		        </el-form-item>
		        <el-form-item label="正职领导职数：">
		            <span v-if="!isEdit">{{ item.zzld }}</span>
		            <span v-else>
		               <el-input v-model="formdata.zzld"></el-input>
		            </span>
		        </el-form-item>
		        <el-form-item label="副职领导职数：">
		            <span v-if="!isEdit">{{ item.fzld }}</span>
		            <span v-else>
		               <el-input v-model="formdata.fzld"></el-input>
		            </span>
		        </el-form-item>
		        <el-form-item label="备注：">
		            <span v-if="!isEdit">{{ item.remark }}</span>
		            <span v-else>
		              <el-input type="textarea" v-model="formdata.remark"></el-input>
		            </span>
		        </el-form-item>
		        <el-form-item label="统计排序号：">
		            <span v-if="!isEdit">{{ item.sort }}</span>
		            <span v-else>
		               <el-input type="number" v-model="formdata.sort"></el-input>
		            </span>
		        </el-form-item>
	          	        <el-form-item v-if='isEdit'>
				    <!-- <el-button v-if='!isEdit' type="primary" @click="onEditButton">编辑</el-button> -->
				     <el-button v-if='isEdit' type="primary" @click="onESave">保存</el-button>
				    <el-button v-if='isEdit' @click="onCancel">取消</el-button>
				</el-form-item>
	        </el-form>
	        <countchart v-if="chartShow"></countchart>
        </el-card>
		

    </el-col>
  	
  </div>

</template>

<script>
import orgtree from '@/components/OrgTree'
import { addDepartment,updateDepartment,deleteDepartment } from '@/api/organization'
import dictionary from '@/components/Dictionary'
import {parseTime} from '@/utils'
import countchart from './countchart'
export default {
	name:'organization',
	data(){
		return {
			/*isEdit:false,
	      list: null,
	      listLoading: true,
	      item.:"ddd",
	      formdata:{}*/
	      title:'',
	      item:{},
	      itemcache:'',
	      isEdit:false,
	      isShow:false,
	      isExit:false,
	      chartShow:false,
	      isAdd:false,
	      parentId:'',
	      formdata:{
	      	political:[]
	      },
	      options:{}
	    }
	},
	components:{orgtree,dictionary,countchart},
	created() {
	    
	  },
  	methods: {
    	getDepartmentDetail(data) {
    		const itemString = JSON.stringify(data)
    		this.itemcache = itemString.replace(/null/g,'""')
    		this.isEdit = false
    		this.isExit = true
    		this.chartShow = true
      		this.item = data
      		this.item.sptime = parseTime(this.item.sptime,"{y}-{m}-{d}")
      		this.title = data.short_name
	    },
	    handleCommand(command) {
	    	if(command=="add"){
	    		this.title = "新增子单位"
	    		this.isEdit = true
	    		this.isAdd = true
	    		this.chartShow = false
	    		this.isShow = true
	    	}else if(command=="edit"){
	    		this.title = "修改单位信息"
	    		this.isEdit = true
	    		this.formdata = JSON.parse(this.itemcache)
	    		this.chartShow = false
	    		this.isShow = true
	    	}else if(command=="delete"){
	    		this.$confirm('确定删除该单位吗？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	deleteDepartment(this.item.id).then(response => {
				        this.$message({
					        message: response.msg,
					        type: 'success'
					    });
				        this.item = {}
				        this.isExit = false
            		})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
	    	}else{
	    		this.chartShow = true
	    		this.isShow = false
	    	}
	    },
	    setPoliticalValue(value){
	    	this.formdata.political = value
	    },
	    onCancel(){
	    	this.isEdit = false
	    	this.formdata = {}
	    	this.isAdd = false
	    	this.title = this.item.short_name
	    },
	    onESave(){
	    	this.formdata.sptime=parseTime(this.formdata.sptime,"{y}-{m}-{d} {h}:{m}:{s}")
	    	if(this.isAdd){
	    		this.formdata.parentCode = this.item.code
	    		addDepartment(this.formdata).then(response => {
	    			this.isEdit = false
		            this.$message({
			          	message: response.msg,
			         	type: 'success'
			        });
		            this.formdata = {}
		            this.isAdd = false
	            })
	    	}else{
				updateDepartment(this.formdata).then(response => {
					this.isEdit = false
	                this.$message({
			            message: response.msg,
			            type: 'success'
			        });
	                this.item = this.formdata
	                this.item.sptime = parseTime(this.item.sptime,"{y}-{m}-{d}")
	                this.title = this.item.short_name
	                this.formdata = {}
	            })
	    	}
	    	
	    }
	}
}
</script>
<style type="text/css">
.demo-table-expand .el-form-item {
    width: 49%;
    margin-bottom: 10px;
    margin-right: 0;
}
#organization .el-form-item__label{
    line-height: normal;
 }
 #organization label{
    font-weight: normal;
 }
#organization .el-form--inline .el-form-item__content {
    vertical-align: middle;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}
.clearfix:after {
	clear: both
}

.box-card {
	width: 100%;
	margin-top: 20px;
}

.box-card .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
</style>