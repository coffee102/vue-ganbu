<template>
  <div id="staffInfo">
	  <el-col :span="5">
	  	<div id="flowContainer" style="height: 300px;">
		  <!-- <el-steps direction="vertical" :active="2">
		    <el-step title="步骤 1"></el-step>
		    <el-step title="步骤 2"></el-step>
		    <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
		  </el-steps> -->
		  <ul class="time-vertical">
		  	<li v-for='(menu,index) in menus' v-on:click.stop="addClass(index)" v-bind:class="{ active:index==current}"><b></b><a href="javascript:void(0)">{{menu.title}}</a></li>
		  </ul>
		</div>
	  </el-col>
     <el-col :span="19">

		<div id="detail">
			<router-link :to="'/staff/edit/'+personID" style="text-align: right;display: block;"><el-button size="mini" type="primary">编辑人员信息</el-button></router-link>
			<div id='base' class="pannel"><span>基本情况</span>
				<div class="content">
					<!-- <base-item :personID = "personID" :itemData="itemData"></base-item> -->
					
				<el-col :span="6">
					<img :src="baseData.personPIC" class="avatar">
						<!-- 
						 -->			
					</el-col>
					<el-col :span="18">
						<div class="group">
							<label>姓名：</label> <span>{{ baseData.NAME }}</span>
						</div>
						<div class="group">
							<label>身份证号：</label> <span>{{ baseData.IDCARD }}</span>
						</div>
						<div class="group">
							<label>性别：</label> <span>{{ baseData.SEX===1?"男":"女" }}</span>
						</div>
						<div class="group">
							<label>出生年月：</label> <span>{{ baseData.BIRTHDAY }}</span>
						</div>
						<div class="group">
							<label>年龄：</label> <span>{{ baseData.age }}</span>
						</div>
						<div class="group">
							<label>民族：</label> <span>{{ baseData.NATION }}</span>
						</div>

						<div class="group">
							<label>籍贯：</label> <span>{{ baseData.NATIVE }}</span>
						</div>
						<div class="group">
							<label>出生地：</label> <span>{{ baseData.BIRTHPLACE }}</span>
						</div>
						<div class="group">
							<label>政治面貌：</label> <span>{{ baseData.POLITICALSTATUS }}</span>
						</div>
						<div class="group">
							<label>入党时间：</label> <span>{{ baseData.PARTYTIME }}</span>
						</div>
						<div class="group">
							<label>健康状况：</label> <span>{{ baseData.HEALTHCONDITION }}</span>
						</div>
						<div class="group">
							<label>参加工作时间：</label> <span>{{ baseData.WORKTIME }}</span>
						</div>
						<div class="group">
							<label>党风廉政成绩：</label> <span>{{ baseData.PARTYPERFORMANCE }}</span>
						</div>
						<div class="group">
							<label>是否具有基层工作经验：</label> <span>{{ baseData.GRASSROOTSEXPERIENCE===0?"是":"否"  }}</span>
						</div>
						<div class="group">
							<label>人员类型：</label> <span>{{ baseData.PERSONTYPE }}</span>
						</div>
						<div class="group">
							<label>人员编制：</label> <span>{{ baseData.STAFFING }}</span>
						</div>	
						<div class="group">
							<label>干部问题信息：</label> <span>{{ baseData.QUESTIONINFO }}</span>
						</div>
						<div class="group">
							<label>专业技术职务：</label> <span>{{ baseData.tec }}</span>
						</div>
						<div class="group">
							<label>工作单位及职务：</label> <span>{{ baseData.workunits }}</span>
						</div>			    	
			        </el-col>
				</div>
			</div>
			<div id="edu" class="pannel">
				<span>学历学位情况</span>
				<div class="content">
					<!-- <ul>
						<li v-for="">全日制教育：山东大学 中国人民解放军体育专业</li>
					</ul> -->
					<edu-item :personID = "personID" :itemData="itemData"></edu-item>
				</div>
			</div>
			<div id="resume" class="pannel">
				<span>个人简历</span>
				<div class="content">
					<experience-item :personID = "personID" :itemData="itemData"></experience-item>
				</div>
			</div>
			<div id="family" class="pannel">
				<span>家庭成员及社会关系</span>
				<div class="content">
					<family-item :personID = "personID" :itemData="itemData"></family-item>
				</div>
			</div>
			<div id="special" class="pannel"><span>年度考核</span>
				<div class="content">
				<apprasals-chart :personID = "personID" :itemData="itemData">
				</apprasals-chart>
				</div>
			</div>
			<div id="appraisals" class="pannel"><span>干部主要特点及不足</span><div class="content">
				<attribute-item :personID = "personID" :itemData="itemData"></attribute-item>
			</div></div>
			<div id="training" class="pannel" ><span>教育培训</span><div class="content">
				<training-item :personID = "personID" :itemData="itemData"></training-item>
			</div></div>
			<div id="file" class="pannel" ><span>干部监督</span>
				<div class="content">
				<supervision-item :personID = "personID" :itemData="itemData"> </supervision-item>
				</div>
			</div>
		</div>
	</el-col>
  </div>
