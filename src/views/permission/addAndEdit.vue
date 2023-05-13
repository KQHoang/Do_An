<template>
    <div class="popup-delete">
        <div class="popup-delete-main">
            <div class="title m-b-24">
                {{ title }}
            </div>
            <div class="content">
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500">Nhân viên <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <SelectBox
                            v-model:value="AccountID"
                            :items="lstEmployee"
                            item-title="FullName"
                            item-value="AccountID"
                            placeholder="Chọn nhân viên"
                            :key="keySelect"
                            v-model:error="errorAccountID"
                            error-message="Vui lòng chọn nhân viên"
                            :force="true"
                            @value-change="valueChange"
                            :disabled="mode == ENUMS.ACTION_TYPE[0].value"

                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500">Quản lý lương</v-col>
                    <v-col cols="8" class="p-0">
                        <vue-checkbox 
                            v-model:valueCheckBox="formData.ManageSalary"
                            class="checkbox-custom"
                            :disabled="ishrm"
                            :key="keyCheckbox"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500">Quản lý phòng ban</v-col>
                    <v-col cols="8" class="p-0">
                        <vue-checkbox 
                            v-model:valueCheckBox="formData.ManageDepartment"
                            class="checkbox-custom"
                            :disabled="!ishrm"
                            :key="keyCheckbox"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500">Quản lý chức vụ</v-col>
                    <v-col cols="8" class="p-0">
                        <vue-checkbox 
                            v-model:valueCheckBox="formData.ManagePosition"
                            class="checkbox-custom"
                            :disabled="!ishrm"
                            :key="keyCheckbox"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500">Quản lý hồ sơ nhân viên</v-col>
                    <v-col cols="8" class="p-0">
                        <vue-checkbox 
                            v-model:valueCheckBox="formData.ManageProfile"
                            class="checkbox-custom"
                            :disabled="!ishrm"
                            :key="keyCheckbox"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500">Quản lý hợp đồng</v-col>
                    <v-col cols="8" class="p-0">
                        <vue-checkbox 
                            v-model:valueCheckBox="formData.ManageContract"
                            class="checkbox-custom"
                            :disabled="!ishrm"
                            :key="keyCheckbox"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500">Quản lý chấm công</v-col>
                    <v-col cols="8" class="p-0">
                        <vue-checkbox 
                            v-model:valueCheckBox="formData.ManageTimeSheets"
                            class="checkbox-custom"
                            :disabled="!ishrm"
                            :key="keyCheckbox"
                        />
                    </v-col>
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
                    text="Lưu"
                    @click="save"
                >
                </vue-button>
            </div>
        </div>
    </div>
</template>
<script>
import buttonVue from '@/components/button.vue'
import SelectBox from "@/components/selectbox.vue"
import ENUMS from '@/enum/enums.js'
import PermissionAPI from "@/js/api/permissionAPI.js"
import checkboxVue from '@/components/checkbox.vue'
export default{
    name: "PopUpDelete",
    emits:['action-cancel', 'action-done'],
    components: {
        'vue-button': buttonVue,
        SelectBox: SelectBox,
        'vue-checkbox': checkboxVue
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
            title: "Thêm mới quyền truy cập",
            AccountID: null,
            formData:{
                ManageSalary: false,
                ManagePosition: false, 
                ManageDepartment: false, 
                ManageProfile: false, 
                ManageContract: false, 
                ManageTimeSheets: false
            },
            confirmPassword: null,
            errors: [false, false, false, false, false],
            keyInput: 0, 
            keySelect: 0, 
            lstEmployee: [],
            timeToEnter: null, 
            timeOut: null,
            ishrm: false,
            errorAccountID: false,
            keyCheckbox: 0
        }

    },
    async created(){
        this.ENUMS = ENUMS;
        if(this.mode == ENUMS.ACTION_TYPE[0].value){
            this.title = "Chỉnh sửa quyền truy cập";
            this.formData = JSON.parse(JSON.stringify(this.formEdit));
            this.AccountID = this.accountID;
        }
        await this.getAllEmployee();
        if(this.mode == ENUMS.ACTION_TYPE[0].value){
            this.valueChange(this.AccountID);
        }
    },
    methods:{
        actionCancel(){
            this.$emit('action-cancel');
        },
        
        async save(){
            if(this.validate()){
                return;
            }
            if(this.mode == ENUMS.ACTION_TYPE[0].value){
                // edit
                var resUpdate = await PermissionAPI.updatePermission(this.AccountID, this.formData);
                if(resUpdate && resUpdate.data.Success){
                    this.$emit("action-done", true);
                }
                else 
                {
                    this.$emit("action-done", false);
                }
            }
            else
            {
                var res = await PermissionAPI.insertPermission(this.AccountID, this.formData);
                if(res && res.data.Success){
                    this.$emit("action-done", true);
                }
                else if(res.data.Data.IsExist == true)
                {
                    this.$emit("data-exist", true);
                }
                else {
                    this.$emit("action-done", false);
                }
            }
        },
        validate(){
            var faild = false;
            var isNull = true;
            var property = ["ManageSalary", "ManagePosition",  "ManageDepartment", "ManageProfile", "ManageContract", "ManageTimeSheets"];
            property.forEach(element => {
                if(this.formData[element] == true)
                    isNull = false;
            });
            if(isNull){
                faild = true;
            }
            if(this.AccountID == null || this.AccountID == ""){
                faild = true;
                this.errorAccountID = true;
            }
            else
            {
                this.errorAccountID = false;
            }
            this.keyInput ++;
            this.keySelect ++;
            return faild;
        },

        /**
         * Láy tất cả nhân viên
         */
         async getAllEmployee(){
            var res = await PermissionAPI.getAllEmployee();
            if(res && res.data.Success){
                this.lstEmployee = res.data.Data;
                this.keySelect ++;
            }
        },
        valueChange(value){
            if(value){
                this.resetValue();
                var data = this.lstEmployee.find(x => x.AccountID == value);
                if(data.DepartmentID == 3){
                    this.ishrm = true;
                }
                else {
                    this.ishrm = false;
                }
            }
        },
        /**
         * Reset lại các tích chọn
         */
        resetValue(){
            this.formData = {
                ManageSalary: false,
                ManagePosition: false, 
                ManageDepartment: false, 
                ManageProfile: false, 
                ManageContract: false, 
                ManageTimeSheets: false
            };
            this.formData = JSON.parse(JSON.stringify(this.formData));
            this.keyCheckbox ++;
        }
    }
}
</script>
<style lang="scss" scoped>
.popup-delete{
    background-color:  rgba(97, 98, 99, 0.6);
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
        width: 50%;
        background: white;
        display: block;
        padding: 24px;
        border-radius: 4px;
        height: 80%;
        .content{
            height: calc(100% - 34px - 30px - 36px);
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