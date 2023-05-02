<template>
  <div class="lineChaContent" ref="lineChaContent"></div>
</template>

<script>
// 引入 echarts
import * as echarts from "echarts";

export default {
  methods: {
    chartInit() {
      const cha = echarts.init(this.$refs.lineChaContent);
      cha.setOption(
        {
          xAxis: {
            show: false,
            data: ["10", "20", "11", "15", "30", "20"],
          },
          yAxis: {
            show: false,
          },
          series: [
            {
              type: "line",
              data: [10, 7, 50, 12, 20, 9],
              itemStyle: {
                opacity: 0,
              },
              smooth: true,
            },
          ],
          tooltip: {},
          grid: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
          },
        }
        // {
        //   xAxis: {
        //     type: "category",
        //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        //   },
        //   yAxis: {
        //     type: "value",
        //   },
        //   series: [
        //     {
        //       data: [150, 230, 224, 218, 135, 147, 260],
        //       type: "line",
        //     },
        //   ],
        // }
      );
    },
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.chartInit();
      }, 0);
    });
  },
};
</script>
    
<style  scoped>
.lineChaContent {
  width: 100%;
  height: 100%;
}
</style>