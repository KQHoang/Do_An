import { createRouter, createWebHistory } from 'vue-router'
import ViewEmployee from "@/views/employee/viewEmployee.vue"
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
]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})



  export default router;