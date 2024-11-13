<template>
  <div>
    <h1>Category: {{ categoryName }}</h1>
    <VideoList :category="categoryName" /> <!-- Pass category name to VideoList -->
  </div>
</template>

<script>
import VideoList from "@/components/VideoList.vue";

export default {
  name: "CategoryPage",
  data() {
    return {
      categoryName: this.$route.params.category // Assuming category name is passed as a route parameter
    };
  },
  components: {
    VideoList
  }
};
</script>
