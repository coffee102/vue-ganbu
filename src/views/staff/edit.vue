<template>
  <div id="editContent">
  	
    <el-tabs v-model="activeName2" @tab-click="handleClick">
	    <el-tab-pane v-for='menu in menus' :label='menu.title' :name="menu.name">
	    	<component :is="menu.name" isEdit="1" :personID='personID' :itemData="itemData" @datachange="datachange"></component>
	    </el-tab-pane>
	</el-tabs>
  </div>
</template>
<script>
import baseItem from './components/baseinfocopy'
//import eduItem from './components/edu'
import eduItem from './components/education'
import experienceItem from './components/experience'
import familyItem from './components/family'
import trainingItem from './components/training'
import attributeItem from './components/attribute'
import appraisalsItem from './components/appraisals'
import supervisionItem from './components/supervision'
import { getUserInfo } from '@/api/person'
export default {
    data() {
      return {
        activeName2: 'base-item',
        personID:'',
        itemData:'',
        menus:[
				{title:'基本情况',name:'base-item'},
				{title:'学历学位情况',name:'edu-item'},
				{title:'个人简历',name:'experience-item'},
				{title:'家庭成员及社会关系',name:'family-item'},
				{title:'年度考核',name:'appraisals-item'},
				{title:'干部主要特点及不足',name:'attribute-item'},
				{title:'教育培训',name:'training-item'},
				{title:'干部监督',name:'supervision-item'}
			],
      };
    },
    components:{
		baseItem,eduItem,experienceItem,familyItem,trainingItem,attributeItem,appraisalsItem,supervisionItem
	},
  created(){
    this.setUserInfo()
  },
  
    methods: {
      handleClick(tab, event) {
      },
      setUserInfo(){
        this.personID = this.$route.params.id
        getUserInfo(this.personID).then(response => {
            this.itemData = JSON.stringify(response.obj)
        })
      },
      datachange(data){
        this.itemData = data
      }
    }
  };
</script>
<style type="text/css">
#editContent{
	padding: 30px;
}
	#editContent .demo-table-expand {
    font-size: 0;
  }
  #editContent label {
    /* width: 160px; */
    color: #99a9bf;
    font-weight: normal;
  }
  #editContent .demo-table-expand .el-form-item {
    width: 50%;
    margin-bottom: 10px;
    margin-right: 0;
  }
  #editContent .el-form-item__label{
    /* line-height: normal; */
  }
  #editContent .el-form-item__content{
    width: 55%;
  }
/*   .el-form-item__content input{
  width: 100%;
} */
  #editContent .el-select{
    width: 100%;
  }
  #editContent .line{
    text-align: center;
  }
</style>