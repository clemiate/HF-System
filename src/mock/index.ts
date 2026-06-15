import Mock from 'mockjs';

// 初始化数据
let leadsList = [
  {
    id: 1,
    companyName: "XX科技",
    contactName: "张女士",
    role: "行政经理",
    phone: "13800138000",
    source: "写字楼",
    businessType: "企业花艺",
    status: "待跟进",
    nextFollowDate: "2025-06-20",
    remark: "前台有桌花，每周更换"
  },
  {
    id: 2,
    companyName: "YY智造",
    contactName: "王先生",
    role: "采购总监",
    phone: "13912345678",
    source: "熟人介绍",
    businessType: "节日零售",
    status: "已转化",
    nextFollowDate: "-",
    remark: "三八妇女节采购了50份花束"
  },
  {
    id: 3,
    companyName: "",
    contactName: "社区群主",
    role: "",
    phone: "",
    source: "社区",
    businessType: "",
    status: "合作中",
    nextFollowDate: "-",
    remark: "L001"
  },
  {
    id: 4,
    companyName: "",
    contactName: "纹眉店老板",
    role: "",
    phone: "",
    source: "异业合作",
    businessType: "",
    status: "试运营",
    nextFollowDate: "-",
    remark: "L002"
  },
  {
    id: 5,
    companyName: "",
    contactName: "咖啡店老板",
    role: "",
    phone: "",
    source: "闲鱼",
    businessType: "",
    status: "价格未达成",
    nextFollowDate: "-",
    remark: "L003 对方希望15元长期采购"
  },
  {
    id: 6,
    companyName: "",
    contactName: "幼儿园毕业花束咨询",
    role: "",
    phone: "",
    source: "闲鱼",
    businessType: "",
    status: "待报价",
    nextFollowDate: "-",
    remark: "L004"
  },
  {
    id: 7,
    companyName: "",
    contactName: "花艺活动组织人",
    role: "",
    phone: "",
    source: "沙龙",
    businessType: "",
    status: "建立联系",
    nextFollowDate: "-",
    remark: "L005"
  }
];

// 获取列表 (支持分页和搜索)
Mock.mock(RegExp('/api/sales-leads\\?.*'), 'get', (options: any) => {
  const url = new URL(options.url, 'http://localhost');
  const page = parseInt(url.searchParams.get('page') || '1');
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
  const companyName = url.searchParams.get('companyName') || '';
  const status = url.searchParams.get('status') || '';

  let filteredList = leadsList.filter(item => {
    let match = true;
    if (companyName && !item.companyName.includes(companyName) && !item.contactName.includes(companyName)) {
      match = false;
    }
    if (status && item.status !== status) {
      match = false;
    }
    return match;
  });

  const total = filteredList.length;
  const list = filteredList.slice((page - 1) * pageSize, page * pageSize);

  return {
    code: 200,
    message: 'success',
    data: {
      total,
      list
    }
  };
});

// 新增线索
Mock.mock('/api/sales-leads', 'post', (options: any) => {
  const body = JSON.parse(options.body);
  const newLead = {
    id: leadsList.length > 0 ? Math.max(...leadsList.map(l => l.id)) + 1 : 1,
    ...body
  };
  leadsList.unshift(newLead);
  return {
    code: 200,
    message: '新增成功',
    data: newLead
  };
});

// 更新线索
Mock.mock(RegExp('/api/sales-leads/\\d+'), 'put', (options: any) => {
  const idStr = options.url.match(/\/api\/sales-leads\/(\d+)/)[1];
  const id = parseInt(idStr);
  const body = JSON.parse(options.body);
  
  const index = leadsList.findIndex(item => item.id === id);
  if (index !== -1) {
    leadsList[index] = { ...leadsList[index], ...body };
    return {
      code: 200,
      message: '更新成功',
      data: leadsList[index]
    };
  } else {
    return {
      code: 404,
      message: '线索不存在'
    };
  }
});

// 删除线索
Mock.mock(RegExp('/api/sales-leads/\\d+'), 'delete', (options: any) => {
  const idStr = options.url.match(/\/api\/sales-leads\/(\d+)/)[1];
  const id = parseInt(idStr);
  
  const index = leadsList.findIndex(item => item.id === id);
  if (index !== -1) {
    leadsList.splice(index, 1);
    return {
      code: 200,
      message: '删除成功'
    };
  } else {
    return {
      code: 404,
      message: '线索不存在'
    };
  }
});
