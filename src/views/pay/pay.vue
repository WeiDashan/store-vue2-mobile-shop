<template>
	<div>
		<div>
			<el-row>
				<el-col :span="24">
					<el-button type="primary" @click="payTest">pay click</el-button>
				</el-col>
				<el-col :span="24">
					<div id="payHtml" ref="payHtml"></div>
				</el-col>
			</el-row>
		</div>
	</div>

</template>

<script>
	export default {
		name: "pay",
		data() {
			return {
				price:0,
				orderIds:[],
				orderInfo:""
			}
		},
		methods: {
			payTest() {
				const formData = new FormData();
				formData.append("price",this.price);
				formData.append("orderId",this.orderId);
				formData.append("orderInfo",this.orderInfo);
				axios.post(this.common.baseUrl+"/tb-pay/alipay",formData).then(response=>{
					document.querySelector("#payHtml").innerHTML = response.data.obj;
					document.forms[0].submit();
				})
			},
			payArrTest(){
				let pay = this.$store.getters.GET_PAY;
				const formData = new FormData();
				formData.append("price",pay.price);
				formData.append("orderInfo",pay.orderInfo);
				for (let key in pay.orderIds)
				formData.append("orderIds",pay.orderIds[key]);
				axios.post(this.common.baseUrl+"/tb-pay/alipay",formData).then(response=>{
					document.querySelector("#payHtml").innerHTML = response.data.obj;
					document.forms[0].submit();
				})
			}
		},
		created() {
			// console.log(11)
			// console.log(this.$route.query)
			// if (this.$route.query==={}){
			// 	this.$router.go(-1);
			// }else{
			// 	this.price = this.$route.query.price;
			// 	this.orderInfo = this.$route.query.orderInfo;
			// 	this.orderIds = this.$route.query.orderIds;
			// }
			// // this.price = 1001;
			// // this.orderInfo = "信息orderinfo";
			// // this.orderIds = [421];
			// this.payArrTest();

		},
		mounted() {
			// console.log(22)
			this.payArrTest();
		}
	}
</script>

<style scoped lang="less">

</style>
