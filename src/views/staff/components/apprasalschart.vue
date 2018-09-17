<template>
	<div class="charts">
		<div id="myChart" style="width: 600px;height: 300px"></div>
	</div>
</template>
<script type="">
	import echarts from 'echarts'
	export default{
		props:["personID","itemData"],
		data(){
			return {
				option:{
				    title : {
				        text: '民主测评情况',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient : 'vertical',
				        x : 'left',
				        data:['优秀票数','称职（合格）票数','基本称职（合格）票数','不称职（合格）票数']
				    },
				    calculable : true,
				    series : [
				        {
				            name:'民主测评情况',
				            type:'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:[
				                {value:335, name:'优秀票数'},
				                {value:310, name:'称职（合格）票数'},
				                {value:234, name:'基本称职（合格）票数'},
				                {value:135, name:'不称职（合格）票数'},
				            ]
				        }
				    ]
				}
			}
		},
		mounted(){
			let myChart = echarts.init(document.getElementById("myChart"))
			myChart.setOption(this.option)
		}
	}
</script>
<style>
	
</style>