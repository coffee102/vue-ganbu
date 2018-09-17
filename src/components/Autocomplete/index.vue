<template>
    <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    	</el-option> -->
	<!-- <el-cascader
	  :options="options"
	  :props="props"
	  v-model="SelectValueArry"
	  filterable
	  @change="itemChange"
	  :show-all-levels="false"
	></el-cascader> -->
	<el-autocomplete
      	v-model="formvalue"
      	value-key="showname"
      	:fetch-suggestions="querySearch"
      	placeholder="请输入内容"
      	@select="handleSelect"
    ></el-autocomplete>
</template>
<script type="text/javascript">
	import { getTreeDic } from '@/api/dictionary'
	export default {
		props:["type","SelectValue"],
		data(){
			return {
				options:[],
		        formvalue:""
			}
		},
		watch: {
		    SelectValue (value) {
		      this.formvalue = value
		    }
		},
		mounted(){
			this.getDictionary()
		},
		methods:{
			getDictionary(){
                getTreeDic(this.type).then(response => {
                	this.options = response.obj;
	            })
			},
			/*findChild(arry){
				for(var i=0;i<arry.length;i++){
                	if(arry[i].children.length===0){
                		arry[i].children = null
                	}else{
						this.findChild(arry[i].children)
                	}
               	}
               	return arry
			},*/
			handleSelect(value){
				this.formvalue=value.showname
				this.$emit('formvalue', value.showname)
			},
			querySearch(queryString, cb) {
		        var lists = this.options;
		        var results = queryString ? lists.filter(this.createFilter(queryString)) : lists;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		    },
		    createFilter(queryString) {
		        return (list) => {
		          return (list.showname.toLowerCase().indexOf(queryString) === 0);
		        };
	        },
		}
	}
</script>