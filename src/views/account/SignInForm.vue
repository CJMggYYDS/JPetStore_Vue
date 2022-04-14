<template>
<div class="container">
    <el-form
    label-position="left"
     :model="ruleForm"
     status-icon
     :rules="rules"
     ref="ruleForm"
     label-width="140px">
        <el-row :gutter="40" type="flex" justify="center">
            <el-col :span="8">
                <h2>JPetStore 用 户 登 录</h2>
                <el-form-item style="margin-top:50px" label="用户名" prop="username">
                    <el-input type="text" auto-complete="off" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" auto-complete="off" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input type="text" auto-complete="off" v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="checkcode">
                    <el-col :span="12">
                        <el-input type="text" v-model="ruleForm.checkcode"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-button 
                            type="primary" 
                            round 
                            @click="getCheckCode()" 
                            :class="{'disabled-style':getCodeBtnDisable}" 
                            :disabled="getCodeBtnDisable">
                                {{ codeBtnWord }}
                        </el-button>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-col :span="8">
                        <el-button type="primary" round @click="LoginForm('ruleForm')">登录</el-button>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary" round @click="$router.push('/register')">注册</el-button>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</div>
</template>

<script>
export default {

    data() {
        //校验输入的手机号码格式
        var checkPhone = (rule, value, callback) => {
            const regPhone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if(value === "") {
                callback(new Error("手机号不能为空"));
            }
            else {
                if(regPhone.test(value)) {
                    callback();
                }
                else {
                    callback(new Error("请输入合法的手机号"));
                }
            }
        };
        
        return {
            Token: "",
            codeBtnWord: '发送验证码',
            waitTime: 61,
            ruleForm: {
                username:"",
                password:"",
                phone: "",
                checkcode:""
            },
            rules: {
                username:[
                    {
                        required: true,
                        message: "请输入用户名",               
                        trigger: "blur"
                    },
                ],
                password:[
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }
                ],
                phone:[
                    {
                        required: true,
                        validator: checkPhone,
                        trigger: "blur"
                    }
                ],
                checkcode:[
                    {
                        required: true,
                        message: "请进行验证",
                        trigger: "blur"
                    }
                ]
            }
        }
    },

    computed: {
        getCodeBtnDisable:{
            get() {
                if(this.waitTime === 61) {
                    if(this.ruleForm.phone) {
                        return false;
                    }
                    return true;
                }
                return true;
            },

            set() {}
        }
    },

    methods: {
        //登录函数
        LoginForm(formName) {   
            //发送登录请求
            this.axios.post("/accounts/login", {
                //放在请求体中的参数
                username: this.ruleForm.username,
                password: this.ruleForm.password,
                checkcode: this.ruleForm.checkcode
            }).then(response => {
                //后端返回体中状态码为0，请求成功
                if(response.data.status===1) {
                    //拿到后端jwt生成的token
                    let token = response.data.data.token;
                    console.log(response.data.data);
                    console.log(token);
                    //token存入本地浏览器中
                    sessionStorage.setItem("token", token);

                    //将token存入vuex store中，向所有组件共享
                    this.$store.commit("setToken", token);
                    //将用户username共享
                    this.$store.commit("setAccount", response.data.data);
                    //将登录状态由默认的false变为true,变为已登录状态
                    this.$store.commit("changeIsSigned", true);
                    //输出一下返回体中的描述信息msg
                    this.$message.success('登陆成功');
                    //返回首页
                    this.$router.push('/');
                }
                else {
                    this.$message.error(response.data.msg);
                }
            }).catch(error => {
                alert(error);
            });
                
              
        },

       
        //点击获取手机验证码
        getCheckCode() {
            const regPhone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if(this.ruleForm.phone==="") {
                this.$message.error("请输入手机号");
                return;
            }
            else if(!regPhone.test(this.ruleForm.phone)) {
                this.$message.error("请输入合法的手机号");
                return;
            }
            else {
                this.axios.get("/checkcode", {
                    params: {
                        telephone: this.ruleForm.phone
                    }
                })
                .then(response => {
                    if(response.data.status===0) {
                        this.$message.success("验证码已发送");
                    }
                })
                .catch(error => {
                    this.$message.error(error);
                }); 
               
                let _this = this;
                _this.waitTime--;
                _this.getCodeBtnDisable=true;
                this.codeBtnWord = this.waitTime+'s 后获取';
                let timer = setInterval(function() {
                    if(_this.waitTime>1) {
                        _this.waitTime--;
                        _this.codeBtnWord = _this.waitTime+'s 后获取';
                    }
                    else {
                        clearInterval(timer);
                        _this.codeBtnWord = '发送验证码';
                        _this.getCodeBtnDisable = false;
                        _this.waitTime = 61;
                    }
                }, 1000);
            }
        }

    }

}
</script>

<style scoped>
.el-button.disabled-style {
    background-color: #EEEEEE;
    color: #CCCCCC;
}

</style>