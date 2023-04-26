import { createRouter, createWebHistory } from 'vue-router'
import ViewEmployee from "@/views/employee/viewEmployee.vue"
import ManageProfile from "@/views/manage-profile/manageProfile.vue"
import ViewProfileEmployee from "@/views/manage-profile/viewProfile.vue"
import AddProfileEmployee from "@/views/manage-profile/addProfileEmployee.vue"
const routes = [
    { 
        path: '/employee', 
        children:
        [
            {
                path: ':id',
                name: "ViewEmployee",
                component: ViewEmployee,
            }
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
]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})



  export default router;