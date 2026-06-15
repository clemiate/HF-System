<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'

// 依据提供的数据结构定义接口
interface SalesLead {
  id: number
  companyName: string
  contactName: string
  role: string
  phone: string
  source: string
  businessType: string
  status: string
  nextFollowDate: string
  remark: string
}

// 搜索表单绑定的数据
const searchQuery = ref({
  companyName: '',
  status: ''
})

// 分页数据
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

// 状态选项数组，收敛冗余代码
const statusOptions = [
  '待跟进', '跟进中', '建立联系', '待报价', '试运营', '合作中', '已转化', '价格未达成', '无效线索'
]

// 搜索字段配置
const searchFields = [
  { prop: 'companyName', label: '客户名称', placeholder: '请输入公司名称', type: 'input' },
  { prop: 'status', label: '跟进状态', placeholder: '请选择状态', type: 'select', options: statusOptions }
]

// 对话框基础文本输入项配置
const formInputFields = [
  { prop: 'companyName', label: '公司名称', placeholder: '请输入公司名称' },
  { prop: 'contactName', label: '联系人', placeholder: '请输入联系人' },
  { prop: 'role', label: '职务', placeholder: '请输入职务' },
  { prop: 'phone', label: '联系电话', placeholder: '请输入联系电话' },
  { prop: 'source', label: '来源', placeholder: '请输入来源' },
  { prop: 'businessType', label: '业务类型', placeholder: '请输入业务类型' }
]

// 基础表格列配置
const tableColumns = [
  { prop: 'companyName', label: '公司名称', minWidth: '120', tooltip: true },
  { prop: 'contactName', label: '联系人', width: '90' },
  { prop: 'role', label: '职务', width: '100' },
  { prop: 'phone', label: '联系电话', width: '120' },
  { prop: 'source', label: '来源', width: '100' },
  { prop: 'businessType', label: '业务类型', width: '100' }
]

// 模拟表格数据
const tableData = ref<SalesLead[]>([])

// 获取列表数据
const fetchLeads = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/sales-leads', {
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        companyName: searchQuery.value.companyName,
        status: searchQuery.value.status
      }
    })
    if (res.data.code === 200) {
      tableData.value = res.data.data.list
      total.value = res.data.data.total
    }
  } catch (error) {
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

// 查询与重置
const handleSearch = () => {
  currentPage.value = 1
  fetchLeads()
}
const handleReset = () => {
  searchQuery.value = { companyName: '', status: '' }
  currentPage.value = 1
  fetchLeads()
}

// 分页事件
const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchLeads()
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchLeads()
}

// 状态标签颜色映射
const getStatusType = (status: string) => {
  const map: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'info'> = {
    '待跟进': 'warning',
    '跟进中': 'primary',
    '已转化': 'success',
    '无效线索': 'info',
    '合作中': 'success',
    '试运营': 'warning',
    '价格未达成': 'danger',
    '待报价': 'warning',
    '建立联系': 'primary'
  }
  return map[status] || 'info'
}

// 表单相关
const dialogVisible = ref(false)
const dialogType = ref<'add' | 'edit'>('add')
const formRef = ref<FormInstance>()
const formConfig = reactive<Omit<SalesLead, 'id'> & { id?: number }>({
  companyName: '',
  contactName: '',
  role: '',
  phone: '',
  source: '',
  businessType: '',
  status: '待跟进',
  nextFollowDate: '',
  remark: ''
})

const rules = reactive<FormRules>({
  contactName: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
})

const handleAdd = () => {
  dialogType.value = 'add'
  dialogVisible.value = true
  if (formRef.value) formRef.value.resetFields()
  Object.assign(formConfig, {
    id: undefined,
    companyName: '',
    contactName: '',
    role: '',
    phone: '',
    source: '',
    businessType: '',
    status: '待跟进',
    nextFollowDate: '',
    remark: ''
  })
}

