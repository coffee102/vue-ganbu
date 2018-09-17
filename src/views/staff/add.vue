<template>
  <div id="addStaff">
    <!-- <baseItem isEdit="1" :userId="0"></baseItem> -->
    <el-col :span="5">
				<el-upload
					  name="files"
					  class="avatar-uploader"
					  action="/apis/person/uploadImage"
					  :headers="uploadHeader"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <el-button size="small" type="primary" class="uploadButton">上传头像</el-button>
					  <img v-if="baseFormData.PIC" :src="baseFormData.personPIC" class="avatar">
				</el-upload>
			</el-col>
			<el-col :span="19">
				<el-form :model="baseFormData" ref="baseFormData" label-position="right" inline label-width="35%" size="small">
					
		          <el-form-item label="姓名：" prop="NAME">
		               <el-input v-model="baseFormData.NAME" placeholder="输入姓名"></el-input>
		          </el-form-item>
		          <el-form-item label="身份证号：" prop="IDCARD">
		               <el-input v-model="baseFormData.IDCARD" placeholder="身份证号"></el-input>
		          </el-form-item>
		          <el-form-item label="性别：" prop="SEX">
		                <el-radio-group v-model="baseFormData.SEX">
			              <el-radio :label="1">男</el-radio>
			              <el-radio :label="0">女</el-radio>
			            </el-radio-group>
		          </el-form-item>
					<el-form-item label="出生年月：">
			            <el-date-picker
					      v-model="baseFormData.BIRTHDAY"
					      type="month"
					      placeholder="选择日期"
					      value-format="yyyy-MM-dd hh:mm:ss"
					      @change="BIRTHDAYSelect">
					    </el-date-picker>
		            </el-form-item>
					<el-form-item label="年龄：">
			               <el-input placeholder="年龄" readonly="true" v-model="baseFormData.age"></el-input>
			        </el-form-item>
			        <el-form-item label="民族：">
			              	<el-autocomplete
				                v-model="baseFormData.NATION"
				                value-key="showname"
				                :fetch-suggestions="queryNation"
				                placeholder="请输入内容"
				            ></el-autocomplete>
			        </el-form-item>
			        <el-form-item label="籍贯：">
			            	<el-autocomplete
				                v-model="baseFormData.NATIVE"
				                value-key="showname"
				                :fetch-suggestions="queryNative"
				                placeholder="请输入内容"
				            ></el-autocomplete>
			        </el-form-item>
			        <el-form-item label="出生地：">
			              <el-autocomplete
				                v-model="baseFormData.BIRTHPLACE"
				                value-key="showname"
				                :fetch-suggestions="queryNative"
				                placeholder="请输入内容"
				            ></el-autocomplete>
			        </el-form-item>
			        <el-form-item label="政治面貌：">
			              <el-autocomplete
				                v-model="baseFormData.POLITICALSTATUS"
				                value-key="showname"
				                :fetch-suggestions="queryPoliticalstatus"
				                placeholder="请输入内容"
				            ></el-autocomplete>
			        </el-form-item>
		          	<el-form-item label="入党时间：">
			              <el-date-picker
						      v-model="baseFormData.PARTYTIME"
						      type="month"
						      placeholder="选择日期"
						      value-format="yyyy-MM-dd hh:mm:ss">
						    </el-date-picker>
			        </el-form-item>
			        <el-form-item label="第二党派：">
			              <el-autocomplete
				                v-model="baseFormData.SECONDEPARTY"
				                value-key="showname"
				                :fetch-suggestions="queryPoliticalstatus"
				                placeholder="请输入内容"
				            ></el-autocomplete>
			        </el-form-item>
			        <el-form-item label="第二党派入党时间：">
			            	<el-date-picker
						      v-model="baseFormData.SECONDPARTYTIME"
						      type="month"
						      placeholder="选择日期"
						      value-format="yyyy-MM-dd hh:mm:ss">
						    </el-date-picker>
			        </el-form-item>
			        <el-form-item label="健康状况：">
			              <el-autocomplete
				                v-model="baseFormData.HEALTHCONDITION"
				                value-key="showname"
				                :fetch-suggestions="queryHealthcondition"
				                placeholder="请输入内容"
				            ></el-autocomplete>
			        </el-form-item>
			        <el-form-item label="参加工作时间：">
			              	<el-date-picker
						      v-model="baseFormData.WORKTIME"
						      type="month"
						      placeholder="选择日期"
						      value-format="yyyy-MM-dd hh:mm:ss">
						    </el-date-picker>
			        </el-form-item>
			        <el-form-item label="党风廉政成绩：">
			               <el-input type="textarea" v-model="baseFormData.PARTYPERFORMANCE"></el-input>
			        </el-form-item>
			        <el-form-item label="是否具有基层工作经验：">
			                <el-radio-group v-model="baseFormData.GRASSROOTSEXPERIENCE">
				              <el-radio :label="0">是</el-radio>
				              <el-radio :label="1">否</el-radio>
				            </el-radio-group>
			        </el-form-item>
			        <el-form-item label="人员类型：">
			            	<el-autocomplete
				                v-model="baseFormData.PERSONTYPE"
				                value-key="showname"
				                :fetch-suggestions="queryPersontype"
				            ></el-autocomplete>
			        </el-form-item>
			        <el-form-item label="人员编制：">
			              <el-autocomplete
				                v-model="baseFormData.STAFFING"
				                value-key="showname"
				                :fetch-suggestions="queryStaffing"
				                placeholder="请输入内容"
				            ></el-autocomplete>
			        </el-form-item>
			        <el-form-item label="干部问题信息：">
			               <el-input type="textarea" v-model="baseFormData.QUESTIONINFO"></el-input>
			        </el-form-item>
			        <div style="text-align:right;padding: 20px 20px 0 20px">
					     <el-button type="primary" size="medium" @click="baseSave('baseFormData')">保存</el-button>
			        </div>
		        </el-form>
	        </el-col>
  </div>
