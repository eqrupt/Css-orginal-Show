<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app" class="d-flex">
    <!-- 侧边栏 -->
    <div class="sidebar p-3">
      <h5>网易云音乐</h5>
      <ul class="list-unstyled">
        <li><a href="#">推荐</a></li>
        <li><a href="#">精选</a></li>
        <li><a href="#">播客</a></li>
        <li><a href="#">漫游</a></li>
        <li><a href="#">动态</a></li>
      </ul>
      <hr>
      <h5>我的</h5>
      <ul class="list-unstyled">
        <li><a href="#">喜欢的音乐</a></li>
        <li><a href="#">最近播放</a></li>
        <li><a href="#">我的播客</a></li>
      </ul>
      <hr>
      <h5>创建的歌单</h5>
      <ul class="list-unstyled">
        <li><a href="#">下山</a></li>
        <li><a href="#">泡泡的2023年度歌单</a></li>
      </ul>
    </div>

    <!-- 主要内容区 -->
    <div class="content p-4">
      <h5>推荐歌单</h5>
      <div class="row">
        <div class="col-6 col-md-4">
          <div class="card mb-4">
            <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">每日推荐</h5>
              <p class="card-text">从「Couch Potato」...</p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4">
          <div class="card mb-4">
            <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">私人雷达</h5>
              <p class="card-text">今天《Chatterbox》...</p>
            </div>
          </div>
        </div>
      </div>
      <h5>榜单精选</h5>
      <!-- 此处可以添加其他内容 -->
    </div>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #f8f9fa;
}

.content {
  flex: 1;
  overflow-y: auto;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
