<template>
  <view class="ec-canvas">
    <canvas
      id="ec-canvas"
      type="2d"
      class="canvas"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    ></canvas>
  </view>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'EcCanvas',
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const query = uni.createSelectorQuery().in(this);
      query
        .select('#ec-canvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          if (res[0]) {
            const canvas = res[0].node;
            const ctx = canvas.getContext('2d');
            canvas.width = res[0].width * uni.getSystemInfoSync().pixelRatio;
            canvas.height = res[0].height * uni.getSystemInfoSync().pixelRatio;

            const chart = echarts.init(canvas, null, {
              width: res[0].width,
              height: res[0].height,
              devicePixelRatio: uni.getSystemInfoSync().pixelRatio,
            });

            chart.setOption(this.options);
            this.chart = chart;
          }
        });
    },
    touchStart(e) {
      if (this.chart) {
        const touch = e.touches[0];
        this.chart.dispatchAction({
          type: 'highlight',
          dataIndex: Math.floor(touch.x / (this.chart.getWidth() / this.options.series[0].data.length)),
        });
      }
    },
    touchMove(e) {
      if (this.chart) {
        const touch = e.touches[0];
        this.chart.dispatchAction({
          type: 'highlight',
          dataIndex: Math.floor(touch.x / (this.chart.getWidth() / this.options.series[0].data.length)),
        });
      }
    },
    touchEnd() {
      if (this.chart) {
        this.chart.dispatchAction({
          type: 'downplay',
        });
      }
    },
  },
  watch: {
    options: {
      deep: true,
      handler(newVal) {
        if (this.chart) {
          this.chart.setOption(newVal);
        }
      },
    },
  },
};
</script>

<style scoped>
.ec-canvas {
  width: 100%;
  height: 100%;
}
.canvas {
  width: 100%;
  height: 100%;
}
</style>
