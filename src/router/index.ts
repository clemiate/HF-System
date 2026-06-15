import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首页',
      component: HomeView
    },
    {
      path: '/sales-leads',
      name: '销售线索',
      component: () => import('../views/sales-leads/SalesLeadsView.vue')
    },
    {
      path: '/customer',
      name: '客户管理',
      component: () => import('../views/customer/CustomerView.vue')
    },
    /* {
      path: '/order',
      name: '订单管理',
      component: () => import('../views/order/OrderView.vue')
    }, */
    {
      path: '/product',
      name: '产品卡',
      component: () => import('../views/product/ProductView.vue')
    },
    {
      path: '/purchase',
      name: '采购管理',
      component: () => import('../views/purchase/PurchaseView.vue')
    },
    {
      path: '/supplier',
      name: '供应商管理',
      component: () => import('../views/supplier/SupplierView.vue')
    },
    /* {
      path: '/inventory',
      name: '库存管理',
      component: () => import('../views/inventory/InventoryView.vue')
    }, */
    {
      path: '/business-line',
      name: '业务线管理',
      component: () => import('../views/business-line/BusinessLineView.vue'),
      redirect: '/business-line/community-group', // 默认重定向到第一个子菜单
      children: [
        {
          path: 'community-group',
          name: '社区团购',
          component: () => import('../views/business-line/BusinessCommunityGroupView.vue')
        },
        {
          path: 'enterprise-floral',
          name: '企业花艺',
          component: () => import('../views/business-line/BusinessEnterpriseFloralView.vue')
        },
        {
          path: 'regional-delivery',
          name: '区域配送',
          component: () => import('../views/business-line/BusinessRegionalDeliveryView.vue')
        },
        {
          path: 'floral-activity',
          name: '花艺活动',
          component: () => import('../views/business-line/BusinessFloralActivityView.vue'),
          redirect: '/business-line/floral-activity/salon',
          children: [
            {
              path: 'salon',
              name: '插花沙龙',
              component: () => import('../views/business-line/BusinessFloralSalonView.vue')
            },
            {
              path: 'parent-child',
              name: '亲子活动',
              component: () => import('../views/business-line/BusinessFloralParentChildView.vue')
            },
            {
              path: 'corporate',
              name: '企业活动',
              component: () => import('../views/business-line/BusinessFloralCorporateView.vue')
            },
            {
              path: 'community',
              name: '社区活动',
              component: () => import('../views/business-line/BusinessFloralCommunityView.vue')
            },
            {
              path: 'festival',
              name: '节庆活动',
              component: () => import('../views/business-line/BusinessFloralFestivalView.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/management',
      name: '系统管理',
      component: () => import('../views/management/ManagementView.vue')
    }
  ]
})

export default router
