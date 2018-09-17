<template>
  <div id="appraisalsManage">
  <div style="text-align: right">
  	<el-button size="mini" type="primary" icon="el-icon-plus"  @click="handleAdd">新增</el-button>
  </div>
  
    <el-tabs tab-position="left" v-model="activeTab">
	    <el-tab-pane label="半年考核" name="halfY">
	    	<el-table :data="halfYItems" border style="width: 100%">
			    <el-table-column prop="YEAR" label="考核年度" width="80px"></el-table-column>
			    <el-table-column prop="EXCELLENT" label="民主测评优秀票数"></el-table-column>
			    <el-table-column prop="QUALIFIED" label="民主测评称职（合格）票数"></el-table-column>
			    <el-table-column prop="BASICQUALIFIED" label="民主测评基本称职（合格）票数"></el-table-column>
			    <el-table-column prop="DISQUALIFIED" label="民主测评不称职（合格）票数"></el-table-column>
			    <el-table-column label="操作">
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
	    </el-tab-pane>
	    <el-tab-pane label="年度考核" name="year">
	    	<el-table :data="yearItems" border style="width: 100%">
			    <el-table-column prop="YEAR" label="考核年度" width="80px"></el-table-column>
			    <el-table-column prop="EXCELLENT" label="民主测评优秀票数"></el-table-column>
			    <el-table-column prop="QUALIFIED" label="民主测评称职（合格）票数"></el-table-column>
			    <el-table-column prop="BASICQUALIFIED" label="民主测评基本称职（合格）票数"></el-table-column>
			    <el-table-column prop="DISQUALIFIED" label="民主测评不称职（合格）票数"></el-table-column>
			    <el-table-column prop="RESULT" label="考核结果"></el-table-column>
			    <el-table-column label="操作">
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
	    </el-tab-pane>
	    <el-tab-pane label="奖励情况" name="award">
	    	<el-table :data="awardItems" border style="width: 100%">
			    <el-table-column prop="AWARD" label="奖励名称"></el-table-column>
			    <el-table-column prop="APPROVETIME" label="批准时间" :formatter='MonthFormat'></el-table-column>
			    <el-table-column prop="APPROVEOFFICE" label="批准机关"></el-table-column>
			    <el-table-column prop="APPROVEOFFICELEVEL" label="批准机关级别"></el-table-column>
			    <el-table-column prop="APPROVEOFFICENATURE" label="批准机关性质"></el-table-column>
			    <el-table-column label="操作">
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
	    </el-tab-pane>
	</el-tabs>
	<el-dialog :title="dialogTitle" width="60%" :visible.sync="yeardialogVisible" :show-close="false" v-model="yearform" @close="dialogClose">
	    <el-form label-position="left" inline class="demo-table-expand" label-width="25%" size="small">
		    <el-form-item label="考核年度">
	          	<el-date-picker
		          v-model="yearform.YEAR"
		          type="year"
		          placeholder="选择日期"
		          value-format="yyyy">
		        </el-date-picker>
		    </el-form-item> 
		    <el-form-item label="民主测评优秀票数">
	          	<el-input v-model="yearform.EXCELLENT" type="number" placeholder="请输入票数"></el-input>
		    </el-form-item> 
		    <el-form-item label="民主测评称职（合格）票数">
	          	<el-input v-model="yearform.QUALIFIED" type="number" placeholder="请输入票数"></el-input>
		    </el-form-item>
		    <el-form-item label="民主测评基本称职（合格）票数">
	          	<el-input v-model="yearform.BASICQUALIFIED"  type="number" placeholder="请输入票数"></el-input>
		    </el-form-item>
		    <el-form-item label="民主测评不称职（合格）票数">
	          	<el-input v-model="yearform.DISQUALIFIED" type="number" placeholder="请输入票数"></el-input>
		    </el-form-item>
		    <el-form-item label="考核结果" v-if="activeTab==='year'">
	          	<el-input v-model="yearform.RESULT" placeholder="请输入票数"></el-input>
		    </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button @click="yeardialogVisible = false;">取 消</el-button>
	      <el-button type="primary" @click="handleYSave">保存</el-button>
	    </div>
	</el-dialog>
	<el-dialog :title="dialogTitle" width="60%" :visible.sync="awarddialogVisible" :show-close="false" @close="dialogClose">
	    <el-form label-position="left" inline class="demo-table-expand" label-width="25%" size="small" v-model="awardform">
	      	<el-form-item label="奖励名称">
	          	<el-autocomplete
	                v-model="awardform.AWARD"
	                value-key="showname"
	                :fetch-suggestions="queryAWARD"
	                placeholder="请输入内容"
	            ></el-autocomplete>
	      	</el-form-item>
	      	<el-form-item label="批准时间：">
	              <el-date-picker
	                v-model="awardform.APPROVETIME"
	                type="month"
	                placeholder="选择日期"
	                value-format="yyyy-MM-dd hh:mm:ss">
	              </el-date-picker>           
	        </el-form-item>
	        <el-form-item label="批准机关">
	          	<el-autocomplete
	                v-model="awardform.APPROVEOFFICE"
	                value-key="showname"
	                :fetch-suggestions="queryAPPROVEOFFICE"
	                placeholder="请输入内容"
	            ></el-autocomplete>
	      	</el-form-item>
	      	<el-form-item label="批准机关级别">
	          	<el-autocomplete
	                v-model="awardform.APPROVEOFFICELEVEL"
	                value-key="showname"
	                :fetch-suggestions="queryAPPROVEOFFICELEVEL"
	                placeholder="请输入内容"
	            ></el-autocomplete>
	      	</el-form-item>
	      	<el-form-item label="批准机关性质">
	          	<el-autocomplete
	                v-model="awardform.APPROVEOFFICENATURE"
	                value-key="showname"
	                :fetch-suggestions="queryAPPROVEOFFICENATURE"
	                placeholder="请输入内容"
	            ></el-autocomplete>
	      	</el-form-item>
	      
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button @click="awarddialogVisible = false;">取 消</el-button>
	      <el-button type="primary" @click="handleAWSave">保存</el-button>
	    </div>
	</el-dialog>
  </div>
