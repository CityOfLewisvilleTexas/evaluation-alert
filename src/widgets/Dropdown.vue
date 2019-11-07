<template lang="html">
  <sui-dropdown
    multiple
    fluid
    :options="employees"
    placeholder="Employees"
    search
    selection
    v-model="current"
  />
</template>

<script>
import { Dropdown } from 'semantic-ui-vue'

export default {
  name: 'dropdown',
  components: {
      'sui-dropdown': Dropdown
  },
  props: ['employees'],
  data() {
    return {
      current: null
    };
  },
};
</script>