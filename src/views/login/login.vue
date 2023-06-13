<template>
    <div class="popup-delete">
        <div class="popup-delete-main">
            <div class="title-custom">
                {{ title }}
            </div>
            <div class="content">
                <div class="d-flex">
                    <v-col cols="12" class="p-0">
                        <vue-input
                            v-model:value="emailLogin"
                            placeholder="Nhập email"
                            :key="keyInput"
                            :error="errorEmail"
                            error-message="Email không được để trống"
                            :force="true"
                            :autofocus="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-12">
                    <v-col cols="12" class="p-0">
                        <vue-input
                            v-model:value="passwordLogin"
                            placeholder="Nhập mật khẩu"
                            type-input="number"
                            :key="keyInput"
                            :error="errorPassword"
                            error-message="Mật khẩu không được để trống"
                            :force="true"
                            typeInput="password"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-12 text-red" v-if="faildLogin">
                    Tên đăng nhập hoặc mật khẩu không đúng
                </div>
            </div>
            <div class="action m-t-12">
                <vue-button 
                    color="#4095F5"
                    class="text-white action-login"
                    text="Đăng nhập"
                    @click="login"
                >
                </vue-button>
            </div>
        </div>
    </div>
</template>
<script>
import buttonVue from '@/components/button.vue'
import ENUMS from '@/enum/enums.js'
import AccountAPI from "@/js/api/accountAPI.js"
import inputVue from "@/components/input.vue"
export default{
    name: "PopUpDelete",
    emits:['getting-started', 'action-done'],
    components: {
        'vue-button': buttonVue,
        'vue-input': inputVue
    },
    props:{
        mode:{
            type: Number,
            default: 3
        },
        formEdit: {
            type: Object,
            default: () => {}
        }
    },
    data(){
        return {
            title: "Đăng nhập",
            confirmPassword: null,
            errors: [false, false, false, false, false],
            keyInput: 0, 
            keySelect: 0, 
            lstEmployee: [],
            timeToEnter: null, 
            timeOut: null,
            emailLogin: null,
            errorEmail: false,
            errorPassword: false,
            passwordLogin: null, 
            faildLogin: false
        }

    },
    async created(){
        this.$emit("getting-started");
        this.ENUMS = ENUMS;
        if(this.mode == ENUMS.ACTION_TYPE[0].value){
            this.title = "Chỉnh sửa tài khoản";
            this.formData = JSON.parse(JSON.stringify(this.formEdit));
            this.formData.Password = window.atob(this.formData.Password);
            this.confirmPassword = this.formData.Password;
        }
    },
    methods:{
        actionCancel(){
            this.$emit('action-cancel');
        },
        async login(){
            if(this.validate()){
                return;
            }
            // this.GlobalAccountID = 3;
            var permission = null;
            this.passwordLogin = window.btoa(this.passwordLogin);
            var res = await AccountAPI.login(this.emailLogin, this.passwordLogin);
            if(res && res.data.Success){
                localStorage.setItem('GlobalAccountID', res.data.Data.AccountID);
                localStorage.setItem('GlobalEmployeeID', res.data.Data.EmployeeID);
                if((this.emailLogin == "admin@gmail.com" && window.atob(this.passwordLogin) == "admin123") || res.data.Data.EmployeeID == 2){
                    permission = 1;
                }
                else
                if(res.data.Data?.DepartmentID == 3){
                    permission = 2;
                }
                else if(res.data.Data.DepartmentID == 4){
                    permission = 3;
                }
                else {
                    permission = 4;
                }
                // this.GlobalAccountID = res.data.Data.AccountID;
                // this.GlobalEmployeeID = res.data.Data.EmployeeID;
                this.$emit("action-done", permission);
            }
            else {
                this.passwordLogin = window.atob(this.passwordLogin);
                this.faildLogin = true;
            }
        },  
        validate(){
            var faild = false;
            if(this.emailLogin == null || this.emailLogin == ""){
                this.errorEmail = true;
                faild = true;
            }
            else {
                this.errorEmail = false;
            }
            if(this.passwordLogin == null || this.passwordLogin == ""){
                this.errorPassword = true;
                faild = true;
            }
            else {
                this.errorPassword = false;
            }
            this.keyInput ++;
            return faild;
        },

        /**
         * Láy tất cả nhân viên
         */
         async getAllEmployee(){
            var res = await AccountAPI.getAllEmployee();
            if(res && res.data.Success){
                this.lstEmployee = res.data.Data;
                this.keySelect ++;
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.popup-delete{
    // background-color:  rgba(97, 98, 99, 0.6);
    background-image: url('@/assets/login.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 1005;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .title-custom{
        font-size: 30px;
        text-align: center;
        margin-bottom: 40px;
        font-weight: 700;
    }
    .popup-delete-main{
            background: white;
            display: block;
            border-radius: 4px;
            width: 400px;
            // height: 350px;
            padding: 48px 48px 40px 48px;
        }
        .action-login{
            width: 100%;
        }
}
</style>