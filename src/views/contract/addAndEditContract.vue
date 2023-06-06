<template>
    <Loading v-if="showLoading"/>
    <ToastMessage :text="textMessage" :typeAlert="typeMessage" :max-width="widthMessage" v-if="showMessage"/>
    <div class="employee">
        <v-row class="title-action justify-space-between" >
            <v-col cols="5">
                <div class="title">{{ title }}</div>
            </v-col>
            <v-col cols="5" class="d-flex justify-end">
                <vue-button
                    text="Huỷ"
                    color="red"
                    class="m-r-8"
                    @click="cancelEdit"
                >
                </vue-button>
                <vue-button
                    text="Lưu"
                    color="#4095F5"
                    class="text-white"
                    @click="save"
                >
                </vue-button>
            </v-col>
        </v-row>
        <v-row class="row-employee-main-info">
            <div class="employee-main-info">
                <v-row  class="m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label font-500">Số hợp đồng <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                v-model:value="formData.ContractNumber"
                                placeholder="Nhập số hợp đồng"
                                :key="keyInput"
                                v-model:error="errors[0]"
                                error-message="Số hợp đồng trống hoặc đã tồn tại"
                                :force="true"
                                :autofocus="true"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500">Nhân viên <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <vue-combobox
                                v-model:value="formData.EmployeeID"
                                :items="lstEmployee"
                                item-title="FullName"
                                item-value="EmployeeID"
                                placeholder="Chọn nhân viên"
                                :key="keySelect"
                                v-model:error="errors[1]"
                                error-message="Vui lòng chọn nhân viên"
                                :force="true"
                            />
                        </v-col>
                    </v-col>
                </v-row >
                <div class="v-row m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label font-500">Vị trí công việc <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                v-model:value="formData.Position"
                                placeholder="Nhập vị trí công việc"
                                :key="keyInput"
                                v-model:error="errors[2]"
                                error-message="Vị trí công việc không được để trống"
                                :force="true"
                                :autofocus="true"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500" >Công ty </v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                :value="formData.Company"
                                :key="keyInput"
                                :disabled="true"
                            />
                        </v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label font-500">Ngày ký <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <DateTimePicker
                                v-model:value="formData.SignatureDate"
                                placeholder="Chọn ngày ký"
                                :key="keyInput"
                                v-model:error="errors[3]"
                                error-message="Ngày ký không được để trống"
                                :force="true"
                                :max-date="null"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500">Loại hợp đồng <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                v-model:value="formData.ContractType"
                                :items="ENUMS.PICK_LIST_CONTRACT_TYPE"
                                item-title="ContractTypeName"
                                item-value="ContractTypeID"
                                placeholder="Chọn loại hợp đồng"
                                :key="keySelect"
                                v-model:error="errors[4]"
                                error-message="Loại hợp đồng không được để trống"
                                :force="true"
                            />
                        </v-col>
                    </v-col>    
                </div>
                <div class="v-row m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label font-500">Lương thoả thuận <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                v-model:value="formData.Salary"
                                placeholder="Nhập lương"
                                :key="keyInput"
                                v-model:error="errors[5]"
                                error-message="Lương không được để trống"
                                :force="true"
                                typeInput="number"
                                :autofocus="true"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500">Trạng thái <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Combobox
                                v-model:value="formData.Status"
                                :items="ENUMS.CONTRACT_STATUS"
                                item-title="ContractStatusName"
                                item-value="ContractStatusID"
                                v-model:error="errors[6]"
                                error-message="Trạng thái không được để trống"
                                placeholder="Chọn trạng thái hợp đồng"
                                :key="keySelect"
                                :force="true"
                            />
                        </v-col>
                    </v-col>    
                </div>
                <div class="v-row m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5" >
                        <v-col cols="5" class="label font-500">Lương cơ bản <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                v-model:value="formData.BasicPay"
                                placeholder="Nhập lương cơ bản"
                                :key="keyInput"
                                v-model:error="errors[7]"
                                error-message="Lương cơ bản không được để trống"
                                :force="true"
                                typeInput="number"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label font-500">Ngày có hiệu lực <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <DateTimePicker
                                v-model:value="formData.EffectiveDate"
                                placeholder="Chọn ngày hiệu lực"
                                :key="keyInput"
                                v-model:error="errors[8]"
                                error-message="Ngày hiệu lực không được để trống"
                                :force="true"
                                :max-date="null"
                            />
                        </v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24" style="height: 50px;">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label font-500">Ngày hết hạn <span class="text-red">*</span></v-col>
                        <v-col cols="7" class="p-0">
                            <DateTimePicker
                                v-model:value="formData.DateEnd"
                                placeholder="Chọn ngày hết hạn"
                                :key="keyInput"
                                v-model:error="errors[9]"
                                error-message="Ngày hết hạn không được để trống"
                                :force="true"
                                :max-date="null"
                            />
                        </v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5" >
                        <v-col cols="5" class="label font-500">Ghi chú</v-col>
                        <v-col cols="7" class="p-0">
                            <Input
                                v-model:value="formData.Note"
                                placeholder="Nhập ghi chú"
                                :key="keyInput"
                            />
                        </v-col>
                    </v-col>
                </div>
            </div> 
        </v-row>    
    </div>
