<template>
  <div class="main">
    <nav class="purple darken-3">
      <div class="nav-wrapper">
        <ul class="right hide-on-med-and-down">
          <li>
            <a class="waves-effect waves-light logout" v-on:click="logout">
              Logout
              <i class="material-icons left">power_settings_new</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Page Layout here -->
    <div class="row" style="margin-bottom:0px;">
      <div class="col m2 dashboard-sidebar blue-grey darken-3">
        <ul class="collapsible blue-grey darken-3 blue-grey-text" data-collapsible="accordion">
          <li>
            <div class="collapsible-header">
              <i class="material-icons left">directions_car</i>
              Drivers
              <i class="material-icons right">arrow_drop_down</i>
            </div>
            <div class="collapsible-body">
              <ul class="collection">
                <li class="collection-item">
                  <router-link :to="'/dashboard'">
                    <i class="material-icons left">
                      keyboard_arrow_right
                    </i>
                    All drivers
                  </router-link>
                </li>
                <li class="collection-item">
                  <router-link :to="'/dashboard/new-driver'">
                    <i class="material-icons left">
                      keyboard_arrow_right
                    </i>
                    Add new driver
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="material-icons left">people</i>
              Passengers
              <i class="material-icons right">arrow_drop_down</i>
            </div>
            <div class="collapsible-body">
              <ul class="collection">
                <li class="collection-item"><i class="material-icons left">keyboard_arrow_right</i>All Passengers</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="col s12 m10 dashboard-main">
        <router-view></router-view>
      </div>
    </div>
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
        /* eslint-disable no-undef */
        $(document).ready(() => {
          $('.collapsible').collapsible();
        });
      } else {
        router.push({ path: '/login' });
      }
    });
  },
};
</script>

<style>
  .dashboard-sidebar, .dashboard-main {
    /*min-height: 100vh !important;*/
    height: 100vh;
    overflow-y: auto;
  }

  .dashboard-main {
    background-color: #e9edf2;
  }

  .dashboard-sidebar {
    padding: 0 !important;
  }

  .collapsible .collapsible-header, .collapsible-body, .collection .collection-item {
    background-color: #37474f;
    border-bottom: none !important;
  }

  .collapsible {
    border-top: none;
    border-right: none;
    border-left: none;
    margin: 0.5rem 0 1rem 0;
    box-shadow: none;
  }

  .collapsible-header:hover, .collapsible li:hover, .collapsible .active {
    background-color: #263238;
    color: white;
  }

  .collapsible li:hover {
    background-color: #455a64;
  }
</style>
