<template>
  <div class="post-list">
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">加载中...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else>
      <div v-for="post in paginatedPosts" :key="post.id" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.content }}</p>
          <div class="d-flex justify-content-between">
            <small class="text-muted">
              作者: {{ post.authorId }} | 
              发布时间: {{ new Date(post.createTime).toLocaleString() }}
            </small>
            <div>
              <button class="btn btn-primary btn-sm me-2" @click="viewPost(post.id)">
                查看详情
              </button>
              <button v-if="isAuthor(post.authorId)" class="btn btn-warning btn-sm me-2" @click="editPost(post.id)">
                编辑
              </button>
              <button v-if="isAuthor(post.authorId)" class="btn btn-danger btn-sm" @click="deletePost(post.id)">
                删除
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="postStore.posts.length === 0" class="text-center">
        暂无帖子
      </div>

      <!-- 分页控件 -->
      <nav aria-label="Page navigation" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">上一页</a>
          </li>
          <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">下一页</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePostStore } from '@/services/post/store/CommentAndPostStore'

export default defineComponent({
  name: 'PostList',
  setup() {
    const router = useRouter()
    const postStore = usePostStore()
    const loading = ref(true)
    const error = ref<string | null>(null)
    const currentPage = ref(1)
    const pageSize = ref(5) // 每页显示5条帖子

    // 计算总页数
    const totalPages = computed(() => {
      return Math.ceil(postStore.posts.length / pageSize.value)
    })

    // 获取当前页的帖子
    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value
      const end = start + pageSize.value
      return postStore.posts.slice(start, end)
    })

    // 切换页码
    const changePage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
      }
    }

    const loadPosts = async () => {
      try {
        loading.value = true
        postStore.getAllPosts()
      } catch (err) {
        error.value = '加载帖子失败'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    const viewPost = (id: string) => {
      router.push(`/post/detail/${id}`)
    }

    const editPost = (id: string) => {
      router.push(`/post/edit/${id}`)
    }

    const deletePost = async (id: string) => {
      if (confirm('确定要删除这篇帖子吗？')) {
        try {
          postStore.deletePost(id)
          await loadPosts()
        } catch (err) {
          console.error(err)
          alert('删除帖子失败')
        }
      }
    }

    const isAuthor = (authorId: string): boolean => {
      const currentUser = localStorage.getItem('currentUser')
      return currentUser ? JSON.parse(currentUser).id === authorId : false
    }

    onMounted(() => {
      loadPosts()
    })

    return {
      postStore,
      loading,
      error,
      viewPost,
      editPost,
      deletePost,
      isAuthor,
      currentPage,
      totalPages,
      paginatedPosts,
      changePage
    }
  }
})
</script>

<style scoped>
.post-list {
  padding: 20px;
}
</style>