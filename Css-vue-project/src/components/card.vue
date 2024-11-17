<script setup lang="ts">

</script>

<template>
  <div class="container mt-4">
    <div class="card shadow-lg rounded-3 overflow-hidden">
      <div class="video-wrapper position-relative">
        <video class="card-img-top" controls loop>
          <source src="../video/吟游诗人哐当.mp4" type="video/mp4">
          您的浏览器不支持视频标签。
        </video>
        <div class="video-overlay"></div>
      </div>
      <div class="card-body bg-light">
        <h5 class="card-title fw-bold text-primary mb-3">示例卡片标题</h5>
        <p class="card-text text-muted mb-4">这是卡片的内容描述，可以添加一些更多的细节。</p>
        <a href="#" class="btn btn-primary rounded-pill px-4 py-2 shadow-sm hover-effect">
          <i class="fas fa-play me-2"></i>点击这里
        </a>
        <div>1234567890</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
