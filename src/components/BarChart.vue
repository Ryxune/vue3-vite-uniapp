<script setup>
import * as echarts from 'echarts'
import { onMounted, onUnmounted, watch, computed } from 'vue'
import { merge, uniqueId } from 'lodash'

const props = defineProps({
  height: {
    type: [String, Number],
    default: '100%',
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  useDefaultColor: {
    type: Boolean,
    default: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
  xAxisData: {
    type: Array,
    default: () => [],
  },
})

const id = uniqueId('chart')
let chartInstance = null
const chartOption = computed(() => {
  // 数据个数大于5的文字倾斜
  const rotate = props.xAxisData?.length > 5 ? -45 : 0
  const newData = props.useDefaultColor
    ? props.data?.map((item, idx) => {
        const isEven = idx % 2 === 0
        return {
          value: item,
          itemStyle: {
            color: isEven
              ? getEchartsLinerGradient('#62ABFF', '#3373FF')
              : getEchartsLinerGradient('#8FE5FF', '#00CCFF'),
            borderWidth: 1,
            borderColor: isEven
              ? getEchartsLinerGradient('#3373FF', '#3474FF')
              : getEchartsLinerGradient('#00C7FF', '#00D6EE'),
          },
        }
      })
    : props.data
  const grid = {
    top: 20,
    bottom: 0,
    left: 0,
    containLabel: true,
    tooltip: {
      trigger: 'item',
    },
  }
  if (rotate === 0) {
    grid.right = 0
  }
  return {
    tooltip: {
      triggerOn: 'click',
    },
    grid,
    xAxis: {
      show: true,
      type: 'category',
      axisLine: {
        show: false,
      },
      axisTick: {
        // 刻度不显示
        show: false,
      },
      axisLabel: {
        rotate,
      },
      data: props.xAxisData,
    },
    yAxis: {
      name: '',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
      minInterval: 1,
    },
    series: [
      {
        type: 'bar',
        barWidth: uni.upx2px(24) + 'px',
        data: newData,
      },
    ],
  }
})

watch(
  () => chartOption.value,
  (newOptions) => {
    setChartOptions(newOptions)
  }
)

// 初始化图表实例
onMounted(() => {
  init()
  setChartOptions(props.options)
  // 添加窗口大小变化时自动适应图表尺寸的监听器（可选）
  window.addEventListener('resize', resize)
})
// 在组件卸载时清理资源
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
  window.removeEventListener('resize', resize)
})
function resize() {
  chartInstance && chartInstance.resize()
}
function init() {
  if (!chartInstance) {
    chartInstance = echarts.init(document.querySelector('#' + id))
  }
}
// 更新图表配置
function setChartOptions(options) {
  if (chartInstance) {
    chartInstance.clear()
    chartInstance.setOption(merge({}, chartOption.value, options))
  }
}
function getEchartsLinerGradient(from, to) {
  // 从下到上
  return {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: to, // 0% 处的颜色
      },
      {
        offset: 1,
        color: from, // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  }
}
</script>
<template>
  <view class="charts-container">
    <view
      :id="id"
      ref="chartRef"
      class="charts-self"
      :style="{ width: '100%', height: height }"
    ></view>
  </view>
</template>
<style></style>
