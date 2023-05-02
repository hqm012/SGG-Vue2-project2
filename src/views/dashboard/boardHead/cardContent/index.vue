<template>
  <div>
    <div class="headNum">
      <slot name="headNum"></slot>
    </div>
    <div class="chart">
      <slot name="chart"></slot>
    </div>
    <div class="footContent">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.chart {
  height: 100px;
}
.footContent {
  margin-top: 5px;
}
</style>