<template>
	<div id="baseManage">
		<el-tabs tab-position="left" v-model="activeTab">
			<el-tab-pane label="基础信息" name="base">
				
				<el-col :span="5">
				<img :src="baseData.personPIC" class="avatar">
					<!-- 
					 -->			
				</el-col>
				<el-col :span="19">
					<el-button type="primary" size="medium" @click="baseEdit" style="float: right">编辑</el-button>
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
						<label>第二党派：</label> <span>{{ baseData.SECONDEPARTY }}</span>
					</div>
					<div class="group">
						<label>第二党派入党时间：</label> <span>{{ baseData.SECONDPARTYTIME }}</span>
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
		        </el-col>
			</el-tab-pane>
			<el-tab-pane label="专业技术职务" name="technical">
				<el-button size="mini" type="primary" icon="el-icon-plus"  @click="tecAdd" style="float: right">新增</el-button >
					<el-table :data="tecData" border style="width: 100%">
				    <el-table-column prop="TECHNICAL" label="专业技术职务"></el-table-column>
				    <el-table-column prop="GETDATE" label="获得资格日期" :formatter='monthFormat'></el-table-column>
				    <el-table-column prop="APPROACH" label="获得资格途径"></el-table-column>
				    <el-table-column prop="TESTNAME" label="评委会或考试名称"></el-table-column>
				    <el-table-column label="操作" v-if="isEdit?true:false" width="180px"> 
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click="tecEdit(scope.$index, scope.row)">编辑</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="tecDelete(scope.$index, scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="工作单位及职务" name="workunits">
				<el-button size="mini" type="primary" icon="el-icon-plus"  @click="wunitAdd" style="float: right">新增</el-button>
				<el-table :data="wunitData" border style="width: 100%">
				    <el-table-column prop="INSTITUTIONS" label="任职机构" width="80px"></el-table-column>
				    <el-table-column prop="JOB" label="职务" width="80px"></el-table-column>
				    <el-table-column prop="JOBSTATE" label="任职状态" width="100px" :formatter='JOBSTATEFormat'></el-table-column>
				    <el-table-column prop="JOBTIME" label="任职时间" :formatter='monthFormat'></el-table-column>
					<el-table-column prop="JOBTIMESolt" label="任职年限"></el-table-column>
				    <el-table-column prop="TEAMSIGN" label="领导成员标识">
				    	<template slot-scope="props">
			  				{{props.row.TEAMSIGN===0?"是":"否"}}
						</template>
				    </el-table-column>
				    <el-table-column prop="LEADERSIGN" label="班子成员标识">
				    	<template slot-scope="props">
			  				{{props.row.LEADERSIGN===0?"是":"否"}}
						</template>
				    </el-table-column>
				    <el-table-column prop="TEAMTYPE" label="班子成员类别"></el-table-column>
				    <el-table-column prop="MIDDLEMANAGER" label="是否企事业中层干部">
				    	<template slot-scope="props">
			  				{{props.row.MIDDLEMANAGER===0?"是":"否"}}
						</template>
				    </el-table-column>
				    <el-table-column prop="JOBLEVEL" label="职务层次"></el-table-column>
				    <el-table-column prop="JOBTYPE" label="职务类别"></el-table-column>
				    <el-table-column prop="JOBNUMBER" label="任职文号"></el-table-column>
				 	<el-table-column prop="JOBLEVELTIME" label="职务层次时间" :formatter='monthFormat' ></el-table-column>
				 	<el-table-column prop="JOBLEVELTIMESolt" label="职务层次年限"></el-table-column>
					<el-table-column prop="PROMOTE" label="破格提拔">
				    	<template slot-scope="props">
			  				{{props.row.PROMOTE===0?"是":"否"}}
						</template>
				    </el-table-column>
				    <el-table-column label="操作" v-if="isEdit?true:false" width="180px"> 
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click="wunitEdit(scope.$index, scope.row)">编辑</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="wunitDelete(scope.$index, scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="职级信息" name="workrank">
				<el-button size="mini" type="primary" icon="el-icon-plus"  @click="wrankAdd" style="float: right"> 新增</el-button>
				<el-table :data="wrankData" border style="width: 100%">
				    <el-table-column prop="WORKRANK" label="职级" width="100px"></el-table-column>
				    <el-table-column prop="WORKTIME" label="任现职级时间" :formatter='monthFormat' width="120px"></el-table-column>
				    <el-table-column prop="WORKTIMESolt" label="任现职级年限"></el-table-column>
				    <el-table-column label="操作"width="180px"> 
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click="wrankEdit(scope.$index, scope.row)">编辑</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="wrankDelete(scope.$index, scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
			    </el-table>
			</el-tab-pane>
		</el-tabs>

		<el-dialog title="编辑基础信息" width="80%" :visible.sync="baseDialogVisible" :show-close="false" @close="dialogClose">
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
				<el-form :model="baseFormData" ref="baseFormData" :rules="rules" label-position="right" inline label-width="40%" size="small">
					
		          <el-form-item label="姓名：" prop="NAME">
		               <el-input v-model="baseFormData.NAME" placeholder="年份"></el-input>
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
				                placeholder="请输入内容"
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
					     <el-button @click="baseDialogVisible = false;baseFormData={}">取 消</el-button>
			        </div>
		        </el-form>
	        </el-col>
	        <div class="clear"></div>
		</el-dialog>
		<!-- 专业技术职务表单 -->
		<el-dialog :title="dialogTitle+'专业技术职务'" :visible.sync="tecDialogVisible" :show-close="false" @close="dialogClose" width="60%">
		    <el-form label-position="left" inline label-width="25%" size="small" v-model="tecFormData">
		      <el-form-item label="专业技术职务资格">
		          <el-autocomplete
		                v-model="tecFormData.TECHNICAL"
		                value-key="showname"
		                :fetch-suggestions="queryTechnical"
		                placeholder="请输入内容"
		            ></el-autocomplete>
		      </el-form-item>
		      <el-form-item label="获得资格日期">
		         	<el-date-picker
		                v-model="tecFormData.GETDATE"
		                type="month"
		                placeholder="选择日期"
		                default-value = ""
		                value-format="yyyy-MM-dd hh:mm:ss">
		            </el-date-picker>
		      </el-form-item>
		      <el-form-item label="获得资格途径">
		          <el-autocomplete
		                v-model="tecFormData.APPROACH"
		                value-key="showname"
		                :fetch-suggestions="queryApproach"
		                placeholder="请输入内容"
		            ></el-autocomplete>
		      </el-form-item>
		      	<el-form-item label="评委会或考试名称">
	        		<el-input v-model="tecFormData.TESTNAME"></el-input>
	      		</el-form-item>
		    </el-form>
		    <div slot="footer" class="dialog-footer">
		      <el-button @click="tecDialogVisible = false">取 消</el-button>
		      <el-button type="primary" @click="tecSave">保存</el-button>
		    </div>
		</el-dialog>
		<!-- 工作单位及职务表单 -->
		<el-dialog :title="dialogTitle+'工作单位及职务'" :visible.sync="wunitDialogVisible" :show-close="false" @close="dialogClose" width="60%" >
		    <el-form label-position="right" inline label-width="40%" size="small" v-model="wunitFormData">
		      <el-form-item label="任职机构名称：">
		          <el-autocomplete
		                v-model="wunitFormData.INSTITUTIONS"
		                value-key="showname"
		                :fetch-suggestions="queryInstitutions"
		                placeholder="请输入内容"
		            ></el-autocomplete>
		      </el-form-item>
		      <el-form-item label="职务名称：">
		          <el-autocomplete
		                v-model="wunitFormData.JOB"
		                value-key="showname"
		                :fetch-suggestions="queryJob"
		                placeholder="请输入内容"
		            ></el-autocomplete>
		      </el-form-item>
		      <el-form-item label="任职状态：">
		          <el-radio-group v-model="wunitFormData.JOBSTATE">
		            <el-radio :label="0">在任</el-radio>
		            <el-radio :label="1">不在任</el-radio></br>
		            <el-radio :label="2">拟任</el-radio>
		            <el-radio :label="3">拟免</el-radio>
		          </el-radio-group>
		      </el-form-item>
		      <el-form-item label="任职时间：">
		         	<el-date-picker
		                v-model="wunitFormData.JOBTIME"
		                type="month"
		                placeholder="选择日期"
		                value-format="yyyy-MM-dd hh:mm:ss"
		                @change="JOBTIMESelect">
		            </el-date-picker>
		      </el-form-item>
		      <el-form-item label="任职年限：">
	        		<el-input v-model="wunitFormData.JOBTIMESolt" readonly="true"></el-input>
	      		</el-form-item>
				<el-form-item label="领导成员标识：">
		          	<el-radio-group v-model="wunitFormData.LEADERSIGN">
			            <el-radio :label="0">是</el-radio>
			            <el-radio :label="1">否</el-radio>
		          	</el-radio-group>
		      	</el-form-item>
		      	<el-form-item label="班子成员标识：">
		          	<el-radio-group v-model="wunitFormData.TEAMSIGN">
			            <el-radio :label="0">是</el-radio>
			            <el-radio :label="1">否</el-radio>
		          	</el-radio-group>
		      	</el-form-item>
				<el-form-item label="班子成员类别：">
		          <el-autocomplete
		                v-model="wunitFormData.TEAMTYPE"
		                value-key="showname"
		                :fetch-suggestions="queryTeamtype"
		                placeholder="请输入内容"
		            ></el-autocomplete>
		      	</el-form-item>
				<el-form-item label="是否企事业中层干部：">
		          	<el-radio-group v-model="wunitFormData.MIDDLEMANAGER">
			            <el-radio :label="0">是</el-radio>
			            <el-radio :label="1">否</el-radio>
		          	</el-radio-group>
		      	</el-form-item>
		      	<el-form-item label="职务层次：">
		          <el-autocomplete
		                v-model="wunitFormData.JOBLEVEL"
		                value-key="showname"
		                :fetch-suggestions="queryJoblevel"
		                placeholder="请输入内容"
		            ></el-autocomplete>
		      	</el-form-item>
		      	<el-form-item label="职务类别：">
		          <el-autocomplete
		                v-model="wunitFormData.JOBTYPE"
		                value-key="showname"
		                :fetch-suggestions="queryJobtype"
		                placeholder="请输入内容"
		            ></el-autocomplete>
		      	</el-form-item>
				<el-form-item label="任职文号：">
	        		<el-input v-model="wunitFormData.JOBNUMBER"></el-input>
	      		</el-form-item>
	      		<el-form-item label="职务层次时间：">
		         	<el-date-picker
		                v-model="wunitFormData.JOBLEVELTIME"
		                type="month"
		                placeholder="选择日期"
		                value-format="yyyy-MM-dd hh:mm:ss"
		                @change="JOBLEVELTIMESelect">
		            </el-date-picker>
		      	</el-form-item>
		      	<el-form-item label="职务层次年限：">
	        		<el-input v-model="wunitFormData.JOBLEVELTIMESolt" readonly="true"></el-input>
	      		</el-form-item>
				<el-form-item label="破格提拔：">
		          	<el-radio-group v-model="wunitFormData.PROMOTE">
			            <el-radio :label="0">是</el-radio>
			            <el-radio :label="1">否</el-radio>
		          	</el-radio-group>
		      	</el-form-item>  
		    </el-form>
		    <div slot="footer" class="dialog-footer">
		      <el-button @click="wunitDialogVisible = false;wunitFormData={}">取 消</el-button>
		      <el-button type="primary" @click="wunitSave">保存</el-button>
		    </div>
		</el-dialog>
		<!-- 职级信息表单 -->
		<el-dialog :title="dialogTitle+'职级信息'" :visible.sync="wrankDialogVisible" :show-close="false" @close="dialogClose" width="60%">
		    <el-form label-position="left" inline label-width="25%" size="small" v-model="wrankFormData">
		      <el-form-item label="职级">
		          <el-autocomplete
		                v-model="wrankFormData.WORKRANK"
		                value-key="showname"
		                :fetch-suggestions="queryWorkrank"
		                placeholder="请输入内容"
		            ></el-autocomplete>
		      </el-form-item>
		      <el-form-item label="任现职级时间">
		         	<el-date-picker
		                v-model="wrankFormData.WORKTIME"
		                type="month"
		                placeholder="选择日期"
		                value-format="yyyy-MM-dd hh:mm:ss"
		                @change="WORKTIMESelect">
		            </el-date-picker>
		      </el-form-item>
		      	<el-form-item label="任现职级年限">
	        		<el-input v-model="wrankFormData.WORKTIMESolt" readonly="true"></el-input>
	      		</el-form-item>
		    </el-form>
		    <div slot="footer" class="dialog-footer">
		      <el-button @click="wrankDialogVisible = false">取 消</el-button>
		      <el-button type="primary" @click="wrankSave">保存</el-button>
		    </div>
		</el-dialog>
	</div>
