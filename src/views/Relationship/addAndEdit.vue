<template>
    <div class="popup-delete">
        <div class="popup-delete-main">
            <div class="title m-b-24">
                {{ title }}
            </div>
            <div class="content">
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500">Họ và tên <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <vue-input
                            v-model:value="formData.FullName"
                            placeholder="Nhập họ và tên"
                            :key="keyInput"
                            :error="errors[0]"
                            error-message="Họ và tên không được để trống"
                            :force="true"
                        ></vue-input>
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Giới tính <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <SelectBox
                            v-model:value="formData.GenderID"
                            :items="ENUMS.PICK_LIST_GENDER"
                            item-title="GenderName"
                            item-value="GenderID"
                            placeholder="Chọn giới tính"
                            :key="keySelect"
                            :error="errors[1]"
                            error-message="Giới tính không được để trống"
                            :force="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Ngày sinh <span class="text-red">*</span></v-col>
                    <v-col cols="8" class="p-0">
                        <DateTimePicker
                            v-model:value="formData.DateOfBirth"
                            placeholder="Chọn ngày sinh"
                            :key="keyInput"
                            :error="errors[2]"
                            error-message="Ngày sinh không được để trống"
                            :force="true"
                        />
                    </v-col>
                </div>
                <div class="d-flex m-t-8 m-b-24">
                    <v-col cols="4" class="label font-500" >Số điện thoại </v-col>
                    <v-col cols="8" class="p-0">
                        <vue-input
                            v-model:value="formData.PhoneNumber"
                            placeholder="Nhập số điện thoại"
                            type-input="number"
                            :key="keyInput"
                        ></vue-input>
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
import TimeSheetsAPI from "@/js/api/timeSheetsAPI.js"
import DateTimePicker from "@/components/datePicker.vue"
import inputVue from '@/components/input.vue'
import Convert from "@/js/convert.js"
export default{
    name: "PopUpDelete",
    emits:['action-cancel', 'action-done'],
    components: {
        'vue-button': buttonVue,
        SelectBox: SelectBox,
        DateTimePicker: DateTimePicker,
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
        },
        employeeIDProps:{
            type: String,
            default: null
        },
        idRelationship:{
            type: Number,
            default: null
        }
    },
    data(){
        return {
            title: "Thêm mới thông tin gia đình",
            formData:{
                RelationShipID: 0,
                EmployeeID: null,
                FullName: null, 
                Gender: null, 
                DateOfBirth: null, 
                PhoneNumber: null,
                CreatedDate: null,
                ModifiedDate: null
            },
            errors: [false, false, false],
            keyInput: 0, 
            keySelect: 0, 
            lstEmployee: [],
            timeToEnter: null, 
            timeOut: null
        }

    },
    async created(){
        this.ENUMS = ENUMS;
        if(this.employeeIDProps){
            this.formData.EmployeeID = this.employeeIDProps;
        }
        if(this.mode == ENUMS.ACTION_TYPE[0].value){
            this.title = "Chỉnh sửa thông tin gia đình";
            this.formData = JSON.parse(JSON.stringify(this.formEdit));
            this.formData.DateOfBirth = Convert.formatDateToEdit( this.formData.DateOfBirth);
        }
        else{
            this.formData.RelationShipID = this.idRelationship;
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
            this.formData.DateOfBirth = Convert.formatDateToSave(this.formData.DateOfBirth);
            this.$emit("action-done", this.formData);
        },
        validate(){
            var faild = false;
            if(this.formData.FullName == null || this.formData.FullName == ""){
                this.errors[0] = true;
                faild = true;
            }
            else{
                this.errors[0] = false;
            }
            if(this.formData.GenderID == null || this.formData.GenderID == ""){
                this.errors[1] = true;
                faild = true;
            }
            else{
                this.errors[1] = false;
            }
            if(this.formData.DateOfBirth == null || this.formData.DateOfBirth == ""){
                this.errors[2] = true;
                faild = true;
            }
            else{
                this.errors[2] = false;
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