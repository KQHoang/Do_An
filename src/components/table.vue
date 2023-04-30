<template>
    <div v-if="dataApiTable.length == 0 && emptyTable">
        <v-col cols="12" class="employee-info">Chưa có dữ liệu</v-col>
    </div>
    <div v-else class="table-container" :class="{'border-table': showBorder}">
        <v-table class="main-table">
            <thead>
                <tr >
                    <th style="min-width: 40px;width: 40px; padding: 0;" v-if="showSelect">
                        <Checkbox 
                            v-model:valueCheckBox="isSelectAll"
                            @value-change="selectAllChange"
                            class="checkbox-custom"
                        />
                    </th>
                    <th v-for="item in headers" :key="item.value" :style="{'min-width': item.width + 'px'}" class="font-weight-bold text-left">
                        {{item.name}}
                    </th>
                    <th v-if="editRow || deleteRow" style="min-width: 100px;width: 100px;">
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in dataApiTable"
                    :key="item[keyTable]"
                    @dblclick="doubleClickRow(item[keyTable])"
                    >
                    <td style="padding: 0;" v-if="showSelect">
                        <!-- <Checkbox v-model:valueCheckBox="itemSelected" :value="item.id" /> -->
                        <div class="v-check-box">
                            <v-checkbox
                                v-model="itemSelected"
                                color="secondary"
                                hide-details
                                :value="item[keyTable]"
                                @click="selectBoxChange"
                            ></v-checkbox>
                        </div>
                    </td>
                    <td v-for="header in headers" :key="header.value" class="text-left"  >{{ header?.type ? convertDataToShow(header?.type, item[header.value]) : item[header.value] }}</td>
                    <td class="row-action">
                        <i v-if="editRow" @click="editFromRow(item[keyTable])" class="fa fa-pencil" aria-hidden="true" style="font-size: 20px;"></i>
                        <i v-if="deleteRow" @click="deleteFromRow(item[keyTable])" class="fa fa-trash-o" aria-hidden="true" style="font-size: 20px;color: red;"></i>
                    </td>
                </tr>
            </tbody>
        </v-table>

        <div class="table-page-number d-flex justify-space-between" v-if="showPaging">
            <div class="page-number-sum">Tổng: <span class="font-weight-bold">{{ totalRecord }}</span> bản ghi</div>
            <div class="page-number-control d-flex">
                <Selectbox 
                    :value="pagingControl.PageSize" 
                    label="Chọn số bản ghi/trang" 
                    :items="ENUMS.TABLE_PAGE_SIZE"
                    @value-change="pageSizeChange"
                    :clearable="false"
                />
                <div class="page-number">
                    <div class="font-weight-bold">{{ recordStart }} -
                        {{ dataApiTable.length }} bản ghi
                    </div>
                </div>
                <div class="page-pre-next d-flex">
                    <div class="page-left" @click="pageLeftOnClick">
                        <i class="fa fa-chevron-left" :class="{ 'opacity-2' : recordStart <= 1}"  aria-hidden="true"></i>
                    </div>
                    <div class="page-left" @click="pageRightOnClick">
                      <i class="fa fa-chevron-right" :class="{ 'opacity-2' : dataApiTable.length == totalRecord}" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Selectbox from "@/components/selectbox.vue"
