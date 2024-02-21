<template>
    <div class="inputCode">
        <div class="inputCode_top">
            <div>邮箱快捷登录</div>
            <div class="left-arrow" @click="goback">
                <img src="../../../image/leftarrow.png" />
            </div>
        </div>
        <div class="inputCode_body">
            <div class="body_top">
                <div class="userimg">
                    <img src="../../../image/defaultUserPic.png"></img>
                </div>
                <div class="top_code">请输入验证码</div>
                <div class="top_info">
                    <span>已发送至</span>
                    <span>{{email}}</span>
                </div>
            </div>
            <div class="mid_codein">
                <!-- 密码输入框 -->
                <van-password-input
                        :value="value"
                        :focused="showKeyboard"
                        :mask="false"
                        @focus="focuskeyboard"
                />
                <!-- 数字键盘 -->
                <van-number-keyboard
                        v-model="value"
                        :show="showKeyboard"
                        @blur="showKeyboard = false"
                />
            </div>
            <div class="bottom_getnewOne" @click="getNewCode">重新获取验证码</div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name: "InputCode",
        data(){
            return{
                email: '',
                value: '',
                showKeyboard: true,
            }
        },
        created() {
            if (this.$route.query==={}){
                this.$router.push({
                    path:'/login'
                })
            }else {
                this.email = this.$route.query.email;
                console.log(this.email)
            }
        },
        methods:{
            goback(){
                this.$router.push({
                    path:'/login'
                })
            },
            focuskeyboard(){
                this.showKeyboard = true;
            },
            getNewCode(){
                if (this.email===''){
                    Toast("邮箱为空,请重新输入邮箱");
                    this.$router.push({
                        path:'/login'
                    })
                }else {
                    const formData = new FormData()
                    formData.append("email",this.email);
                    axios.post(this.common.baseUrl+"/ums-user/loginByEmail",formData).then(response=>{
                        Toast(response.data.message);
                    })
                }
            }
        },
        watch: {
            value(value) {
                if (value.length === 6) {
                    if (this.email === ""){
                        Toast("邮箱为空,请重新输入邮箱");
                        this.$router.push({
                            path:'/login'
                        })
                    }else{
                        const formData = new FormData();
                        formData.append("email",this.email);
                        formData.append("code",this.value);
                        axios.post(this.common.baseUrl+"/ums-user/loginByCode",formData).then(response=>{
                            if(response.data.code===500){
                                Toast(response.data.message);
                                this.value='';
                            }else{
                                Toast(response.data.message);
                                this.$store.commit("SET_USERID",response.data.obj.id);
                                this.$store.commit("SET_TOKEN",response.data.obj.token);
                                axios.get(this.common.baseUrl+"/ums-user/getone?id="+response.data.obj.id).then(response2=>{
                                    response2 = response2.data.obj;
                                    response2.icon = this.$store.getters.GET_IMGSRC+response2.icon;
                                    this.$store.commit("SET_USERINFO",response2);
                                    this.$router.push({
                                        path:'/mine'
                                    })
                                })
                                axios.get(this.common.baseUrl+"/ums-address/default?userId="+this.$store.getters.GET_USERID).then(response3=>{
                                    // console.log(response3)
                                    let defaultAddress = {};
                                    defaultAddress.addressDetail = response3.data.obj.addressDetail;
                                    defaultAddress.addressCity = response3.data.obj.province+response3.data.obj.city+response3.data.obj.county;
                                    this.$store.commit("SET_DEFAULTADDRESS",defaultAddress);
                                })
                            }
                        })
                    }
                }
            },
        },
    }
</script>

<style scoped lang="less">
    .inputCode{
        background-color: #ffffff;
        height: 100vh;
        .inputCode_top{
            text-align: center;
            position: relative;
            background-color: #ffffff;
            padding: 10px;
            font-size: 14px;
            .left-arrow{
                width: 16px;
                height: 16px;
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .top_yes{
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .inputCode_body{
            .body_top{
                text-align: center;
                margin-top: 10px;
                display: flex;
                flex-direction: column;
                /*justify-content: center;*/
                align-items: center;
                .userimg{
                    width: 80px;
                    height: 80px;
                    margin-bottom: 10px;
                    img{
                        width: 80px;
                        height: 80px;
                    }
                }
                .top_code{
                    font-size: 14px;
                }
                .top_info{
                    margin: 10px 0 16px;
                    font-size: 10px;
                    span:first-child{
                        color: #808080;
                        margin-right: 6px;
                    }
                    span:last-child{

                    }
                }
            }
            .mid_codein{

            }
            .bottom_getnewOne{
                color: #fd3535;
                font-size: 12px;
                margin-top: 20px;
                padding-left: 14px;
                letter-spacing: 1px;
            }
        }
    }
</style>