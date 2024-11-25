<template>
  <div class="container">
    <h2 class="mb-4">帖子管理</h2>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>标题</th>
            <th>作者ID</th>
            <th>创建时间</th>
            <th>评论数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>{{ post.title }}</td>
            <td>{{ post.authorId }}</td>
            <td>{{ new Date(post.createTime).toLocaleString() }}</td>
            <td>{{ post.comments.length }}</td>
            <td>
              <button class="btn btn-danger btn-sm" @click="handleDeletePost(post.id)">
                删除帖子
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePostStore } from '@/services/post/store/CommentAndPostStore';

const postStore = usePostStore();
const posts = postStore.getAllPosts();

const handleDeletePost = (postId: string) => {
  if(confirm('确定要删除该帖子吗?')) {
    try {
      postStore.deletePost(postId);
    } catch (error) {
      console.error('删除帖子失败:', error);
      alert('删除帖子失败');
    }
  }
};

onMounted(() => {
  postStore.getAllPosts();
});
</script>

<style scoped>
.table th {
  background-color: #f8f9fa;
}
</style>
