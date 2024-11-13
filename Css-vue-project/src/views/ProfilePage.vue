<template>
  <div>
    <h1>User Profile</h1>
    <p>Welcome, {{ userName }}</p>
    <WatchHistory />
  </div>
</template>

<script>
import WatchHistory from "@/components/WatchHistory.vue"; // Component for viewing watch history

export default {
  name: "ProfilePage",
  data() {
    return {
      userName: "John Doe" // Replace with user data from authentication
    };
  },
  components: {
    WatchHistory
  }
};
</script>
