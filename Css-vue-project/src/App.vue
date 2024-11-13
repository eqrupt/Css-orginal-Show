<template>
  <div id="app">
 <offcanvas> </offcanvas>
  <!-- 主内容区 -->
  <div class="main-content">
    <div class="container">
      <h1>页面内容</h1>
      <p>这是主要的页面内容...</p>
    </div>
  </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import Offcanvas from "@/views/Offcanvas.vue";
const videos = ref([
  { id: 1, title: '示例视频1', description: '这是一个示例视频描述', thumbnail: 'https://via.placeholder.com/150', url: 'https://www.example.com/video1.mp4' },
  { id: 2, title: '示例视频2', description: '这是一个示例视频描述', thumbnail: 'https://via.placeholder.com/150', url: 'https://www.example.com/video2.mp4' },
  { id: 3, title: '示例视频3', description: '这是一个示例视频描述', thumbnail: 'https://via.placeholder.com/150', url: 'https://www.example.com/video3.mp4' },
]);

const selectedVideo = ref({});



</script>

<style scoped>
/* 大屏幕固定导航栏 */
@media (min-width: 992px) { /* lg 尺寸及以上 */
  #offcanvasExample {
    position: fixed;
    top: 0;
    left: 0;
    width: 25vw; /* 设定宽度 */
    height: 100vh;
    z-index: 1045; /* 保证在内容之上 */
    background-color: #f8f9fa; /* 背景颜色 */
    transform: none !important; /* 确保大屏时 Offcanvas 面板始终显示 */
    visibility: visible !important;
  }
  .main-content {
    margin-left: 250px; /* 使内容偏移导航宽度 */
  }
}
</style>