import Checkbox from "./checkbox.vue"
import ENUMS from "@/enum/enums.js"
import Convert from '@/js/convert.js'
export default {
    name: "Table-v1",
    components:{
        Selectbox, 
        Checkbox
    },
    props:{
        headers:{
            type: Array, 
            default: () => {}
        }, 
        dataApiTable:{
            type: Array,
            default: () => {}
        },
        totalRecord: {
            type: Number,
            default: 0
        }, 
        pagingControl: {
            type: Object
        },
        showPaging: {
            type: Boolean, 
            default: true
        },
        showSelect:{
            type: Boolean, 
            default: true
        },
        editRow:{
            type: Boolean, 
            default: true
        },
        deleteRow:{
            type: Boolean, 
            default: true
        },
        showBorder:{
            type: Boolean, 
            default: false
        },
        keyTable:{
            type: String
        },
        emptyTable:{
            type: Boolean,
            default: true
        }
    },
    emits:['dbClickRow', 'edit', 'delete', 'page-change', ],
    data(){
        return {
            recordStart: 0,
            itemSelected: [], 
            isSelectAll: false,
            valuePageSize: 15
        }
    },
    created() {
        this.ENUMS = ENUMS;
        if(this.showPaging)
            this.recordStart = this.totalRecord == 0 ? 0 : ((this.pagingControl.PageIndex - 1) * this.pagingControl.PageSize ) + 1;
    },
    methods:{
        // PageSize thay đổi
        pageSizeChange(val){
            let pagingClone = JSON.parse(JSON.stringify(this.pagingControl));
            pagingClone.PageSize = val;
            this.$emit('page-change', pagingClone);
        },
        pageLeftOnClick(){
            if(this.recordStart > 1){
                let pagingClone = JSON.parse(JSON.stringify(this.pagingControl));
                pagingClone.PageIndex -= 1;
                this.$emit('page-change', pagingClone);
            }
        },
        pageRightOnClick(){
            if(this.dataApiTable.length != this.totalRecord){
                let pagingClone = JSON.parse(JSON.stringify(this.pagingControl));
                pagingClone.PageIndex += 1;
                this.$emit('page-change', pagingClone);
            }
        },
        itemSelectChange(val){
            console.log(val);
            if(val){
                if(!this.itemSelected.includes(val))
                    this.itemSelected.push(val);
            } else{
                this.itemSelected = this.itemSelected.filter(x => x != val);
            }
        }, 
        selectBoxChange(){
        },
        selectAllChange(val){
            if(val){
                let itemNoneSeleted = this.dataApiTable.filter(x => !this.itemSelected.includes(x[this.keyTable])).map(x => x[this.keyTable]);
                this.itemSelected.push(...itemNoneSeleted);
            }
            else{
                this.itemSelected = [];
            }
        },
        doubleClickRow(val){
            this.$emit("dbClickRow", val);                                      
        },
        editFromRow(val){
            this.$emit("edit", val);
        },
        deleteFromRow(val){
            this.$emit("delete", val);
        },
        convertDate(val){
            return Convert.formatDateToShow(val);
        },
        convertDataToShow(type, val){
            if(type == "date"){
                return Convert.formatDateToShow(val);
            }
            if(type == "gender"){
               return val ==  1 ? "Nam":"Nữ";
            }
            if(type == "contractType"){
                return val == 1 ? "Có hiệu lực" : "Hết hiệu lực";
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.table-container{
    .main-table{
        thead{
            position: sticky;
            top: 0;
            background-color: #ffffff;
            z-index: 100;
        }
        .v-table__wrapper{
            // overflow: hidden;
            height: 100%;
        }
        tbody{
            tr{
                width: 100%;
                position: relative;
                td{
                    height: 48px !important;
                }
                .row-action{
                    z-index: 10;
                    padding-left: 0;
                    display: flex;
                    position: sticky;
                    right: 0;
                    align-items: center;
                    justify-content: end;
                    .fa-trash-o{
                        padding: 15px 10px 15px 10px;
                        cursor: pointer;
                        display: none;
                    }
                    .fa-pencil{
                        padding: 15px 10px 15px 10px;
                        cursor: pointer;
                        display: none;
                    }
                }
            }
            tr:hover{
                background-color: #EFF1F6 !important;
                .row-action{
                    background-color:#EFF1F6 !important;
                    .fa{
                        display: block;
                    }
                }
            }
        }
    }
    .table-page-number{
        border-radius: 4px;
        padding: 5px 10px;
        background-color: #f5f5f0;
        .page-number-sum{
            line-height: 36px;
        }
        .page-number-control{
            .page-number{
                .font-weight-bold{
                    margin-left: 16px;
                    margin-right: 32px;
                    line-height: 36px;
                }
            }
            .page-pre-next {
                margin-top: 2px;
                .page-left{
                    cursor: pointer;
                    .fa{
                        padding: 10px;
                    }
                }
                .page-right{
                    cursor: pointer;
                    .fa{
                        padding: 10px;
                    }
                }
            }
        }
    }
}
</style>
<style lang="scss">
.table-container{
    .main-table{
        .v-table__wrapper{
            // overflow: hidden;
            height: 100%;
        }
    }
    .h-select{
        width: 90px;
        background-color: #fff;
    }
    .v-check-box{
        .checkbox-custom{
            .mdi-minus-box{
                color: #6e6e6e;
            }
        }
    }
}
</style>