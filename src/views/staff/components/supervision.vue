<template>
  <div id="appraisalsManage">
  <div style="text-align: right">
  	<el-button v-if="isEdit?true:false" size="mini" type="primary" icon="el-icon-plus"  @click="handleAdd" >新增</el-button>
  </div>
  
    <el-tabs tab-position="left" v-model="activeTab">
	    <el-tab-pane label="1280信访举报" name="Report">
	    	<el-table :data="ReportItems" border style="width: 100%">
			    <el-table-column prop="TIME" label="登记时间" width="120px" :formatter='dateFormat'></el-table-column>
			    <el-table-column prop="QUESTION" label="反映问题"></el-table-column>
			    <el-table-column prop="SUGGESTION" label="查核情况及处理意见"></el-table-column>
			    <el-table-column label="操作" width="180px" v-if="isEdit?true:false">
			      <template slot-scope="scope" >
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
	    <el-tab-pane label="经济责任审计" name="Ecnomic">
	    	<el-table :data="EcnomicItems" border style="width: 100%">
			    <el-table-column prop="TIME" label="审计时间" width="120px"  :formatter='dateFormat'></el-table-column>
			    <el-table-column label="审计类型">
			    	<template slot-scope="props">
          				{{props.row.TYPE===0?"离任审计":"任中审计"}}
        			</template>
        		</el-table-column>
			    <el-table-column prop="QUESTION" label="存在问题"></el-table-column>
			    <el-table-column prop="SUGGESTION" label="处理意见"></el-table-column>
			    <el-table-column label="操作" width="180px" v-if="isEdit?true:false">
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
	    <el-tab-pane label="个人事项查核" name="Person">
	    	<el-table :data="PersonItems" border style="width: 100%">
			    <el-table-column prop="TIME" label="查核时间" :formatter='dateFormat' width="120px" ></el-table-column>
			    <el-table-column prop="QUESTION" label="存在问题"></el-table-column>
			    <el-table-column prop="SUGGESTION" label="处理意见"></el-table-column>
			    <el-table-column label="操作" width="180px" v-if="isEdit?true:false">
			      <template slot-scope="scope" >
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
	    <el-tab-pane label="党纪政务处分" name="Disciplinaryaction">
	    	<el-table :data="DisciplinaryactionItems" border style="width: 100%">
			    <el-table-column prop="TIME" label="处分时间" width="120px"  :formatter='monthFormat'></el-table-column>
			    <el-table-column prop="REASON" label="处分原因"></el-table-column>
			    <el-table-column prop="DISCIPLINARYACTION" label="处分名称"></el-table-column>
			    <el-table-column prop="APPROVEOFFICE" label="批准机关"></el-table-column>
			    <el-table-column prop="APPROVEOFFICELEVEL" label="批准机关级别"></el-table-column>
			    <el-table-column prop="APPROVEOFFICENATURE" label="批准机关性质"></el-table-column>
			    <el-table-column prop="CANCLETIME" label="处分撤销时间" :formatter='monthFormat'></el-table-column>
			    <el-table-column label="操作" width="180px" v-if="isEdit?true:false">
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
	    <el-tab-pane label="组织处理情况" name="Handling">
	    	<el-table :data="HandlingItems" border style="width: 100%">
			    <el-table-column prop="TIME" label="处理时间" width="120px" :formatter='monthFormat'></el-table-column>
			    <el-table-column prop="QUESTION" label="处理原因"></el-table-column>
			    <el-table-column prop="HANDLING" label="处理情况"></el-table-column>
			    <el-table-column prop="APPROVEOFFICE" label="批准机关"></el-table-column>
			    <el-table-column prop="APPROVEOFFICELEVEL" label="批准机关级别"></el-table-column>
			    <el-table-column prop="APPROVEOFFICENATURE" label="批准机关性质"></el-table-column>
			    <el-table-column label="操作" width="180px" v-if="isEdit?true:false">
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


	<!-- 12380信访举报表单 -->
	<el-dialog :title="dialogTitle+'12380信访举报'" width="60%" :visible.sync="ReportdialogVisible" :show-close="false" v-model="Reportform" @close="dialogClose">
	    <el-form label-position="left" inline class="demo-table-expand" label-width="25%" size="small">
		    <el-form-item label="登记时间">
	          	<el-date-picker
		          v-model="Reportform.TIME"
		          type="date"
		          placeholder="选择日期"
		          value-format="yyyy-MM-dd hh:mm:ss">
		        </el-date-picker>
		    </el-form-item> 
		    <el-form-item label="反映问题">
	          	<el-input type="textarea"  :rows="3" v-model="Reportform.QUESTION"  placeholder="请输入反映问题"></el-input>
		    </el-form-item> 
		    <el-form-item label="查核情况及处理意见">
	          	<el-input type="textarea" v-model="Reportform.SUGGESTION" placeholder="请输入查核情况及处理意见"></el-input>
		    </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button @click="ReportdialogVisible = false;">取 消</el-button>
	      <el-button type="primary" @click="ReportSave">保存</el-button>
	    </div>
	</el-dialog>
	<!-- 经济责任审计表单 -->
	<el-dialog :title="dialogTitle+'经济责任审计'" width="60%" :visible.sync="EcnomicdialogVisible" :show-close="false" v-model="Ecnomicform" @close="dialogClose">
	    <el-form label-position="left" inline class="demo-table-expand" label-width="25%" size="small">
		    <el-form-item label="审计时间">
	          	<el-date-picker
		          v-model="Ecnomicform.TIME"
		          type="date"
		          placeholder="选择日期"
		          value-format="yyyy-MM-dd hh:mm:ss">
		        </el-date-picker>
		    </el-form-item> 
		    <el-form-item label="审计类型">
	          	<el-radio-group v-model="Ecnomicform.TYPE">
	                <el-radio :label="0">离任审计</el-radio>
	                <el-radio :label="1">任中审计</el-radio>
	            </el-radio-group>
		    </el-form-item> 
		    <el-form-item label="存在问题">
	          	<el-input type="textarea" v-model="Ecnomicform.QUESTION" placeholder="请输入查核情况及处理意见"></el-input>
		    </el-form-item>
		    <el-form-item label="处理意见">
	          	<el-input type="textarea" v-model="Ecnomicform.SUGGESTION" placeholder="请输入查核情况及处理意见"></el-input>
		    </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button @click="EcnomicdialogVisible = false;">取 消</el-button>
	      <el-button type="primary" @click="EcnomicSave">保存</el-button>
	    </div>
	</el-dialog>
	<!-- 个人事项查核表单 -->
	<el-dialog :title="dialogTitle+'个人事项查核'" width="60%" :visible.sync="PersondialogVisible" :show-close="false" v-model="Personform" @close="dialogClose">
	    <el-form label-position="left" inline class="demo-table-expand" label-width="25%" size="small">
		    <el-form-item label="查核时间">
	          	<el-date-picker
		          v-model="Personform.TIME"
		          type="date"
		          placeholder="选择日期"
		          value-format="yyyy-MM-dd hh:mm:ss">
		        </el-date-picker>
		    </el-form-item> 
		    <el-form-item label="存在问题">
	          	<el-input type="textarea" v-model="Personform.QUESTION" placeholder="请输入存在问题"></el-input>
		    </el-form-item>
		    <el-form-item label="处理意见">
	          	<el-input type="textarea" v-model="Personform.SUGGESTION" placeholder="请输入处理意见"></el-input>
		    </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button @click="PersondialogVisible = false;">取 消</el-button>
	      <el-button type="primary" @click="PersonSave">保存</el-button>
	    </div>
	</el-dialog>
	<!-- 党纪政务处分表单 -->
	<el-dialog :title="dialogTitle+'党纪政务处分'" width="60%" :visible.sync="DisciplinaryactiondialogVisible" :show-close="false" v-model="Disciplinaryactionform" @close="dialogClose">
	    <el-form label-position="left" inline class="demo-table-expand" label-width="25%" size="small">
		    <el-form-item label="处分时间">
	          	<el-date-picker
		          v-model="Disciplinaryactionform.TIME"
		          type="month"
		          placeholder="选择日期"
		          value-format="yyyy-MM-dd hh:mm:ss">
		        </el-date-picker>
		    </el-form-item> 
		    <el-form-item label="处分原因">
	          	<el-input type="textarea" v-model="Disciplinaryactionform.REASON" placeholder="请输入存在问题"></el-input>
		    </el-form-item>
		    <el-form-item label="处分名称">
	          	<el-autocomplete
	                v-model="Disciplinaryactionform.DISCIPLINARYACTION"
	                value-key="showname"
	                :fetch-suggestions="queryDISCIPLINARYACTION"
	                placeholder="请输入内容"
	            ></el-autocomplete>
		    </el-form-item>
		    <el-form-item label="批准机关">
	          	<el-autocomplete
	                v-model="Disciplinaryactionform.APPROVEOFFICE"
	                value-key="showname"
	                :fetch-suggestions="queryAPPROVEOFFICE"
	                placeholder="请输入内容" 
	            ></el-autocomplete>
		    </el-form-item>
		    <el-form-item label="批准机关级别">
	          	<el-autocomplete
	                v-model="Disciplinaryactionform.APPROVEOFFICELEVEL"
	                value-key="showname"
	                :fetch-suggestions="queryAPPROVEOFFICELEVEL"
	                placeholder="请输入内容"
	            ></el-autocomplete>
		    </el-form-item>
		    <el-form-item label="批准机关性质">
	          	<el-autocomplete
	                v-model="Disciplinaryactionform.APPROVEOFFICENATURE"
	                value-key="showname"
	                :fetch-suggestions="queryAPPROVEOFFICENATURE"
	                placeholder="请输入内容"
	            ></el-autocomplete>
		    </el-form-item>
		    <el-form-item label="处分撤销时间">
	          	<el-date-picker
		          v-model="Disciplinaryactionform.CANCLETIME"
		          type="month"
		          placeholder="选择日期"
		          value-format="yyyy-MM-dd hh:mm:ss">
		        </el-date-picker>
		    </el-form-item> 
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button @click="DisciplinaryactiondialogVisible = false;">取 消</el-button>
	      <el-button type="primary" @click="DisciplinaryactionSave">保存</el-button>
	    </div>
	</el-dialog>
	<!-- 组织处理情况表单 -->
	<el-dialog :title="dialogTitle+'组织处理情况'" width="60%" :visible.sync="HandlingdialogVisible" :show-close="false" v-model="Handlingform" @close="dialogClose">
	    <el-form label-position="left" inline class="demo-table-expand" label-width="25%" size="small">
		    <el-form-item label="处理时间">
	          	<el-date-picker
		          v-model="Handlingform.TIME"
		          type="month"
		          placeholder="选择日期"
		          value-format="yyyy-MM-dd hh:mm:ss">
		        </el-date-picker>
		    </el-form-item> 
		    <el-form-item label="处理原因">
	          	<el-input type="textarea" v-model="Handlingform.QUESTION" placeholder="请输入存在问题"></el-input>
		    </el-form-item>
		    <el-form-item label="处理情况">
	          	<el-input type="textarea" v-model="Handlingform.HANDLING" placeholder="请输入存在问题"></el-input>
		    </el-form-item>
		    <el-form-item label="批准机关">
	          	<el-autocomplete
	                v-model="Handlingform.APPROVEOFFICE"
	                value-key="showname"
	                :fetch-suggestions="queryAPPROVEOFFICE"
	                placeholder="请输入内容"
	            ></el-autocomplete>
		    </el-form-item>
		    <el-form-item label="批准机关级别">
	          	<el-autocomplete
	                v-model="Handlingform.APPROVEOFFICELEVEL"
	                value-key="showname"
	                :fetch-suggestions="queryAPPROVEOFFICELEVEL"
	                placeholder="请输入内容"
	            ></el-autocomplete>
		    </el-form-item>
		    <el-form-item label="批准机关性质">
	          	<el-autocomplete
	                v-model="Handlingform.APPROVEOFFICENATURE"
	                value-key="showname"
	                :fetch-suggestions="queryAPPROVEOFFICENATURE"
	                placeholder="请输入内容"
	            ></el-autocomplete>
		    </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button @click="HandlingdialogVisible = false;">取 消</el-button>
	      <el-button type="primary" @click="HandlingSave">保存</el-button>
	    </div>
	</el-dialog>
	<!-- <el-dialog :title="dialogTitle+'干部问题信息'" width="60%" :visible.sync="PersondialogVisible" :show-close="false" v-model="Personform">
	    <el-form label-position="left" inline class="demo-table-expand" label-width="25%" size="small">
		    
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button @click="PersondialogVisible = false;">取 消</el-button>
	      <el-button type="primary" @click="PersonSave">保存</el-button>
	    </div>
	</el-dialog> -->
  </div>
