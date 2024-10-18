<template>
  <div>
    <Home />
  </div>
</template>

<script setup>
import Home from './components/Home.vue'


const fetchData = async () => {
  const response = await fetch(`https://api.coingecko.com/api/v3/ping`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x_cg_demo_api_key': import.meta.env.VITE_API_KEY
    }
  })
  const data = await response.json()
}
</script>