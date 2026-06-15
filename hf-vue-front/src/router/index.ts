import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
      path: '/hf/sales-leads',
      name: '销售线索',
      component: () => import('../views/sales-leads/SalesLeads.vue')
    },
    {
      path: '/hf/customer',
      name: '客户管理',
      component: () => import('../views/customer/Customer.vue')
    },
    /* {
      path: '/hf/order',
      name: '订单管理',
      component: () => import('../views/order/Order.vue')
    }, */
    {
      path: '/hf/product',
      name: '产品卡',
      component: () => import('../views/product/Product.vue')
    },
    {
      path: '/hf/purchase',
      name: '采购管理',
      component: () => import('../views/purchase/Purchase.vue')
    },
    {
      path: '/hf/supplier',
      name: '供应商管理',
      component: () => import('../views/supplier/Supplier.vue')
    },
    /* {
      path: '/hf/inventory',
      name: '库存管理',
      component: () => import('../views/inventory/Inventory.vue')
    }, */
    {
      path: '/hf/business-line',
      name: '业务线管理',
      component: () => import('../views/business-line/BusinessLine.vue'),
      redirect: '/hf/business-line/community-group', // 默认重定向到第一个子菜单
      children: [
        {
          path: 'community-group',
          name: '社区团购',
          component: () => import('../views/business-line/BusinessCommunityGroup.vue')
        },
        {
          path: 'enterprise-floral',
          name: '企业花艺',
          component: () => import('../views/business-line/BusinessEnterpriseFloral.vue')
        },
        {
          path: 'regional-delivery',
          name: '区域配送',
          component: () => import('../views/business-line/BusinessRegionalDelivery.vue')
        },
        {
          path: 'floral-activity',
          name: '花艺活动',
          component: () => import('../views/business-line/BusinessFloralActivity.vue'),
          redirect: '/hf/business-line/floral-activity/community',
          children: [
            {
              path: 'salon',
              name: '插花沙龙',
              component: () => import('../views/business-line/BusinessFloralCommunity.vue') // 由于移除了Salon文件，暂时复用CommunityView作占位，防止编译报错
            },
            {
              path: 'parent-child',
              name: '亲子活动',
              component: () => import('../views/business-line/BusinessFloralParentChild.vue')
            },
            {
              path: 'corporate',
              name: '企业活动',
              component: () => import('../views/business-line/BusinessFloralCorporate.vue')
            },
            {
              path: 'community',
              name: '社区活动',
              component: () => import('../views/business-line/BusinessFloralCommunity.vue')
            },
            {
              path: 'festival',
              name: '节庆活动',
              component: () => import('../views/business-line/BusinessFloralFestival.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/management',
      name: '系统管理',
      component: () => import('../views/management/Management.vue')
    }
  ]
})

export default router
