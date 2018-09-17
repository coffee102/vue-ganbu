<template>
  <div id="orgChart">
  	<el-col :span="12">
  		<div id="ageChart" style="width: 100%;height: 300px"></div>
  		<div id="eduChart" style="width: 100%;height: 300px"></div>
  		<div id="sexChart" style="width: 100%;height: 300px"></div>
  	</el-col>
    <el-col :span="12">
    	<div id="expeChart" style="width: 100%;height: 300px"></div>
    	<div id="leaderChart" style="width: 100%;height: 300px"></div>
    	<div id="levelChart" style="width: 100%;height: 300px"></div>
    </el-col>
  </div>

</template>

<script>

import { addDepartment,updateDepartment,deleteDepartment } from '@/api/organization'

import echarts from 'echarts'
import {parseTime} from '@/utils'
export default {
	name:'organization',
	data(){
		return {
			expeOption:{
			    title : {
			        text: '基层经历情况',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c}（{d}%）"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			        data:['有','无']
			    },
			    calculable : true,
			    series : [
			        {
			            name:'基层经历情况',
			            type:'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            data:[
			                {value:335, name:'有'},
			                {value:310, name:'无'},
			            ]
			        }
			    ]
			},
			sexOption:{
			    title : {
			        text: '性别分析',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c}"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			        data:['男','女']
			    },
			    calculable : true,
			    series : [
			        {
			            name:'领导班子成员年龄',
			            type:'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            data:[
			                {value:335, name:'男'},
			                {value:310, name:'女'},
			            ]
			        }
			    ]
			},
			ageOption:{
			    title : {
			        text: '领导班子成员年龄分析',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			        data:['20-30岁','30-40岁','40-50岁','50-60岁','60-70岁']
			    },
			     xAxis: {
	                show:true,                  //---是否显示
	                position:'bottom',          //---x轴位置
	                offset:0,                   //---x轴相对于默认位置的偏移
	                type:'category',            //---轴类型，默认'category'
	                name:'年龄',              //---轴名称
	                nameLocation:'end',
	                nameGap:15,                 //---坐标轴名称与轴线之间的距离
	                //nameRotate:270,           //---坐标轴名字旋转

	                
	                axisTick:{                  //---坐标轴 刻度
	                    show:false,                  //---是否显示
	                    inside:true,                //---是否朝内
	                    lengt:3,                    //---长度
	                    lineStyle:{
	                        //color:'red',          //---默认取轴线的颜色
	                        width:1,
	                        type:'solid',
	                    },
	                },
	                axisLabel:{                 //---坐标轴 标签
	                    show:true,                  //---是否显示
	                    inside:false,               //---是否朝内
	                    rotate:0,                   //---旋转角度   
	                    margin: 5,                  //---刻度标签与轴线之间的距离
	                    //color:'red',              //---默认取轴线的颜色
	                },     
	                data: ['20-30岁','30-40岁','40-50岁','50-60岁','60-70岁'],//内容
	            },
	            //----------------------  y轴  ------------------------
	            yAxis: {
	                show:true,                  //---是否显示
	                position:'left',            //---y轴位置
	                offset:0,                   //---y轴相对于默认位置的偏移
	                type:'value',           //---轴类型，默认'category'
	                name:'人员数量',              //---轴名称
	                nameLocation:'end',
	                nameGap:15,                 //---坐标轴名称与轴线之间的距离
	                //nameRotate:270,           //---坐标轴名字旋转

	                axisLine:{                  //---坐标轴 轴线
	                    show:true,                  //---是否显示

	                    //------------------- 箭头 -------------------------
	                    symbol:['none', 'arrow'],   //---是否显示轴线箭头
	                    symbolSize:[8, 8] ,         //---箭头大小
	                    symbolOffset:[0,7],         //---箭头位置

	                    //------------------- 线 -------------------------
	                    lineStyle:{
	                        width:1,
	                        type:'solid',
	                    },
	                },
	                axisTick:{                  //---坐标轴 刻度
	                    show:true,                  //---是否显示
	                    inside:true,                //---是否朝内
	                    lengt:3,                    //---长度
	                    lineStyle:{
	                        //color:'red',          //---默认取轴线的颜色
	                        width:1,
	                        type:'solid',
	                    },
	                },
	                axisLabel:{                 //---坐标轴 标签
	                    show:true,                  //---是否显示
	                    inside:false,               //---是否朝内
	                    rotate:0,                   //---旋转角度   
	                    margin: 8,                  //---刻度标签与轴线之间的距离
	                    //color:'red',              //---默认取轴线的颜色
	                },
	                splitLine:{                 //---grid 区域中的分隔线
	                    show:true,                  //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
	                    lineStyle:{
	                        width:1,
	                        type:'dashed',          //---类型
	                    },
	                },
	                splitArea:{                 //--网格区域
	                    show:false,                 //---是否显示，默认false
	                }                        
	            },
			    calculable : true,
			    series : [
			        {
			            name:'领导班子成员年龄',
			            type:'bar',
			            barWidth:'20',              //---柱形宽度
                    	barCategoryGap:'20%',
			            data:[111,222,33,42,51]
			        }
			    ]
			},
			levelOption:{
			    title : {
			        text: '领导班子配备情况',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c}"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			        data:['正职','副职','女干部']
			    },
			     xAxis: {
	                show:true,                  //---是否显示
	                position:'bottom',          //---x轴位置
	                offset:0,                   //---x轴相对于默认位置的偏移
	                type:'category',            //---轴类型，默认'category'
	                name:'学历',              //---轴名称
	                nameLocation:'end',
	                nameGap:15,                 //---坐标轴名称与轴线之间的距离
	                //nameRotate:270,           //---坐标轴名字旋转

	                
	                axisTick:{                  //---坐标轴 刻度
	                    show:false,                  //---是否显示
	                    inside:true,                //---是否朝内
	                    lengt:3,                    //---长度
	                    lineStyle:{
	                        //color:'red',          //---默认取轴线的颜色
	                        width:1,
	                        type:'solid',
	                    },
	                },
	                axisLabel:{                 //---坐标轴 标签
	                    show:true,                  //---是否显示
	                    inside:false,               //---是否朝内
	                    rotate:0,                   //---旋转角度   
	                    margin: 5,                  //---刻度标签与轴线之间的距离
	                    //color:'red',              //---默认取轴线的颜色
	                },     
	                data: ['正职','副职','女干部'],//内容
	            },
	            //----------------------  y轴  ------------------------
	            yAxis: {
	                show:true,                  //---是否显示
	                position:'left',            //---y轴位置
	                offset:0,                   //---y轴相对于默认位置的偏移
	                type:'value',           //---轴类型，默认'category'
	                name:'人员数量',              //---轴名称
	                nameLocation:'end',
	                nameGap:15,                 //---坐标轴名称与轴线之间的距离
	                //nameRotate:270,           //---坐标轴名字旋转

	                axisLine:{                  //---坐标轴 轴线
	                    show:true,                  //---是否显示

	                    //------------------- 箭头 -------------------------
	                    symbol:['none', 'arrow'],   //---是否显示轴线箭头
	                    symbolSize:[8, 8] ,         //---箭头大小
	                    symbolOffset:[0,7],         //---箭头位置

	                    //------------------- 线 -------------------------
	                    lineStyle:{
	                        width:1,
	                        type:'solid',
	                    },
	                },
	                axisTick:{                  //---坐标轴 刻度
	                    show:true,                  //---是否显示
	                    inside:true,                //---是否朝内
	                    lengt:3,                    //---长度
	                    lineStyle:{
	                        //color:'red',          //---默认取轴线的颜色
	                        width:1,
	                        type:'solid',
	                    },
	                },
	                axisLabel:{                 //---坐标轴 标签
	                    show:true,                  //---是否显示
	                    inside:false,               //---是否朝内
	                    rotate:0,                   //---旋转角度   
	                    margin: 8,                  //---刻度标签与轴线之间的距离
	                    //color:'red',              //---默认取轴线的颜色
	                },
	                splitLine:{                 //---grid 区域中的分隔线
	                    show:true,                  //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
	                    lineStyle:{
	                        width:1,
	                        type:'dashed',          //---类型
	                    },
	                },
	                splitArea:{                 //--网格区域
	                    show:false,                 //---是否显示，默认false
	                }                        
	            },
			    calculable : true,
			    series : [
			        {
			            name:'领导班子配备情况',
			            type:'bar',
			            barWidth:'20',              //---柱形宽度
                    	barCategoryGap:'20%',
			            data:[111,222,33]
			        }
			    ]
			},
			eduOption:{
			    title : {
			        text: '全日制学历分析',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			        data:['大专','大学','研究生','博士']
			    },
			     xAxis: {
	                show:true,                  //---是否显示
	                position:'bottom',          //---x轴位置
	                offset:0,                   //---x轴相对于默认位置的偏移
	                type:'category',            //---轴类型，默认'category'
	                name:'学历',              //---轴名称
	                nameLocation:'end',
	                nameGap:15,                 //---坐标轴名称与轴线之间的距离
	                //nameRotate:270,           //---坐标轴名字旋转

	                
	                axisTick:{                  //---坐标轴 刻度
	                    show:false,                  //---是否显示
	                    inside:true,                //---是否朝内
	                    lengt:3,                    //---长度
	                    lineStyle:{
	                        //color:'red',          //---默认取轴线的颜色
	                        width:1,
	                        type:'solid',
	                    },
	                },
	                axisLabel:{                 //---坐标轴 标签
	                    show:true,                  //---是否显示
	                    inside:false,               //---是否朝内
	                    rotate:0,                   //---旋转角度   
	                    margin: 5,                  //---刻度标签与轴线之间的距离
	                    //color:'red',              //---默认取轴线的颜色
	                },     
	                data: ['大专','大学','研究生','博士'],//内容
	            },
	            //----------------------  y轴  ------------------------
	            yAxis: {
	                show:true,                  //---是否显示
	                position:'left',            //---y轴位置
	                offset:0,                   //---y轴相对于默认位置的偏移
	                type:'value',           //---轴类型，默认'category'
	                name:'人员数量',              //---轴名称
	                nameLocation:'end',
	                nameGap:15,                 //---坐标轴名称与轴线之间的距离
	                //nameRotate:270,           //---坐标轴名字旋转

	                axisLine:{                  //---坐标轴 轴线
	                    show:true,                  //---是否显示

	                    //------------------- 箭头 -------------------------
	                    symbol:['none', 'arrow'],   //---是否显示轴线箭头
	                    symbolSize:[8, 8] ,         //---箭头大小
	                    symbolOffset:[0,7],         //---箭头位置

	                    //------------------- 线 -------------------------
	                    lineStyle:{
	                        width:1,
	                        type:'solid',
	                    },
	                },
	                axisTick:{                  //---坐标轴 刻度
	                    show:true,                  //---是否显示
	                    inside:true,                //---是否朝内
	                    lengt:3,                    //---长度
	                    lineStyle:{
	                        //color:'red',          //---默认取轴线的颜色
	                        width:1,
	                        type:'solid',
	                    },
	                },
	                axisLabel:{                 //---坐标轴 标签
	                    show:true,                  //---是否显示
	                    inside:false,               //---是否朝内
	                    rotate:0,                   //---旋转角度   
	                    margin: 8,                  //---刻度标签与轴线之间的距离
	                    //color:'red',              //---默认取轴线的颜色
	                },
	                splitLine:{                 //---grid 区域中的分隔线
	                    show:true,                  //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
	                    lineStyle:{
	                        width:1,
	                        type:'dashed',          //---类型
	                    },
	                },
	                splitArea:{                 //--网格区域
	                    show:false,                 //---是否显示，默认false
	                }                        
	            },
			    calculable : true,
			    series : [
			        {
			            name:'领导班子成员年龄',
			            type:'bar',
			            barWidth:'20',              //---柱形宽度
                    	barCategoryGap:'20%',
			            data:[111,222,33,42]
			        }
			    ]
			},
			leaderOption:{
			    title : {
			        text: '非党干部情况',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			        data:['共产党','预备党员','群众']
			    },
			     xAxis: {
	                show:true,                  //---是否显示
	                position:'bottom',          //---x轴位置
	                offset:0,                   //---x轴相对于默认位置的偏移
	                type:'category',            //---轴类型，默认'category'
	                name:'党派',              //---轴名称
	                nameLocation:'end',
	                nameGap:15,                 //---坐标轴名称与轴线之间的距离
	                //nameRotate:270,           //---坐标轴名字旋转

	                
	                axisTick:{                  //---坐标轴 刻度
	                    show:false,                  //---是否显示
	                    inside:true,                //---是否朝内
	                    lengt:3,                    //---长度
	                    lineStyle:{
	                        //color:'red',          //---默认取轴线的颜色
	                        width:1,
	                        type:'solid',
	                    },
	                },
	                axisLabel:{                 //---坐标轴 标签
	                    show:true,                  //---是否显示
	                    inside:false,               //---是否朝内
	                    rotate:0,                   //---旋转角度   
	                    margin: 5,                  //---刻度标签与轴线之间的距离
	                    //color:'red',              //---默认取轴线的颜色
	                },     
	                data: ['共产党','预备党员','群众'],//内容
	            },
	            //----------------------  y轴  ------------------------
	            yAxis: {
	                show:true,                  //---是否显示
	                position:'left',            //---y轴位置
	                offset:0,                   //---y轴相对于默认位置的偏移
	                type:'value',           //---轴类型，默认'category'
	                name:'人员数量',              //---轴名称
	                nameLocation:'end',
	                nameGap:15,                 //---坐标轴名称与轴线之间的距离
	                //nameRotate:270,           //---坐标轴名字旋转

	                axisLine:{                  //---坐标轴 轴线
	                    show:true,                  //---是否显示

	                    //------------------- 箭头 -------------------------
	                    symbol:['none', 'arrow'],   //---是否显示轴线箭头
	                    symbolSize:[8, 8] ,         //---箭头大小
	                    symbolOffset:[0,7],         //---箭头位置

	                    //------------------- 线 -------------------------
	                    lineStyle:{
	                        width:1,
	                        type:'solid',
	                    },
	                },
	                axisTick:{                  //---坐标轴 刻度
	                    show:true,                  //---是否显示
	                    inside:true,                //---是否朝内
	                    lengt:3,                    //---长度
	                    lineStyle:{
	                        //color:'red',          //---默认取轴线的颜色
	                        width:1,
	                        type:'solid',
	                    },
	                },
	                axisLabel:{                 //---坐标轴 标签
	                    show:true,                  //---是否显示
	                    inside:false,               //---是否朝内
	                    rotate:0,                   //---旋转角度   
	                    margin: 8,                  //---刻度标签与轴线之间的距离
	                    //color:'red',              //---默认取轴线的颜色
	                },
	                splitLine:{                 //---grid 区域中的分隔线
	                    show:true,                  //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
	                    lineStyle:{
	                        width:1,
	                        type:'dashed',          //---类型
	                    },
	                },
	                splitArea:{                 //--网格区域
	                    show:false,                 //---是否显示，默认false
	                }                        
	            },
			    calculable : true,
			    series : [
			        {
			            name:'领导班子成员年龄',
			            type:'bar',
			            barWidth:'20',              //---柱形宽度
                    	barCategoryGap:'20%',
			            data:[111,222,33]
			        }
			    ]
			},
		}
	},
	mounted(){
		let sexChart = echarts.init(document.getElementById("sexChart"))
		sexChart.setOption(this.sexOption)
		let ageChart = echarts.init(document.getElementById("ageChart"))
		ageChart.setOption(this.ageOption)
		let eduChart = echarts.init(document.getElementById("eduChart"))
		eduChart.setOption(this.eduOption)
		let expeChart = echarts.init(document.getElementById("expeChart"))
		expeChart.setOption(this.expeOption)
		let levelChart = echarts.init(document.getElementById("levelChart"))
		levelChart.setOption(this.levelOption)
		let leaderChart = echarts.init(document.getElementById("leaderChart"))
		leaderChart.setOption(this.leaderOption)
	}
}
</script>
<style type="text/css">

</style>