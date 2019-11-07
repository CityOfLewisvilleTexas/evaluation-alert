<template>
  <div id="app">
    <div id="container">
      <div class="nav nav-item1"><img id="bell" src="./assets/icons/bell.svg" alt="bell"/></div>
      <div class="nav nav-item2">Employee Evaluation Alert</div>
      <div class="nav nav-item3"><!--<router-link to="/help">Help</router-link>--></div>
    </div>
     <home />
  </div>
</template>

<script>
import Home from './components/Home'
export default {
  components: {
    home: Home
  }
}
</script>
<style lang="scss">
@font-face {
  font-family: 'Rubik';
  src: url('./assets/typeface/Rubik-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
#app {
  font-family: "Rubik", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  background-color:purple;
  color: white;
  grid-auto-flow: column;
  padding:20px;
  border-radius: 15px;
  margin: 12px;

    a {
      text-decoration: none;
      color: #ffcc22;
    }
    .nav-item2,
    .nav-item3 
    {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
    }
    #bell {
      width:40px;
      transform: rotateZ(-24.6deg);
    }
}


</style>
