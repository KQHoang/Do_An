<template>
    <Loading v-if="showLoading"/>
    <div class="view-profile" v-if="!showEdit">
        <v-row class="title-action justify-space-between" >
            <v-col cols="5">
                <vue-button
                    color="#4095F5"
                    class="text-white back-page"
                    @click="backPage"
                >
                    <template v-slot:prepend>
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    </template>
                </vue-button>
            </v-col>
            <v-col cols="5" class="d-flex justify-end">
                <vue-button
                    text="Chỉnh sửa"
                    color="#4095F5"
                    class="text-white"
                    @click="edit"
                >
                    <template v-slot:prepend>
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </template>
                </vue-button>
            </v-col>
        </v-row>
        <v-row class="row-employee-main-info">
            <div class="employee-main-info">
                <span class="title">
                    Thông tin cơ bản
                </span>
                <div class="v-row m-t-24">
                    <span class="text-child">
                        Thông tin chung
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Mã nhân viên</v-col>
                        <v-col cols="7" class="employee-info">{{ formData.EmployeeCode }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">MST cá nhân</v-col>
                        <v-col cols="7" class="employee-info">{{ formData.TaxCode }}</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Họ và tên</v-col>
                        <v-col cols="7" class="employee-info">{{ formData.FullName }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Dân tộc</v-col>
                        <v-col cols="7" class="employee-info">{{ getEthnicityName(formData.EthnicityID) }}</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Ngày sinh</v-col>
                        <v-col cols="7" class="employee-info">{{ convertDate(formData.DateOfBirth) }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Giới tính</v-col>
                        <v-col cols="7" class="employee-info">{{ formData.GenderID == 1 ? "Nam" : "Nữ"}} </v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Đơn vị công tác</v-col>
                        <v-col cols="7" class="employee-info">{{ department.DepartmentName }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Vị trí công việc</v-col>
                        <v-col cols="7" class="employee-info">{{ positionName }}</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-24">
                    <span class="text-child">
                        CMND/Thẻ căn cước
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Loại giấy tờ</v-col>
                        <v-col cols="7" class="employee-info">{{ formData.IdentifyType == 1 ? "CCCD" : "CMND"}}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Ngày cấp (CMND/CCCD)</v-col>
                        <v-col cols="7" class="employee-info">{{ convertDate(formData.IdentifyDate) }}</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Số CMND/CCCD</v-col>
                        <v-col cols="7" class="employee-info">{{ formData.IdentifyNumber }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Nơi cấp (CMND/CCCD)</v-col>
                        <v-col cols="7" class="employee-info" :title="formData.IdentifyIssuedPlaceName">{{ formData.IdentifyIssuedPlaceName }}</v-col>
                    </v-col>
                </div>

                <div class="title m-t-60">
                    Thông tin liên hệ
                </div>
                <div class="v-row m-t-24">
                    <span class="text-child">
                        Số điện thoại/Email
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">ĐT di động</v-col>
                        <v-col cols="7" class="employee-info">{{ formData.PhoneNumber }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Email cá nhân</v-col>
                        <v-col cols="7" class="employee-info">{{ formData.Email }}</v-col>
                    </v-col>
                </div>

                <div class="v-row m-t-24">
                    <span class="text-child">
                        Địa chỉ
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Tỉnh/Thành phố</v-col>
                        <v-col cols="7" class="employee-info">{{ formData.ProvinceName }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Phường/Xã</v-col>
                        <v-col cols="7" class="employee-info">{{ formData.WardsName }}</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Quận/Huyện</v-col>
                        <v-col cols="7" class="employee-info">{{ formData.DistrictName }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Số nhà, đường phố</v-col>
                        <v-col cols="7" class="employee-info">{{ formData.StreetAddress }}</v-col>
                    </v-col>
                </div>
            </div> 
        </v-row>    
    </div>
    <AddAndEditProfile 
        :isEdit="true"
        v-if="showEdit"
        @cancel-edit="cancelEdit"
    />
</template>

<script>
import button from '@/components/button.vue';
import AddAndEditProfile from '@/views/manage-profile/addProfileEmployee.vue'
import ENUMS from "@/enum/enums.js"
import ProfileAPI from '@/js/api/profileAPI';
import Convert from '@/js/convert';
import EmployeeAPI from "@/js/api/employee.js"
export default{
    name: "EditEmployee",
    components:{
        'vue-button': button, 
        AddAndEditProfile: AddAndEditProfile
    }, 
    data(){
        return{
            editMode: null,
            showEdit: null,
            id: null, 
            formData: {},
            showLoading: false,
            department: {},
            positionName: null

        }
    },
    async created(){
        this.ENUMS = ENUMS;
        this.editMode = this.$route.query?.editMode;

        if(this.editMode == ENUMS.ACTION_TYPE[0].value){
            this.showEdit = true;
        }
        else{
            this.showEdit = false;
            await this.getDataByID();
            if(this.formData?.DepartmentID){
                await this.getDepartmentByID(this.formData?.DepartmentID);
            }
            if(this.formData?.PositionID){
                await this.getPostionByID(this.formData?.PositionID);
            }
        }
    }, 
    methods:{
        backPage(){
            this.$router.push({ name: 'ManageProfile'});
        },
        edit(){
            this.showEdit = true;
        },
        async getDataByID(){
            this.showLoading = true;
            this.id = this.$route.params?.id;
            var res = await ProfileAPI.getProfileByID(this.id);
            if(res && res.data.Success){
                this.formData = res.data.Data;
            }
            setTimeout(() => {
                this.showLoading = false;
            }, 500);
        },
        convertDate(val){
            return Convert.formatDateToShow(val);
        },
        getEthnicityName(val){
            if(val)
                return ENUMS.PICK_LIST_ETHNICITY.find(x => x.value == val)?.name;
            else 
                return "";
        },
        async cancelEdit(val){
            this.showEdit = val;
            await this.getDataByID();
            if(this.formData?.DepartmentID){
                await this.getDepartmentByID(this.formData?.DepartmentID);
            }
            if(this.formData?.PositionID){
                await this.getPostionByID(this.formData?.PositionID);
            }
        },

        /**
         * Lấy phòng ban theo id
         */
         async getDepartmentByID(id){
            var res = await EmployeeAPI.getDepartmentByID(id);
            if(res && res.data.Success){
                this.department = res.data.Data;
            }
        },

        /**
         * Lấy vị trí công việc theo id
         */
         async getPostionByID(id){
            var res = await EmployeeAPI.getPositionByID(id);
            if(res && res.data.Success){
                this.positionName = res.data.Data?.PositionName;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.view-profile{
    height: 100%;
    overflow: auto;
    .back-page{
        width: 50px;
        min-width: 50px;
    }
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
<style lang="scss">
.view-profile{
    .back-page{
        .v-btn__prepend{
            margin: 0;
        }
    }
}
</style>