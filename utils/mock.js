// 模拟路线数据
export const mockHotRoutes = [
  {
    id: '1',
    channel: '空运',
    number: 'CA1234',
    origin: '深圳',
    originCode: 'CN',
    destination: '纽约',
    destinationCode: 'US',
    departureTime: '2024-03-20',
    deadline: '2024-03-19',
    price: '45.00',
    isHot: true,
  },
  {
    id: '2',
    channel: '海运',
    number: 'SE5678',
    origin: '上海',
    originCode: 'CN',
    destination: '洛杉矶',
    destinationCode: 'US',
    departureTime: '2024-03-25',
    deadline: '2024-03-23',
    price: '23.50',
    isHot: true,
  },
  {
    id: '3',
    channel: '铁路',
    number: 'RL9012',
    origin: '广州',
    destination: '莫斯科',
    departureTime: '2024-03-22',
    deadline: '2024-03-21',
    price: '34.80',
  },
]

export const mockChannelRoutes = {
  全部: [
    {
      id: '4',
      channel: '空运',
      number: 'CA5432',
      origin: '深圳',
      originCode: 'CN',
      destination: '伦敦',
      destinationCode: 'GB',
      departureTime: '2024-03-21',
      deadline: '2024-03-20',
      price: '48.00',
      transitTime: '36h40m',
      isDoor: true,
    },
    {
      id: '5',
      channel: '海运',
      number: 'SE9876',
      origin: '青岛',
      originCode: 'CN',
      destination: '汉堡',
      destinationCode: 'DE',
      departureTime: '2024-03-26',
      deadline: '2024-03-24',
      price: '25.50',
      transitTime: '25d',
      isDoor: true,
    },
  ],
  空运: [
    {
      id: '6',
      channel: '空运',
      number: 'CA7890',
      origin: '成都',
      originCode: 'CN',
      destination: '巴黎',
      destinationCode: 'FR',
      departureTime: '2024-03-23',
      deadline: '2024-03-22',
      price: '52.00',
      transitTime: '42h20m',
      isDoor: true,
    },
    {
      id: '7',
      channel: '空运',
      number: 'CA2468',
      origin: '深圳',
      originCode: 'CN',
      destination: '纽约',
      destinationCode: 'US',
      departureTime: '2024-03-24',
      deadline: '2024-03-23',
      price: '58.50',
      transitTime: '38h15m',
      isDoor: true,
    },
  ],
  海运: [
    {
      id: '7',
      channel: '海运',
      number: 'SE2468',
      origin: '宁波',
      destination: '鹿特丹',
      departureTime: '2024-03-28',
      deadline: '2024-03-26',
      price: '21.50',
    },
  ],
  铁路: [
    {
      id: '8',
      channel: '铁路',
      number: 'RL1234',
      origin: '西安',
      destination: '华沙',
      departureTime: '2024-03-25',
      deadline: '2024-03-24',
      price: '32.80',
    },
  ],
  卡航: [
    {
      id: '9',
      channel: '卡航',
      number: 'TR5678',
      origin: '乌鲁木齐',
      destination: '阿拉木图',
      departureTime: '2024-03-22',
      deadline: '2024-03-21',
      price: '18.50',
    },
  ],
}

// 地址列表数据
export const mockAddressList = [
  {
    id: '1',
    contact: '张三',
    phone: '13800138000',
    country: '中国',
    postcode: '518000',
    address: '广东省深圳市南山区科技园',
    isDefault: false,
  },
  {
    id: '2',
    contact: '李四',
    phone: '13900139000',
    country: '中国',
    postcode: '200000',
    address: '上海市浦东新区陆家嘴',
    isDefault: false,
  },
]

// 订单数据
export const mockOrders = [
  {
    id: '123',
    status: '待发货',
    statusDesc: '订单已确认，等待发货',
    channel: '空运',
    number: 'CA1234',
    origin: '深圳',
    destination: '纽约',
    departureTime: '2024-03-20',
    deadline: '2024-03-19 18:00',
    shipAddress: {
      contact: '张三',
      phone: '13800138000',
      country: '中国',
      address: '广东省深圳市南山区科技园',
    },
    receiveAddress: {
      contact: '李四',
      phone: '13900139000',
      country: '美国',
      address: '纽约市曼哈顿区第五大道',
    },
    cargoInfo: {
      size: '100x80x60cm',
      weight: '50',
      quantity: '2',
    },
    goodsList: [
      {
        cnName: '电子产品',
        enName: 'Electronic Products',
        hsCode: '8517.12.00',
        size: '20x15x10cm',
        quantity: '100',
      },
    ],
    freight: '2000.00',
    otherFee: '200.00',
    totalAmount: '2200.00',
    orderNo: 'SO202403150001',
    createTime: '2024-03-15 14:30:00',
  },
]

