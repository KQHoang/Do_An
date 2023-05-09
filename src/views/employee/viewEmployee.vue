<template>
    <Loading v-if="showLoading"/>
    <ToastMessage title="" :text="textMessage" :typeAlert="typeMessage" :max-width="300" v-if="showMessage"/>
    <PopUpDelete v-if="showConfirmDelete" content="Bạn có chắn chắn muốn xoá thông tin này?"
        @action-cancel="cancelDelete" @action-done="deleteFromRow"
    />
    <div class="employee" v-if="!editMode">
        <v-row class="employee-header-info justify-space-between d-flex align-center">
            <v-col >
                <v-row class="employee-name-and-code align-center">
                    <div class="employee-name">
                        {{ formDataEmployee.FullName }}
                    </div>
                    <div class="employee-code">
                        ({{ formDataEmployee.EmployeeCode }})
                    </div>
                    <i class="fa fa-check d-flex align-center justify-center" aria-hidden="true"></i>
                </v-row>
                <v-row>
                    <span>{{ positionName }} - {{ department.DepartmentName }}</span>
                </v-row>
            </v-col>
            <v-col class="text-right">
                <Button
                    text="Cập nhật thông tin"
                    color="#E8EAEF"
                    @click="handelShowEdit"
                >
                    <template v-slot:prepend>
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </template>
                </Button>
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
                        <v-col cols="7" class="employee-info">{{ formDataEmployee.EmployeeCode }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">MST cá nhân</v-col>
                        <v-col cols="7" class="employee-info">{{ formDataEmployee.TaxCode }}</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Họ và tên</v-col>
                        <v-col cols="7" class="employee-info">{{ formDataEmployee.FullName }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Dân tộc</v-col>
                        <v-col cols="7" class="employee-info">{{ getEthnicityName(formDataEmployee.EthnicityID) }}</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Ngày sinh</v-col>
                        <v-col cols="7" class="employee-info">{{ convertDate(formDataEmployee.DateOfBirth) }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Giới tính</v-col>
                        <v-col cols="7" class="employee-info">{{ formDataEmployee.GenderID == 1 ? "Nam" : "Nữ" }}</v-col>
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
                        <v-col cols="7" class="employee-info">{{ formDataEmployee.IdentifyType == 1 ? "CCCD" : "CMND" }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Ngày cấp (CMND/CCCD)</v-col>
                        <v-col cols="7" class="employee-info">{{ convertDate(formDataEmployee.IdentifyDate) }}</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Số CMND/CCCD</v-col>
                        <v-col cols="7" class="employee-info">{{ formDataEmployee.IdentifyNumber }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Nơi cấp (CMND/CCCD)</v-col>
                        <v-col cols="7" class="employee-info"
                            :title="formDataEmployee.IdentifyIssuedPlaceName"
                        >{{ formDataEmployee.IdentifyIssuedPlaceName }}</v-col>
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
                        <v-col cols="5" class="label">ĐT di động
                    </v-col>
                        <v-col cols="7" class="employee-info">{{ formDataEmployee.PhoneNumber }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Email cá nhân</v-col>
                        <v-col cols="7" class="employee-info">{{ formDataEmployee.Email }}</v-col>
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
                        <v-col cols="7" class="employee-info">{{ formDataEmployee.ProvinceName }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Phường/Xã</v-col>
                        <v-col cols="7" class="employee-info">{{ formDataEmployee.WardsName }}</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Quận/Huyện</v-col>
                        <v-col cols="7" class="employee-info">{{ formDataEmployee.DistrictName }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Số nhà, đường phố</v-col>
                        <v-col cols="7" class="employee-info">{{ formDataEmployee.StreetAddress }}</v-col>
                    </v-col>
                </div>

                <div class="title m-t-60">
                    Thông tin công việc
                </div>
                <div class="v-row m-t-24">
                    <span class="text-child">
                        Thông tin nhân viên
                    </span>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Đơn vị công tác</v-col>
                        <v-col cols="7" class="employee-info">{{ department.DepartmentName }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Địa điểm làm việc</v-col>
                        <v-col cols="7" class="employee-info">{{ department.Address }}</v-col>
                    </v-col>
                </div>
                <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Vị trí công việc</v-col>
                        <v-col cols="7" class="employee-info">{{ positionName }}</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Quản lý trực tiếp</v-col>
                        <v-col cols="7" class="employee-info">Hợp đồng xác định thời hạn</v-col>
                    </v-col>
                </div>
                <!-- <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Vị trí công việc</v-col>
                        <v-col cols="7" class="employee-info">Lập trình viên</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Quản lý trực tiếp</v-col>
                        <v-col cols="7" class="employee-info">Hợp đồng xác định thời hạn</v-col>
                    </v-col>
                </div> -->
                <!-- <div class="v-row m-t-8 m-b-24">
                    <v-col class="label-info d-flex align-center m-r-60" cols="5">
                        <v-col cols="5" class="label">Lương cơ bản</v-col>
                        <v-col cols="7" class="employee-info">5.050.000 VND</v-col>
                    </v-col>
                    <v-col class="label-info d-flex align-center" cols="5">
                        <v-col cols="5" class="label">Lương đóng BH</v-col>
                        <v-col cols="7" class="employee-info">5.050.000 VND</v-col>
                    </v-col>
                </div> -->
                <div class="d-flex  m-t-60 m-b-24 align-center justify-space-between">
                    <div class="title">
                        Thông tin gia đình
    
                        <Button @click="handleShowRelationship">
                            <template v-slot:prepend>
                                <i class="fa fa-chevron-down" aria-hidden="true"></i>
                            </template>
                        </Button>
                    </div>
                    <Button
                        text="Thêm mới"
                        color="#4095F5"
                        class="text-white"
                        @click="addEditRelationship"
                    >
                        <template v-slot:prepend>
                            <i class="fa fa-plus" style="color: white" aria-hidden="true"></i>
                        </template>
                    </Button>
                </div>
                <Table v-show="showTableRelationship" :dataApiTable="dataRelationship" :headers="HEADERR_TABLE.RELATION_SHIP" :showPaging="false"
                    :showSelect="false"  @edit="editFromRow"
                    @delete="confirmDeleteFromRow" :showBorder="true"
                    keyTable="RelationShipID"
                />

                <div class="title m-t-60 m-b-24">
                    Hợp đồng lao động

                    <Button @click="handleShowContract">
                        <template v-slot:prepend>
                            <i class="fa fa-chevron-down" aria-hidden="true"></i>
                        </template>
                    </Button>
                </div>
                <Table v-show="showTableContract" :dataApiTable="dataContract" :headers="HEADERR_TABLE.CONTRACT" :showPaging="false"
                    :showSelect="false" :editRow="false" :deleteRow="false" :showBorder="true" keyTable="ContractID"
                />

                <div class="title m-t-60 m-b-24">
                    Lịch sử lương

                    <Button @click="handleShowHistorySalary">
                        <template v-slot:prepend>
                            <i class="fa fa-chevron-down" aria-hidden="true"></i>
                        </template>
                    </Button>
                </div>
                <Table v-show="showTableSalary" :dataApiTable="dataSalary" :headers="HEADERR_TABLE.MANAGE_SALARY" :showPaging="false"
                    :showSelect="false" :editRow="false" :deleteRow="false" :showBorder="true"
                />
            </div> 
        </v-row>  
    </div>
    <EditEmployee v-if="editMode" @cancelEdit="this.editMode = $event"/>
    <add-edit-relation
        v-if="showAddEditRelation"
        @action-done="doneAddEditRelation"
        @action-cancel="cancelAddEditRelation"
        :mode="modeRelation"
        :formEdit="formEdit"
    />
</template>

<script>
import button from '@/components/button.vue';
import table from "@/components/table.vue";
import EmployeeEdit from "@/views/employee/editEmployee.vue";
import EmployeeAPI from "@/js/api/employee.js"
import RelationshipAPI from "@/js/api/relationShipAPI.js"
import ENUMS from "@/enum/enums.js"
import HEADERR_TABLE from "@/js/header-table.js"
import Convert from "@/js/convert.js"
import AddAndEditRelationship from '@/views/Relationship/addAndEdit.vue'
// import loading from "@/components/loading.vue"
export default{
    name: "ViewEmployee",
    components:{
        Button: button, 
        Table: table, 
        EditEmployee: EmployeeEdit,
        'add-edit-relation': AddAndEditRelationship
        // Loading: loading
    }, 
    data(){
        return{
            a: "úi",
            editMode: null,
            showLoading: false,
            headers: [
                {
                    value: "FullName",
                    name: "Họ và tên"
                },
                {
                    value: "Gender",
                    name: "Giới tính"
                }, 
                {
                    value: "DateOfBirth",
                    name: "Ngày sinh"
                }, 
                {
                    value: "Ethnicity",
                    name: "Dân tộc"
                }, 
                {
                    value: "PhoneNumber",
                    name: "Số điện thoại liên hệ"
                }
            ],
            dataApiTable:[
                {
                    id: 1,
                    FullName: "Khuất Quang Hoàng", 
                    Gender: "Nam",
                    DateOfBirth: "24/01/2002",
                    Ethnicity: "Kinh",
                    PhoneNumber: "0984868532"
                }
            ], 
            formDataEmployee: {},
            id: null,
            positionName: null,
            department: {},
            dataContract: [], // dữ liệu bảng hợp đồng
            showTableContract: false,
            dataRelationship: [], // dữ liệu bảng thông tin gia đình
            showTableRelationship: false,
            dataSalary: [], // dữ liệu bảng lịch sử lương
            showTableSalary: false,
            modeRelation: 0,
            showAddEditRelation: false,
            formEdit: {}, 
            textMessage: null,
            typeMessage: null,
            showMessage: false, 
            showConfirmDelete: false, 
            idDelete: null

        }
    },
    async created(){
        this.showLoading = true;
        this.ENUMS = ENUMS;
        this.HEADERR_TABLE = HEADERR_TABLE;
        if(this.$route.params?.id){
            this.id = this.$route.params?.id;
        }
        await this.getEmployeeByID();
        if(this.formDataEmployee?.DepartmentID){
            await this.getDepartmentByID(this.formDataEmployee?.DepartmentID);
        }
        if(this.formDataEmployee?.PositionID){
            await this.getPostionByID(this.formDataEmployee?.PositionID);
        }
        setTimeout(() => {
            this.showLoading = false;
        }, 500);
    },
    methods:{
        handelShowEdit(){
            this.$router.push({ name: 'EditEmployee', params: { id: '1' }} );
        },

        /**
         * Lấy thông tin nhân viên
         */
        async getEmployeeByID(){
            var res = await EmployeeAPI.getEmployee(this.id);
            if(res && res.data.Success){
                this.formDataEmployee = res.data.Data;
            }
        },

        /**
         * Lấy tên dân tộc
         */
        getEthnicityName(val){
            if(val)
                return ENUMS.PICK_LIST_ETHNICITY.find(x => x.value == val)?.name;
            else 
                return "";
        },

        /**
         * Convert ngày hiển thị
         */
        convertDate(val){
            return Convert.formatDateToShow(val);
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
         * Hiển thị hợp đồng
         */
        async handleShowContract(){
            if(!this.showTableContract){
                this.showTableContract = true
                var res = await EmployeeAPI.getContactByEmployeeID(this.id)
                if(res && res.data.Success){
                    this.dataContract = res.data.Data;
                }
            }
        },

        /**
         * Hiển thị lương
         */
         async handleShowHistorySalary(){
            if(!this.showTableSalary){
                this.showTableSalary = true
                var res = await EmployeeAPI.getSalaryByEmployeeID(this.id)
                if(res && res.data.Success){
                    this.dataSalary = res.data.Data;
                }
            }
        },
        /**
         * Hiển thị lương
         */
         async handleShowRelationship(){
            if(!this.showTableRelationship){
                this.showTableRelationship = true
                var res = await EmployeeAPI.getRelarionshipByEmployeeID(this.id)
                if(res && res.data.Success){
                    this.dataRelationship = res.data.Data;
                }
            }
        },

        async addEditRelationship(){
            await this.handleShowRelationship();
            this.modeRelation = ENUMS.ACTION_TYPE[2].value;
            this.showAddEditRelation = true;
        },

        cancelAddEditRelation(){
            this.showAddEditRelation = false;
        },

        async doneAddEditRelation(val){
            this.showAddEditRelation = false;
            if(!val){
                this.typeMessage = "error";
                this.textMessage = "Có lỗi xảy ra";
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false;
                }, 2000);
            }
            else
            {
                this.showMessage = true;
                if(this.modeRelation == ENUMS.ACTION_TYPE[2].value){
                    this.typeMessage = "success";
                    this.textMessage = "Thêm thông tin gia đình thành công";
                }
                else{
                    this.typeMessage = "success";
                    this.textMessage = "Sửa thông tin gia đình thành công";
                }
                setTimeout(() => {
                    this.showMessage = false;
                }, 2000);
                var res = await EmployeeAPI.getRelarionshipByEmployeeID(this.id)
                if(res && res.data.Success){
                    this.dataRelationship = res.data.Data;
                }
            }
        },

        editFromRow(val){
            this.formEdit = this.dataRelationship.find(x => x.RelationShipID == val);
            this.modeRelation = ENUMS.ACTION_TYPE[0].value;
            this.showAddEditRelation = true;
        },

        cancelDelete(){
            this.showConfirmDelete = false;
        },
        confirmDeleteFromRow(val){
            this.idDelete = val;
            this.showConfirmDelete = true;
        },

       async deleteFromRow(){
            this.showConfirmDelete = false;
            if(this.idDelete){
                var res = await RelationshipAPI.deleteRelationShip(this.idDelete);
                if(res && res.data.Success){
                    this.showMessage = true;
                    this.typeMessage = "success";
                    this.textMessage = "Xoá thông tin gia đình thành công";
                    setTimeout(() => {
                        this.showMessage = false;
                    }, 2000);
                    var resGet = await EmployeeAPI.getRelarionshipByEmployeeID(this.id)
                    if(resGet && resGet.data.Success){
                        this.dataRelationship = resGet.data.Data;
                    }
                }
                else {
                    this.showMessage = true;
                    this.typeMessage = "error";
                    this.textMessage = "Có lỗi xảy ra!";
                    setTimeout(() => {
                        this.showMessage = false;
                    }, 2000);
                }
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.employee{
    height: 100%;
    overflow: hidden;
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
            height: calc(100% - 75px);
            overflow: auto;
            border-radius: 4px;
            margin-top: 12px !important;
        .employee-main-info{
            padding: 24px;
            width: 100%;
            border-radius: 4px;
            background-color: #ffffff;
        }
    }
}
</style>
