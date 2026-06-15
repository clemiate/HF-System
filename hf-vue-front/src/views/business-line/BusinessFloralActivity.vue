<template>
  <div class="floral-activity-wrapper">
    <el-card class="box-card" shadow="never">
      <el-tabs v-model="activeTab" class="demo-tabs" @tab-change="handleTabChange">
        <el-tab-pane label="插花沙龙" name="salon">
          <router-view v-if="activeTab === 'salon'" />
        </el-tab-pane>
        <el-tab-pane label="社区活动" name="community">
          <router-view v-if="activeTab === 'community'" />
        </el-tab-pane>
        <el-tab-pane label="亲子活动" name="parent-child">
          <router-view v-if="activeTab === 'parent-child'" />
        </el-tab-pane>
        <el-tab-pane label="企业活动" name="corporate">
          <router-view v-if="activeTab === 'corporate'" />
        </el-tab-pane>
        <el-tab-pane label="节庆活动" name="festival">
          <router-view v-if="activeTab === 'festival'" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Initialize active tab based on current route
const getTabFromRoute = () => {
  const pathParts = route.path.split('/')
  const lastPart = pathParts[pathParts.length - 1]
  if (['salon', 'community', 'parent-child', 'corporate', 'festival'].includes(lastPart)) {
    return lastPart
  }
  return 'salon' // default fallback
}

const activeTab = ref(getTabFromRoute())

// Watch for route changes to update the active tab
watch(() => route.path, () => {
  activeTab.value = getTabFromRoute()
})

const handleTabChange = (tabName: string) => {
  router.push(`/hf/business-line/floral-activity/${tabName}`)
}
</script>

<style scoped>
.floral-activity-wrapper {
  padding: 20px;
  height: 100%;
}
.box-card {
  width: 100%;
  border-radius: 8px;
  min-height: 500px;
}
.demo-tabs {
  margin-top: 10px;
}
</style>
