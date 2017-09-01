<template>
    <div id="login" class="container" v-loading="loading" element-loading-text="正在登录中...">
        <div class="login-container">
            <img src="../assets/logo.png" class="login-logo">

            <div class="login-box-wrapper">
                <h2>同方工业运维平台</h2>
                <el-form :model="form" ref="form" :rules="formRule" label-position="left" class="login-box">

                    <el-form-item label="账号" prop="account">
                        <el-input v-model="form.account" size="small" auto-complete="off" placeholder="账号">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="pwd">
                        <el-input type="password" size="small" v-model="form.pwd" auto-complete="off" style="color:#FFF;" placeholder="密码">
                        </el-input>
                    </el-form-item>

                    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>

                    <el-form-item style="width:100%;">
                        <el-button type="primary" size="small" style="width:100%;" @click.native.prevent="login" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="login-footer">
                Copyright 2017 - 同方工业有限公司
            </div>

        </div>
    </div>
</template>

<script>
// import  {mapMutations} from 'vuex';

// import { login } from '../api/user'
import Cookies from 'js-cookie'
import config from '../config'
import { login, getCurrentUser } from '../apis/user'

export default {
    name: 'Login',
    data() {
        return {
            loading: false,
            form: {
                account: '',
                pwd: '',
            },
            formRule: {
                account: [{
                    required: true,
                    message: '请输入账号',
                    trigger: 'blur'
                },
                ],
                pwd: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }],
            },
            checked: true
        }
    },

    methods: {
        login(ev) {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.loading = true
                    let r = await login(this.form.account, this.form.pwd)
                    r = r.data
                    if (r.success && r.object) {
                        let tenants = r.object.list,
                            tenant = this.getTenant(tenants, config.getTenantCode())
                        if (tenant) {
                            if (this.checked) {
                                Cookies.set('LGN', this.form.account, { expires: 7 })
                            } else {
                                Cookies.remove('LGN')
                            }
                            let sessions = {}
                            for (let i = 0, len = tenants.length; i < len; i++) {
                                sessions[tenants[i].tenantCode] = tenants[i].sessionId
                            }
                            config.setSession(sessions)

                            const user = await getCurrentUser({
                                'method.optimize.includeField.fieldName': ['_id', 'playRole']
                            })
                            this.loading = false
                            if (user) {
                                config.setUserId(user._id)
                                if (user.isBureauer && config.getSessionId(config.getBureauTenantCode())) {
                                    window.location.href = window.location.origin.replace(new RegExp(config.getTenantCode(), 'i'), config.getBureauTenantCode()
                                        .toLocaleLowerCase()) + '/roadBureau'
                                } else {
                                    this.$router.push({
                                        path: '/'
                                    })
                                }
                            } else {
                                this.$message({
                                    message: '查询用户信息失败！',
                                    type: 'warning'
                                })
                            }
                        } else {
                            this.loading = false
                            this.$message({
                                message: '该用户不属于租户为' + config.getTenantCode() + '的车站！',
                                type: 'warning'
                            })
                        }
                    } else {
                        this.loading = false
                        this.$message({
                            message: r.message,
                            type: 'warning'
                        })
                    }

                }
            })
        },
        getTenant(tenants, code) {
            for (var i = 0, len = tenants && tenants.length || 0; i < len; i++) {
                if (tenants[i].tenantCode == code) {
                    return tenants[i]
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
.container {
    background: rgb(236, 246, 247);
    width: 100%;
    height: 100%;
    min-width: 1250px;
    min-height: 600px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-container {
        width: 100%;

        .login-logo {
            margin-left: 56px;
        }

        .login-box-wrapper {
            background-image: url('../assets/bg.png');
            padding: 10px 0;
            color: #FFF;
            margin: 10px 0;

            h2 {
                font-size: 30px;
                text-align: center;
                letter-spacing: 3px;
            }

            .login-box {
                width: 350px;
                margin: 10px auto;
                padding: 30px;
                padding-bottom: 15px;
                background-clip: padding-box;
                background: #FFF; //border-radius: 5px;
                //box-shadow: 0 0 25px #cac6c6;
            }

            .remember {
                margin-bottom: 35px;
            }
        }

        .login-footer {
            text-align: center;
        }
    }
}
</style>