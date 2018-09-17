<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="组合查询" name="first">
		    	<first></first>
		    </el-tab-pane>
		    <el-tab-pane label="模糊查询" name="second"><second></second></el-tab-pane>
		    <el-tab-pane label="模块查询" name="third">建设中</el-tab-pane>
		</el-tabs>
	</div>

  	
</template>

<script>
import first from './components/first'
import second from './components/second'
export default {
  components:{first,second},
  data(){
  	return {
  		activeName:"first"
  	}
  },
  methods:{
  	handleClick(tab, event){

  	}
  }
}
</script>