// 首页轮播图
export const mockBanners = [
  {
    id: '1',
    image: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/飞机_1734419293099.png',
    title: '全球进出口物流服务',
  },
  {
    id: '2',
    image: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/海运_1734422014071.png',
    title: '全球进出口物流服务',
  },
  {
    id: '3',
    image: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/铁路_1734422081182.png',
    title: '全球进出口物流服务',
  },
  {
    id: '4',
    image: 'http://jwerp.oss-cn-shenzhen.aliyuncs.com/upload/卡航_1734422126054.png',
    title: '全球进出口物流服务',
  },
]

// 路线详情数据
export const mockRouteDetail = {
  id: '1',
  number: 'CA1234',
  channel: '空运',
  origin: '深圳',
  originCode: 'CN',
  destination: '纽约',
  destinationCode: 'US',
  departureTime: '2024-03-20',
  deadline: '2024-03-19 18:00',
  transitTime: '36h40m',
  price: '45.00',
  isDoor: true,
  isHot: true,

  // 详细信息
  details: {
    // 路线说明
    description: '深圳直飞纽约，全程空运专线，提供上门取件服务',

    // 时效说明
    timeInfo: {
      collectDeadline: '2024-03-19 18:00', // 截仓时间
      departureTime: '2024-03-20 10:00', // 发车时间
      transitTime: '36h40m', // 在途时间
      arrivalTime: '2024-03-22 00:40', // 预计到达
    },

    // 价格说明
    priceInfo: {
      basePrice: '45.00', // 基础运费
      fuelSurcharge: '5.00', // 燃油附加费
      insuranceFee: '2.00', // 保险费
      handlingFee: '3.00', // 操作费
      // 阶梯价格
      ladderPrices: [
        {
          weight: '0-45',
          price: '45.00',
        },
        {
          weight: '45-100',
          price: '42.50',
        },
        {
          weight: '100-300',
          price: '40.00',
        },
        {
          weight: '300-500',
          price: '38.50',
        },
        {
          weight: '500+',
          price: '36.00',
        },
      ],
      otherFees: [
        // 其他费用
        {
          name: '提货费',
          price: '2.00',
        },
        {
          name: '包装费',
          price: '1.50',
        },
      ],
    },

    // 服务信息
    services: [
      {
        icon: 'truck',
        name: '上门取件',
        description: '提供深圳市区范围内上门取件服务',
      },
      {
        icon: 'box',
        name: '包装服务',
        description: '专业物流包装，确保货物安全',
      },
      {
        icon: 'shield',
        name: '保价服务',
        description: '可选保价服务，货物更有保障',
      },
      {
        icon: 'clock',
        name: '准时达',
        description: '保证准时到达，延误赔付',
      },
    ],

    // 限制信息
    restrictions: {
      weight: {
        min: '0.1', // 最小重量（kg）
        max: '1000', // 最大重量（kg）
      },
      size: {
        length: '300', // 最大长度（cm）
        width: '200', // 最大宽度（cm）
        height: '200', // 最大高度（cm）
      },
      prohibited: [
        // 禁运物品
        '易燃易爆物品',
        '危险化学品',
        '活体动物',
        '枪支弹药',
      ],
    },

    // 路线节点
    milestones: [
      {
        location: '深圳',
        time: '2024-03-19 18:00',
        status: '截仓',
      },
      {
        location: '深圳宝安机场',
        time: '2024-03-20 10:00',
        status: '起飞',
      },
      {
        location: '阿联酋迪拜机场',
        time: '2024-03-20 22:00',
        status: '中转',
      },
      {
        location: '纽约肯尼迪机场',
        time: '2024-03-22 00:40',
        status: '到达',
      },
    ],
  },
}

