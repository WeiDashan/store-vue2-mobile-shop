<template>
    <div class="login_index">
        <div class="login_top">
            <div class="top_img" @click="goBack">
                <img src="../../image/false8a8a8a.png"/>
            </div>
            <div>帮助</div>
        </div>
        <div class="login_pic">
            <div class="picimg">
                <img src="../../image/defaultUserPic.png" />
            </div>
        </div>
        <div class="login_submit">
            <van-form @submit="onSubmit">
                <div>
                    <van-field
                            v-if="loginway===0"
                            class="phoneinput"
                            v-model="email"
                            name="邮箱"
                            placeholder="请输入邮箱"
                            clearable
                    />
                    <van-field
                            v-if="loginway===1"
                            class="phoneinput"
                            v-model="username"
                            name="username"
                            placeholder="请输入账号"
                            clearable
                    />
                    <van-field
                            class="phoneinput"
                            v-if="loginway===1"
                            v-model="password"
                            type="password"
                            name="password"
                            placeholder="请输入密码"
                    />
                </div>
                <div class="phonecheckbox">
                    <van-checkbox v-model="checked" icon-size="14px">
                        <div class="checkmessage">
                            <span v-if="loginway===0">未注册的手机号验证后将自动创建账号，</span>登录即代表您已同意
                            <span class="checkmessage_book">《隐私政策》</span>
                        </div>
                    </van-checkbox>
                </div>
                <div class="submitphone">
                    <van-button
                        class="submit_btn"
                        :disabled="!checked"
                        round block
                        type="info"
                        native-type="submit">
                        <span v-if="loginway===1">登录</span>
                        <span v-if="loginway===0">获取验证码</span>
                    </van-button>
                </div>
            </van-form>
        </div>
        <div class="otherchoice">
            <div @click="toRegister">新用户注册</div>
            <div v-if="loginway===1" @click="changeLoginWay1">短信验证码登录</div>
            <div v-if="loginway===0" @click="changeLoginWay0">账号密码登录</div>
            <div v-if="loginway===1" @click="forgetPassword">忘记密码</div>
        </div>
        <div class="otherlogin">
            <div>其他方式登录</div>
            <div class="loginway">
                <div class="wechat">
                    <img src="../../image/wechat.png" />
                </div>
                <div class="tensen">
                    <img src="../../image/tensen.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password:'',
                checked: true,
                loginway: 0,
                username:'',
            };
        },
        methods: {
            onSubmit(values) {
                if (this.loginway===0){
                    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                    if (reg.test(this.email)){
                        const formData = new FormData()
                        formData.append("email",this.email);
                        axios.post(this.common.baseUrl+"/ums-user/loginByEmail",formData).then(response=>{
                            console.log(response)
                            this.$router.push({
                                path:'/inputCode',
                                query:{
                                    email: this.email
                                }
                            })
                        })

                    }else{
                        Toast("请输入正确邮箱")
                    }
                }else{
                    if (this.loginName===''||this.password===''){
                        Toast("账号密码不能为空");
                    }else{
                        const formData = new FormData()
                        console.log(values.username);

                        formData.append("username",values.username);
                        formData.append("password",values.password);
                        console.log(formData)
                        axios.post(this.common.baseUrl+"/ums-user/login",formData).then(response=>{
                            console.log(response)
                            Toast(response.data.message);
                            this.$store.commit("SET_USERID",response.data.obj.id);
                            this.$store.commit("SET_TOKEN",response.data.obj.token);
                            axios.get(this.common.baseUrl+"/ums-user/getone?id="+response.data.obj.id).then(response2=>{
                                response2 = response2.data.obj;
                                response2.icon = this.$store.getters.GET_IMGSRC+response2.icon;
                                this.$store.commit("SET_USERINFO",response2);
                                this.$router.push({
                                    path:'/mine'
                                });
                            })
                            axios.get(this.common.baseUrl+"/ums-address/default?userId="+this.$store.getters.GET_USERID).then(response3=>{
                                console.log(response3)
                                let defaultAddress = {};
                                defaultAddress.addressDetail = response3.data.obj.addressDetail;
                                defaultAddress.addressCity = response3.data.obj.province+response3.data.obj.city+response3.data.obj.county;
                                this.$store.commit("SET_DEFAULTADDRESS",defaultAddress);
                            })
                        })
                    }
                }

            },
            changeLoginWay1(){
                this.loginway=(this.loginway+1)%2;
                this.password=''
            },
            changeLoginWay0(){
                this.loginway=(this.loginway+1)%2;
                this.password=''
            },
            goBack(){
                this.$router.push({
                    path:'/mine'
                });
            },
            toRegister(){
                this.$router.push({
                    path:"/register"
                })
            },
            forgetPassword(){
                this.$router.push({
                    path:'/forgetPassword',
                })
            }

        },
    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    @fontcolor: #808080;
    .login_index{
        background-color: #ffffff;
        padding: 10px;
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        .login_top{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            color: #808080;
            .top_img{
                width: 20px;
                height: 20px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .login_pic{
            margin: 20px 0;
            .picimg{
                width: 100px;
                height: 100px;
                margin: 0 auto;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .login_submit{

            .phoneinput{
                background-color: @maincolor;
                border-radius: 20px;
                margin-bottom: 10px;
                width: 90%;
                margin: 16px auto;
            }
            .submitphone{
                margin: 16px;
                overflow: hidden;
                .submit_btn{
                    height: 30px;
                    font-size: 12px;
                }
            }
            .phonecheckbox{
                font-size: 10px;
                margin-top: 16px;
                width: 90%;
                margin: 16px auto;
                .van-checkbox{
                    align-items: normal;
                }
                .checkmessage{
                    /*height: 40px;*/
                    /*background-color: chocolate;*/
                    color: @fontcolor;
                }
                .checkmessage_book{
                    color: #1989fa;
                }
            }
        }
        .otherchoice{
            margin-top: 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            font-size: 12px;
            color: @fontcolor;
        }
        .otherlogin{
            color: #aaaaaa;
            font-size: 12px;
            text-align: center;
            position: fixed;
            top: 440px;
            left: 0;
            width: 100%;
            .loginway{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                margin-top: 16px;
                .tensen,
                .wechat{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    img{
                        width: 60%;
                        height: 60%;
                        margin: auto;
                    }
                }
                .wechat{
                    background-color: #d3ffd4;
                }
                .tensen{
                    background-color: #cbedff;
                }

            }
        }
    }
</style>