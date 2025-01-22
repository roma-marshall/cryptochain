<template>
  <main class="flex flex-col p-4 md:ml-64 h-auto pt-20">
    <div class="order-1 lg:order-0 grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <div
          class="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 min-h-32 md:min-h-64"
      >
        <TotalChart />
      </div>
      <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 min-h-32 md:min-h-64"
      >
        <ExchangeList />
      </div>
    </div>
    <div
        class="order-0 lg:order-1 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 min-h-96 mb-4"
    >
      <CoinList />
    </div>
    <div class="order-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
    <div class="order-4 grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
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
        class="order-5 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
    ></div>
    <div class="order-6 grid grid-cols-2 gap-4">
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
import TotalChart from './TotalChart.vue'
import CoinList from './CoinList.vue'
import ExchangeList from './ExchangeList.vue'
</script>
