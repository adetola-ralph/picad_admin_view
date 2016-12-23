<template>
  <div class="row">
    <div class="col m8">
      <div class="card">
        <div class="card-content">
          <div class="row">
            <fieldset>
              <legend>Personal details</legend>
              <div class="row">
                <div class="col s12">
                  <span><strong>First Name</strong>: {{ driver.firstname | capitalize }}</span>
                </div>
                <div class="col s12">
                  <span><strong>Last Name</strong>: {{ driver.lastname | capitalize }}</span>
                </div>
                <div class="col s12">
                  <span><strong>Date of birth</strong>: {{ driver.dob | longDate }}</span>
                </div>
                <div class="col s12">
                  <span><strong>age</strong>: {{ age }}</span>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Contact details</legend>
              <div class="row">
                <div class="col s12">
                  <span><strong>Address:</strong> {{ driver.address }}
                </div>
                <div class="col s12">
                  <span><strong>Phone number:</strong> {{ driver.phone_number }}
                </div>
                <div class="col s12">
                  <span><strong>Email:</strong> {{ driver.email }}
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Next of kin information</legend>
              <div class="row">
                <div class="col s12">
                  <span><strong>Name:</strong> {{ next_of_kin.name | capitalize }}
                </div>
                <div class="col s12">
                  <span><strong>Phone number:</strong> {{ next_of_kin.phone_number }}
                </div>
                <div class="col s12">
                  <span><strong>Address:</strong> {{ next_of_kin.address }}
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Drive information</legend>
              <div class="row">
                <div class="col s12">
                  <span><strong>Average Rating:</strong> {{ driver.rating }}
                </div>
                <div class="col s12">
                  <span><strong>Total Drives:</strong> {{ driver.total_drives }}
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Identification details</legend>
              <div class="row">
                <div class="col s12">
                  <span><strong>Name:</strong> {{ next_of_kin.name | capitalize }}
                </div>
                <div class="col s12">
                  <span><strong>Phone number:</strong> {{ next_of_kin.phone_number }}
                </div>
              </div>
            </fieldset>
          </div>
          <div class="row">
            <div class="col s12">
              <button class="btn btn waves-effect waves-light purple darken-4 edit">
                Edit drivers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col m4">
      <div class="card">
        <div class="card-content">
          <div class="card-title">
            <h5>Profile Image</h5>
          </div>
          <div class="row">
            <img class="responsive-img" v-bind:src="profileImage">
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="row">
            <div class="card-title">
              <h5>Driver status</h5>
            </div>
            <div class="switch">
              <label>
                not active
                <input type="checkbox" v-bind:checked="active">
                <span class="lever"></span>
                active
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { database } from './../firebase';

export default {
  name: 'driverDetail',
  data() {
    return {
      driver: {},
      next_of_kin: {},
    };
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      const strvalue = value.toString();
      return strvalue.charAt(0).toUpperCase() + strvalue.slice(1);
    },
    longDate(value) {
      return moment(new Date(value)).format('Do MMMM, YYYY');
    },
  },
  computed: {
    age() {
      const age = moment(new Date(this.driver.dob), 'DDMMYYYY').fromNow().split(' ');
      age.pop();
      return age.join(' ');
    },
    profileImage() {
      return this.driver.profile_image || '/static/driver.png';
    },
    active() {
      return this.driver.status === 'active';
    },
  },
  created() {
    /* eslint-disable no-undef */
    const driverId = this.$route.params.did;
    database.ref(`/drivers/${driverId}`).once('value').then((snapshot) => {
      const driver = snapshot.val();
      this.driver = driver;
      this.next_of_kin = driver.next_of_kin;
    });
  },
};
</script>

<style>
  legend{
    font-weight: bold;
  }
</style>