// 商品列表数据
export const mockGoodsList = [
  {
    id: '1',
    sku: 'SKU001',
    cnName: '蓝牙耳机',
    enName: 'Bluetooth Earphone',
    hsCode: '8518.30.00',
    price: 299,
    stock: 1000,
    unit: '件',
    size: '10x5x3cm',
    weight: 0.2,
    category: '电子产品',
    status: 1,
  },
  {
    id: '2',
    sku: 'SKU002',
    cnName: '智能手表',
    enName: 'Smart Watch',
    hsCode: '8517.62.00',
    price: 899,
    stock: 500,
    unit: '件',
    size: '8x4x2cm',
    weight: 0.15,
    category: '电子产品',
    status: 1,
  },
  {
    id: '3',
    sku: 'SKU003',
    cnName: '移动电源',
    enName: 'Power Bank',
    hsCode: '8507.60.00',
    price: 199,
    stock: 2000,
    unit: '件',
    size: '15x7x2cm',
    weight: 0.35,
    category: '电子产品',
    status: 1,
  },
  {
    id: '4',
    sku: 'SKU004',
    cnName: '无线鼠标',
    enName: 'Wireless Mouse',
    hsCode: '8471.60.00',
    price: 129,
    stock: 1500,
    unit: '件',
    size: '12x6x4cm',
    weight: 0.1,
    category: '电子产品',
    status: 1,
  },
  {
    id: '5',
    sku: 'SKU005',
    cnName: '机械键盘',
    enName: 'Mechanical Keyboard',
    hsCode: '8471.60.00',
    price: 499,
    stock: 800,
    unit: '件',
    size: '35x12x4cm',
    weight: 0.8,
    category: '电子产品',
    status: 1,
  },
  {
    id: '6',
    sku: 'SKU006',
    cnName: '游戏手柄',
    enName: 'Game Controller',
    hsCode: '9504.50.00',
    price: 259,
    stock: 1200,
    unit: '件',
    size: '15x10x6cm',
    weight: 0.3,
    category: '电子产品',
    status: 1,
  },
  {
    id: '7',
    sku: 'SKU007',
    cnName: '蓝牙音箱',
    enName: 'Bluetooth Speaker',
    hsCode: '8518.22.00',
    price: 399,
    stock: 600,
    unit: '件',
    size: '20x10x10cm',
    weight: 0.5,
    category: '电子产品',
    status: 1,
  },
  {
    id: '8',
    sku: 'SKU008',
    cnName: '无线充电器',
    enName: 'Wireless Charger',
    hsCode: '8504.40.00',
    price: 159,
    stock: 2500,
    unit: '件',
    size: '10x10x1cm',
    weight: 0.15,
    category: '电子产品',
    status: 1,
  },
  {
    id: '9',
    sku: 'SKU009',
    cnName: '智能摄像头',
    enName: 'Smart Camera',
    hsCode: '8525.80.00',
    price: 299,
    stock: 1000,
    unit: '件',
    size: '8x8x12cm',
    weight: 0.25,
    category: '电子产品',
    status: 1,
  },
  {
    id: '10',
    sku: 'SKU010',
    cnName: '智能门锁',
    enName: 'Smart Lock',
    hsCode: '8301.40.00',
    price: 899,
    stock: 300,
    unit: '件',
    size: '25x15x3cm',
    weight: 1.2,
    category: '电子产品',
    status: 0, // 已下架
  },
  {
    id: '11',
    sku: 'SKU011',
    cnName: '运动手环',
    enName: 'Fitness Tracker',
    hsCode: '9102.12.00',
    price: 199,
    stock: 1800,
    unit: '件',
    size: '25x2x1cm',
    weight: 0.05,
    category: '电子产品',
    status: 1,
  },
  {
    id: '12',
    sku: 'SKU012',
    cnName: '真无线耳机',
    enName: 'TWS Earbuds',
    hsCode: '8518.30.00',
    price: 599,
    stock: 1000,
    unit: '件',
    size: '6x6x3cm',
    weight: 0.1,
    category: '电子产品',
    status: 1,
  },
]

// 根据ID获取路线详情
export const getMockRouteDetail = (id) => {
  // 从所有渠道中查找对应ID的路线
  const allRoutes = Object.values(mockChannelRoutes).flat()
  const route = allRoutes.find((r) => r.id === id)

  if (!route) {
    return null
  }

  // 合并基础路线信息和详细信息
  return {
    ...route,
    details: {
      ...mockRouteDetail.details,
      timeInfo: {
        collectDeadline: route.deadline,
        departureTime: route.departureTime,
        transitTime: route.transitTime,
        arrivalTime: new Date(new Date(route.departureTime).getTime() + 36 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      },
    },
  }
}
