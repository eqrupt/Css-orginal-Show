<!-- 1. 基础拖拽功能测试
- 创建包含5个列表项的简单列表
- 确认可以上下拖动排序
- 验证排序后数据是否正确更新 -->
<!-- 使用技术栈：vue3 vuedraggable@next    -->

<template>
  <div class="container">
    <h2>基础拖拽功能演示</h2>
    <draggable 
      v-model="list"
      item-key="id"
      :ghost-class="'ghost'"
      @start="dragStart"
      @end="dragEnd"
    >
      <template #item="{element}">
        <div class="item">
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const list = ref([
  { id: 1, name: '列表项 1' },
  { id: 2, name: '列表项 2' },
  { id: 3, name: '列表项 3' },
  { id: 4, name: '列表项 4' },
  { id: 5, name: '列表项 5' }
])

const dragStart = () => {
  console.log('开始拖拽')
}

const dragEnd = () => {
  console.log('拖拽结束')
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
}

.item {
  padding: 10px;
  margin: 5px 0;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: move;
}

.item:hover {
  background: #eee;
}

.ghost {
  opacity: 0;
}
</style>
