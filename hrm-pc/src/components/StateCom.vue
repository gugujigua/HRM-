<script setup lang="ts">
import { ref } from "vue";
defineProps<{
  state: any[];
}>();
const isactive = ref(0);
function click(i: number) {
  isactive.value = i;
  console.log(i);
}
</script>
<template>
  <div class="statebox">
    <div
      class="statedata"
      :class="{ active: isactive === i ? true : false }"
      @click="click(i)"
      v-for="(v, i) in state"
      :key="i"
    >
      <h4 class="green">{{ v.name }}</h4>
      <h4>{{ v.total }}</h4>
    </div>
  </div>
</template>

<style scoped>
.statebox {
  width: 100%;
  display: flex;
  /* justify-content: center; */
}
.statebox .statedata {
  text-align: center;
  min-width: 100px;
}
.statebox .active {
  color: #409eff;
}
.statebox .statedata h4 {
  margin-top: 10px;
}
.statebox .statedata h4:last-child {
  margin-bottom: 10px;
}
</style>
