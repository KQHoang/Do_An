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
                        <vue-combobox
                            v-model:value="formData.EmployeeID"
                            :items="lstEmployee"
                            item-title="FullName"
                            item-value="EmployeeID"
                            placeholder="Chọn nhân viên"
                            :key="keySelect"
                            v-model:error="errors[0]"
                            error-message="Vui lòng chọn nhân viên"
                            :force="true"
                            :disable="mode == ENUMS.ACTION_TYPE[0].value"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Tháng chi trả <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <SelectBox
                            v-model:value="formData.MonthSalary"
                            :items="ENUMS.PICK_LIST_MONTH"
                            item-title="name"
                            item-value="value"
                            placeholder="Chọn tháng chi trả"
                            :key="keySelect"
                            v-model:error="errors[1]"
                            error-message="Vui lòng chọn tháng"
                            :force="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Năm chi trả<span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <SelectBox
                            v-model:value="formData.YearSalary"
                            :items="ENUMS.PICK_LIST_YEAR"
                            item-title="name"
                            item-value="value"
                            placeholder="Chọn năm chi trả"
                            :key="keySelect"
                            v-model:error="errors[2]"
                            error-message="Vui lòng chọn năm"
                            :force="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" title="Tiền đóng bảo hiểm xã hội">Tiền thưởng <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <vue-input
                            v-model:value="formData.Bonus"
                            placeholder="Nhập số tiền"
                            type-input="number"
                            :key="keyInput"
                            :error="errors[3]"
                            error-message="Số tiền không được để trống"
                            :force="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" title="Tiền đóng bảo hiểm xã hội">Trạng thái <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <SelectBox
                            v-model:value="formData.Status"
                            :items="ENUMS.STATUS_SALARY_PERIOD"
                            item-title="label"
                            item-value="value"
                            placeholder="Chọn  trạng thái"
                            :key="keySelect"
                            v-model:error="errors[4]"
                            error-message="Vui lòng chọn trạng thái"
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
import Combobox from "@/components/combobox.vue"
import ENUMS from '@/enum/enums.js'
import ManageSalaryPeriod from "@/js/api/manageSalaryPeriod.js"
import inputVue from "@/components/input.vue"
export default{
    name: "PopUpDelete",
    emits:['action-cancel', 'action-done', 'data-exist'],
    components: {
        'vue-button': buttonVue,
        SelectBox: SelectBox,
        'vue-input': inputVue,
        'vue-combobox': Combobox
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
            title: "Thêm mới kỳ chi trả lương",
            formData:{
                SalaryPeriodID: 0,
                EmployeeID: null,
                MonthSalary: null,
                YearSalary: null,
                CreatedDate: null,
                ModifiedDate: null,
                Bonus: null, 
                Status: null
            },
            errors: [false, false, false, false, false],
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
            this.title = "Chỉnh sửa kỳ chi trả lương";
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
                var resUpdate = await ManageSalaryPeriod.updateSalaryPeriod(this.formData);
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
                var res = await ManageSalaryPeriod.insertSalaryPeriod(this.formData);
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
            var property = ["EmployeeID", "MonthSalary", "YearSalary", "Bonus", "Status"];
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
            var res = await ManageSalaryPeriod.getAllEmployee();
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