<script setup lang="ts">
import { Bottom } from '@element-plus/icons-vue'

// 定义业务流程数据
const flowData = [
  { label: '节日零售', category: 'product', desc: '各类节日花束零售' },
  { label: '社区团购', category: 'client', desc: '社区集中采购' },
  { label: '企业花艺', category: 'network', desc: '企业周花、前台桌花等' },
  { label: '区域配送', category: 'system', desc: '高效同城配送网络' }
]

// 依据类别获取背景色
const getBgColor = (category: string) => {
  const colorMap: Record<string, string> = {
    product: '#ecf5ff',  // 蓝色系
    client: '#f0f9eb',   // 绿色系
    network: '#fdf6ec',  // 橙色系
    system: '#fef0f0'    // 红色系
  }
  return colorMap[category] || '#f4f4f5'
}

// 依据类别获取边框色
const getBorderColor = (category: string) => {
  const colorMap: Record<string, string> = {
    product: '#b3d8ff',
    client: '#c2e7b0',
    network: '#f5dab1',
    system: '#fbc4c4'
  }
  return colorMap[category] || '#e9e9eb'
}

// 依据类别获取文字色
const getTextColor = (category: string) => {
  const colorMap: Record<string, string> = {
    product: '#409EFF',
    client: '#67C23A',
    network: '#E6A23C',
    system: '#F56C6C'
  }
  return colorMap[category] || '#909399'
}
</script>

<template>
  <div class="home-container">
    <el-card class="flow-card" shadow="never">
      <template #header>
        <div class="card-header">
          <h3 class="title">卉枫业务生态流转图</h3>
          <span class="subtitle">B2B业务全链路概览</span>
        </div>
      </template>
      
      <div class="flow-wrapper">
        <div v-for="(item, index) in flowData" :key="index" class="flow-item">
          <!-- 节点卡片 -->
          <div 
            class="node-box"
            :style="{ 
              backgroundColor: getBgColor(item.category),
              borderColor: getBorderColor(item.category),
              color: getTextColor(item.category)
            }"
          >
            <div class="node-label">{{ item.label }}</div>
            <div class="node-desc">{{ item.desc }}</div>
          </div>
          
          <!-- 箭头 (最后一个节点不显示箭头) -->
          <div v-if="index < flowData.length - 1" class="arrow-box">
            <el-icon class="arrow-icon" :style="{ color: '#c0c4cc' }"><Bottom /></el-icon>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 40px; /* 底部留白 */
}

.flow-card {
  width: 100%;
  max-width: 800px;
  border-radius: 12px;
  background-color: #fff;
}

.card-header {
  text-align: center;
}

.title {
  margin: 0;
  font-size: 22px;
  color: #303133;
}

.subtitle {
  font-size: 14px;
  color: #909399;
  margin-top: 5px;
  display: inline-block;
}

.flow-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.flow-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.node-box {
  width: 280px;
  padding: 15px 20px;
  border-radius: 8px;
  border: 2px solid;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  cursor: default;
  position: relative;
}

.node-box:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.node-label {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  letter-spacing: 1px;
}

.node-desc {
  font-size: 12px;
  opacity: 0.85;
}

.arrow-box {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon {
  font-size: 28px;
  animation: floatDown 1.5s ease-in-out infinite;
}

/* 箭头浮动动画 */
@keyframes floatDown {
  0% {
    transform: translateY(-4px);
    opacity: 0.4;
  }
  50% {
    transform: translateY(4px);
    opacity: 1;
  }
  100% {
    transform: translateY(-4px);
    opacity: 0.4;
  }
}
</style>