</template>

<script>
import { getUserInfo,updateASSESS,deleteASSESS, updateAWARD,deleteAWARD } from '@/api/person'
import {parseTime} from '@/utils'
export default {
	props:["isEdit","itemData","personID"],
  data(){
  	return {
  		halfYItems:[],
  		yearItems:[],
  		awardItems:[],
  		/*halfYData:[],
  		yearData:[],
  		awardData:[],*/
  		halfYearform:{
  			ID:0,
  			BASEINFOID:'',
  			YEAR:'',
  		},
  		yearform:{
  			ID:0,
  			YEAR:'',
  			ISHALF:0,
  			EXCELLENT:0,
  			QUALIFIED:0,
  			BASICQUALIFIED:0,
  			DISQUALIFIED:0,
  			RESULT:''
  		},
  		awardform:{},
  		yeardialogVisible:false,
  		awarddialogVisible:false,
  		activeTab:"halfY",
  		isAdd:true,
  		editIndex:''
  		

  	}
  },
  computed:{
    dialogTitle:function(){
    	var title = ''
    	if(this.activeTab==="year"){
    		if(this.isAdd ===true)
    			title='新增年度考核'
    		else
    			title='编辑年度考核'
    	}else if(this.activeTab==="halfY"){
    		if(this.isAdd ===true)
    			title='新增半年考核'
    		else
    			title='编辑半年考核'
    	}else{
    		if(this.isAdd ===true)
    			title='新增奖励情况'
    		else
    			title='编辑奖励情况'
    	}
    	return title
    },
    awardOptions(){
		return this.$store.state.dict.award
    },
    approveofficeOptions(){
		return this.$store.state.dict.approveoffice
    },
    approveofficelevelOptions(){
    	return this.$store.state.dict.approveofficelevel
    },
   	approveofficenatureOptions(){
    	return this.$store.state.dict.approveofficenature
    },

  },
  watch:{
  	itemData: function (val) {
	    const data = JSON.parse(this.itemData)
	    const asData = data.ANNUALASSESSMENT_ASSESS
	    this.awardItems = data.ANNUALASSESSMENT_AWARD
	    this.yearItems = []
  		this.halfYItems = []
	    for(var i=0;i<asData.length;i++){
	    	if(asData[i].ISHALF===1){
	    		this.yearItems.push(asData[i])
	    	}else{
	    		this.halfYItems.push(asData[i])
	    	}
	    }
    }
  },
  methods:{
  	setUserInfo(){
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
	        	deleteASSESS(row.ID).then(response => {
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
  		debugger
  		this.isAdd = false
  		if(this.activeTab ==="halfY"||this.activeTab ==="year"){
  			this.yeardialogVisible = true
  			var string = JSON.stringify(row)
  			console.log(string)
  			this.yearform = JSON.parse(string)
  		}else{
  			this.awarddialogVisible = true
  			var string = JSON.stringify(row)
  			this.awardform = JSON.parse(string)
  		}
  	},
  	handleAdd(index,row){
  		this.isAdd = true
  		if(this.activeTab ==="halfY"){
  			this.yeardialogVisible = true
  			this.yearform.ID=0
  			this.yearform.ISHALF = 0

  		}else if(this.activeTab ==="year"){
  			this.yeardialogVisible = true
  			this.yearform.ID=0
  			this.yearform.ISHALF = 1
  		}else{
  			this.awarddialogVisible = true
  			this.awardform.ID=0
  		}
  	},
  	handleYSave(){
  		this.yearform.BASEINFOID = this.personID
  		updateASSESS(this.yearform).then(response => {
	        this.$message({
	          message: response.msg,
	          type: 'success'
	        });
	       	this.yeardialogVisible = false
	       	this.setUserInfo()
    	})
  	},
  	handleAWSave(){
  		this.awardform.BASEINFOID = this.personID
  		updateAWARD(this.awardform).then(response => {
	        this.$message({
	          message: response.msg,
	          type: 'success'
	        });
	       	this.awarddialogVisible = false
	       	this.setUserInfo()
    	})
  	},
  	queryAPPROVEOFFICE(queryString, cb) {
        var lists = this.approveofficeOptions;
        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    queryAWARD(queryString, cb) {
        var lists = this.awardOptions;
        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    queryAPPROVEOFFICELEVEL(queryString, cb) {
        var lists = this.approveofficelevelOptions;
        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
  	queryAPPROVEOFFICENATURE(queryString, cb) {
        var lists = this.approveofficenatureOptions;
        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    createFilter(queryString) {
        return (list) => {
          return (list.showname.toLowerCase().indexOf(queryString) === 0);
        };
    },
  	MonthFormat(row, column, cellValue, index){
      	return parseTime(cellValue,"{y}-{m}")
    },
    dialogClose(){
    	this.halfYearform={
  			ID:0,
  			BASEINFOID:'',
  			YEAR:'',
  		}
  		this.yearform={
  			ID:0,
  			YEAR:'',
  			ISHALF:0,
  			EXCELLENT:0,
  			QUALIFIED:0,
  			BASICQUALIFIED:0,
  			DISQUALIFIED:0,
  			RESULT:''
  		}
  		this.awardform={}
    }
  }
}
</script>
