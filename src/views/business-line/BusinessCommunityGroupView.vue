<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('brand-card')
</script>

<template>
  <div class="community-group-container">
    <el-card shadow="never" class="page-card" :body-style="{ padding: '10px' }">

      <el-tabs v-model="activeTab" class="custom-tabs">
        <el-tab-pane label="品牌卡" name="brand-card">
          <div class="tab-content">
            <h3>品牌卡管理区域</h3>
            <p>这里用于展示和管理社区团购的品牌卡数据。</p>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="产品卡" name="product-card">
          <div class="tab-content">
            <h3>产品卡管理区域</h3>
            <p>这里用于展示和管理社区团购的产品卡数据。</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped>
.community-group-container {
  width: 100%;
}

.page-card {
  min-height: calc(100vh - 60px); /* 适应调整后的外边距 (顶部Header高60px) */
  border: none;
  border-radius: 0;
}

.card-header {
  font-weight: bold;
  font-size: 16px;
  padding: 0;
}

.tab-content {
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-top: 0;
}

.tab-content h3 {
  margin-top: 0;
  color: #303133;
}

.tab-content p {
  color: #606266;
}
</style>
