<template>
    <div class="register_index">
        <div class="register_top">
            <div class="left-arrow" @click="goback">
                <img src="../../../image/leftarrow.png" />
            </div>
            <div>邮箱快速注册</div>
        </div>
        <div class="login_pic">
            <div class="picimg">
                <img src="../../../image/defaultUserPic.png" />
            </div>
        </div>
        <div class="login_submit">
            <van-form @submit="onSubmit">
                <div>
                    <van-field
                            class="phoneinput"
                            v-model="email"
                            name="email"
                            placeholder="请输入邮箱"
                            clearable
                    />
                </div>
                <div class="submitphone">
                    <van-button
                            class="submit_btn"
                            round block
                            type="info"
                            native-type="submit">
                        <span>下一步</span>
                    </van-button>
                </div>
            </van-form>
        </div>

    </div>
</template>

<script>
    import {Toast} from "vant";
    export default {
        name: "Register",
        data(){
            return{
                email:'',
            }
        },
        methods:{
            goback(){
                this.$router.push({
                    path:"/login"
                });
            },
            onSubmit(){
                const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (reg.test(this.email)){
                    const formData = new FormData()
                    formData.append("email",this.email);
                    axios.post(this.common.baseUrl+"/ums-user/registerEmailCode",formData).then(response=>{
                        // console.log(response)
                        Toast(response.data.message)
                        if (response.data.code===200){
                            this.$router.push({
                                path:'/registerCode',
                                query:{
                                    email: this.email
                                }
                            })
                        }
                    })

                }else{
                    Toast("请输入正确邮箱")
                }
            }
        }

    }
</script>

<style scoped lang="less">
    @maincolor: #f7f8fa;
    @fontcolor: #808080;
    .register_index{
        background-color: #ffffff;
        padding: 10px;
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        .register_top{
            /*background-color: pink;*/
            text-align: center;
            .left-arrow{
                position: absolute;
                left: 10px;
                top: 12px;
                width: 16px;
                height: 16px;
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
                margin: auto;
            }
            .submitphone{
                margin: 16px;
                overflow: hidden;
                .submit_btn{
                    height: 30px;
                    font-size: 12px;
                }
            }
        }
    }
</style>