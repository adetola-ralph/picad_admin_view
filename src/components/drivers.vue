<template>
  <div class="flex-container">
    <div class="col m3 s6 l2 driver-card" v-for="(driver, index) in drivers" v-bind:key="driver.uid">
      <div class="card">
        <div class="card-image">
          <img class="activator" v-bind:src="profileImage(driver)">
          <span class="card-title">{{ driver.firstname + ' ' + driver.lastname | capitalize }}</span>
        </div>
        <div class="card-action">
          <a href="#">View</a>
          <a href="#">Edit</a>
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
    database.ref('/drivers/').once('value').then((snapshot) => {
      const arrayValues = Object.values(snapshot.val());
      for (const val of arrayValues) {
        this.drivers.push(val);
      }
    });
    database.ref('/drivers/').on('child_changed', (data) => {
      this.drivers.filter((item, index) => {
        if (item.uid === data.val().uid) {
          return this.drivers.splice(index, 1, data.val());
        }
        return null;
      });
    });
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      const strvalue = value.toString();
      return strvalue.charAt(0).toUpperCase() + strvalue.slice(1);
    },
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

  .driver-card {
    margin-left: 0 !important;
  }
</style>
