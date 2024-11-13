<template>
  <div class="wrapper">
    <!-- 固定在页面左侧的导航栏 -->
    <nav class="navbar bg-body-tertiary fixed-left">
      <div class="container-fluid d-flex flex-column">
        <a class="navbar-brand" href="#">顶置下拉菜单</a>
        <!-- 下拉菜单按钮 -->
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>

    <!-- Offcanvas 导航栏 -->
    <div id="offcanvasExample" class="offcanvas offcanvas-start d-lg-none" tabindex="-1">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">导航菜单</h5>
        <button type="button" class="btn-close d-lg-none" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="list-unstyled">
          <li><a href="#section1" class="text-decoration-none">链接 1</a></li>
          <li><a href="#section2" class="text-decoration-none">链接 2</a></li>
          <li><a href="#section3" class="text-decoration-none">链接 3</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped>
/* 大屏幕固定导航栏 */
@media (min-width: 992px) { /* lg 尺寸及以上 */
  .fixed-left {
    position: fixed;
    top: 0;
    left: 0;
    width: 10vw; /* 设定导航栏宽度 */
    height: 100vh; /* 让导航栏充满整个高度 */
    z-index: 1045; /* 保证在内容之上 */
    background-color: #f8f9fa; /* 背景颜色 */
    display: block;
  }}
.navbar-brand{
  writing-mode: vertical-rl;
}
@media (max-width: 991px) {
  .bg-body-tertiary {
    display: none;
  }
}
/* 小屏幕下，显示为 Offcanvas */
@media (max-width: 991px) {
  .navbar-toggler {
    display: block;
  }
  .main-content {
    margin-left: 0; /* 小屏幕时，内容不需要偏移 */
  }
}
</style>
