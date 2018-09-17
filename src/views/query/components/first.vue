<template>
	<div id="firstSearch">
		<el-form :model="formdata" ref="formdata" label-position="top"  label-width="25%" size="small" v-if="isShowForm">
			<el-row :gutter="15">
			  	<el-col :span="7">
				  	<div class="grid-content">
					  	<el-row :gutter="15">
						  	<el-col :span="12">
						  		<el-form-item label="姓名：">
					               <el-input v-model="formdata.name" placeholder="姓名"></el-input>
					       		</el-form-item>
						  	</el-col>
					  		<el-col :span="12">
						  		<el-form-item label="性别：">
					                <el-radio-group v-model="formdata.sex">
						              <el-radio :label="0">男</el-radio>
						              <el-radio :label="1">女</el-radio>
						            </el-radio-group>
						        </el-form-item>
						  	</el-col>
						</el-row>
					  	<el-form-item label="工作单位及职务：(接口没有该参数)">
			               <el-input v-model="formdata.no" placeholder="工作单位及职务："></el-input>
			       		</el-form-item>
			       		<el-row :gutter="15">
							<el-col :span="8"> 
			       				<el-form-item label="民族：">  
						            <!-- <el-checkbox-group v-model="formdata.nation">
								      	<el-checkbox label="汉族" name="nation"></el-checkbox></br>
								      	<el-checkbox label="少数民族" name="nation"></el-checkbox>
								    </el-checkbox-group> -->
					                <el-radio-group v-model="formdata.nation">
						              <el-radio :label="0">汉族</el-radio></br>
						              <el-radio :label="1">少数民族</el-radio>
						            </el-radio-group>
						        </el-form-item>
						    </el-col>
					  		<el-col :span="16">
						        <el-form-item label="政治面貌：">
					              	<el-checkbox-group v-model="formdata.political">
							      		<el-checkbox label="中共党员"></el-checkbox>
							      		<el-checkbox label="无党派"></el-checkbox></br>
							      		<el-checkbox label="民主党派"></el-checkbox>
							      		<el-checkbox label="群众"></el-checkbox>
							    	</el-checkbox-group>
						        </el-form-item>
				        	</el-col>
						</el-row>
						<!-- <el-form-item label="年龄：(接口没有该参数)">
							<el-checkbox-group v-model="formdata.age">
						      	<el-checkbox label="35岁以下" name="type"></el-checkbox>
						      	<el-checkbox label="36到40岁" name="type"></el-checkbox>
						      	<el-checkbox label="41到45岁" name="type"></el-checkbox></br>
						      	<el-checkbox label="46到50岁" name="type"></el-checkbox>
						      	<el-checkbox label="51到55岁" name="type"></el-checkbox>
						      	<el-checkbox label="56到60岁" name="type"></el-checkbox>
						    </el-checkbox-group>
										        </el-form-item> -->
				        <el-form-item label="年龄区间：" class="inlineInput">
							<el-input v-model="formdata.ageMin" placeholder="年龄低值"></el-input>
							<el-input v-model="formdata.ageMax" placeholder="年龄高值"></el-input>
				        </el-form-item>
				        <el-form-item label="出生日期：" class="inlineInput">
				            <el-date-picker
							    v-model="formdata.birthdayStart"
							    type="month"
							    placeholder="选择起始日期"
							    value-format="yyyy-MM">
							</el-date-picker>
							<el-date-picker
							    v-model="formdata.birthdayEnd"
							    type="month"
							    placeholder="选择结束日期"
							    value-format="yyyy-MM">
							</el-date-picker>
				        </el-form-item>
				        <el-form-item label="熟悉领域：">
			              	<!-- <dictionary placeholder="请选择" type=18 v-on:formvalue="setsxly" :SelectValue="formdata.NATION" ></dictionary> -->
			              	<el-autocomplete
				                v-model="formdata.speciality"
				                value-key="showname"
				                :fetch-suggestions="querySearch"
				                placeholder="请输入内容"
				                @focus="getDictionary(18)"
				                @blur ="clearOption"
				            ></el-autocomplete>
				        </el-form-item>
				  	</div>
			  	</el-col>
			  	<el-col :span="12">
				  	<div class="grid-content">
				  		<el-form-item label="职务层级：">
			              	<el-checkbox-group v-model="formdata.joblevel">
					      		<el-checkbox label="正厅级" name="joblevel"></el-checkbox>
					      		<el-checkbox label="副厅级" name="joblevel"></el-checkbox>
					      		<el-checkbox label="正县级" name="joblevel"></el-checkbox>
					      		<el-checkbox label="副县级" name="joblevel"></el-checkbox>
					      		<el-checkbox label="正科级" name="joblevel"></el-checkbox>
					      		<el-checkbox label="副科级" name="joblevel"></el-checkbox>
					    	</el-checkbox-group>
				        </el-form-item>
				        <el-form-item label="职级：">
			              	<el-checkbox-group v-model="formdata.workrank">
					      		<el-checkbox label="二级巡视员" name="workrank"></el-checkbox>
					      		<el-checkbox label="一级调研员" name="workrank"></el-checkbox>
					      		<el-checkbox label="二级调研员" name="workrank"></el-checkbox>
					      		<el-checkbox label="三级调研员" name="workrank"></el-checkbox>
					      		<el-checkbox label="四级调研员" name="workrank"></el-checkbox>
					    	</el-checkbox-group>
				        </el-form-item>
				        <!-- <el-form-item label="任现职年限：(接口没有该参数)">
			              	<el-checkbox-group v-model="formdata.rxznx">
					      		<el-checkbox label="1年" name="rxznx"></el-checkbox>
					      		<el-checkbox label="2年" name="rxznx"></el-checkbox>
					      		<el-checkbox label="3到5年" name="rxznx"></el-checkbox>
					      		<el-checkbox label="6-10年" name="rxznx"></el-checkbox>
					      		<el-checkbox label="11年以上" name="rxznx"></el-checkbox>
					    	</el-checkbox-group>
				        </el-form-item> -->
				        <el-form-item label="任现职年限：" class="inlineInput">
							<el-input v-model="formdata.worktimeMax" placeholder="年限低值"></el-input>
							<el-input v-model="formdata.worktimeMin" placeholder="年限高值"></el-input>
				        </el-form-item>
				        <el-form-item label="任现职级年限：(接口没有该参数)">
			              	<el-checkbox-group v-model="formdata.no">
					      		<el-checkbox label="3到5年" name="type"></el-checkbox>
					      		<el-checkbox label="6-9年" name="type"></el-checkbox>
					      		<el-checkbox label="10-15年" name="type"></el-checkbox>
					      		<el-checkbox label="16年" name="type"></el-checkbox>
					    	</el-checkbox-group>
				        </el-form-item>
				        <el-form-item label="最高学历：(接口没有该参数)">
			              	<el-checkbox-group v-model="formdata.no">
					      		<el-checkbox label="研究生" name="type"></el-checkbox>
					      		<el-checkbox label="大学本科" name="type"></el-checkbox>
					      		<el-checkbox label="大学专科" name="type"></el-checkbox>
					      		<el-checkbox label="高中" name="type"></el-checkbox>
					      		<el-checkbox label="中专及以下" name="type"></el-checkbox>
					    	</el-checkbox-group>
				        </el-form-item>
				        <el-form-item label="全日制学历：(接口没有该参数)">
			              	<el-checkbox-group v-model="formdata.no">
					      		<el-checkbox label="研究生" name="type"></el-checkbox>
					      		<el-checkbox label="大学本科" name="type"></el-checkbox>
					      		<el-checkbox label="大学专科" name="type"></el-checkbox>
					      		<el-checkbox label="高中" name="type"></el-checkbox>
					      		<el-checkbox label="中专及以下" name="type"></el-checkbox>
					    	</el-checkbox-group>
				        </el-form-item>
				        <el-row :gutter="25">
					        <el-col :span="12">
						        <el-form-item label="最高学位：(接口没有该参数)">
					              	<el-checkbox-group v-model="formdata.no">
							      		<el-checkbox label="博士" name="type"></el-checkbox>
							      		<el-checkbox label="硕士" name="type"></el-checkbox>
							      		<el-checkbox label="学士" name="type"></el-checkbox>
							    	</el-checkbox-group>
						        </el-form-item>
						    </el-col>
						    <el-col :span="12">
						        <el-form-item label="全日制学位：(接口没有该参数)">
					              	<el-checkbox-group v-model="formdata.no">
							      		<el-checkbox label="博士" name="type"></el-checkbox>
							      		<el-checkbox label="硕士" name="type"></el-checkbox>
							      		<el-checkbox label="学士" name="type"></el-checkbox>
							    	</el-checkbox-group>
						        </el-form-item>
					        </el-col>
				        </el-row>
				        <el-row :gutter="15">
					        <el-col :span="12">
						        <el-form-item label="最近受到处分时间：">
							        <el-select v-model="formdata.punish" placeholder="请选择">
										<el-option key="1" value="1" label="最近一年"></el-option>
										<el-option key="2" value="2" label="最近两年"></el-option>
										<el-option key="3" value="3" label="最近三年"></el-option>
										<el-option key="4" value="4" label="最近四年"></el-option>
										<el-option key="5" value="5" label="最近五年"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
					        <el-col :span="12">
						  		<el-form-item label="是否有工作经验：">
					                <el-radio-group v-model="formdata.experience">
						              <el-radio :label="0">是</el-radio>
						              <el-radio :label="1">否</el-radio>
						            </el-radio-group>
						        </el-form-item>
						  	</el-col>
					  	</el-row>
				  	</div>
			  	</el-col>
			  	<el-col :span="5">
				  	<div class="grid-content">
				        <el-form-item label="籍贯：">
			               <el-autocomplete
				                v-model="formdata.NATIVE"
				                value-key="showname"
				                :fetch-suggestions="querySearch"
				                placeholder="请输入内容"
				                @focus="getDictionary(18)"
				                @blur ="clearOption"
				            ></el-autocomplete>
			       		</el-form-item>
			       		<el-form-item label="简历：">
			               <el-input v-model="formdata.resume" placeholder="简历"></el-input>
			       		</el-form-item>
			       		<el-form-item label="家庭成员：">
			               <el-input v-model="formdata.family" placeholder="家庭成员"></el-input>
			       		</el-form-item>
						<el-form-item label="家庭成员工作单位及职务：">
			               <el-input v-model="formdata.familyWORKUNIT" placeholder="家庭成员工作单位及职务"></el-input>
			       		</el-form-item>
			       		<el-form-item label="问题描述：">
			               <el-input v-model="formdata.question" placeholder="问题描述"></el-input>
			       		</el-form-item>
			       		<el-form-item label="培训名称（班次名称）：(接口没有该参数)">
			               <el-input v-model="formdata.name" placeholder="培训名称"></el-input>
			       		</el-form-item>
			       		<!-- <el-form-item label="截止日期：">
				            <el-date-picker
							    v-model="formdata.jzrq"
							    type="month"
							    placeholder="选择截止日期"
							    value-format="yyyy-MM-dd 00:00:00">
							</el-date-picker>
				        </el-form-item> -->
				  	</div>
			  	</el-col>
			</el-row>
			<el-row style="text-align: center">
				<el-button type="primary" @click="firstQuery" :loading="loading">搜索</el-button>
  				<el-button @click="resetForm">清空</el-button> 
			</el-row>
		</el-form>
		<div v-else>
			<a @click="isShowForm=true" :loading="loading">返回</a>
			<div id="resultTable" style="padding:20px 0">
		      <el-table :data="resultData" border style="width: 100%" :loading="loading">
		        <el-table-column prop="NAME" label="姓名"  width="80px">
		          <template slot-scope="props">
		            <router-link v-bind:to="'/staff/info/'+props.row.id">
		              {{props.row.name}}
		            </router-link>
		          </template>
		        </el-table-column>
		        <el-table-column prop="" label="工作单职位及职务"></el-table-column>
		        <el-table-column prop="" label="最高职务层次"></el-table-column>
		        <el-table-column prop="BIRTHDAY" label="出生年月" :formatter="monthFormat"></el-table-column>
		        <el-table-column prop="age" label="年龄" :formatter="ageFormat"></el-table-column>
		        <el-table-column prop="NATIVE" label="籍贯"></el-table-column>
		        <el-table-column prop="BIRTHPLACE" label="出生地"></el-table-column>
		        <el-table-column prop="PARTYTIME" label="入党时间" :formatter="monthFormat"></el-table-column><!-- 
		        <el-table-column prop="date" label="在职学历"></el-table-column> -->
		      </el-table>  
		    </div>
		    <el-pagination layout="prev, pager, next" :total="total" @current-change="curPageChange"></el-pagination>
	    </div>
	</div>
