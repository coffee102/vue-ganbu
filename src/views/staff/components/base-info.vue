<template>
<div id="baseItem">
		<el-col :span="5">
			<img v-if="!editFlag" :src="'http://192.168.34.111:8081/wh_cadreManage/'+item.PIC" class="avatar">
			<el-upload
				v-else
			   name="files"
			  class="avatar-uploader"
			  action="/apis/person/uploadImage"
			  :headers="uploadHeader"
			  :show-file-list="false"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload">
			  <!-- <el-button v-else size="small" type="primary" class="uploadButton">上传头像</el-button> -->
			  <img v-if="item.PIC&&item.PIC!='null'" :src="'http://192.168.34.111:8081/wh_cadreManage/'+item.PIC" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon">照片</i>
			</el-upload>			
		</el-col>
		<el-col :span="19">
	    	<el-form :model="formdata" ref="formdata" :rules="rules" label-position="right" inline class="demo-table-expand" label-width="40%" size="small">
	    		<input type="hidden" v-model="formdata.ID">
	          <el-form-item label="姓名：" prop="NAME">
	            <span v-if="!editFlag">{{ item.NAME }}</span>
	            <span v-else>
	               <el-input v-model="formdata.NAME" placeholder="年份"></el-input>
	            </span>
	          </el-form-item>
	          <el-form-item label="身份证号：" prop="IDCARD">
	            <span v-if="!editFlag">{{ item.IDCARD }}</span>
	            <span v-else>
	               <el-input v-model="formdata.IDCARD" placeholder="身份证号"></el-input>
	            </span>
	          </el-form-item>
	          <el-form-item label="性别：" prop="SEX">
	            <span v-if="!editFlag">{{ item.SEX===0?"男":"女" }}</span>
	            <span v-else>
	                <el-radio-group v-model="formdata.SEX">
		              <el-radio :label="0">男</el-radio>
		              <el-radio :label="1">女</el-radio>
		            </el-radio-group>
	            </span>
	          </el-form-item>
				<el-form-item label="出生年月：" prop="BIRTHDAY">
		            <span v-if="!editFlag">{{ BIRTHDAYformat}}</span>
		            <span v-else class="input-inline">
		            <el-date-picker
				      v-model="formdata.BIRTHDAY"
				      type="month"
				      placeholder="选择日期"
				      value-format="yyyy-MM-dd 00:00:00">
				    </el-date-picker>
		            </span>
	            </el-form-item>
				<el-form-item label="年龄：">
		            <span v-if="!editFlag">{{ age }}</span>
		            <span v-else>
		               <el-input placeholder="年龄" v-model="formage"></el-input>
		            </span>
		        </el-form-item>
		        <el-form-item label="民族：">
		            <span v-if="!editFlag">{{ item.NATION }}</span>
		            <span v-else>
		              	<autocomplete type=1 v-on:formvalue="setNATION" :SelectValue="formdata.NATION" ></autocomplete>
		            </span>
		        </el-form-item>
		        <el-form-item label="籍贯：">
		            <span v-if="!editFlag">{{ item.NATIVE }}</span>
		            <span v-else>
		            	<autocomplete type=2 v-on:formvalue="setNATIVE" :SelectValue="formdata.NATIVE" ></autocomplete>
		            </span>
		        </el-form-item>
		        <el-form-item label="出生地：">
		            <span v-if="!editFlag">{{ item.BIRTHPLACE }}</span>
		            <span v-else>
		              <autocomplete type=2 v-on:formvalue="setBIRTHPLACE" :SelectValue="formdata.BIRTHPLACE" v-model="formdata.BIRTHPLACE"></autocomplete>
		            </span>
		        </el-form-item>
		        <el-form-item label="政治面貌：">
		            <span v-if="!editFlag">{{ item.POLITICALSTATUS }}</span>
		            <span v-else>
		              <!-- <dictionary placeholder="请选择" type=4 v-on:formvalue="setPOLITICALSTATUS" :SelectValue="formdata.POLITICALSTATUS" ></dictionary> -->
		              <autocomplete type=4 v-on:formvalue="setPOLITICALSTATUS" :SelectValue="formdata.POLITICALSTATUS" v-model="formdata.POLITICALSTATUS"></autocomplete>
		            </span>
		        </el-form-item>
	          	<el-form-item label="入党时间：">
		            <span v-if="!editFlag">{{ item.PARTYTIMEformat }}</span>
		            <span v-else class="input-inline">
		              <!-- <el-col :span="11">
		                <el-input v-model="formdata.PARTYTIME_year" placeholder="年份"></el-input>
		              </el-col>
		              <el-col class="line" :span="2">-</el-col>
		              <el-col :span="11">
		                <el-input v-model="formdata.PARTYTIME_month" placeholder="月份"></el-input>
		              </el-col> -->
		              <el-date-picker
					      v-model="formdata.PARTYTIME"
					      type="month"
					      placeholder="选择日期"
					      value-format="yyyy-MM-dd 00:00:00">
					    </el-date-picker>
		            </span>
		        </el-form-item>
		        <el-form-item label="第二党派：">
		            <span v-if="!editFlag">{{ item.SECONDEPARTYString }}</span>
		            <span v-else>
		              <!-- <dictionary placeholder="请选择" type=4 v-on:formvalue="setSECONDEPARTY" :SelectValue="formdata.SECONDEPARTY" ></dictionary> -->
		              <autocomplete type=4 v-on:formvalue="setSECONDEPARTY" :SelectValue="formdata.SECONDEPARTY" v-model="formdata.SECONDEPARTY"></autocomplete>
		            </span>
		        </el-form-item>
		        <el-form-item label="第二党派入党时间：">
		            <span v-if="!editFlag">{{ item.SECONDPARTYTIMEformat }}</span>
		            <span v-else class="input-inline">
		            	<el-date-picker
					      v-model="formdata.SECONDPARTYTIME"
					      type="month"
					      placeholder="选择日期"
					      value-format="yyyy-MM-dd 00:00:00">
					    </el-date-picker>
		              <!-- <el-col :span="11">
		                <el-input v-model="formdata.SECONDPARTYTIME_year" placeholder="年份"></el-input>
		              </el-col>
		              <el-col class="line" :span="2">-</el-col>
		              <el-col :span="11">
		                <el-input v-model="formdata.SECONDPARTYTIME_month" placeholder="月份"></el-input>
		              </el-col> -->
		            </span>
		        </el-form-item>
		        <el-form-item label="健康状况：">
		            <span v-if="!editFlag">{{ item.HEALTHCONDITION }}</span>
		            <span v-else>
		              <!-- <dictionary placeholder="请选择" type=6 v-on:formvalue="setHEALTHCONDITION" :SelectValue="formdata.HEALTHCONDITION" ></dictionary> -->
		              <autocomplete type=6 v-on:formvalue="setHEALTHCONDITION" :SelectValue="formdata.HEALTHCONDITION" v-model="formdata.HEALTHCONDITION"></autocomplete>
		            </span>
		        </el-form-item>
		        <el-form-item label="参加工作时间：">
		            <span v-if="!editFlag">{{ item.WORKTIMEformat }}</span>
		            <span v-else class="input-inline">
		              <!-- <el-col :span="11">
		                <el-input v-model="formdata.WORKTIME_year" placeholder="年份"></el-input>
		              </el-col>
		              <el-col class="line" :span="2">-</el-col>
		              <el-col :span="11">
		                <el-input v-model="formdata.WORKTIME_month" placeholder="月份"></el-input>
		              </el-col> -->
		              	<el-date-picker
					      v-model="formdata.WORKTIME"
					      type="month"
					      placeholder="选择日期"
					      value-format="yyyy-MM-dd 00:00:00">
					    </el-date-picker>
		            </span>
		        </el-form-item>
		        <el-form-item label="党风廉政成绩：">
		            <span v-if="!editFlag">{{ item.PARTYPERFORMANCE }}</span>
		            <span v-else>
		               <el-input type="textarea" v-model="formdata.PARTYPERFORMANCE"></el-input>
		            </span>
		        </el-form-item>
		        <el-form-item label="是否具有基层工作经验：">
		            <span v-if="!editFlag">{{ item.GRASSROOTSEXPERIENCE===0?"是":"否" }}</span>
		            <span v-else>
		                <el-radio-group v-model="formdata.GRASSROOTSEXPERIENCE">
			              <el-radio :label="0">是</el-radio>
			              <el-radio :label="1">否</el-radio>
			            </el-radio-group>
		            </span>
		        </el-form-item>
		        <el-form-item label="人员类型：">
		            <span v-if="!editFlag">{{ item.PERSONTYPE }}</span>
		            <span v-else>
		            	<autocomplete type=7 v-on:formvalue="setPERSONTYPE" :SelectValue="formdata.PERSONTYPE" v-model="formdata.PERSONTYPE"></autocomplete>
		              <!-- <dictionary placeholder="请选择" type=7 v-on:formvalue="setPERSONTYPE" :SelectValue="formdata.PERSONTYPE" ></dictionary> -->
		            </span>
		        </el-form-item>
		        <el-form-item label="人员编制：">
		            <span v-if="!editFlag">{{ item.STAFFING }}</span>
		            <span v-else>
		              <!-- <dictionary placeholder="请选择" type=8 v-on:formvalue="setSTAFFING" :SelectValue="formdata.STAFFING" ></dictionary> -->
		              <autocomplete type=8 v-on:formvalue="setSTAFFING" :SelectValue="formdata.STAFFING" v-model="formdata.STAFFING"></autocomplete>
		            </span>
		        </el-form-item>
		        <div v-if='editFlag' style="text-align:right;padding: 20px 20px 0 20px">
				     <el-button v-if='editFlag' type="primary" size="medium" @click="onESave('formdata')">保存</el-button>
				    <el-button v-if='editFlag' size="medium" @click="onCancel">取消</el-button>
		        </div>
		        <el-button v-else type="primary" size="medium" @click="onEditButton">编辑</el-button>
		        <!-- <el-form-item >
		        				    <el-button v-if='!isEdit' type="primary" @click="onEditButton">编辑</el-button>
		        				     <el-button v-if='isEdit' type="primary" @click="onESave">保存</el-button>
		        				    <el-button v-if='isEdit'>取消</el-button>
		        				</el-form-item> -->
	        </el-form>
        </el-col>
        <div class="clear"></div>
