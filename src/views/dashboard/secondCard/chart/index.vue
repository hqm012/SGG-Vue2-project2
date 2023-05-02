<template>
  <div class="chart" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  methods: {
    chartInit() {
      const charts = echarts.init(this.$refs.chart);
      const option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      };
      charts.setOption(option);
    },
  },
  mounted() {
    this.chartInit();
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 200px;
}
</style>