</template>

<script>
import { getUserInfo,updateREPORT,updatePERSON,updateHANDLINGINFO,updateECNOMIC,updateDISCIPLINARYACTION,deleteREPORT,deletePERSON,deleteHANDLINGINFO,deleteECNOMIC,deleteDISCIPLINARYACTION } from '@/api/person'
import dictionary from '@/components/Dictionary'
import { getTreeDic } from '@/api/dictionary'
import {parseTime} from '@/utils'
export default {
	props:["isEdit","itemData","personID"],
  data(){
  	return {
  		options:[],

  		ReportItems:[],
  		EcnomicItems:[],
  		PersonItems:[],
  		DisciplinaryactionItems:[],
  		HandlingItems:[],
  		gbwtxxItems:[],

  		Reportform:{},
  		Ecnomicform:{},
  		Personform:{},
  		Disciplinaryactionform:{},
  		Handlingform:{},

  		ReportdialogVisible:false,
  		EcnomicdialogVisible:false,
  		PersondialogVisible:false,
  		DisciplinaryactiondialogVisible:false,
  		HandlingdialogVisible:false,


  		activeTab:"Report",
  		isAdd:true,
  	}
  },
  	computed:{
 		dialogTitle:function(){
 			if(this.isAdd)
 				return "新增"
 			else
 				return "编辑"
 		},
 		disciplinaryactionOptions(){
			return this.$store.state.dict.disciplinaryaction
	    },
	    approveofficeOptions(){
			return this.$store.state.dict.approveoffice
	    },
	    approveofficelevelOptions(){
	    	return this.$store.state.dict.approveofficelevel
	    },
	   	approveofficenatureOptions(){
	    	return this.$store.state.dict.approveofficenature
	    }
 	},
  watch:{
  	itemData: function (val) {
	    const data = JSON.parse(this.itemData)
	    this.ReportItems= data.CADRESUPERVISION_REPORT	    
  		this.EcnomicItems= data.CADRESUPERVISION_ECNOMIC
  		this.PersonItems = data.CADRESUPERVISION_PERSON
  		this.DisciplinaryactionItems = data.CADRESUPERVISION_DISCIPLINARYACTION
  		this.HandlingItems = data.CADRESUPERVISION_HANDLINGINFO
  		
    }
  },
  methods:{
  	setUserInfo(){
	    getUserInfo(this.personID).then(response => {
	        //this.itemData = JSON.stringify(response.obj)
	        this.$emit('datachange',JSON.stringify(response.obj))

	    })
  	},	
  	handleDelete(index,row){//deleteREPORT,deletePERSON,deleteHANDLINGINFO,deleteECNOMIC,deleteDISCIPLINARYACTION
  		this.$confirm('确定删除该记录吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
      	}).then(() => {
	        if(this.activeTab ==="Report"){
	  			deleteREPORT(row.ID).then(response => {
			        this.$message({
			          message: response.msg,
			          type: 'success'
			        });
			        this.setUserInfo()
			    })
	  		}else if(this.activeTab ==="Ecnomic"){
	  			deleteECNOMIC(row.ID).then(response => {
			        this.$message({
			          message: response.msg,
			          type: 'success'
			        });
			        this.setUserInfo()
			    })
	  		}else if(this.activeTab ==="Person"){
	  			deletePERSON(row.ID).then(response => {
			        this.$message({
			          message: response.msg,
			          type: 'success'
			        });
			        this.setUserInfo()
			    })
	  		}else if(this.activeTab ==="Disciplinaryaction"){
	  			deleteDISCIPLINARYACTION(row.ID).then(response => {
			        this.$message({
			          message: response.msg,
			          type: 'success'
			        });
			        this.setUserInfo()
			    })
	  		}else if(this.activeTab ==="Handling"){
	  			deleteHANDLINGINFO(row.ID).then(response => {
			        this.$message({
			          message: response.msg,
			          type: 'success'
			        });
			        this.setUserInfo()
			    })
	  		}
      	}).catch(() => {
	        this.$message({
	          type: 'info',
	          message: '已取消删除'
	        });          
      	});
  		
  	},
  	handleEdit(index,row){
  		var string = JSON.stringify(row)
  		this.isAdd = false
  		if(this.activeTab ==="Report"){
  			this.ReportdialogVisible = true
  			this.Reportform = JSON.parse(string)
  		}else if(this.activeTab ==="Ecnomic"){
  			this.EcnomicdialogVisible = true
  			this.Ecnomicform = JSON.parse(string)
  		}else if(this.activeTab ==="Person"){
  			this.PersondialogVisible = true
  			this.Personform = JSON.parse(string)
  		}else if(this.activeTab ==="Disciplinaryaction"){
  			this.DisciplinaryactiondialogVisible = true
  			this.Disciplinaryactionform = JSON.parse(string)
  		}else if(this.activeTab ==="Handling"){
  			this.HandlingdialogVisible = true
  			this.Handlingform = JSON.parse(string)
  		}
  	},
  	handleAdd(index,row){
  		this.isAdd = true
  		if(this.activeTab ==="Report"){
  			this.ReportdialogVisible = true
  			this.Reportform.ID=0
  		}else if(this.activeTab ==="Ecnomic"){
  			this.EcnomicdialogVisible = true
  			this.Ecnomicform.ID=0
  		}else if(this.activeTab ==="Person"){
  			this.PersondialogVisible = true
  			this.Personform.ID=0
  		}else if(this.activeTab ==="Disciplinaryaction"){
  			this.DisciplinaryactiondialogVisible = true
  			this.Disciplinaryactionform.ID=0
  		}else if(this.activeTab ==="Handling"){
  			this.HandlingdialogVisible = true
  			this.Handlingform.ID=0
  		}
  	},
  	ReportSave(){
  		this.Reportform.BASEINFOID = this.personID
  		this.Reportform.TIME = parseTime(this.Reportform.TIME,"{y}-{m}-{d} {h}:{i}:{s}")
  		updateREPORT(this.Reportform).then(response => {
	        this.$message({
	          message: response.msg,
	          type: 'success'
	        });
	       	this.ReportdialogVisible = false
	       	this.setUserInfo()
    	})
  	},
  	EcnomicSave(){//updateREPORT,updatePERSON,updateHANDLINGINFO,updateECNOMIC,updateDISCIPLINARYACTION
  		this.Ecnomicform.BASEINFOID = this.personID
  		this.Ecnomicform.TIME = parseTime(this.Ecnomicform.TIME,"{y}-{m}-{d} {h}:{i}:{s}")
  		updateECNOMIC(this.Ecnomicform).then(response => {
	        this.$message({
	          message: response.msg,
	          type: 'success'
	        });
	       	this.EcnomicdialogVisible = false
	       	this.setUserInfo()
    	})
  	},
  	PersonSave(){
  		this.Personform.BASEINFOID = this.personID
  		this.Personform.TIME = parseTime(this.Personform.TIME,"{y}-{m}-{d} {h}:{i}:{s}")
  		updatePERSON(this.Personform).then(response => {
	        this.$message({
	          message: response.msg,
	          type: 'success'
	        });
	       	this.PersondialogVisible = false
	       	this.setUserInfo()
    	})
  	},
  	DisciplinaryactionSave(){
  		this.Disciplinaryactionform.BASEINFOID = this.personID
  		this.Disciplinaryactionform.TIME = parseTime(this.Disciplinaryactionform.TIME,"{y}-{m}-{d} {h}:{i}:{s}")
  		this.Disciplinaryactionform.CANCLETIME =parseTime(this.Disciplinaryactionform.CANCLETIME,"{y}-{m}-{d} {h}:{i}:{s}") 
  		updateDISCIPLINARYACTION(this.Disciplinaryactionform).then(response => {
	        this.$message({
	          message: response.msg,
	          type: 'success'
	        });
	       	this.DisciplinaryactiondialogVisible = false
	       	this.setUserInfo()
    	})
  	},
  	HandlingSave(){
  		this.Handlingform.BASEINFOID = this.personID
  		this.Handlingform.TIME = parseTime(this.Handlingform.TIME,"{y}-{m}-{d} {h}:{i}:{s}")
  		updateHANDLINGINFO(this.Handlingform).then(response => {
	        this.$message({
	          message: response.msg,
	          type: 'success'
	        });
	       	this.HandlingVisible = false
	       	this.setUserInfo()
    	})
  	},
  	queryAPPROVEOFFICE(queryString, cb) {
        var lists = this.approveofficeOptions;
        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    queryDISCIPLINARYACTION(queryString, cb) {
        var lists = this.disciplinaryactionOptions;
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
    dateFormat:function(row, column, cellValue, index){
      return parseTime(cellValue,"{y}-{m}-{d}")
    },
    monthFormat:function(row, column, cellValue, index){
      return parseTime(cellValue,"{y}-{m}")
    },
    dialogClose:function(){
    	this.Reportform={}
  		this.Ecnomicform={}
  		this.Personform={}
  		this.Disciplinaryactionform={}
  		this.Handlingform={}
    }
  }
}
</script>
