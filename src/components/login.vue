<template>
  <div class="bg-picture">
    <div class="row">
      <div class="col s12 m6 l4 offset-m3 offset-l4 center-panel">
        <div class="card-panel">
          <div class="card-title center-align purple-text text-darken-4"><h4>Picad</h4></div>
          <form autocomplete="off" v-on:submit.prevent="onSubmit">
            <div class="row">
              <div class="input-field col s12">
                <input id="username" type="text" class="validate" v-model="username">
                <label for="username">Username</label>
              </div>
              <div class="input-field col s12">
                <input id="password" type="password" class="validate" v-model="password">
                <label for="password">Password</label>
              </div>
            </div>
            <button class="btn waves-effect waves-light purple darken-4 submit" type="submit" name="action">
              Submit
              <i class="material-icons right spin">send</i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from './../router';
import user from './../auth_helper';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      /* eslint-disable no-console */
      console.log(`${this.username} ${this.password}`);
      console.log(document.querySelector('.submit'));
    },
  },
  created() {
    if (user !== null) {
      router.push({ path: 'dashboard' });
    }
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Parisienne');

  .center-panel {
    position: fixed;
    top: 50%;
    /* bring your own prefixes */
    transform: translate(0%, -50%);
  }
  /* label color */
  .input-field label {
   color: #4a148c;
  }
  /* label focus color */
  .input-field input[type=text]:focus + label, .input-field input[type=password]:focus + label {
   color: #4a148c;
  }
  /* label underline focus color */
  .input-field input[type=text]:focus, .input-field input[type=password]:focus {
   border-bottom: 1px solid #4a148c;
   box-shadow: 0 1px 0 0 #4a148c;
  }
  .bg-picture {
    background-color: rgba(74, 20, 140, 0.5);
    height: 100vh;
  }
  .card-title h4 {
    font-family: 'Parisienne', cursive;
  }

  .spin {
    animation: fa-spin 2s infinite linear;
  }

  @-moz-keyframes fa-spin {
    from { -moz-transform: rotate(0deg); }
    to { -moz-transform: rotate(360deg); }
}
@-webkit-keyframes fa-spin {
    from { -webkit-transform: rotate(0deg); }
    to { -webkit-transform: rotate(360deg); }
}
@keyframes fa-spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
}
</style>
