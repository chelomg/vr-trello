<template>
    <div class="main-counter">
        <p>Counter component: Vue counter</p>
        <p class="display-count"> {{ counterCount }} </p>
        <p>
          <button class="counter-button" @click="increaseCounter">+</button>
          <button class="counter-button" @click="decreaseCounter">-</button>
        </p>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CounterBlock',
  methods: {
    ...mapActions(['increaseCounter', 'decreaseCounter'])
  },
  computed: {
    ...mapGetters(['counterCount'])
  }
}
</script>
