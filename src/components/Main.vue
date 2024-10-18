<template>
  <main class="p-4 md:ml-64 h-auto pt-20">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div
          class="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64"
      ></div>
      <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
      ></div>
      <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
      ></div>
      <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
      ></div>
    </div>
    <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 min-h-96 mb-4"
    >
<!--      <div v-for="item in coinData">-->
<!--        {{ item.symbol }}-->
<!--      </div>-->




      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              #
            </th>
            <th scope="col" class="px-6 py-3">
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
          <tbody class="text-black">
          <tr v-for="item in coinData" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ item.market_cap_rank }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <div class="whitespace-normal">
                <p class="font-semibold">{{ item.name }}</p>
                <p class="text-slate-500 font-normal uppercase">{{ item.symbol }}</p>
              </div>
            </th>
            <td class="px-6 py-4">
              ${{ formatPrice(item.current_price, 2) }}
            </td>
            <td class="px-6 py-4">
              {{ item.price_change_percentage_24h.toFixed(2) }} %
            </td>
            <td class="px-6 py-4">
              {{ item.ath_change_percentage.toFixed(2) }} %
            </td>
            <td class="px-6 py-4">
              ${{ formatPrice(item.market_cap, 0) }}
            </td>
            <td class="px-6 py-4">
              ${{ formatPrice(item.fully_diluted_valuation, 0) }}
            </td>
            <td class="px-6 py-4">
              {{ formatPrice(item.circulating_supply, 0) }}
              <span class="uppercase">{{ item.symbol }}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
    </div>
    <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
    ></div>
    <div class="grid grid-cols-2 gap-4">
      <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
      <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
      ></div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePiniaStore } from '../store/pinia.js'  // connecting Pinia Store

const store = usePiniaStore()

// reactive access to data using computed
const coinData = computed(() => store.coinData)

// execute a query when mounting a component
onMounted(() => {
  store.fetchCoinsData()
})

const formatPrice = (value, toFixed) => {
  let val = (value/1).toFixed(toFixed).replace(',', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
</script>