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
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Ngày làm việc <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <DateTimePicker
                            v-model:value="formData.WorkDate"
                            placeholder="Chọn ngày làm việc"
                            :key="keyInput"
                            :error="errors[1]"
                            error-message="Ngày làm việc không được để trống"
                            :force="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Giờ vào làm <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <TimePicker
                            v-model:value="formData.TimeToEnter"
                            placeholder="Chọn thời gian"
                            :key="keyInput"
                            :error="errors[2]"
                            error-message="Thời gian được để trống"
                            :force="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Giờ ra về <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <TimePicker
                            v-model:value="formData.TimeToOut"
                            placeholder="Chọn thời gian"
                            :key="keyInput"
                            :error="errors[3]"
                            error-message="Thời gian được để trống"
                            :force="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Loại hình công việc <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <SelectBox
                            v-model:value="formData.WorkType"
                            :items="ENUMS.WORK_SHEETS_TYPE"
                            item-title="name"
                            item-value="value"
                            placeholder="Chọn loại hình công việc"
                            :key="keySelect"
                            v-model:error="errors[4]"
                            error-message="Vui lòng chọn loại công việc"
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
import TimeSheetsAPI from "@/js/api/timeSheetsAPI.js"
import DateTimePicker from "@/components/datePicker.vue"
import TimePicker from "@/components/timePicker.vue"
import Convert from "@/js/convert.js"
export default{
    name: "PopUpDelete",
    emits:['action-cancel', 'action-done'],
    components: {
        'vue-button': buttonVue,
        SelectBox: SelectBox,
        'vue-combobox': Combobox,
        DateTimePicker: DateTimePicker,
        TimePicker: TimePicker
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
            title: "Thêm mới ngày công nhân viên",
            formData:{
                TimeSheetsID: 0,
                EmployeeID: null,
                WorkDate: null,
                TimeToEnter: null,
                TimeToOut: null,
                WorkType: null,
                CreatedDate: null,
                ModifiedDate: null
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
            this.title = "Chỉnh sửa ngày công nhân viên";
            this.formData = JSON.parse(JSON.stringify(this.formEdit));
            this.formData.WorkDate = Convert.formatDateToEdit( this.formData.WorkDate);
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
            this.formData.WorkDate = Convert.formatDateToSave(this.formData.WorkDate);
            if(this.mode == ENUMS.ACTION_TYPE[0].value){
                this.formData.ModifiedDate = new Date();
                // edit
                var resUpdate = await TimeSheetsAPI.updateTimeSheets(this.formData);
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
                var res = await TimeSheetsAPI.insertTimeSheets(this.formData);
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
            // var property = ["EmployeeID", "WorkDate", "WorkType"];
            // for(var i = 0; i < property.length; i++){
            //     if(this.formData[property[i]] == null || this.formData[property[i]] == ""){
            //         this.errors[i] = true;
            //         faild = true;
            //     }
            // }
            if(this.formData.EmployeeID == null || this.formData.EmployeeID == ""){
                this.errors[0] = true;
                faild = true;
            }
            if(this.formData.WorkDate == null || this.formData.WorkDate == ""){
                this.errors[1] = true;
                faild = true;
            }
            console.log();
            if(this.formData.TimeToEnter == null || this.formData.TimeToEnter == ""){
                this.errors[2] = true;
                faild = true;
            }
            if(this.formData.TimeToOut == null || this.formData.TimeToOut == ""){
                this.errors[3] = true;
                faild = true;
            }
            if(this.formData.WorkType == null || this.formData.WorkType == ""){
                this.errors[4] = true;
                faild = true;
            }
            this.keyInput ++;
            this.keySelect ++;
            return faild;
        },

        /**
         * Láy tất cả nhân viên
         */
         async getAllEmployee(){
            var res = await TimeSheetsAPI.getAllEmployee();
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