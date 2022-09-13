<template>
  <RouterView />
</template>
<script lang="ts" setup>
import { getCurrentInstance, type ComponentInternalInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();
const route = useRoute();
const token = sessionStorage.getItem("token");
if (token) {
  proxy?.$store.dispatch("getMenu").then(() => {
    router.push(route.fullPath);
  });
}

// }
</script>
<style scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
