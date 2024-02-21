<template>
    <div class="registerDetail">
        <div class="register_top">
            <div class="left-arrow" @click="quitregister">
                <img src="../../../image/leftarrow.png" />
            </div>
            <div>新密码设置</div>
        </div>
        <div>
            <van-form @submit="onSubmit">
                <van-field
                        v-model="password"
                        type="password"
                        name="password"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                        v-model="confirmpassword"
                        type="password"
                        name="confirmpassword"
                        label="确认密码"
                        placeholder="确认密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    import { Dialog } from 'vant';
    import { Toast } from 'vant';
    export default {
        name: "forgetDetail",
        components: {
            [Dialog.Component.name]: Dialog.Component,
        },
        data() {
            return {
                loginName: '',
                password: '',
                confirmpassword:'',
            };
        },
        methods: {
            testForm(){
                if (this.password===this.confirmpassword){
                    return true;
                }else {
                    Toast('密码和确认密码不匹配');
                    return false;
                }
            },
            onSubmit(values) {
                if (this.testForm()){
                    const formData = new FormData();
                    formData.append("rawPassword",this.password);
                    formData.append("loginName",this.loginName);
                    axios.post(this.common.baseUrl+"/ums-user/update",formData).then(response=>{
                        console.log(response);
                        Toast(response.data.message);
                        if(response.data.code===200){
                            this.$router.push({
                                path:'/login'
                            })
                        }
                    })
                }
            },
            quitregister(){
                Dialog.confirm({
                    title: '中止找回密码',
                    message: '您确定要中止找回密码吗',
                })
                    .then(() => {
                        this.$router.push({
                            path:'/login'
                        })
                    })
                    .catch(() => {

                    });
            }
        },
        created() {
            if (this.$route.query===""){
                Toast("未获取到用户名，请重新输入");
                this.$router.push({
                    path:"/forgetPassword"
                })
            }else{
                this.loginName = this.$route.query.loginName;
            }

        }
    }
</script>

<style scoped lang="less">
    .registerDetail{
        padding: 10px;
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
        .headimg{
            display: flex;
            flex-direction: row;
            margin-left: 16px;
            align-items: center;
            margin-top: 20px;
            .headTitle{
                color: #646566;
                margin-right: 66px;
            }
        }
    }
</style>