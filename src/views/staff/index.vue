<template>
  <div id="staffManage">
    <el-row>
      <el-col :span="8">
        <orgtree v-on:NodeClick="getPersonList"></orgtree>
      </el-col>
      <el-col :span="16">
        <div style="text-align: right;margin-top: 20px">
          <el-button-group>
              <el-button size="mini" type="primary" icon="el-icon-plus" @click="addPerson">添加人员</el-button>
          </el-button-group>  
            <el-upload
                name="myFile"
                class="avatar-uploader"
                action="/apis/person/uploadPerson"
                :headers="uploadHeader"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <el-button size="mini" type="primary" class="uploadButton">导入人员（lrm格式）</el-button>
            </el-upload>
          
        </div>
        <!-- <ul>
          <li v-for="person in persons">
            <router-link v-bind:to="'/staff/info/'+person.id">
              <p><img v-bind:src="person.PHOTO"></p><p>{{person.name}}</p>
            </router-link>
            <router-link v-bind:to="'/staff/edit/'+person.id">
              <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            </router-link>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="deletePerson(person.id,$index)" ></el-button>
          </li>
        </ul> -->
        <el-table ref="table" 
          :data="persons" 
          style="width: 100%"
          v-if="tableShow"
           >
           <el-table-column prop="PIC" label="照片" width="130"> 
              <template slot-scope="scope">
                <img :src="scope.row.personPIC" class="personPIC">
              </template>
           </el-table-column>
          <el-table-column prop="NAME" label="姓名"> </el-table-column>
          <el-table-column prop="SEX" label="性别" :formatter='sexFormat'> </el-table-column>
          <el-table-column prop="BIRTHDAY" label="出生年月" :formatter='dateFormat'> </el-table-column>
          <el-table-column prop="NATION" label="民族" > </el-table-column>
          <el-table-column prop="NATIVE" label="籍贯"> </el-table-column>
          <el-table-column label="操作" width="230">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="success"
                @click="handleCheck(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- <el-dialog title="新增干部成员" :visible.sync="dialogFormVisible" width="80%">
        <baseItem isEdit="1"></baseItem>
    </el-dialog> -->
  </div>
</template>

<script>
  import orgtree from '@/components/OrgTree'
  import { getDepartmentPersonList,deleteBaseInfo} from '@/api/person'
  import { parseTime } from '@/utils'
  import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
        persons:[],
        tableShow:false,
        depcode:"",
        /*quaryparams:{
          code:"",
          page:1,
          rows:10
        },*/
        uploadHeader:{
          'Authorization':getToken()
        }
      };
    },
    components: { orgtree},
    /*computed:{
        userArry(){
          this.
        }
    },*/
    methods: {
      getPersonList(data) {
        this.tableShow = true
        if(data.hasChildren===0){
          this.depcode = data.code        
          getDepartmentPersonList(this.depcode).then(response => {
            this.persons = response.obj
            if(response.obj.length===0){
              this.$message('该单位下没有干部人员！');
            }else{
              for(var i=0;i<this.persons.length;i++){
                if(this.persons[i].PIC){
                    this.persons[i].personPIC = "/apis/"+this.persons[i].PIC
                  }else{
                    this.persons[i].personPIC = "/static/img/default_header.jpg"
                  }
              }
                
            }
          })
        }
      },
      handleEdit(index,row){
        this.$router.push({path:'/staff/edit/'+row.id})
      },
      handleDelete(index,row){
        deleteBaseInfo(row.id).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.persons.splice(index, 1)
        })
      },
      handleCheck(index,row){
        this.$router.push({path:'/staff/info/'+row.id})
      },
      addPerson(){
        if(this.depcode){
          this.$router.push({path:'/staff/add/'+this.depcode})
        }else{
          this.$message({
            message: '您还没有选择单位！',
            type: 'warning'
          })
        }
        
      },
      sexFormat:function(row, column, cellValue, index){
        return cellValue===1?"男":"女"
      },
      dateFormat:function(row, column, cellValue, index){
        if(cellValue){
          return parseTime(cellValue,'{y}-{m}')
        }
      },
      handleAvatarSuccess(res, file) {
        console.log(res)
          if(res.success===true){
            this.$message({
              message: '文件上传成功',
              type: 'success'
            });
          }else{
            this.$message({
              message: '文件上传失败',
              type: 'warning'
            });
          }
      },
      beforeAvatarUpload(file) {
          //const isJPG = file.type === 'lrm';
          const isLt2M = file.size / 1024 / 1024 < 2;
          /*if (!isJPG) {
            this.$message.error('上传文件只能是 lrm 格式!');
          }*/
          if (!isLt2M) {
            this.$message.error('上传文件大小不能超过 2MB!');
          }
          return isLt2M;
      },
    },
    
  };
</script>
<style type="text/css">

  #staffManage ul{
  /*   margin: 40px; */
    padding: 0
  }
  #staffManage li{
    margin: 0;
    padding: 0;
    list-style: none;
    float: left;
    width: 180px;
  }
  #staffManage .avatar-uploader{
    display: inline-block;
  }
  #staffManage .personPIC{
    height: 120px;
    width:100px;
  }
</style>
