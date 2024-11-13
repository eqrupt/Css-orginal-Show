
<template>
  <div class="container mt-5">
    <h2 class="text-center">视频展示</h2>
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4 mb-4" v-for="(video, index) in videos" :key="index">
        <card :videoSrc="video.src" :title="video.title" :description="video.description"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from "@/components/card.vue";
// 视频数据数组
const videos = ref([
  {
    src: "../video/吟游诗人哐当.mp4",
    title: "示例视频 1",
    description: "这是第一个视频的描述，可以添加更多信息。"
  },
  {
    src: "../video/吟游诗人哐当.mp4",
    title: "示例视频 2",
    description: "这是第二个视频的描述，可以添加更多信息。"
  },
  {
    src: "../video/吟游诗人哐当.mp4",
    title: "示例视频 3",
    description: "这是第三个视频的描述，可以添加更多信息。"
  }
]);
</script>

<style scoped>
</style>