</template>

<script>
import eduItem from './components/education'
import experienceItem from './components/experience'
import familyItem from './components/family'
import trainingItem from './components/training'
import attributeItem from './components/attribute'
import apprasalsChart from './components/apprasalschart'
import supervisionItem from './components/supervision'
import { getUserInfo } from '@/api/person'
import {parseTime,GetAge} from '@/utils'
export default {
	name: 'staff-info',
	data(){
		return{
			current:0,
			menus:[
				{title:'基本情况'},
				{title:'学历学位情况'},
				{title:'个人简历'},
				{title:'家庭成员及社会关系'},
				{title:'年度考核'},
				{title:'干部主要特点及不足'},
				{title:'教育培训'},
				{title:'干部档案'},
			],
			test:'威海职业学院',
			itemData:'',
			baseData:"",
			personID:'',

		}
	},
	components:{
		eduItem,experienceItem,familyItem,trainingItem,attributeItem,apprasalsChart,supervisionItem
	},
	mounted () {
		document.getElementById("detail").addEventListener('scroll', this.handleScroll);
	},
	created(){
	    this.setUserInfo()
    },
	methods:{
		setUserInfo(){
	        this.personID = this.$route.params.id
	        getUserInfo(this.personID).then(response => {
	            this.itemData = JSON.stringify(response.obj)
	            const baseData = response.obj.BASEINFO_CADRE
	            const tecData = response.obj.BASEINFO_TECHNICALPOSITION
	            const workunitsData = response.obj.BASEINFO_WORKUNITS
	            let workArry = []
	            if(workunitsData&&workunitsData.length>0){
	            	for(var i=0;i<workunitsData.length;i++){
	            		if(workunitsData[i].JOBSTATE ===0){
	            			workArry.push(workunitsData[i].INSTITUTIONS+workunitsData[i].JOB)
	            		}
	            	}
	            	baseData.workunits = workArry.join("，")
	            }else{
	            	baseData.workunits = "暂无"
	            }
	            if(baseData.PIC){
	 				baseData.personPIC = "/apis/"+baseData.PIC
	 			}else{
	 				baseData.personPIC = "/static/img/default_header.jpg"
	 			}
			    baseData.BIRTHDAY = parseTime(baseData.BIRTHDAY,"{y}-{m}")
			    baseData.PARTYTIME = parseTime(baseData.PARTYTIME,"{y}-{m}")
			    baseData.SECONDPARTYTIME = parseTime(baseData.SECONDPARTYTIME,"{y}-{m}")
			    baseData.WORKTIME = parseTime(baseData.WORKTIME,"{y}-{m}")
			    baseData.age = GetAge(baseData.BIRTHDAY)
			    baseData.tec = tecData[tecData.length-1]&&tecData[tecData.length-1].TECHNICAL?tecData[tecData.length-1].TECHNICAL:"无"
			    this.baseData = baseData
	        })
	    },
		handleScroll () {
			var pannel = document.getElementsByClassName('pannel');
		  	var scrollTop = document.getElementById("detail").scrollTop+50;
		  	for (var i = 0;i<pannel.length; i ++) {
		  		var $p = pannel[i];
		  		var top = $p.offsetTop;
		  		if (scrollTop >= top && scrollTop <= $p.offsetHeight + top) //  top >= st >= top + height
		        {
		            this.current = i;
		        }
		  	}

		},
		addClass:function(index){
            this.current=index;
            this.scrollTO(index);    
        },
		scrollTO(index){
			var pannel = document.getElementsByClassName('pannel');
			var scrollDom = document.getElementById("detail");
			// 获取需要滚动的距离
    		let total = pannel[index].offsetTop-20;
    		// 平滑滚动，时长500ms，每10ms一跳，共50跳
			// 获取当前滚动条与窗体顶部的距离
    		let distance = scrollDom.scrollTop;
    		let step = total / 50;
	        if (total > distance) {//考虑上下滚动
	          smoothDown();
	        } else {
	          let newTotal = distance - total;
	          step = newTotal / 50;
	          smoothUp();
	        }
	        function smoothDown () {
	          if (distance < total) {
	            distance += step;
	　　　　　　scrollDom.scrollTop = distance;
	            setTimeout(smoothDown, 10);
	          } else {
	           	scrollDom.scrollTop = total;
	          }
	        }
	        function smoothUp () {
	          if (distance > total) {
	            distance -= step;
	　　　　　　scrollDom.scrollTop = distance;
	            setTimeout(smoothUp, 10);
	          } else {
	            crollDom.scrollTop = total;
	          }
	       	} 
    		/*// Chrome
		    scrollDom.scrollTop = total;
		    // Firefox
		    scrollDom.scrollTop = total;
		    // Safari
		    scrollDom.pageYOffset = total;*/
				}
	}

}
</script>
<style type="">
#staffInfo{
	padding-top: 10px;
}
#flowContainer{
	padding-left: 45px;
}
	/*纵向时间轴*/
