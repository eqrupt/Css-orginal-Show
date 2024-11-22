<template>
  <div class="post-editor">
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
        <h3>发布新帖子</h3>
        <form @submit.prevent="submitPost">
          <div class="mb-3">
            <label for="title" class="form-label">标题</label>
            <input 
              type="text"
              class="form-control"
              id="title"
              v-model="post.title"
              required
            >
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">内容</label>
            <textarea
              class="form-control"
              id="content"
              rows="5"
              v-model="post.content"
              required
            ></textarea>
          </div>
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-secondary" @click="cancel">取消</button>
            <button type="submit" class="btn btn-primary">发布</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePostStore } from '@/services/post/store/CommentAndPostStore'
import { useUserStore } from '@/services/auth/store/userStore';

export default defineComponent({
  name: 'PostEditor',
  setup() {
    const router = useRouter()
    const postStore = usePostStore()
    const loading = ref(false)
    const userStore = useUserStore()
    

    const error = ref<string | null>(null)
    const post = ref({
      id: '',
      title: '', 
      content: '',
      authorId: '',
      createTime: new Date(),
      comments: []
    })
    post.value.authorId = userStore.getUser?.username || ''
    const submitPost = async () => {
      
      try {
        console.log(userStore.isLoggedIn)
        console.log(post.value.authorId)
        console.log(userStore.getUser)
        loading.value = true
        const newPost = await postStore.createPost({
          ...post.value,
          updateTime: new Date()
        })
        router.push(`/post/detail/${newPost.id}`)
      } catch (err) {
        error.value = '发布帖子失败'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    const cancel = () => {
      router.push('/post/list')
    }

    return {
      post,
      loading,
      error,
      submitPost,
      cancel
    }
  }
})
</script>

<style scoped>
.post-editor {
  padding: 20px;
}
</style>
