<template>
  <div class="flex-container">
    <div class="col m4 s6 l3" v-for="(driver, index) in drivers">
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" v-bind:src="profileImage(driver)">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4"><i class="material-icons right">more_vert</i></span>
          {{ driver.firstname + ' ' + driver.lastname }}
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">{{ driver.lastname }}<i class="material-icons right">close</i></span>
          <ul>
            <li>Rating</li>
          </ul>
          <div class="card-action">
            <a href="#">Edit</a>
            <a href="#">View</a>
            <a href="#">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { database } from './../firebase';

export default{
  name: 'drivers',
  data() {
    return {
      drivers: [],
      defaultImage: '/static/driver.png',
    };
  },
  methods: {
    profileImage(driver) {
      return driver.profile_image || this.defaultImage;
    },
  },
  created() {
    database.ref('/users/').once('value').then((snapshot) => {
      const arrayValues = Object.values(snapshot.val());
      for (const val of arrayValues) {
        this.drivers.push(val);
      }
    });
    database.ref('/users/').on('child_changed', (data) => {
      this.drivers.push(data.val());
    });
  },
};
</script>

<style>
  .flex-container {
    display:flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
</style>
