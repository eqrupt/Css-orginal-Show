<template>
  <div>
    <h2>Watch History</h2>
    <ul>
      <li v-for="history in historyList" :key="history.id">{{ history.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "WatchHistory",
  data() {
    return {
      historyList: [
        { id: 1, title: "Sample Video 1" },
        { id: 2, title: "Sample Video 2" }
      ]
    };
  }
};
</script>
