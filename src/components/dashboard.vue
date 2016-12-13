<template>
  <div>
    dashboard
    <a class="waves-effect waves-light btn purple darken-4 logout" v-on:click="logout"><i class="material-icons right">power_settings_new</i>Logout</a>
  </div>
</template>

<script>
import router from './../router';
// import user from './../auth_helper';
import { authentication } from './../firebase';

export default {
  name: 'dashboard',
  data() {
    return {
      // user,
    };
  },
  methods: {
    logout() {
      authentication.signOut().then(() => {
        /* eslint-disable no-undef */
        Materialize.toast('Signed out successfully', 5000);
      }, (error) => {
        /* eslint-disable no-undef */
        Materialize.toast(`${error.message}, Failed to signout`, 5000);
      });
    },
  },
  created() {
    authentication.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
      } else {
        router.push({ path: 'login' });
      }
    });
  },
};
</script>