</template>

<script>
import dictionary from '@/components/Dictionary'
import { getTreeDic } from '@/api/dictionary'
import { searchUserInfo } from '@/api/person'
import {parseTime,GetAge} from '@/utils'
export default {
  components:{dictionary},
  data(){
  	return {
  		formdata:{
  			political:[],
  			joblevel:[],
  			workrank:[],
  		},
  		page:1,
  		pageSize:10,
  		value:"",
  		isShowForm:true,
  		resultData:[],
      	total:0,
      	options:[],
      	loading:false
  	}
  },
  methods:{
  	firstQuery(){
  		this.loading = true
  		//this.formdata.political=["中共党员","群众"]
  		this.formdata.page = this.page
  		this.formdata.pageSize = 10
  		//this.formdata.political = JSON.stringify(this.formdata.political)
  		searchUserInfo(this.formdata).then(response => {
            /*this.$message({
	            message: response.msg,
	            type: 'success'
	        });*/
	        this.loading = false
	        if(response.obj&&response.obj.list){
	        	this.resultData = response.obj.list
		        this.total = response.obj.count
		        this.isShowForm = false
	        }else{
	        	this.$message({
		            message: "没有符合条件的结果！",
		            type: 'warning'
		        })
	        }
	        
	        //this.setUserInfo();
	        //this.$router.push({path:'/staff/edit/'+row.id})
        })
  	},
  	clearOption(){
    	this.options=[]
    },
    //获取子弹表
    getDictionary(type){
	    getTreeDic(type).then(response => {
	    	if(response.obj){
	    		this.options = response.obj;
	    	}else{
	    		this.options =[]
	    	}
	        
	    })
    },
    querySearch(queryString, cb) {
        var lists = this.options;
        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    createFilter(queryString) {
        return (list) => {
          return (list.showname.toLowerCase().indexOf(queryString) === 0);
        };
    },
    curPageChange(page){
      this.page = page
      this.firstQuery()
    },
    monthFormat:function(row, column, cellValue, index){
      	return parseTime(cellValue,"{y}-{m}")
    },
    ageFormat:function(row, column, cellValue, index){
      	return GetAge(row.BIRTHDAY)
    },
    resetForm:function(){
    	this.formdata={
  			political:[],
  			joblevel:[],
  			workrank:[],
  		}
    }
  }
}
</script>
<style>
	#firstSearch{
		padding: 10px 30px;
	}

	#firstSearch .el-form--label-top .el-form-item__label{
	    padding: 0 3px;
		font-weight: normal;
		position: absolute;
	    top: -11px;
	    background: #ffffff;
	    line-height: 20px;
	}
	#firstSearch .inlineInput .el-input {
		display: inline-block;
		width: 49%;
	}
	#firstSearch .el-form-item{
	    border: 1px solid #999999;
	    border-radius: 6px;
	    position: relative;
	    margin-bottom: 15px;
	    padding: 15px 5px 5px 5px;
	}
	#firstSearch .el-form-item__content {
		line-height: 15px
	}
	#firstSearch .el-checkbox+.el-checkbox{
		margin-left: 15px
	}
</style>