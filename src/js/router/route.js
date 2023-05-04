import { createRouter, createWebHistory } from 'vue-router'
import ViewEmployee from "@/views/employee/viewEmployee.vue"
import EditEmployee from "@/views/employee/editEmployee.vue"
import ManageProfile from "@/views/manage-profile/manageProfile.vue"
import ViewProfileEmployee from "@/views/manage-profile/viewProfile.vue"
import AddProfileEmployee from "@/views/manage-profile/addProfileEmployee.vue"
import ManageDepartment from "@/views/department/department.vue"
import ManagePosition from '@/views/position/position.vue'
import ManageContract from '@/views/contract/contract.vue'
import AddContract from '@/views/contract/addAndEditContract.vue'
import manageTimeSheets from '@/views/manage-time-sheets/timeSheets.vue'
import PersonalTimeSheets from "@/views/time-sheets/timeSheets.vue"
import ManageSalary from "@/views/manage-salary/layoutTab.vue"
import SalaryEmployee from "@/views/salary/salary.vue"
const routes = [
    { 
        path: '/employee', 
        children:
        [
            {
                path: ':id',
                name: "ViewEmployee",
                component: ViewEmployee,
            },
            {
                path: ':id/edit',
                name: "EditEmployee",
                component: EditEmployee,
            },
        ]
    },
    { 
        path: '/manageProfile', 
        children:
        [
            {
                path: '',
                name: "ManageProfile",
                component: ManageProfile,
            },
            {
                path: ':id',
                name: "ViewProfileEmployee",
                component: ViewProfileEmployee,
            },
            {
                path: 'add',
                name: "AddProfileEmployee",
                component: AddProfileEmployee,
            }
        ]
    },
    {
        path: "/department",
        children:[
            {
                path: '',
                name: "ManageDepartment",
                component: ManageDepartment,
            },
        ]
    },
    {
        path: "/position",
        children:[
            {
                path: '',
                name: "ManagePosition",
                component: ManagePosition,
            },
        ]
    },
    { 
        path: '/contract', 
        children:
        [
            {
                path: '',
                name: "ManageContract",
                component: ManageContract,
            },
            {
                path: ':id/edit',
                name: "AddContractEdit",
                component: AddContract,
            },
            {
                path: 'add',
                name: "AddContract",
                component: AddContract,
            }
        ]
    },
    { 
        path: '/manageTimeSheets', 
        children:
        [
            {
                path: '',
                name: "ManageTimeSheets",
                component: manageTimeSheets,
            },
            {
                path: ':id/edit',
                name: "AddContractEdit",
                component: AddContract,
            },
            {
                path: 'add',
                name: "AddContract",
                component: AddContract,
            }
        ]
    },
    {
        path: "/timeSheets",
        children:[
            {
                path: ':id',
                name: "PersonalTimeSheets",
                component: PersonalTimeSheets,
            },
        ]
    },
    {
        path: "/manageSalary",
        children:[
            {
                path: '',
                name: "ManageSalary",
                component: ManageSalary,
            },
        ]
    },
    {
        path: "/salary",
        children:[
            {
                path: ':id',
                name: "SalaryEmployee",
                component: SalaryEmployee,
            },
        ]
    },
]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})



  export default router;