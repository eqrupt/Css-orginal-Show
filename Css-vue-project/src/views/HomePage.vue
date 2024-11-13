<template>
  <div>
    <h1>Welcome to Video Streaming Platform</h1>
    <p>Explore the best videos here!</p>
    <VideoList /> <!-- VideoList component to display video thumbnails -->
  </div>
</template>

<script>
import VideoList from "@/components/VideoList.vue"; // Import the VideoList component

export default {
  name: "HomePage",
  components: {
    VideoList
  }
};
</script>
