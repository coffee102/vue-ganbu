<template>
  <div id="authManage">
  	<el-tree
      	:data="menutree"
      	node-key="id"
      	default-expand-all
      	:props="props"
      	:expand-on-click-node="false">
	    <span class="custom-tree-node" slot-scope="{ node, data }">
	      	<span>{{ node.label }}</span>
	      	<span>
	          	<el-button
		            type="text"
		            size="mini"
		            @click="">
		            添加子节点
	          	</el-button>
	          	<el-button
		            type="text"
		            size="mini"
		            @click="">
		            删除节点
	          	</el-button>
	        </span>
	  	</span>
    </el-tree>
    </div>
</template>
<script type="">
	import { getMenuTree } from '@/api/login'
	export default {
		data(){
			return{
				menutree:[],
				props:{
					label:"text",
				}
			}
		},
		created(){
			this.getmenudata()
		},
		methods:{
			getmenudata(){
				getMenuTree().then(response => {
					this.menutree = response.obj
					for(var i=0;i<response.obj;I++){

					}
				})
			}
		}
	}
</script>
<style type="text/css">
#authManage{
	width: 30%;
	margin: 30px;

}
	#authManage .custom-tree-node{
		flex: 1;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    font-size: 16px;
	    padding-right: 8px;

	}
	#authManage .custom-tree-node span{

	}
	#authManage .el-tree-node__content{
		height: 30px;
	}
</style>
