<template>
  <div class="container">
    <h2 class="mb-4">评论管理</h2>

    <div v-for="post in posts" :key="post.id" class="card mb-4">
      <div class="card-header">
        <h5 class="mb-0">帖子: {{ post.title }}</h5>
      </div>
      <div class="card-body">
        <div v-if="post.comments.length === 0" class="text-muted">
          暂无评论
        </div>
        <div v-else>
          <div v-for="comment in post.comments" :key="comment.id" class="border-bottom py-3">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <p class="mb-1">{{ comment.content }}</p>
                <small class="text-muted">
                  评论时间: {{ new Date(comment.createTime).toLocaleString() }}
                </small>
              </div>
              <div>
                <button class="btn btn-danger btn-sm" @click="handleDeleteComment(post.id, comment.id)">
                  删除评论
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePostStore } from '@/services/post/store/CommentAndPostStore';

const postStore = usePostStore();
const posts = postStore.getAllPosts();

const handleDeleteComment = (postId: string, commentId: string) => {
  try {
    postStore.deleteCommentFromPost(postId, commentId);
  } catch (error) {
    console.error('删除评论失败:', error);
    alert('删除评论失败');
  }
};

onMounted(() => {
  postStore.getAllPosts();
});
</script>

<style scoped>
.card-header {
  background-color: #f8f9fa;
}

.border-bottom:last-child {
  border-bottom: none !important;
}
</style>