<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-4">
        <!-- 用户信息卡片 -->
        <div class="card">
          <div class="card-body">
            <div class="text-center mb-3">
              <img src="@/assets/assert.png" class="rounded-circle" alt="用户头像" style="width: 120px; height: 120px;">
            </div>
            <h5 class="card-title text-center">{{ currentUser?.username || '未登录' }}</h5>
            <div class="mt-3">
              <p class="card-text"><i class="bi bi-person"></i> 用户ID: {{ currentUser?.username || '-' }}</p>
              <p class="card-text"><i class="bi bi-calendar3"></i> 用户最近登录时间: {{ new Date().toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <!-- 用户动态标签页 -->
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" @click="activeTab = 'posts'" :class="{ active: activeTab === 'posts' }">我的帖子</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="activeTab = 'comments'" :class="{ active: activeTab === 'comments' }">我的评论</a>
          </li>
        </ul>

        <!-- 帖子列表 -->
        <div v-if="activeTab === 'posts'" class="mt-3">
          <div v-if="userPosts.length === 0" class="text-center text-muted">
            暂无帖子
          </div>
          <div v-else class="list-group">
            <router-link 
              v-for="post in userPosts" 
              :key="post.id"
              :to="`/post/detail/${post.id}`"
              class="list-group-item list-group-item-action"
            >
              <div class="d-flex justify-content-between">
                <h6 class="mb-1">{{ post.title }}</h6>
                <small>{{ formatDate(post.createTime) }}</small>
              </div>
              <p class="mb-1 text-truncate">{{ post.content }}</p>
            </router-link>
          </div>
        </div>

        <!-- 评论列表 -->
        <div v-if="activeTab === 'comments'" class="mt-3">
          <div v-if="userComments.length === 0" class="text-center text-muted">
            暂无评论
          </div>
          <div v-else class="list-group">
            <div v-for="comment in userComments" :key="comment.id" class="list-group-item">
              <div class="d-flex justify-content-between">
                <small>评论于帖子: {{ comment.postId }}</small>
                <small>{{ formatDate(comment.createTime) }}</small>
              </div>
              <p class="mb-1">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PostDTO, CommentDTO } from '@/types/PostandComentDTO'
import { usePostStore } from '@/services/post/store/CommentAndPostStore';

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser') || '{}'))
const activeTab = ref('posts')
const userPosts = ref<PostDTO[]>([])
const userComments = ref<CommentDTO[]>([])

const formatDate = (date: Date | undefined) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
onMounted(async () => {
  const postStore = usePostStore()
  const allPosts = postStore.getAllPosts()
  console.log('当前用户:', currentUser.value)
  console.log('所有帖子:', allPosts)
  userPosts.value = allPosts.filter(post => post.authorId === currentUser.value.username)
  userComments.value = allPosts
    .flatMap(post => post.comments)
    .filter(comment => comment.authorId === currentUser.value.id)
})
</script>

<style scoped>
.nav-link {
  cursor: pointer;
}

.nav-link.active {
  font-weight: bold;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
