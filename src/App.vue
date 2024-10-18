<template>
  <div>
    <Home />
<!--    <div v-if="loading">Loading...</div>-->
<!--    <div v-else-if="error">Error: {{ error.message }}</div>-->
<!--    <div v-else-if="coinData">-->
<!--      <p>Ping Data: {{ coinData[0] }}</p>-->
<!--    </div>-->
  </div>
</template>

<script setup>
import Home from './components/Home.vue'

import { ref, onMounted } from 'vue'
import { usePiniaStore } from './store/pinia.js'  // Подключаем Pinia Store

const piniaStore = usePiniaStore()
const { fetchCoinsData, coinData, loading, error } = piniaStore

// Выполняем запрос при монтировании компонента
onMounted(() => {
  fetchCoinsData()
})
</script>