</template>

<script>
import button from '@/components/button.vue';
import input from '@/components/input.vue';
import combobox from '@/components/selectbox.vue';
import VueCombobox from '@/components/combobox.vue';
import ENUMS from "@/enum/enums.js"
import datePicker from '@/components/datePicker.vue';
import ContractAPI from '@/js/api/contractAPI.js'
import Convert from '@/js/convert.js'
export default{
    name: "EditEmployee",
    components:{
        'vue-button': button, 
        'vue-combobox': VueCombobox, 
        Input: input,
        Combobox: combobox,
        DateTimePicker: datePicker
    }, 
    data(){
        return {
            title: "Thêm mới hợp đồng lao động",
            formData:{
                ContractID: null, 
                EmployeeID: null,
                FullName: null, 
                Company: "Công ty Cổ phần MISA",
                SignatureDate: null,
                Salary: null,
                ContractType: null, 
                DateEnd: null,
                Status: null,
                Note: null,
                BasicPay: null,
                ContractNumber: null,
                Position: null,
                EffectiveDate: null
            },
            errors: [false, false, false, false, false, false, false, false, false, false],
            showLoading: false, 
            showMessage: false,
            keyInput: 0, 
            keySelect: 0,
            lstEmployee: [],
            textMessage: null, 
            typeMessage: null,
            isEdit: false
        }
    },
    props:{
    },
    async created(){
        this.ENUMS = ENUMS;
        this.showLoading = true;

        if(this.$route.params.id != null){
            this.isEdit = true;
            this.title = "Chỉnh sửa hợp đồng lao động";
            await this.getContractByID(this.$route.params.id);
        }
        await this.getAllEmployee();
        this.keyInput ++;
        this.keySelect ++;
        this.showLoading = false;
    },
    methods:{
        /**
         * Nhấn button huỷ
         */
        cancelEdit(){
            this.$router.push({ name: 'ManageContract'});
        },

        /**
         * Láy tất cả nhân viên
         */
        async getAllEmployee(){
            var res = await ContractAPI.getAllEmployee();
            if(res && res.data.Success){
                this.lstEmployee = res.data.Data;
            }
        },

        /**
         * Lấy hộp đồng theo id
         */
        async getContractByID(id){
            var res = await ContractAPI.getContractByID(id);
            if(res && res.data.Success){
                this.formData = res.data.Data;
                await this.prepareDataEdit();
                // this.keyInput ++;
                // this.keySelect ++;
            }
            else {
                this.textMessage = "Có lỗi xảy ra!";
                this.typeMessage = "error";
                this.widthMessage = 300;
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false;
                    this.$router.push({ name: 'ManageContract'});

                }, 2000);
            }
        },
        prepareDataEdit(){
            if(this.formData.DateEnd){
                this.formData.DateEnd = Convert.formatDateToEdit(this.formData.DateEnd);
            }
            if(this.formData.EffectiveDate){
                this.formData.EffectiveDate = Convert.formatDateToEdit(this.formData.EffectiveDate);
            }
            if(this.formData.SignatureDate){
                this.formData.SignatureDate = Convert.formatDateToEdit(this.formData.SignatureDate);
            }
        },

        /* Lưu dữ liệu
         */
        async save(){
            if(this.validateBeforeSave()){
                return;
            }
            this.prepareDataBeforeSave();
            if(this.isEdit){ 
                var resUpdate = await ContractAPI.updateContract(this.formData);
                if(resUpdate && resUpdate.data.Success){
                    // this.$emit("cancel-edit", false);
                    this.textMessage = "Chỉnh sửa thành công!";
                    this.typeMessage = "success";
                    this.widthMessage = 300;
                    this.showMessage = true;
                    setTimeout(() => {
                        this.showMessage = false;
                        this.$router.push({ name: 'ManageContract'});
                    }, 2000);
                }
                else if(resUpdate && resUpdate.data.Success == false){
                    // this.$emit("cancel-edit", false);
                    this.textMessage = "Dữ liệu đã tồn tại!";
                    this.typeMessage = "error";
                    this.widthMessage = 300;
                    this.showMessage = true;
                    setTimeout(() => {
                        this.showMessage = false;
                    }, 2000);
                    if(resUpdate.data.Data.ContractNumber == true){
                        this.errors[0] = true;
                    }
                    if(this.formData.SignatureDate){
                        this.formData.SignatureDate = Convert.formatDateToEdit(this.formData.SignatureDate);
                    }
                    if(this.formData.DateEnd){
                        this.formData.DateEnd = Convert.formatDateToEdit(this.formData.DateEnd);
                    }
                    if(this.formData.EffectiveDate){
                        this.formData.EffectiveDate = Convert.formatDateToEdit(this.formData.EffectiveDate);
                    }
                    this.keyInput ++;
                    this.keySelect ++;
                }
                else {
                    this.textMessage = "Chỉnh sửa thất bại!!";
                    this.typeMessage = "error";
                    this.widthMessage = 300;
                    this.showMessage = true;
                    setTimeout(() => {
                        this.showMessage = false;
                    }, 2000);
                }
            }
            else
            {
                this.formData.ContractID = 0;
                var res = await ContractAPI.insertContract(this.formData);
                if(res && res.data.Success){
                    // this.$emit("cancel-edit", false);
                    this.textMessage = "Thêm mới thành công!";
                    this.typeMessage = "success";
                    this.widthMessage = 300;
                    this.showMessage = true;
                    setTimeout(() => {
                        this.showMessage = false;
                        this.$router.push({ name: 'ManageContract'});
                    }, 2000);
                }
                else if(res && res.data.Success == false){
                    // this.$emit("cancel-edit", false);
                    this.textMessage = "Dữ liệu đã tồn tại!";
                    this.typeMessage = "error";
                    this.widthMessage = 300;
                    this.showMessage = true;
                    setTimeout(() => {
                        this.showMessage = false;
                    }, 2000);
                    if(res.data.Data.ContractNumber == true){
                        this.errors[0] = true;
                    }
                    if(this.formData.SignatureDate){
                        this.formData.SignatureDate = Convert.formatDateToEdit(this.formData.SignatureDate);
                    }
                    if(this.formData.DateEnd){
                        this.formData.DateEnd = Convert.formatDateToEdit(this.formData.DateEnd);
                    }
                    if(this.formData.EffectiveDate){
                        this.formData.EffectiveDate = Convert.formatDateToEdit(this.formData.EffectiveDate);
                    }
                    this.keyInput ++;
                    this.keySelect ++;
                }
                else {
                    this.textMessage = "Thêm mới thất bại!!";
                    this.typeMessage = "error";
                    this.widthMessage = 300;
                    this.showMessage = true;
                    setTimeout(() => {
                        this.showMessage = false;
                    }, 2000);
                }
            }
        },
        
        /**
         * validate dữ liệu
         */
        validateBeforeSave(){
            var faild = false;
            var property = ["ContractNumber", "EmployeeID", "Position", "SignatureDate", "ContractType", "Salary",
                "Status", "BasicPay", "EffectiveDate", "DateEnd"];
            for(var i = 0; i < property.length; i++){
                if(this.formData[property[i]] == null || this.formData[property[i]] == ""){
                    // if(property[i] == "EmployeeID")
                        console.log(property[i]);
                    this.errors[i] = true;
                    faild = true;
                }
            }
            // this.errors = JSON.parse(JSON.stringify(this.errors));
            this.keyInput ++;
            this.keySelect ++;  
            return faild;
        },

        prepareDataBeforeSave(){
            if(this.formData.DateEnd){
                this.formData.DateEnd = Convert.formatDateToSave(this.formData.DateEnd);
            }
            if(this.formData.EffectiveDate){
                this.formData.EffectiveDate = Convert.formatDateToSave(this.formData.EffectiveDate);
            }
            if(this.formData.SignatureDate){
                this.formData.SignatureDate = Convert.formatDateToSave(this.formData.SignatureDate);
            }
            this.formData.FullName = this.lstEmployee.find(x => x.EmployeeID == this.formData.EmployeeID).FullName;
        }
    }
}

</script>

<style lang="scss" scoped>
.employee{
    height: 100%;
    overflow: auto;
    .employee-header-info{
        background-color: #ffffff;
        border-radius: 8px;
        height: 75px;
        overflow: hidden;
        .employee-name-and-code{
            .employee-name{
                font-size: 20px;
            }
            .employee-code{
                margin-left: 6px;
                margin-right: 6px;
                font-size: 20px;
            }
            .fa{
                width: 24px;
                height: 24px;
                background-color: #17A562;
                border-radius: 50%;
            }
        }
    }
    .row-employee-main-info{
            width: 100%;
            overflow: auto;
            border-radius: 4px;
            height: calc(100% - 60px);
            // margin-top: 12px !important;
        .employee-main-info{
            padding: 24px;
            width: 100%;
            border-radius: 4px;
            background-color: #ffffff;
        }
    }
}
</style>