<template>
  <div class="progressChart" ref="progressChart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  methods: {
    chartInit() {
      const chart = echarts.init(this.$refs.progressChart);
      chart.setOption({
        xAxis: {
          show: false,
          max: 100,
          min: 0,
        },
        yAxis: {
          show: false,
          type: "category",
        },
        series: {
          type: "bar",
          data: [78],
          barWidth: 10,
          //   backgroundColor: "#333",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180,180,180,.2)",
          },
          itemStyle: {
            color: "green",
          },
          label: {
            show: true,
            position: "right",
            formatter: "|",
          },
        },
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        },
      });
    },
  },
  mounted() {
    this.chartInit();
  },
};
</script>

<style scoped>
.progressChart {
  width: 100%;
  height: 100%;
}
</style>