<template>
 <offcanvas> </offcanvas>
  <!-- 主内容区 -->
  <div class="main-content">
    <div class="container">
    </div>
    <router-view></router-view>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import Offcanvas from "@/views/Offcanvas.vue";
import Card from "@/components/card.vue";
import Card_items from "@/components/card_items.vue";

const selectedVideo = ref({});



</script>

<style scoped>
</style>
