<template>
  <div>
    <p>{{ videoDescription }}</p>
    <p>Uploaded by: {{ uploader }}</p>
    <p>Views: {{ viewsCount }}</p>
  </div>
</template>

<script>
export default {
  name: "VideoDetails",
  props: {
    videoId: String
  },
  data() {
    return {
      videoDescription: "This is a description of the video.", // Fetch data based on videoId
      uploader: "Uploader Name",
      viewsCount: 1000
    };
  }
};
</script>