const handleEdit = (row: SalesLead) => {
  dialogType.value = 'edit'
  dialogVisible.value = true
  Object.assign(formConfig, row)
}

const submitForm = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (dialogType.value === 'add') {
          const res = await axios.post('/api/sales-leads', formConfig)
          if (res.data.code === 200) {
            ElMessage.success('新增成功')
          }
        } else {
          const res = await axios.put(`/api/sales-leads/${formConfig.id}`, formConfig)
          if (res.data.code === 200) {
            ElMessage.success('更新成功')
          }
        }
        dialogVisible.value = false
        fetchLeads()
      } catch (error) {
        ElMessage.error(dialogType.value === 'add' ? '新增失败' : '更新失败')
      }
    }
  })
}

const handleDelete = (row: SalesLead) => {
  ElMessageBox.confirm(
    `确认删除联系人 "${row.contactName}" 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      const res = await axios.delete(`/api/sales-leads/${row.id}`)
      if (res.data.code === 200) {
        ElMessage.success('删除成功')
        // 如果当前页只有一条数据，删除后回到上一页
        if (tableData.value.length === 1 && currentPage.value > 1) {
          currentPage.value--
        }
        fetchLeads()
      }
    } catch (error) {
      ElMessage.error('删除失败')
    }
  }).catch(() => {
    // 取消删除
  })
}

onMounted(() => {
  fetchLeads()
})
</script>

<template>
  <div class="sales-leads-container">
    <el-card class="box-card" shadow="never">
      <!-- 搜索与操作区域 -->
      <div class="header-actions">
        <el-form :inline="true" :model="searchQuery" class="search-form">
          <el-form-item v-for="field in searchFields" :key="field.prop" :label="field.label">
            <el-input v-if="field.type === 'input'" v-model="(searchQuery as any)[field.prop]" :placeholder="field.placeholder" clearable />
            <el-select v-else-if="field.type === 'select'" v-model="(searchQuery as any)[field.prop]" :placeholder="field.placeholder" clearable style="width: 150px">
              <el-option v-for="opt in field.options" :key="opt" :label="opt" :value="opt" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
        
        <div class="action-buttons">
          <el-button type="primary" :icon="Plus" @click="handleAdd">新增线索</el-button>
        </div>
      </div>

      <!-- 数据表格 -->
      <el-table v-loading="loading" :data="tableData" style="width: 100%" border stripe>
        <el-table-column prop="id" label="ID" width="60" align="center" />
        <el-table-column
          v-for="col in tableColumns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :min-width="col.minWidth"
          :show-overflow-tooltip="col.tooltip"
        />
        <el-table-column prop="status" label="状态" width="90" align="center">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="nextFollowDate" label="下次跟进日期" width="120" align="center" />
        <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
        <el-table-column label="操作" width="150" fixed="right" align="center">
          <template #default="scope">
            <el-button size="small" type="primary" link :icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" link :icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增销售线索' : '编辑销售线索'"
      width="600px"
      destroy-on-close
    >
      <el-form :model="formConfig" :rules="rules" ref="formRef" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12" v-for="field in formInputFields" :key="field.prop">
            <el-form-item :label="field.label" :prop="field.prop">
              <el-input v-model="(formConfig as any)[field.prop]" :placeholder="field.placeholder" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="formConfig.status" placeholder="请选择状态" style="width: 100%">
                <el-option v-for="status in statusOptions" :key="status" :label="status" :value="status" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下期跟进" prop="nextFollowDate">
              <el-date-picker
                v-model="formConfig.nextFollowDate"
                type="date"
                placeholder="选择日期"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formConfig.remark" type="textarea" :rows="3" placeholder="请输入备注信息" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.sales-leads-container {
  padding: 20px;
}
.box-card {
  width: 100%;
  border-radius: 8px;
}
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.search-form {
  flex: 1;
}
.action-buttons {
  margin-left: 20px;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
