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
                            v-model:value="formData.EmployeeID"
                            :items="lstEmployee"
                            item-title="FullName"
                            item-value="EmployeeID"
                            placeholder="Chọn nhân viên"
                            :key="keySelect"
                            v-model:error="errors[0]"
                            error-message="Vui lòng chọn nhân viên"
                            :force="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Lương <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <vue-input
                            v-model:value="formData.BasicPay"
                            placeholder="Nhập số tiền"
                            type-input="number"
                            :key="keyInput"
                            :error="errors[1]"
                            error-message="Số tiền không được để trống"
                            :force="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Khoản đóng thuế <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <vue-input
                            v-model:value="formData.TaxMoney"
                            placeholder="Nhập số tiền"
                            type-input="number"
                            :key="keyInput"
                            :error="errors[2]"
                            error-message="Số tiền không được để trống"
                            :force="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" title="Tiền đóng bảo hiểm xã hội">Tiền đóng BHXH <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <vue-input
                            v-model:value="formData.SocialInsurance"
                            placeholder="Nhập số tiền"
                            type-input="number"
                            :key="keyInput"
                            :error="errors[3]"
                            error-message="Số tiền không được để trống"
                            :force="true"
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
import ManageSalary from "@/js/api/manageSalary.js"
import inputVue from "@/components/input.vue"
export default{
    name: "PopUpDelete",
    emits:['action-cancel', 'action-done'],
    components: {
        'vue-button': buttonVue,
        SelectBox: SelectBox,
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
            title: "Thêm mới lương nhân viên",
            formData:{
                SalaryID: 0,
                EmployeeID: null,
                BasicPay: null,
                TaxMoney: null,
                CreatedDate: null,
                ModifiedDate: null,
                SocialInsurance: null
            },
            errors: [false, false, false, false],
            keyInput: 0, 
            keySelect: 0, 
            lstEmployee: [],
            timeToEnter: null, 
            timeOut: null
        }

    },
    async created(){
        this.ENUMS = ENUMS;
        if(this.mode == ENUMS.ACTION_TYPE[0].value){
            this.title = "Chỉnh sửa lương nhân viên";
            this.formData = JSON.parse(JSON.stringify(this.formEdit));
        }
        await this.getAllEmployee();
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
                this.formData.ModifiedDate = new Date();
                var resUpdate = await ManageSalary.updateSalary(this.formData);
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
                this.formData.CreatedDate = new Date();
                var res = await ManageSalary.insertSalary(this.formData);
                if(res && res.data.Success){
                    this.$emit("action-done", true);
                }
                else 
                {
                    this.$emit("action-done", false);
                }
            }
        },
        validate(){
            var faild = false;
            var property = ["EmployeeID", "BasicPay", "TaxMoney", "SocialInsurance"];
            for(var i = 0; i < property.length; i++){
                if(this.formData[property[i]] == null || this.formData[property[i]] == ""){
                    this.errors[i] = true;
                    faild = true;
                }
            }
        
            this.keyInput ++;
            this.keySelect ++;
            return faild;
        },

        /**
         * Láy tất cả nhân viên
         */
         async getAllEmployee(){
            var res = await ManageSalary.getAllEmployee();
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
    }
    .action{
        text-align: right;
        margin-top: 10px;
    }
}
</style>