<template>
  <view class="container">
    <view class="route-list">
      <route-card v-for="route in hotRoutes" :key="route.id" :route="route" @tap="viewRouteDetail(route)" />
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RouteCard from '@/components/RouteCard.vue';
import { mockHotRoutes } from '@/utils/mock';

const hotRoutes = ref([]);

const viewRouteDetail = (route) => {
  uni.navigateTo({
    url: `/pages/routes/detail?id=${route.id}`,
  });
};

onMounted(() => {
  // 加载热门路线
  hotRoutes.value = mockHotRoutes;
});
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
}

.route-list {
  .route-card {
    margin-bottom: 20rpx;
  }
}
</style>