</template>
<script type="">
import dictionary from '@/components/Dictionary'
import { getTreeDic } from '@/api/dictionary'
import {parseTime,GetAge} from '@/utils'
import { getToken } from '@/utils/auth'
import { getUserInfo,updateBaseInfo,uploadImage,updateTECHNICAL,updateWORKUNITS,updateWORKRANK,deleteTECHNICAL,deleteWORKUNITS,deleteWORKRANK } from '@/api/person'
	export default{
		props:["isEdit","itemData",'personID'],
		data(){
			return {
				activeTab:"base",
				options:[],
				loading:false,

				baseData:{},
				personPIC:"",
				tecData:[],
				wrankData:[],
				wunitData:[],
				uploadHeader:{
		        	'Authorization':getToken()
		        },

				isAdd:true,

				baseFormData:{},
				tecFormData:{},
				wrankFormData:{},
				wunitFormData:{},

				baseDialogVisible:false,
				tecDialogVisible:false,
				wrankDialogVisible:false,
				wunitDialogVisible:false,

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
		computed:{
	 		dialogTitle:function(){
	 			if(this.isAdd)
	 				return "新增"
	 			else
	 				return "编辑"
	 		},
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

	  		technicalOptions(){
	  			return this.$store.state.dict.technical
	  		},
	  		approachOptions(){
	  			return this.$store.state.dict.approach
	  		},
	  		institutionsOptions(){
	  			return this.$store.state.dict.institutions
	  		},
	  		jobOptions(){
	  			return this.$store.state.dict.job
	  		},
	  		joblevelOptions(){
	  			return this.$store.state.dict.joblevel
	  		},
	  		jobtypeOptions(){
	  			return this.$store.state.dict.jobtype
	  		},
	  		workrankOptions(){
	  			return this.$store.state.dict.workrank
	  		}
	 	},
		/*created(){
		    this.setUserInfo()
		},*/
		watch:{
		  	itemData: function (val) {
		  		const data = JSON.parse(this.itemData)
			    const baseData = data.BASEINFO_CADRE
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
			    const baseDataString = JSON.stringify(baseData)
			    this.baseData = JSON.parse(baseDataString)

			    const tecData = data.BASEINFO_TECHNICALPOSITION
			    if(tecData&&tecData.length>0){
			    	for(var i=0;i<tecData.length;i++){
				        tecData[i].GETDATE = parseTime(tecData[i].GETDATE,"{y}-{m}")
				    }
				    this.tecData = tecData
			    }
			    
			    const wrankData = data.BASEINFO_WORKRANK
			    if(wrankData&&wrankData.length>0){
			    	for(var i=0;i<wrankData.length;i++){
				        wrankData[i].WORKTIME = parseTime(wrankData[i].WORKTIME,"{y}-{m}")
				        wrankData[i].WORKTIMESolt = GetAge(wrankData[i].WORKTIME)
				    }
				    this.wrankData = wrankData
			    }
			    

			    const wunitData = data.BASEINFO_WORKUNITS
			    if(wunitData&&wunitData.length>0){
			    	for(var i=0;i<wunitData.length;i++){
				        wunitData[i].JOBTIME = parseTime(wunitData[i].JOBTIME,"{y}-{m}")
				        wunitData[i].JOBTIMESolt = GetAge(wunitData[i].JOBTIME,"{y}-{m}")
				        wunitData[i].JOBLEVELTIME = parseTime(wunitData[i].JOBLEVELTIME,"{y}-{m}")
				        wunitData[i].JOBLEVELTIMESolt = GetAge(wunitData[i].JOBLEVELTIME)
				    }
				    this.wunitData = wunitData
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
			baseEdit(){
				this.baseDialogVisible = true
				let baseData = this.baseData
				for( var i in baseData ){
					if(!baseData[i]){
						delete baseData[i]
					}
				}
				const baseDataString = JSON.stringify(baseData)
			    this.baseFormData = JSON.parse(baseDataString)
			},
			baseSave(formName){
				this.$refs[formName].validate((valid) => {
		          if (valid) {
				    const myDate=new Date()
				    //this.formdata.age = myDate.getFullYear()-this.formdata.BIRTHDAY_year
				    this.baseFormData.BIRTHDAY = parseTime(this.baseFormData.BIRTHDAY,"{y}-{m}-{d} {h}:{i}:{s}")
				    this.baseFormData.PARTYTIME = parseTime(this.baseFormData.PARTYTIME,"{y}-{m}-{d} {h}:{i}:{s}")
				    this.baseFormData.SECONDPARTYTIME = parseTime(this.baseFormData.SECONDPARTYTIME,"{y}-{m}-{d} {h}:{i}:{s}")
				    this.baseFormData.WORKTIME = parseTime(this.baseFormData.WORKTIME,"{y}-{m}-{d} {h}:{i}:{s}")  
		  			updateBaseInfo(this.baseFormData).then(response => {
			            this.$message({
				            message: response.msg,
				            type: 'success'
				        });
				        this.setUserInfo();
				        this.baseDialogVisible = false
		            })
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
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
			tecAdd(){
				this.isAdd = true
				this.tecDialogVisible = true
			},
			tecEdit(index,row){
				this.isAdd = false
				this.tecDialogVisible = true
				for(var i in row){
					if(!row[i]){
						delete row[i]
					}
				}
				const tecDataString = JSON.stringify(row)
			    this.tecFormData = JSON.parse(tecDataString)
			},
			tecSave(){
				this.tecFormData.BASEINFOID = this.personID
			    this.tecFormData.GETDATE = parseTime(this.tecFormData.GETDATE,"{y}-{m}-{d} {h}:{i}:{s}")
	  			updateTECHNICAL(this.tecFormData).then(response => {
		            this.$message({
			            message: response.msg,
			            type: 'success'
			        });
			        this.setUserInfo();
			        this.tecDialogVisible = false
	            })
		          
			},
			tecDelete(index,row){
				deleteTECHNICAL(row.ID).then(response => {
			        this.$message({
			          message: response.msg,
			          type: 'success'
			        });
			        this.setUserInfo()
			    })   
			},
			wunitAdd(){
				this.isAdd = true
				this.wunitDialogVisible = true
			},
			wunitEdit(index,row){
				this.isAdd = false
				this.wunitDialogVisible = true
				for(var i in row){
					if(!row[i]){
						delete row[i]
					}
				}
				const wunitDataString = JSON.stringify(row)
			    this.wunitFormData = JSON.parse(wunitDataString)
			},
			wunitSave(){
				this.wunitFormData.BASEINFOID = this.personID
			    this.wunitFormData.JOBTIME = parseTime(this.wunitFormData.JOBTIME,"{y}-{m}-{d} {h}:{i}:{s}")
			    this.wunitFormData.JOBLEVELTIME = parseTime(this.wunitFormData.JOBLEVELTIME,"{y}-{m}-{d} {h}:{i}:{s}")
	  			updateWORKUNITS(this.wunitFormData).then(response => {
		            this.$message({
			            message: response.msg,
			            type: 'success'
			        });
			        this.setUserInfo();
			        this.wunitDialogVisible = false
	            })
		          
			},
			wunitDelete(index,row){
				deleteWORKUNITS(row.ID).then(response => {
			        this.$message({
			          message: response.msg,
			          type: 'success'
			        });
			        this.setUserInfo()
			    })   
			},
			wrankAdd(){
				this.isAdd = true
				this.wrankDialogVisible = true
			},
			wrankEdit(index,row){
				this.isAdd = false
				this.wrankDialogVisible = true
				for(var i in row){
					if(!row[i]){
						delete row[i]
					}
				}
				const wrankDataString = JSON.stringify(row)
			    this.wrankFormData = JSON.parse(wrankDataString)
			},
			wrankSave(){
				this.wrankFormData.BASEINFOID = this.personID
			    this.wrankFormData.WORKTIME = parseTime(this.wrankFormData.WORKTIME,"{y}-{m}-{d} {h}:{i}:{s}")
	  			updateWORKRANK(this.wrankFormData).then(response => {
		            this.$message({
			            message: response.msg,
			            type: 'success'
			        });
			        this.setUserInfo();
			        this.wrankDialogVisible = false
	            })
			},
			wrankDelete(index,row){
				deleteWORKRANK(row.ID).then(response => {
			        this.$message({
			          message: response.msg,
			          type: 'success'
			        });
			        this.setUserInfo()
			    })   
			},
			BIRTHDAYSelect(value){
		    	this.baseFormData.age = GetAge(value)
		    },
		    JOBLEVELTIMESelect:function(val){
		    	this.wunitFormData.JOBLEVELTIMESolt = GetAge(val)
		    },
		    JOBTIMESelect:function(val){
		    	this.wunitFormData.JOBTIMESolt = GetAge(val)
		    },
		    WORKTIMESelect:function(val){
		    	this.wrankFormData.WORKTIMESolt = GetAge(val)
		    },
		    monthFormat:function(row, column, cellValue, index){
		      	return parseTime(cellValue,"{y}-{m}")
		    },
		    JOBSTATEFormat:function(row, column, cellValue, index){//0：在任1：不在任2：拟任3：拟免
		      	if(cellValue===0)
		      		return "在任"
		      	else if(cellValue===1)
		      		return "不在任"
		      	else if(cellValue===2)
		      		return "拟任"
		      	else 
		      		return "拟免"
		    },
		    
			//获取子弹表
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
		    },queryPoliticalstatus(queryString, cb) {
		        var lists = this.politicalstatusOptions;
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
		        var lists = this.healthconditionOptions;
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
		        var lists = this.staffingOptions;
		        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		    },

		    queryTechnical(queryString, cb) {
		        var lists = this.technicalOptions;
		        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		    },
		    queryApproach(queryString, cb) {
		        var lists = this.approachOptions;
		        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		    },
		    queryInstitutions(queryString, cb) {
		        var lists = this.institutionsOptions;
		        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		    },
		    queryJob(queryString, cb) {
		        var lists = this.jobOptions;
		        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		    },
		    queryTeamtype(queryString, cb) {
		        var lists = this.teamtypeOptions;
		        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		    },
		    queryJoblevel(queryString, cb) {
		        var lists = this.joblevelOptions;
		        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		    },
		    queryJobtype(queryString, cb) {
		        var lists = this.jobtypeOptions;
		        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		    },
		    queryWorkrank(queryString, cb) {
		        var lists = this.workrankOptions;
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
		    dialogClose(){
		    	this.baseFormData = {}
				this.tecFormData = {}
				this.wrankFormData = {}
				this.wunitFormData = {}
		    }

		}
	}
</script>
<style type="">
	#baseManage .el-form-item{
		width: 48%
	}
	#baseManage label{
		font-weight: normal;
	}
	#baseManage .avatar{
		width: 180px;
		height: 200px;
	}
	#baseManage .clear{
		clear: both;
	}
	#baseManage .group{
		display: inline-block;
		width: 250px;
		padding: 10px;
		font-size: 14px
	}
	#baseManage .group label{
		width: 60px;
		font-weight: normal;
		color: #666666;
	}
</style>