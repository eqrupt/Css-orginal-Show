<template>
  <div class="post-detail">
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">加载中...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else class="card">
      <div class="card-body">
        <h3 class="card-title">{{ postStore.currentPost?.title }}</h3>
        <p class="card-text">{{ postStore.currentPost?.content }}</p>
        <div class="text-muted mb-3">
          作者: {{ postStore.currentPost?.authorId }} | 
          发布时间: {{ new Date(postStore.currentPost?.createTime || '').toLocaleString() }}
        </div>

        <div v-if="isAuthor(postStore.currentPost?.authorId)" class="mb-3">
          <button class="btn btn-warning me-2" @click="editPost">编辑</button>
          <button class="btn btn-danger" @click="deletePost">删除</button>
        </div>

        <hr>

        <h5>评论</h5>
        <div class="mb-3">
          <textarea v-model="newComment" class="form-control" rows="3" placeholder="写下你的评论..."></textarea>
          <button class="btn btn-primary mt-2" @click="addComment">发表评论</button>
        </div>

        <div v-for="comment in postStore.currentPost?.comments" :key="comment.id" class="card mb-2">
          <div class="card-body">
            <p class="card-text">{{ comment.content }}</p>
            <div class="d-flex justify-content-between">
              <small class="text-muted">
                {{ comment.authorId }} | {{ new Date(comment.createTime).toLocaleString() }}
              </small>
              <button v-if="isAuthor(comment.authorId)" 
                      class="btn btn-danger btn-sm"
                      @click="deleteComment(comment.id)">
                删除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '@/services/post/store/CommentAndPostStore'

export default defineComponent({
  name: 'PostDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const postStore = usePostStore()
    const loading = ref(true)
    const error = ref<string | null>(null)
    const newComment = ref('')

    const loadPost = async () => {
      try {
        loading.value = true
        const postId = route.params.id as string
        postStore.getPostById(postId)
      } catch (err) {
        error.value = '加载帖子失败'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    const editPost = () => {
      router.push(`/post/edit/${postStore.currentPost?.id}`)
    }

    const deletePost = async () => {
      if (!postStore.currentPost?.id) return
      
      if (confirm('确定要删除这篇帖子吗？')) {
        try {
          postStore.deletePost(postStore.currentPost.id)
          router.push('/')
        } catch (err) {
          console.error(err)
          alert('删除帖子失败')
        }
      }
    }

    const addComment = async () => {
      if (!postStore.currentPost?.id || !newComment.value.trim()) return

      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      try {
        postStore.addCommentToPost(postStore.currentPost.id, {
          id: '',
          content: newComment.value,
          authorId: currentUser.id,
          postId: postStore.currentPost.id,
          createTime: new Date()
        })
        newComment.value = ''
      } catch (err) {
        console.error(err)
        alert('发表评论失败')
      }
    }

    const deleteComment = async (commentId: string) => {
      if (!postStore.currentPost?.id) return
      
      if (confirm('确定要删除这条评论吗？')) {
        try {
          postStore.deleteCommentFromPost(postStore.currentPost.id, commentId)
        } catch (err) {
          console.error(err)
          alert('删除评论失败')
        }
      }
    }

    const isAuthor = (authorId?: string): boolean => {
      if (!authorId) return false
      const currentUser = localStorage.getItem('currentUser')
      return currentUser ? JSON.parse(currentUser).id === authorId : false
    }

    onMounted(() => {
      loadPost()
    })

    return {
      postStore,
      loading,
      error,
      newComment,
      editPost,
      deletePost,
      addComment,
      deleteComment,
      isAuthor
    }
  }
})
</script>

<style scoped>
.post-detail {
  padding: 20px;
}
</style>