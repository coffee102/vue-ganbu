<template>
	<div id="secondSearch">
    <div  id="searchForm">
      <el-input v-model="content" placeholder="请输入关键字" size="medium"></el-input> 
      <el-button type="primary" @click="query" size="medium">查询</el-button>
    </div>
	 <div id="resultTable" style="padding:20px 0">
      <el-table :data="resultData" border style="width: 100%">
        <el-table-column prop="NAME" label="姓名"  width="80px">
          <template slot-scope="props">
            <router-link v-bind:to="'/staff/info/'+props.row.id">
              {{props.row.name}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="" label="工作单职位及职务"></el-table-column>
        <el-table-column prop="" label="最高职务层次"></el-table-column>
        <el-table-column prop="BIRTHDAY" label="出生年月" :formatter="monthFormat"></el-table-column>
        <el-table-column prop="age" label="年龄" :formatter="ageFormat"></el-table-column>
        <el-table-column prop="NATIVE" label="籍贯"></el-table-column>
        <el-table-column prop="BIRTHPLACE" label="出生地"></el-table-column>
        <el-table-column prop="PARTYTIME" label="入党时间" :formatter="monthFormat"></el-table-column>
      </el-table>  
    </div>
    <el-pagination layout="total, prev, pager, next" :total="total" @current-change="curPageChange"></el-pagination>
	</div>	
</template>

<script>
import { vagueSearch } from '@/api/person'
export default {
  name: 'App',
  data(){
  	return {
      page:1,
      pageSize:10,
      content:"",
      resultData:[],
      total:100
  	}
  },
  methods:{
    query(){
      if(this.content){
        vagueSearch(this.page,this.pageSize,this.content).then(response => {
            this.resultData = response.obj
            this.total = response.obj.total
        })
      }else{
        this.$message({
          message: "关键字不能为空",
          type: 'error'
        });
      }     
    },
    curPageChange(page){
      this.page = page
      this.query()
    },
    monthFormat:function(row, column, cellValue, index){
        return parseTime(cellValue,"{y}-{m}")
    },
    ageFormat:function(row, column, cellValue, index){
        return GetAge(row.BIRTHDAY)
    }
  }
}
</script>
<style type="text/css">
  #secondSearch{
    padding: 10px 30px;
  }
  #searchForm{

  }
  #secondSearch .el-input{
    width: 400px;
    display: inline-block;
  }
  #secondSearch .el-pagination{
    text-align: right;
  }
</style>