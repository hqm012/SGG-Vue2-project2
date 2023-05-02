<template>
  <div class="dashboard-container">
    <boardHead></boardHead>
    <secondCard class="secondCard"></secondCard>
  </div>
</template>

<script>
import boardHead from "./boardHead";
import secondCard from "./secondCard";
export default {
  name: "Dashboard",
  components: { boardHead, secondCard },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.secondCard {
  margin-top: 20px;
}
</style>
