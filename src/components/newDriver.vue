<template>
  <div class="row">
    <div class="col m8">
      <div class="card">
        <div class="card-content">
          <form autocomplete="off" v-on:submit.prevent="onSubmit">
            <div class="row">
              <div class="col s12 card-title driver-header">
                Driver details
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12 m6">
                <input id="firstname" type="text" class="validate" v-model="firstname">
                <label for="firstname">First Name</label>
              </div>
              <div class="input-field col s12 m6">
                <input id="lastname" type="text" class="validate" v-model="lastname">
                <label for="lastname">Last Name</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12 m4">
                <input type="text" v-model="dob" class="datepicker" id="dob">
                <label for="dob">Date of birth</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12 m6">
                <input id="phone_number" type="text" class="validate" v-model="phone_number">
                <label for="phone_number">Phone Number</label>
              </div>
              <div class="input-field col s12 m6">
                <input id="email" type="email" class="validate" v-model="email">
                <label for="email">E-mail Adress</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <textarea id="adress" class="materialize-textarea" v-model="address"></textarea>
                <label for="address">Address</label>
              </div>
            </div>
            <div class="row">
              <div class="col s12 card-title driver-header">
                Next of Kin information
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12 m6">
                <input id="nokname" type="text" class="validate" v-model="next_of_kin.name">
                <label for="nokname">Name</label>
              </div>
              <div class="input-field col s12 m6">
                <input id="nokphone_number" type="text" class="validate" v-model="next_of_kin.phone_number">
                <label for="nokphone_number">Phone Number</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <textarea id="nokaddress" class="materialize-textarea" v-model="next_of_kin.address"></textarea>
                <label for="nokaddress">Address</label>
              </div>
            </div>
            <button class="btn waves-effect waves-light purple darken-4 submit" type="button" name="action" v-on:click="addDriver">
              <span>Create</span>
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="col m4">
      <div class="card">
        <div class="card-content">
          area for seeing statistics and changing status
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import router from './../router';
import { secApp, database } from './../firebase';

export default{
  name: 'newDriver',
  data() {
    return {
      firstname: '',
      lastname: '',
      dob: '',
      phone_number: '',
      email: '',
      address: '',
      next_of_kin: {
        name: '',
        address: '',
        phone_number: '',
      },
    };
  },
  methods: {
    addDriver() {
      const dbPayload = {
        firstname: this.firstname,
        lastname: this.lastname,
        phone_number: this.phone_number,
        dob: this.dob,
        address: this.address,
        email: this.email,
        next_of_kin: this.next_of_kin,
        role: 'driver',
        total_drives: 0,
        rating: 0,
        total_rating: 0,
      };

      secApp.auth().createUserWithEmailAndPassword(this.email, 'Password2015#').catch((error) => {
        const errorMessage = error.message;
        this.handleError(errorMessage);
      }).then((user) => {
        secApp.auth().signOut();
        const uid = user.uid;
        dbPayload.uid = uid;

        database.ref(`/drivers/${uid}`).set(dbPayload).catch((error) => {
          const errorMessage = error.message;
          this.handleError(errorMessage);
        }).then(() => {
          /* eslint-disable no-undef */
          Materialize.toast('User created', 4000);
          router.push({ path: '/dashboard' });
        });
      });
    },
    handleError(errorMessage) {
      /* eslint-disable no-undef */
      const message = `<span><i class="material-icons left">priority_high</i> ${errorMessage}</span>`;
      Materialize.toast(message, 4000);
    },
  },
  created() {
    const self = this;
    /* eslint-disable no-undef */
    $(document).ready(() => {
      $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 80,
        formatSubmit: 'dd/mm/yyyy',
        format: 'dd/mm/yyyy',
        today: '',
        min: new Date(1970, 0, 1),
        max: new Date(1996, 11, 31),
        onSet(context) {
          self.dob = moment(new Date(context.select)).format('DD/MM/YYYY');
        },
      });
    });
  },
};
</script>

<style>
  .driver-header {
    border-bottom: 1px #7f7f7f solid;
  }
</style>
