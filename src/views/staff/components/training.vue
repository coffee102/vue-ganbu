<template>
	<!-- 详情页面展示-->
  <div>
  <el-button v-if="isEdit?true:false" size="mini" type="primary" icon="el-icon-plus"  @click="handleAdd" style="float: right">新增</el-button>
	<!-- <el-table ref="table" 
      :data="items" 
      style="width: 100%" 
      :show-header="isEdit?true:false"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @current-change="toggleExpansion"> -->
      <el-table ref="table" 
      :data="items" 
      style="width: 100%" 
      :show-header="isEdit?true:false">
    <!-- <el-table-column v-if="isEdit?true:false" type="expand" width="30">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand" label-width="25%" size="small">
          <el-form-item label="培训类别">
            <span >{{ props.row.TYPEString }}</span>
          </el-form-item>
          <el-form-item label="培训层级">
            <span>{{ props.row.LevelString }}</span>
          </el-form-item>
          <el-form-item label="班次名称">
            <span >{{ props.row.NAME }}</span>
          </el-form-item>
          <el-form-item label="培训主办单位">
            <span>{{ props.row.ORGANIZER }}</span>
          </el-form-item>
          <el-form-item label="培训机构">
            <span>{{ props.row.TRAININGINSTITUTION }}</span>
          </el-form-item>
          <el-form-item label="开始时间">
            <span>{{ props.row.STARTTIME }}</span>
          </el-form-item>
          <el-form-item label="结束时间">
            <span>{{ props.row.ENDTIME }}</span>
          </el-form-item>
          <el-form-item label="培训结果">
            <span>{{ props.row.RESULT }}</span>
          </el-form-item>
          <el-form-item label="学制天数">
            <span>{{ props.row.PERIOD }}</span>
          </el-form-item>
          <el-form-item label="学时数">
            <span>{{ props.row.PERIOD }}</span>
          </el-form-item>
          <el-form-item label="是否组织培训">
            <span>{{ props.row.ISDIAOXUN===0?"是":"否" }}</span>
          </el-form-item>
          <el-form-item label="是否出国境">
            <span>{{ props.row.ISFOREIGN===0?"是":"否" }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column> -->
    <el-table-column width="180" label="时间段" :formatter="TimeFormat"></el-table-column>
    <el-table-column prop="NAME" label="培训内容"> </el-table-column>
    <el-table-column label="操作" v-if="isEdit?true:false">
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
  <el-dialog title="新增教育培训事项" width="60%" :visible.sync="dialogFormVisible" :show-close="false" @close="dialogClose">
    <el-form label-position="left" inline class="demo-table-expand" label-width="25%" size="small">
      <el-form-item label="培训类别">
          <el-select filterable placeholder="请选择" v-model="formdata.TYPE">
            <el-option v-for="item in TYPEoptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="培训层级">
          <el-select filterable placeholder="请选择" v-model="formdata.LEVEL">
            <el-option v-for="item in LEVELoptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="班次名称">
        <el-input v-model="formdata.NAME" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="培训主办单位">
        <el-input v-model="formdata.ORGANIZER" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="培训机构">
        <el-input v-model="formdata.TRAININGINSTITUTION" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="formdata.STARTTIME"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd hh:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="formdata.ENDTIME"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd hh:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="培训结果">
        <el-input v-model="formdata.RESULT" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="学制天数">
        <el-input v-model="formdata.PERIOD"></el-input>
      </el-form-item>
      <el-form-item label="学时数">
        <el-input v-model="formdata.PERIOD"></el-input>
      </el-form-item>
      <el-form-item label="是否组织培训">
          <el-radio-group v-model="formdata.ISDIAOXUN">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="是否出国境">
          <el-radio-group v-model="formdata.ISFOREIGN">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false;formdata={}">取 消</el-button>
      <el-button type="primary" @click="handleADDSave">保存</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import {parseTime} from '@/utils'
import dictionary from '@/components/Dictionary'
import { getTreeDic } from '@/api/dictionary'
import { getUserInfo,updateEDUCATIONALTRAINING,deleteEDUCATIONALTRAINING } from '@/api/person'
export default {
  name: 'trainingitem',
  props:["isEdit","itemData","personID"],
  data(){
  	return {
  		formdata:{},
      items:[],
      expands: [],
      dialogFormVisible:false,
      getRowKeys(row) {
          return row.id;
      },
      TYPEoptions: [{
          value: 0,
          label: '任职'
        }, {
          value: 1,
          label: '进修'
        }, {
          value: 2,
          label: '中青'
        }, {
          value: 3,
          label: '专题'
        }, {
          value: 4,
          label: '轮训'
        }, {
          value: 5,
          label: '初任'
      }],
      LEVELoptions: [{
          value: 0,
          label: '中央级'
        }, {
          value: 1,
          label: '省级'
        }, {
          value: 2,
          label: '市级'
        }, {
          value: 3,
          label: '县级'
      }]   
  	}
  },
  watch:{
    itemData: function (val) {
      const data = JSON.parse(this.itemData)
      const trainingData = data.EDUCATIONALTRAINING
      if(trainingData.length>0){
        for(var i=0;i<trainingData.length;i++){
          trainingData[i].STARTTIME= parseTime(trainingData[i].STARTTIME,"{y}-{m}-{d}")
          trainingData[i].ENDTIME = parseTime(trainingData[i].ENDTIME,"{y}-{m}-{d}")
          trainingData[i].TypeString = this.TypeString(trainingData[i].Type) 
          trainingData[i].LEVELString = this.LevelString(trainingData[i].LEVEL)   
        }          
      }
      this.items = trainingData
    }
  },
  methods:{
    setUserInfo(){
      getUserInfo(this.personID).then(response => {
          //this.itemData = JSON.stringify(response.obj)
          this.$emit('datachange',JSON.stringify(response.obj))
      })
    },
    handleEdit(index, row) {
      //this.$refs.table.toggleRowExpansion(row,true);
      const rowString = JSON.stringify(row)
      this.formdata = JSON.parse(rowString)
      this.dialogFormVisible = true
    },
    handleAdd(index,row){
      //this.formdata = {}
      this.formdata.ID = 0
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      
      this.$confirm('确定删除该记录吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
      }).then(() => {
        deleteEDUCATIONALTRAINING(row.ID).then(response => {
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
    handleCancel(index, row) {
      /*this.$refs.table.toggleRowExpansion(row,false);
      this.items[index].editFlag = false*/
      this.dialogFormVisible = false
      this.formdata={}
    
    },
    handleSave(index, row){
        //保存数据，向后台取数据
      this.formdata.STARTTIME = parseTime(this.formdata.STARTTIME,"{y}-{m}-{d} {h}:{i}:{s}")
      this.formdata.ENDTIME = parseTime(this.formdata.ENDTIME,"{y}-{m}-{d} {h}:{i}:{s}")
      updateEDUCATIONALTRAINING(this.formdata).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        });
        //this.$refs.table.toggleRowExpansion(row,false);
        this.setUserInfo()
        this.formdata={}
      })
    },
    handleADDSave(){
      this.formdata.STARTTIME = parseTime(this.formdata.STARTTIME,"{y}-{m}-{d} {h}:{i}:{s}")
      this.formdata.ENDTIME = parseTime(this.formdata.ENDTIME,"{y}-{m}-{d} {h}:{i}:{s}")
      this.formdata.BASEINFOID = this.personID
      updateEDUCATIONALTRAINING(this.formdata).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        });
        this.dialogFormVisible = false
        this.setUserInfo()
      })
    },
    toggleExpansion(currentRow, oldCurrentRow){
        /*if(this.expands[0]===currentRow.id){
          this.expands = []
        }else{
          this.expands = []
          this.expands.push(currentRow.id)
        }*/
        this.expands = []
        this.expands.push(currentRow.id)
        for(var i=0;i<this.items.length;i++){
          if(currentRow.id!=this.items[i].id){
            this.items[i].editFlag = false
          }
        }
    },
    TimeFormat:function(row, column, cellValue, index){
      return row.STARTTIME+' - '+row.ENDTIME
    },
    TypeString:function(val){
      if(val===0){return "任职"}
      else if(val===1){return "进修"}
      else if(val===2){return "中青"}
      else if(val===3){return "专题"}
      else if(val===4){return "轮训"}
      else if(val===4){return "初任"}
    },
    LevelString:function(val){
      if(val===0){return "中央级"}
      else if(val===1){return "省级"}
      else if(val===2){return "市级"}
      else if(val===3){return "县级"}
    },
    dialogClose(){
      this.formdata ={}
    }
  }
}
</script>
<style>
/*.cell-edit-input .el-input, .el-input__inner {
  width:100px;
}
.cell-icon{
  cursor:pointer;
  color:#fff;
}*/

</style>

