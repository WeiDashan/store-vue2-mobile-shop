<template>
    <div class="inputCode">
        <div class="inputCode_top">
            <div>忘记密码</div>
            <div class="left-arrow" @click="goback">
                <img src="../../../image/leftarrow.png" />
            </div>
        </div>
        <div class="inputCode_body">
            <div class="body_top">
                <div class="userimg">
                    <img src="../../../image/defaultUserPic.png" />
                </div>
                <div class="top_code">请输入验证码</div>
                <div class="top_info">
                    <span>已发送至{{loginName}}绑定的邮箱</span>
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
        name: "forgetCode",
        data(){
            return{
                loginName: '',
                value: '',
                showKeyboard: true,
            }
        },
        created() {
            if (this.$route.query==={}){
                Toast("未获取到用户名，请重新输入")
                this.$router.push({
                    path:'/forgetPassword'
                })
            }else {
                this.loginName = this.$route.query.loginName;
                console.log(this.loginName)
            }
        },
        methods:{
            goback(){
                this.$router.go(-1)
            },
            focuskeyboard(){
                this.showKeyboard = true;
            },
            getNewCode(){
                const formData = new FormData()
                formData.append("loginName",this.loginName);
                Toast('验证码正在发送');
                axios.post(this.common.baseUrl+"/ums-user/forgetPassword",formData).then(response=>{
                    Toast(response.data.message);
                })
            }
        },
        watch: {
            value(value) {
                if (value.length === 6) {
                    const formData = new FormData();
                    formData.append("loginName",this.loginName);
                    formData.append("code",this.value);

                    axios.post(this.common.baseUrl+"/ums-user/loginNameCode",formData).then(response=>{
                        console.log(response);
                        Toast(response.data.message);
                        if(response.data.code===500){
                            this.value='';
                        }else{
                            this.$router.push({
                                path:'/forgetDetail',
                                query:{
                                    loginName: this.loginName
                                }
                            })
                        }
                    })
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