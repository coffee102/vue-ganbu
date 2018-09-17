<template>
  <div id="orgtree">
    <h5><i class="el-icon-warning"></i>请选择单位：</h5>
    <el-tree 
      accordion
      :highlight-current=true 
      :props="defaultProps" 
      :load="loadNode"
      lazy
      @node-click="handleNodeClick" 
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-if='isEdit' >
          <!-- <el-button
            type="primary"
            size="mini"
            @click="append(data)">
            Append
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="remove(node, data)">
            Delete
          </el-button> -->
            <el-button icon="el-icon-plus" circle></el-button>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>  
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
  import { transTreeData } from '@/utils/transtreedata'
  import { getDepartment } from '@/api/organization'
  export default {
    name:"orgtree",
    props:['isEdit','isShowcheckbox'],//isEdit 控制是否展现单位增改删按钮，isWshowcheckbox控制是否展现多选框
    data() {
      return {
        orgtreedata: [],
        defaultProps: {
          label: 'short_name',
          isLeaf:function(data, node){
            return !data.hasChildren
          }
        }
      };
    },
    methods: {
      handleNodeClick(data,node,dom) {
        /*if(data.children&&data.children.length===0){
          
        }*/
        this.$emit('NodeClick', data)
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
            getDepartment(0).then(response => {
              return resolve(response.obj)
            })
        }else{
          getDepartment(node.data.code).then(response => {
            return resolve(response.obj)
          })
        }
        
      }
    }   
  };
</script>
<style type="text/css">
  #orgtree .el-tree-node__content{
    height: 40px;
  }
  #orgtree h5{
    margin: 10px;
  }
  #orgtree .el-tree{
    height: 480px;
    overflow: auto;
  }
  #orgtree{
    width: 100%;
    padding: 20px;
  }
  /* #orgtree .el-tree-node__label{
    font-size: 16px;
  } */
   .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  #orgtree .el-button.is-circle{
  padding: 7px
}
</style>
