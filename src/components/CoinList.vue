<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          #
        </th>
        <th scope="col" class="px-6 py-3 sticky md:static left-0 bg-gray-50">
          Name
        </th>
        <th scope="col" class="px-6 py-3">
          Price
        </th>
        <th scope="col" class="px-6 py-3">
          24h %
        </th>
        <th scope="col" class="px-6 py-3">
          ATH %
        </th>
        <th scope="col" class="px-6 py-3">
          Market Cap
        </th>
        <th scope="col" class="px-6 py-3">
          FDV
        </th>
        <th scope="col" class="px-6 py-3">
          Circulating Supply
        </th>
      </tr>
      </thead>
      <tbody class="text-black dark:text-gray-400">
      <tr v-for="item in coinData" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-white md:bg-transparent">
          {{ item.market_cap_rank }}
        </th>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white sticky md:static left-0 bg-white md:bg-transparent">
          <div class="flex space-x-2 whitespace-normal">
            <img class="w-8 h-8 my-auto rounded-full" :src="item.image" :alt="item.name">
            <div>
              <p class="font-semibold">{{ item.name }}</p>
              <p class="text-slate-500 font-normal uppercase">{{ item.symbol }}</p>
            </div>
          </div>
        </th>
        <td class="px-6 py-4">
          ${{ formatPrice(item.current_price, 2) }}
        </td>
        <td
            class="px-6 py-4"
            :class="item.price_change_percentage_24h > 0 ? 'text-green-500': 'text-red-500'"
        >
          {{ item.price_change_percentage_24h.toFixed(2) }} %
        </td>
        <td
            class="px-6 py-4"
            :class="item.ath_change_percentage > 0 ? 'text-green-500': 'text-red-500'"
        >
          {{ item.ath_change_percentage.toFixed(2) }} %
        </td>
        <td class="px-6 py-4">
          ${{ formatPrice(item.market_cap, 0) }}
        </td>
        <td class="px-6 py-4">
          ${{ formatPrice(item.fully_diluted_valuation, 0) }}
        </td>
        <td class="px-6 py-4" :class="{ 'align-bottom' : progress(item.total_supply, item.circulating_supply) !== 100 }">
          {{ formatPrice(item.circulating_supply, 0) }}
          <span class="uppercase">{{ item.symbol }}</span>
          <div v-if="progress(item.total_supply, item.circulating_supply) !== 100" class="w-full bg-[#eff2f5] rounded-full h-1.5 mt-1 dark:bg-[#222531]">
            <div class="bg-[#cfd6e4] h-1.5 rounded-full dark:bg-[#374151]" :style="`width: ${progress(item.total_supply, item.circulating_supply)}%;`"></div>
          </div>
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
const coinData = computed(() => store.coinData)

const formatPrice = (value, toFixed) => {
  let val = (value/1).toFixed(toFixed).replace(',', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const progress = (a, b) => {
  return b / a * 100
}

// execute a query when mounting a component
onMounted(() => {
  store.fetchCoinsData()
})
</script>