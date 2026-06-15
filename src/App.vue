<script setup lang="ts">
import { RouterView } from 'vue-router'
import {
  HomeFilled,
  User,
  Tickets,
  Goods,
  ShoppingCart,
  Van,
  Box,
  PriceTag,
  Setting
} from '@element-plus/icons-vue'

// 菜单配置数据，便于集中管理和扩展
const menuList = [
  { path: '/', name: '首页', icon: HomeFilled },
  { path: '/sales-leads', name: '销售线索', icon: Tickets },
  { path: '/customer', name: '客户管理', icon: User },
  { path: '/product', name: '产品卡', icon: Goods },
  { path: '/supplier', name: '供应商管理', icon: Van },
  { path: '/purchase', name: '采购管理', icon: ShoppingCart },
  { 
    path: '/business-line', 
    name: '业务线管理', 
    icon: PriceTag,
    children: [
      { path: '/business-line/community-group', name: '社区团购' },
      { path: '/business-line/enterprise-floral', name: '企业花艺' },
      { path: '/business-line/regional-delivery', name: '区域配送' },
      { 
        path: '/business-line/floral-activity', 
        name: '花艺活动',
        children: [
          { path: '/business-line/floral-activity/salon', name: '插花沙龙' },
          { path: '/business-line/floral-activity/parent-child', name: '亲子活动' },
          { path: '/business-line/floral-activity/corporate', name: '企业活动' },
          { path: '/business-line/floral-activity/community', name: '社区活动' },
          { path: '/business-line/floral-activity/festival', name: '节庆活动' }
        ]
      }
    ]
  },
  { path: '/management', name: '系统管理', icon: Setting }
]
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="aside">
      <div class="logo-container">
        <img class="sys-logo" src="@/assets/logo/logo.jpg" alt="logo" />
        <h2 class="sys-title">卉枫业务系统</h2>
      </div>
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <template v-for="item in menuList" :key="item.path">
          <!-- 有子菜单的情况 -->
          <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
            <template #title>
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item 
              v-for="subItem in item.children" 
              :key="subItem.path" 
              :index="subItem.path"
            >
              {{ subItem.name }}
            </el-menu-item>
          </el-sub-menu>

          <!-- 无子菜单的情况 -->
          <el-menu-item v-else :index="item.path">
            <el-icon><component :is="item.icon" /></el-icon>
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="header-content">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" v-show="item.name !== '首页'">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-header>
      
      <el-main class="main-content">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
}

.aside {
  background-color: #304156;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b3643;
}

.sys-title {
  color: #fff;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
}

.sys-logo {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-radius: 50%; /* 让方形背景的图片变成圆形的，更好看 */
  object-fit: cover;
}

.el-menu-vertical {
  border-right: none;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
}

.main-content {
  background-color: #f0f2f5;
  padding: 0; /* 取消所有内边距 */
}
</style>
