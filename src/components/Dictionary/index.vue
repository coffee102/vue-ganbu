<template>
    <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    	</el-option> -->
	<el-cascader
	  :options="options"
	  :props="props"
	  v-model="SelectValueArry"
	  filterable
	  @change="itemChange"
	  :show-all-levels="false"
	></el-cascader>
</template>
<script type="text/javascript">
	import { getTreeDic } from '@/api/dictionary'
	export default {
		props:["type","SelectValue"],
		data(){
			return {
				options:[],
				props: {
		          value: 'id',
		          label:'showname',
		          children: 'children'
		        },
		        SelectValueArry:[]
			}
		},
		created(){
			this.getDictionary()
			this.SelectValueArry.push(this.SelectValue)
		},
		methods:{
			getDictionary(){
                getTreeDic(this.type).then(response => {
                	this.options = this.findChild(response.obj);
	            })
			},
			findChild(arry){
				for(var i=0;i<arry.length;i++){
                	if(arry[i].children.length===0){
                		arry[i].children = null
                	}else{
						this.findChild(arry[i].children)
                	}
               	}
               	return arry
			},
			itemChange(value){
				console.log(value)
				//this.SelectValue=value
				this.$emit('formvalue', value)
			}
		}
	}
</script>