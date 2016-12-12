<template>
  <div>
    dashboard {{user}}
  </div>
</template>

<script>
import router from './../router';
import user from './../auth_helper';

export default {
  name: 'dashboard',
  data() {
    return {
      user,
    };
  },
  created() {
    if (user === null) {
      router.push({ path: 'login' });
    }
  },
};
</script>