</div>
</template>

<script>
import dictionary from '@/components/Dictionary'
import autocomplete from '@/components/Autocomplete'
import { updateBaseInfo,uploadImage } from '@/api/person'
import {isEmpty,getfullyear,getmonth,getYMDate,DateFormat,parseTime,GetAge } from '@/utils'
import { getToken } from '@/utils/auth'
export default {
  name: 'baseitem',
  props:["isEdit","personID","itemData"],
  components: { dictionary,autocomplete},
  data(){
  	return {
        formdata:{
        	
        },
        editFlag:this.isEdit,
        uploadHeader:{
        	'Authorization':getToken()
        },
        item:{},
        dataString:"",
        imageUrl: '',
        rules:{
        	NAME:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	IDCARD:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	SEX:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	NAME:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	BIRTHDAY:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	NATION:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	NATIVE:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	BIRTHPLACE:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	POLITICALSTATUS:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	PARTYTIME:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	SECONDEPARTY:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	SECONDPARTYTIME:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	HEALTHCONDITION:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	WORKTIME:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	PARTYPERFORMANCE:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	GRASSROOTSEXPERIENCE:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	PERSONTYPE:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	STAFFING:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        	QUESTIONINFO:[{ required: true, message: '请输入干部问题信息', trigger: 'blur' }],
        }
  	}
  },
  created(){
  	/*console.log(this.itemData)
  	if(this.itemData){
  		const data = Json.parse(this.itemData)
  		this.formdata = data.BASEINFO_CADRE
  	}*/
  },
  computed:{
  	BIRTHDAYformat:function () {
      // `this` 指向 vm 实例
      return parseTime(this.item.BIRTHDAY,"{y}-{m}")
    },
    PARTYTIMEformat:function () {
      // `this` 指向 vm 实例
      return parseTime(this.item.PARTYTIME,"{y}-{m}")
    },
    SECONDPARTYTIMEformat:function () {
      // `this` 指向 vm 实例
      return parseTime(this.item.SECONDPARTYTIME,"{y}-{m}")
    },
    WORKTIMEformat:function () {
      // `this` 指向 vm 实例
      return parseTime(this.item.WORKTIME,"{y}-{m}")
    },
    age:function(){
    	return GetAge(this.item.BIRTHDAY)
    },
    formage:function(){
    	return GetAge(this.formdata.BIRTHDAY)
    },

  },
  watch: {
    itemData: function (val) {
	    const data = JSON.parse(val)
	    const baseData = data.BASEINFO_CADRE
	    
	    if(this.isEdit){
	    	baseData.editFlag = true
	    }else{
	    	baseData.editFlag = false
	    }
  		this.item = baseData
  		const string = JSON.stringify(this.item)
  		this.formdata = JSON.parse(string)
  		this.formdata.age = GetAge(this.formdata.BIRTHDAY)
  		/*if(!this.item.PIC){
  			this.imageUrl = "../../../../static/img/default_header.png"
  		}else{
  			this.imageUrl=this.item.PIC
  		}*/
	}
  },
  methods: {
  		onESave(formName){
  			this.$refs[formName].validate((valid) => {
	          if (valid) {
			    const myDate=new Date()
			    //this.formdata.age = myDate.getFullYear()-this.formdata.BIRTHDAY_year
			    this.formdata.BIRTHDAY = parseTime(this.formdata.BIRTHDAY,"{y}-{m}-{d} {h}:{i}:{s}")
			    this.formdata.PARTYTIME = parseTime(this.formdata.PARTYTIME,"{y}-{m}-{d} {h}:{i}:{s}")
			    this.formdata.SECONDPARTYTIME = parseTime(this.formdata.SECONDPARTYTIME,"{y}-{m}-{d} {h}:{i}:{s}")
			    this.formdata.WORKTIME = parseTime(this.formdata.WORKTIME,"{y}-{m}-{d} {h}:{i}:{s}")  
	  			updateBaseInfo(this.formdata).then(response => {
		            this.$message({
			            message: response.msg,
			            type: 'success'
			        });
			        const string = JSON.stringify(this.formdata)
	  				this.item = JSON.parse(string)
			        this.editFlag = false
			        console.log(this.formdata)
	            })
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
  			/*this.formdata.BIRTHDAY = this.formdata.BIRTHDAY_year+"-"+this.formdata.BIRTHDAY_month+"-01 00:00:00"
		    this.formdata.PARTYTIME = this.formdata.PARTYTIME_year+"-"+this.formdata.PARTYTIME_month+"-01 00:00:00"
		    this.formdata.SECONDPARTYTIME = this.formdata.SECONDPARTYTIME_year+"-"+this.formdata.SECONDPARTYTIME_month+"-01 00:00:00"
		    this.formdata.WORKTIME = this.formdata.WORKTIME_year+"-"+this.formdata.WORKTIME_month+"-01 00:00:00"
		    this.formdata.STAFFING = 1
		    const myDate=new Date()
		    this.formdata.age = myDate.getFullYear()-this.formdata.BIRTHDAY_year  
  			updateBaseInfo(this.formdata).then(response => {
	            this.$message({
		            message: response.msg,
		            type: 'success'
		        });
		        const string = JSON.stringify(this.formdata)
  				this.item = JSON.parse(string)
		        this.editFlag = false
            })*/
  			
  		},
  		onCancel(){
  			this.editFlag = false
  		},
  		onEditButton(){
  			this.editFlag = true
  			const string = JSON.stringify(this.item)
  			this.formdata = {}
  			this.formdata = JSON.parse(string)
  			console.log(this.formdata)
  		},
	    handleAvatarSuccess(res, file) {
	    	console.log(res)
	        if(res.success===true){
	        	this.formdata.PIC = res.msg
	        	this.item.PIC = URL.createObjectURL(file.raw);
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
	    setNATION(value){
	    	this.formdata.NATION = value
	    },
	    setNATIVE(value){
	    	this.formdata.NATIVE = value
	    },
	    setBIRTHPLACE(value){
	    	this.formdata.BIRTHPLACE = value
	    },	
	    setPOLITICALSTATUS(value){
	    	this.formdata.POLITICALSTATUS = value
	    },
	    setSECONDEPARTY(value){
	    	this.formdata.SECONDEPARTY = value
	    },
	    setHEALTHCONDITION(value){
	    	this.formdata.HEALTHCONDITION = value
	    },
	    setPERSONTYPE(value){
	    	this.formdata.PERSONTYPE = value
	    },
	    setSTAFFING(value){
	    	this.formdata.STAFFING = value
	    }
    }
}
</script>

<style type="text/css">
	
	/* 头像 */
	#baseItem .avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	#baseItem .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	#baseItem .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	  } 
	  /* .uploadButton{
	  	margin: 50px;
	  } */
	#baseItem .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
    #baseItem .el-form-item {
	    width: 32%;
	    margin-bottom: 10px;
	    margin-right: 0;
	}
	#baseItem .clear{
		clear: both;
	}
	#baseItem .el-form-item__content{
	   	width: 50%;
	}
	#baseItem .el-select{
	  	width: 100%;
	}
	#baseItem .line{
	   	text-align: center;
	}
	#baseItem .el-select{
	   	width: 100%;
	}
	#baseItem .el-form--label-top .el-form-item__label{
		padding: 0;
		font-weight: normal;
	}
	
</style>