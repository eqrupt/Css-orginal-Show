// 管理员页面
<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/manage">管理后台</router-link>
      </div>
    </nav>

    <div class="row">
      <div class="col-md-3">
        <div class="list-group">
          <router-link to="/manage/users" class="list-group-item list-group-item-action">用户管理</router-link>
          <router-link to="/manage/posts" class="list-group-item list-group-item-action">帖子管理</router-link>
          <router-link to="/manage/comments" class="list-group-item list-group-item-action">评论管理</router-link>
        </div>
      </div>
      
      <div class="col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Manage',
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
.list-group-item {
  border-radius: 0;
}
.list-group-item.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>