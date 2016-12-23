<template>
  <div class="row">
    <div class="col m8">
      <div class="card">
        <div class="card-content">
          <form autocomplete="off" v-on:submit.prevent="onSubmit">
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
            <button class="btn waves-effect waves-light purple darken-4 submit" type="submit" name="action">
              <span>Submit</span>
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
    };
  },
  methods: {
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
        onSet(context) {
          self.dob = moment(new Date(context.select)).format('DD/MM/YYYY');
        },
      });
    });
  },
};
</script>
