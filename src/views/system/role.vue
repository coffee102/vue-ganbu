<template>
	<div id="roleManage">
		<div id="" style="padding:20px 0;width: 90%;margin: auto">
			<div style="text-align: right;margin-bottom: 10px">
				<el-button size="mini" type="primary" icon="el-icon-plus"  @click="addRole">添加角色</el-button>
			</div>
			
	      <el-table :data="tableData" style="width: 100%;" border size="medium" >
	        <el-table-column prop="role_NAME" label="角色名称"></el-table-column>
	        <el-table-column prop="role_DESCRIPTION" label="角色描述"></el-table-column>
	        <el-table-column prop="remark" label="备注"></el-table-column>
	        <el-table-column label="操作">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="editRole(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="deleteRole(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
	      </el-table>  
	    </div>
	    <el-dialog  :title="dialogTitle" width="40%" :visible.sync="dialogFormVisible" :show-close="false" @close="closeDialog">
    		<el-form :model="formdata" :rules="rules" ref="formdata" status-icon label-position="right" class="demo-table-expand" label-width="30%" size="small">
	    		<el-form-item label="角色名称：" prop="role_NAME">
		          	<el-input v-model="formdata.role_NAME"></el-input>
		        </el-form-item>
		        <el-form-item label="角色描述：" prop="role_DESCRIPTION">
		          	<el-input v-model="formdata.role_DESCRIPTION"></el-input>
		        </el-form-item>
		        <el-form-item label="备注：">
		          	<el-input v-model="formdata.remark" type="textarea" :rows="3"></el-input>
		        </el-form-item>
    		</el-form>
			<div slot="footer" class="dialog-footer">
		        <el-button @click="dialogFormVisible = false">取 消</el-button>
		        <el-button type="primary" @click="saveRole('formdata')">保存</el-button>
		    </div>
    	</el-dialog>
	</div>
</template>
<script>
import { addrole,updaterole,queryrole,deleterole } from '@/api/role'
export default {
	data(){

		return{
			tableData:[],
			dialogFormVisible:false,
			isAdd:true,
			formdata:{
				role_NAME:"",
				role_DESCRIPTION:"",
				remark:""
			},
			dialogTitle:"",
			rules: {
		        role_NAME: [
		            { required: true, message: '请输名入角色名称', trigger: 'blur' },
		            { max: 18, message: '长度小于8 个英文字符', trigger: 'blur' }
		        ],
		        role_DESCRIPTION: [
		            { required: true, message: '请输名入角色描述', trigger: 'blur' }
		        ],
		    }
		}
		
	},
	created(){
		this.getRoles()
	},
	methods:{
		getRoles(){
			queryrole().then(response => {
		        this.tableData = response.obj
		    })
		},
		deleteRole(index, row){
			deleterole(row.id).then(response => {
		        this.$message({
		          message: response.msg,
		          type: 'success'
		        });
		        this.tableData.splice(index, 1)
		    })
		},
		addRole(){
			this.dialogFormVisible = true
			this.dialogTitle = "新增角色"			
		},
		editRole(index, row){
			console.log(row)
			this.dialogFormVisible = true
			this.isAdd = false
			this.dialogTitle = "编辑角色"
			const string = JSON.stringify(row)
			this.formdata = JSON.parse(string)
			console.log(this.formdata)
			for(var i in this.formdata){
				if(this.formdata[i]===null){
					this.formdata[i] = ""
				}
			}
		},
		saveRole(formName){
			this.$refs[formName].validate((valid) => {
	          	if (valid) {
	            	if(this.isAdd){
						addrole(this.formdata.role_NAME,this.formdata.role_DESCRIPTION,this.formdata.remark).then(response => {
					        this.$message({
					          message: response.msg,
					          type: 'success'
					        });
					        this.getRoles();
					        this.dialogFormVisible = false
					    })
					}else{
						updaterole(this.formdata.id,this.formdata.role_NAME,this.formdata.role_DESCRIPTION,this.formdata.remark).then(response => {
					        this.$message({
					          message: response.msg,
					          type: 'success'
					        });
					        this.getRoles()
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
			this.formdata = {}
			this.$refs['formdata'].resetFields();
			
		}
		
	}
}
</script>
<style>
</style>