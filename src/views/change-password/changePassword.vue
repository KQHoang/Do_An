<template>
    <div class="popup-delete">
        <ToastMessage title="" text="Thay đổi mật khẩu thành công" typeAlert="success" :max-width="300" v-if="showMessage"/>

        <div class="popup-delete-main">
            <div class="title m-b-24">
                Thay đổi mật khẩu
            </div>
            <div class="content">

                <div cols="4" class="label font-500" title="Tiền đóng bảo hiểm xã hội">Mật khẩu hiện tại <span class="text-red">*</span></div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="12" class="p-0">
                        <vue-input
                            v-model:value="oldPassword"
                            placeholder="Nhập mật khẩu"
                            :key="keyInput"
                            :error="errorOldPassword"
                            error-message="Vui lòng nhập mật khẩu cũ"
                            :force="true"
                            type-input="password"
                        />
                    </v-col>
                </div>

                <div cols="4" class="label font-500" title="Tiền đóng bảo hiểm xã hội">Mật khẩu mới <span class="text-red">*</span></div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="12" class="p-0">
                        <vue-input
                            v-model:value="newPassword"
                            placeholder="Nhập mật khẩu"
                            :key="keyInput"
                            :error="errorNewPassword"
                            error-message="Vui lòng nhập mật khẩu mới"
                            :force="true"
                            type-input="password"
                        />
                    </v-col>
                </div>

                <div cols="4" class="label font-500" title="Tiền đóng bảo hiểm xã hội">Xác nhận mật khẩu mới <span class="text-red">*</span></div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="12" class="p-0">
                        <vue-input
                            v-model:value="confirmNewPassword"
                            placeholder="Nhập mật khẩu"
                            :key="keyInput"
                            :error="errorConfirmNewPassword"
                            error-message="Mật khẩu trống hoặc không khớp"
                            :force="true"
                            type-input="password"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-12 text-red" v-if="faildChangePassword">
                    Mật khẩu cũ chưa chính xác
                </div>
            </div>
            <div class="action">
                <vue-button 
                    color="#E8EAEF"
                    class="m-r-8"
                    text="Huỷ"
                    @click="actionCancel"
                >
                </vue-button>
                <vue-button 
                    color="#4095F5"
                    class="text-white"
                    text="Đổi mật khẩu"
                    @click="save"
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
import input from '@/components/input.vue'
export default{
    name: "PopUpDelete",
    emits:['action-cancel', 'action-done', 'ui'],
    components: {
        'vue-button': buttonVue,
        'vue-input': input
    },
    props:{
        mode:{
            type: Number,
            default: 3
        },
        formEdit: {
            type: Object,
            default: () => {}
        },
        accountID:{
            type: Number,
            default: null
        }
    },
    data(){
        return {
            oldPassword: null,
            newPassword: null,
            confirmNewPassword: null,
            errorOldPassword: false,
            errorNewPassword: false,
            errorConfirmNewPassword: false,
            keyInput: 0, 
            faildChangePassword: false, 
            showMessage: false, 
            changeSuccess: false
        }

    },
    async created(){
        this.ENUMS = ENUMS;
        this.changeSuccess = false;
        this.$emit("ui");
    },
    methods:{
        actionCancel(){
            // var id = localStorage.getItem("GlobalEmployeeID");
            // this.$router.push({ name: 'ViewEmployee', params: { id: id }});
            this.$emit("action-cancel");
        },
        
        /**
         * Nhấn lưu mật khẩu
         */
        async save(){
            if(this.validate()){
                return;
            }
            var id = localStorage.getItem("GlobalAccountID");
            this.oldPassword = window.btoa(this.oldPassword);
            this.newPassword = window.btoa(this.newPassword);
            var res = await AccountAPI.changePassword(id, this.newPassword, this.oldPassword);
            if(res && res.data.Success){
                this.showMessage = true;
                this.$emit('action-done');
                setTimeout(() => {
                    this.showMessage = false;
                    // this.$router.push({ name: 'Login'});
                    this.changeSuccess = true;
                    localStorage.setItem("IsLogin", false);
                }, 1000);
            }
            else if(res && res.data.Success == false){
                if(res.data.Data.PasswordIncoreect == true){
                    this.faildChangePassword = true;
                    this.oldPassword = window.atob(this.oldPassword);
                    this.newPassword = window.atob(this.newPassword);
                    this.keyInput ++;
                }
            }
        },
        validate(){
            var faild = false;
            if(this.oldPassword == null || this.oldPassword == ""){
                faild = true;
                this.errorOldPassword = true;
            }
            else
            {
                this.errorOldPassword = false;
            }
            if(this.newPassword == null || this.newPassword == ""){
                faild = true;
                this.errorNewPassword = true;
            }
            else
            {
                this.errorNewPassword = false;
            }
            if(this.confirmNewPassword == null || this.newPassconfirmNewPasswordword == ""){
                faild = true;
                this.errorConfirmNewPassword = true;
            }
            else
            {
                this.errorConfirmNewPassword = false;
            }
            if(this.confirmNewPassword && this.newPassword){
                if(this.confirmNewPassword != this.newPassword){
                    faild = true;
                    this.errorConfirmNewPassword = true;
                }
                else {
                    faild = false;
                }
            }
            this.keyInput ++;
            return faild;
        },

        valueChange(value){
            if(value){
                var data = this.lstEmployee.find(x => x.AccountID == value);
                if(data.PositionID == 4){
                    this.ishrm = true;
                }
                else {
                    this.ishrm = false;
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.popup-delete{
    background-color: #F2F3F5;
    z-index: 1005;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .popup-delete-main{
        width: 500px;
        background: white;
        display: block;
        padding: 24px;
        border-radius: 4px;

        .title{
            text-align: center;
        }
        .content{
            overflow-y: auto;
            overflow-x: hidden;
            width: 100%;
            padding-right: 15px;
        }
    }
    .action{
        text-align: right;
        margin-top: 10px;
    }
}
</style>