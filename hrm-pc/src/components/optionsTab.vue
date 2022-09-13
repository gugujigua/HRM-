<template>
  <div class="options-tab">
    <div
      v-for="v in data"
      :key="v.status"
      class="item"
      :class="{ active: status === v.status }"
      @click="selectOption(v.status)"
    >
      <div class="title">{{ v.name }}</div>
      <div class="num">{{ v.val }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OptionsType } from "@/types/common";
const emit = defineEmits(["update:status"]);
const props = defineProps<{
  data: OptionsType[];
  status: number;
}>();
function selectOption(status: number) {
  emit("update:status", status);
}
</script>

<style scoped>
.options-tab {
  display: flex;
  background-color: var(--el-bg-color-page);
  color: var(--el-text-color-primary);
  border-radius: var(--el-border-radius-base);
  text-align: center;
}
.options-tab .item {
  flex-grow: 1;
  padding: 10ox 0;
  position: relative;
}
.options-tab .item::after {
  content: "";
  position: absolute;
  width: 1px;
  height: 40%;
  background-color: var(--el-color-info-light-5);
  right: 0;
  top: 30%;
}
.options-tab .item:last-of-type::after {
  display: none;
}
.options-tab .item .title {
  font-size: 14px;
}
.options-tab .item .num {
  font-size: 18px;
  font-weight: bold;
}
.options-tab .item.active {
  color: var(--el-color-primary);
  border-bottom: 3px solid var(--el-color-primary);
}
</style>
