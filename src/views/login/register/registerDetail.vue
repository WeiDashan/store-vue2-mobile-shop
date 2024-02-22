<template>
    <div class="registerDetail">
        <div class="register_top">
            <div class="left-arrow" @click="quitregister">
                <img src="../../../image/leftarrow.png" alt=""/>
            </div>
            <div>注册信息填写</div>
        </div>
        <div>
            <van-form @submit="onSubmit">
                <div class="headimg">
                    <div class="headTitle">头像</div>
                    <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1"/>
                </div>
                <van-field
                        v-model="appUser.nickyName"
                        name="nickyName"
                        label="昵称"
                        placeholder="昵称"
                        :rules="[{ required: true, message: '请填写昵称' }]"
                />
                <van-field
                        v-model="appUser.rawPassword"
                        type="password"
                        name="rawPassword"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                        v-model="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        label="确认密码"
                        placeholder="确认密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                        v-model="appUser.phone"
                        name="phone"
                        label="手机号"
                        placeholder="手机号"
                        :rules="[{ required: true, message: '请输入手机号' }]"
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
    import { AppUserUrl } from "@/plugins/api"
    export default {
        name: "RegisterDetail",
        components: {
            [Dialog.Component.name]: Dialog.Component,
        },
        data() {
            return {
                fileList: [

                ],
                appUser:{
                    nickyName: '',
                    rawPassword: '',
                    phone:'',
                    email:'',
                    iconFile: []
                },
                confirmPassword:'',
                phonePattern: /^1([38][0-9]|4[5-9]|5[0-3,5-9]|66|7[0-8]|9[89])[0-9]{8}$/,
            };
        },
        methods: {
            testForm(){
                if (this.appUser.rawPassword===this.confirmPassword){
                    const phoneRe = new RegExp(this.phonePattern);
                    if(phoneRe.test(this.appUser.phone)){
                      return true;
                    }else{
                      Toast('请输入正确的手机号');
                      return false;
                    }
                }else {
                    Toast('密码和确认密码不匹配');
                    return false;
                }
            },
            onSubmit() {
                if (this.testForm()){
                    this.appUser.iconFile = this.fileList[0].file
                    this.post(this.common.baseUrl+AppUserUrl.registerAppUser, this.appUser, ()=>{
                        this.fileList=[]
                        this.appUser={
                            nickyName: '',
                            rawPassword: '',
                            phone:'',
                            email:'',
                            iconFile: []
                        }
                        this.$router.push({
                          path:'/login'
                        })
                    })
                }
            },
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                // console.log(file);
            },
            quitregister(){
                Dialog.confirm({
                    title: '中止注册',
                    message: '您确定要中止注册吗',
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
            if (this.$route.query === null || this.$route.query ===""){
                Toast("未获取到邮箱，请重新输入")
                this.$router.push({
                    path:"/login"
                })
            }else{
                this.appUser.email = this.$route.query.email;
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