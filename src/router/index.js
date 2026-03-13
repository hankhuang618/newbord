import { createRouter, createWebHistory } from 'vue-router';
import RealtimeBoardView from '../views/RealtimeBoardView.vue';
import WorkOrderManageView from '../views/WorkOrderManageView.vue';
import StaffManageView from '../views/StaffManageView.vue';
import FqcManageView from '../views/FqcManageView.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: RealtimeBoardView },
    { path: '/workorder', component: WorkOrderManageView },
    { path: '/staff', component: StaffManageView },
    { path: '/fqc', component: FqcManageView },
  ],
});
