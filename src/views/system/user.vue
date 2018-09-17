<template>
	<div id="userManage">
		<div id="" style="padding:20px 0;width: 90%;margin: auto">
			<div style="text-align: right;margin-bottom: 10px">
				<el-button size="mini" type="primary" icon="el-icon-plus"  @click="addUser">添加用户</el-button>
			</div>
	      <el-table :data="tableData" style="width: 100%;" border size="medium" >
	        <el-table-column prop="username" label="用户名" width="180px"></el-table-column>
	        <el-table-column prop="name" label="真实姓名" width="80px"></el-table-column>
	        <el-table-column prop="orgname" label="所属部门"></el-table-column>
	        <el-table-column prop="lastlogintime" label="最后登录时间" :formatter="dateFormat"></el-table-column>
	        <el-table-column prop="bz" label="备注"></el-table-column>
	        <el-table-column label="操作">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="editUser(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="deleteUser(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
	      </el-table>
	    </div>
	    <el-pagination style="width: 90%;margin: auto" layout="total,prev, pager, next" :total="total" @current-change="curPageChange"></el-pagination> 
	    <el-dialog :title="dialogTitle" width="40%" :visible.sync="dialogFormVisible" :show-close="false" @close="closeDialog">
    		<el-form :model="formdata" :rules="rules" ref="formdata" status-icon label-position="right" class="demo-table-expand" width="80%" label-width="30%" size="small">
	    		<el-form-item label="用户名：" prop="USERNAME">
		          	<el-input v-model="formdata.USERNAME"></el-input>
		        </el-form-item>
		        <el-form-item label="真实姓名：" prop="NAME">
		          	<el-input v-model="formdata.NAME"></el-input>
		        </el-form-item>
		        <el-form-item label="手机号：" prop="MOBILENUM">
		          	<el-input v-model="formdata.MOBILENUM"></el-input>
		        </el-form-item>
		        <el-form-item v-if="!isAdd" label="所属部门：">
		          	<span>{{formdata.orgname}}</span>
		        </el-form-item>
		        <el-form-item label="备注：">
		          	<el-input v-model="formdata.BZ"></el-input>
		        </el-form-item>
    		</el-form>
			<div slot="footer" class="dialog-footer">
		        <el-button @click="dialogFormVisible = false">取 消</el-button>
		        <el-button type="primary" @click="saveUser('formdata')">保存</el-button>
		    </div>
    	</el-dialog>
	</div>
</template>
<script>
import { adduser,updateuser,queryuser,deleteuser } from '@/api/user'
import { parseTime } from '@/utils'
export default {
	data(){
		// 此处自定义校验手机号码js逻辑
	    var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
	    var usernameReg = /^[a-zA-Z0-9_.]+$/
	    var validatePhone = (rule, value, callback) => {
	      setTimeout(() => {
	        if (!phoneReg.test(value)) {
	          callback(new Error('格式有误'))
	        } else {
	          callback()
	        }
	      }, 1000)
	    }
	    var validateUsername = (rule, value, callback) => {
	      setTimeout(() => {
	        if (!usernameReg.test(value)) {
	          callback(new Error('用户名只能包含大小写字母、数字、下划线和点'))
	        } else {
	          callback()
	        }
	      }, 1000)
	    }
		return{
			tableData:[],
			dialogFormVisible:false,
			isAdd:true,
			formdata:{
				USERNAME:"",
				NAME:"",
				MOBILENUM:"",
				BZ:""
			},
			dialogTitle:"",
			page:1,
			rows:10,
			name:"",
			total:0,
			rules:{
				USERNAME: [
		            { required: true, message: '请输名入用户名称', trigger: 'blur' },
		            { max: 18, message: '长度小于18 个英文字符', trigger: 'blur' },
		            { validator: validateUsername, trigger: 'blur' }
		        ],
		        NAME: [
		            { required: true, message: '请输名入真实姓名', trigger: 'blur' }
		        ],
				MOBILENUM:[
					{ required: true, message: '号码不能为空', trigger: 'blur' },
					{ validator: validatePhone, trigger: 'blur' }
				]
			}
		}
		
	},
	created(){
		this.getUsers()
	},
	methods:{
		getUsers(){
			queryuser(this.page,this.rows,this.name).then(response => {
		        this.tableData = response.obj.records
		        this.total =response.obj.total
		    })
		},
		deleteUser(index, row){
			this.$confirm('确定删除该记录吗？', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
		    }).then(() => {
		        deleteuser(row.userid).then(response => {
			        this.$message({
			          message: response.msg,
			          type: 'success'
			        });
			        this.getUsers()
			    })
		    }).catch(() => {
		        this.$message({
		          type: 'info',
		          message: '已取消删除'
		        });          
		    });
		},
		addUser(){
			this.dialogFormVisible = true
			this.dialogTitle = "新增角色"			
		},
		editUser(index, row){
			console.log(row)
			this.dialogFormVisible = true
			this.isAdd = false
			this.dialogTitle = "编辑用户"
			/*const string = JSON.stringify(row)
			this.formdata = JSON.parse(string)
			console.log(this.formdata)
			for(var i in this.formdata){
				if(this.formdata[i]===null){
					this.formdata[i] = ""
				}
			}*/
			this.formdata.USERID = row.userid
			this.formdata.USERNAME = row.username
			this.formdata.NAME = row.name
			this.formdata.MOBILENUM = row.mobilenum
			this.formdata.BZ = row.bz
		},
		saveUser(formName){
			this.$refs[formName].validate((valid) => {
	          	if (valid) {
	            	if(this.isAdd){
						adduser(this.formdata).then(response => {
					        this.$message({
					          message: response.msg,
					          type: 'success'
					        });
					        this.getUsers();
					        this.dialogFormVisible = false
					    })
					}else{
						updateuser(this.formdata).then(response => {
					        this.$message({
					          message: response.msg,
					          type: 'success'
					        });
					        this.getUsers()
					        this.dialogFormVisible = false
					    })
					}
	          	} else {
	            	return false;
	          	}
	        });
			
			
		},
		closeDialog(){
			this.isAdd = true
			this.formdata={
				USERNAME:"",
				NAME:"",
				MOBILENUM:"",
				BZ:""
			}
			
		},
		dateFormat:function(row, column, cellValue, index){
			if(cellValue){
				return parseTime(cellValue,false)
			}
	    },
	    curPageChange(page){
	      this.page = page
	      this.getUsers()
	    }
		
	}
}
</script>
<style type="">
	#userManage .el-pagination{
	    text-align: right;
	}
</style>