#staffInfo .content{
	padding: 20px 0;
}
.time-vertical {
    list-style-type: none;
    border-left: 2px solid #122c5e;
    padding: 0px;
    height: 400px;
}

 
.time-vertical li {
    height: 50px;
    position: relative;
}
 
.time-vertical li a {
    display: inline-block;
    margin-left: 35px;
    text-decoration: none;
    color: #000;
}
 
.time-vertical li b:before {
    content: '';
    position: absolute;
    left: -17.5px;
    top: -9.5px;
    width: 35px;
    height: 35px;
    /*border: 2px solid #98FB98;
    border-radius: 10px; */
    background: url('../../../static/img/timeV_ls.png') no-repeat;
}
.time-vertical li.active b:before {
	background: url('../../../static/img/timeV_ls_act.png') no-repeat;
}
 
.time-vertical li span {
    position: absolute;
    color: #fff;
    top: 18px;
    left: -6px;
}
#detail{
	height: 480px;
	overflow: auto;
	padding: 0 40px;
}
.pannel>span{
	padding: 10px;
	line-height: 37px;
	background-color: #122c5e;
	color: #ffffff;
}
#detail .content{
	min-height: 200px;
	border-top: 2px solid #122c5e;
}
#base table{
	border-collapse: collapse;
}
#base table th{
	font-weight: normal;
	width: 130px;
}
#base table tr{
	height: 35px;
	border-bottom: 1px dotted #e2e2e2;
}

#edu ul{
	padding-left: 10px;
}
#edu li{
	list-style: none;
	height:35px;
	line-height: 35px;
	
	border-bottom: 1px dotted #e2e2e2;
}
#base .group{
		display: inline-block;
		width: 300px;
		padding: 10px;
		font-size: 14px
	}
#base .group label{
	width: 60px;
	font-weight: normal;
	color: #666666;
}
#base .avatar{
		width: 180px;
		height: 200px;
	}
</style>