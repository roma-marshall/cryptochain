<template>
  <div class="w-full h-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-between mb-5">
      <div class="my-auto">
        <h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white">Market Cap</h5>
      </div>
      <div class="flex items-center px-2.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
        ${{ formatPrice(totalMC) }}
        <svg class="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
        </svg>
      </div>
    </div>
    <Apexchart type="donut" height="80%" :options="chartOptions" :series="chartOptions.series" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { usePiniaStore } from '../store/pinia.js'

const Apexchart = VueApexCharts
const store = usePiniaStore()

const btc = computed(() => store.globalData?.data.market_cap_percentage.btc.toFixed(2))
const eth = computed(() => store.globalData?.data.market_cap_percentage.eth.toFixed(2))
const bnb = computed(() => store.globalData?.data.market_cap_percentage.bnb.toFixed(2))
const sol = computed(() => store.globalData?.data.market_cap_percentage.sol.toFixed(2))
const usdt = computed(() => store.globalData?.data.market_cap_percentage.usdt.toFixed(2))
const totalMC = computed(() => store.globalData?.data.total_market_cap.usd)

const chartOptions = ref({
  series: [Number(btc.value), Number(eth.value), Number(bnb.value), Number(sol.value), Number(usdt.value)],
  colors: ["#F6931A", "#626890", "#F0BB01", "#6E72E5", "#009494"],
  chart: {
    height: 320,
    width: "100%",
    type: "donut",
  },
  stroke: {
    colors: ["transparent"],
    lineCap: "",
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            show: true,
            fontFamily: "Inter, sans-serif",
            offsetY: 20,
          },
          total: {
            showAlways: false,
            show: true,
            label: "Dominance",
            fontFamily: "Inter, sans-serif",
            formatter: function (w) {
              const sum = w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0);
              return 'TOTAL'
            },
          },
          value: {
            show: true,
            fontFamily: "Inter, sans-serif",
            offsetY: -20,
            formatter: function (value) {
              return value + "%";
            },
          },
        },
        size: "80%",
      },
    },
  },
  grid: {
    padding: {
      top: -2,
    },
  },
  labels: ["BTC", "ETH", "BNB", "SOL", "USDT"],
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: "bottom",
    fontFamily: "Inter, sans-serif",
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return value + "%";
      },
    },
  },
  xaxis: {
    labels: {
      formatter: function (value) {
        return value + "%";
      },
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
});

const formatPrice = value => {
  let val = (value/1).toFixed(0).replace(',', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// watch the data changes and update the series for the graph
watchEffect(() => {
  chartOptions.value.series = [
    Number(btc.value),
    Number(eth.value),
    Number(bnb.value),
    Number(sol.value),
    Number(usdt.value)
  ]
})

onMounted(() => {
  store.fetchGlobalData()
})
</script>