<template>
  <div class="w-full h-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-between mb-5">
      <div class="my-auto">
        <h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white">Spot Exchanges</h5>
      </div>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-3 py-3">
          #
        </th>
        <th scope="col" class="px-3 py-3">
          Name
        </th>
        <th scope="col" class="px-3 py-3">
          Volume(24h)
        </th>
      </tr>
      </thead>
      <tbody class="text-black dark:text-gray-400">
      <tr v-for="item in exchangeData" class="bg-white dark:bg-gray-800">
        <td class="px-3 py-3">
          {{ item.trust_score_rank }}
        </td>
        <th scope="row" class="px-3 py-3 font-medium text-gray-900 dark:text-white">
          <div class="flex space-x-2">
            <img class="w-5 h-5 my-auto rounded-full" :src="item.image" :alt="item.name">
            <div>
              <a :href="item.url" target="_blank" class="font-semibold">{{ item.name }}</a>
            </div>
          </div>
        </th>
        <td class="px-3 py-3">
          {{ formatPrice(item.trade_volume_24h_btc) }} BTC
        </td>

      </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePiniaStore } from '../store/pinia.js'

const store = usePiniaStore()

// reactive access to data using computed
const exchangeData = computed(() => store.exchangeData)

const formatPrice = (value, toFixed) => {
  let val = (value/1).toFixed(toFixed).replace(',', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const progress = (a, b) => {
  return b / a * 100
}

// execute a query when mounting a component
onMounted(() => {
  store.fetchExchangeData()
})
</script>