<template>
  <div>
    <Home />
<!--    <div v-if="loading">Loading...</div>-->
<!--    <div v-else-if="error">Error: {{ error.message }}</div>-->
<!--    <div v-else-if="coinData">-->
<!--      <p>Ping Data: {{ coinData }}</p>-->
<!--    </div>-->
  </div>
</template>

<script setup>
import Home from './components/Home.vue'

// import { ref, computed, onMounted } from 'vue'
// import { usePiniaStore } from './store/pinia.js'  // connecting Pinia Store
//
// const store = usePiniaStore()
//
// // reactive access to data using computed
// const coinData = computed(() => store.coinData)
// const loading = computed(() => store.loading)
// const error = computed(() => store.error)
//
// // execute a query when mounting a component
// onMounted(() => {
//   store.fetchCoinsData()
// })
</script>