</template>

<script>
  import baseItem from './components/base-info'
import {parseTime,GetAge} from '@/utils'
import { getToken } from '@/utils/auth'
import { updateBaseInfo } from '@/api/person'

export default {
	data(){
		return {
			uploadHeader:{
	        	'Authorization':getToken()
	        },
	        baseFormData:{},

		}
	},
  	//components: { baseItem },
  	computed:{
  		nationOptions(){
  			return this.$store.state.dict.nation
  		},
  		nativeOptions(){
  			return this.$store.state.dict.native
  		},
  		politicalstatusOptions(){
  			return this.$store.state.dict.politicalstatus
  		},
  		healthconditionOptions(){
  			return this.$store.state.dict.healthcondition
  		},
  		persontypeOptions(){
  			return this.$store.state.dict.persontype
  		},
  		staffingOptions(){
  			return this.$store.state.dict.staffing
  		},
  	},
  	methods:{
		baseSave(formName){
			/*this.$refs[formName].validate((valid) => {
		      if (valid) {*/
			    const myDate=new Date()
			    //this.formdata.age = myDate.getFullYear()-this.formdata.BIRTHDAY_year
			    this.baseFormData.ID = 0
			    this.baseFormData.DEPARTMENT_CODE = this.$route.params.id
			    debugger
			    this.baseFormData.BIRTHDAY = parseTime(this.baseFormData.BIRTHDAY,"{y}-{m}-{d} {h}:{i}:{s}")
			    this.baseFormData.PARTYTIME = parseTime(this.baseFormData.PARTYTIME,"{y}-{m}-{d} {h}:{i}:{s}")
			    this.baseFormData.SECONDPARTYTIME = parseTime(this.baseFormData.SECONDPARTYTIME,"{y}-{m}-{d} {h}:{i}:{s}")
			    this.baseFormData.WORKTIME = parseTime(this.baseFormData.WORKTIME,"{y}-{m}-{d} {h}:{i}:{s}")  
				updateBaseInfo(this.baseFormData).then(response => {
		            this.$message({
			            message: response.msg,
			            type: 'success'
			        });
			        //this.setUserInfo();
			        //this.$router.push({path:'/staff/edit/'+row.id})
		        })
		      /*} else {
		        console.log('error submit!!');
		        return false;
		      }
		    });*/
		},
		handleAvatarSuccess(res, file) {
			console.log(res)
		    if(res.success===true){
		    	this.baseFormData.PIC = res.msg
		    	this.baseFormData.personPIC = URL.createObjectURL(file.raw);
		    	//this.item.PIC = URL.createObjectURL(file.raw);
		    }else{
		    	this.$message({
		          message: '图片上传失败',
		          type: 'warning'
		        });
		    }
		},
		/*uploadAction(){
			uploadImage().then(response => {
		        console.log(response)
		    })
		},*/
		beforeAvatarUpload(file) {
		    const isJPG = file.type === 'image/jpeg';
		    const isLt2M = file.size / 1024 / 1024 < 2;

		    if (!isJPG) {
		      this.$message.error('上传头像图片只能是 JPG 格式!');
		    }
		    if (!isLt2M) {
		      this.$message.error('上传头像图片大小不能超过 2MB!');
		    }
		    return isJPG && isLt2M;
		},
		BIRTHDAYSelect(value){
		    	this.baseFormData.age = GetAge(value)
		    },
	    queryNation(queryString, cb) {
	        var lists = this.nationOptions;
	        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
	        // 调用 callback 返回建议列表的数据
	        cb(results);
	    },
	    queryNative(queryString, cb) {
	        var lists = this.nativeOptions;
	        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
	        // 调用 callback 返回建议列表的数据
	        cb(results);
	    },
	    queryPoliticalstatus(queryString, cb) {
	        var lists = this.politicalstatusOptions;
	        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
	        // 调用 callback 返回建议列表的数据
	        cb(results);
	    },
	    queryHealthcondition(queryString, cb) {
	        var lists = this.healthcondition;
	        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
	        // 调用 callback 返回建议列表的数据
	        cb(results);
	    },
	    queryPersontype(queryString, cb) {
	        var lists = this.persontypeOptions;
	        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
	        // 调用 callback 返回建议列表的数据
	        cb(results);
	    },
	    queryStaffing(queryString, cb) {
	        var lists = this.staffing;
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
	    },
  }
}
</script>
<style type="">
#addStaff{
	padding: 20px
}
#addStaff .avatar-uploader{
	text-align: center;
}
	#addStaff .el-form-item{
		width: 30%
	}
	#addStaff label{
		font-weight: normal;
	}
	#addStaff  .el-form-item__content{
		width: 64%
	}
	#addStaff .el-date-editor.el-input{
		width: 100%
	}
</style>
