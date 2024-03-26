<script setup>
import BarChart from '@/components/BarChart.vue'
const data = [12, 36, 18]
const xAxisData = ['Mon', 'Tue', 'Wed']
</script>
<template>
  <view class="content">
    <BarChart v-if="data.length" :data="data" :xAxisData="xAxisData" height="400rpx" />
  </view>
</template>

<style>
.content {
  padding: 16rpx;
}
</style>
