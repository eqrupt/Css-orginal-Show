<template>
  <div>
    <h1>{{ videoTitle }}</h1>
    <VideoPlayer :videoId="videoId" />
    <VideoDetails :videoId="videoId" />
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import VideoDetails from "@/components/VideoDetails.vue";

export default {
  name: "VideoPlayerPage",
  data() {
    return {
      videoId: this.$route.params.id, // Get video ID from URL
      videoTitle: "Sample Video Title" // You can fetch this from an API based on videoId
    };
  },
  components: {
    VideoPlayer,
    VideoDetails
  }
};
</script>
