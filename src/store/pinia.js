// src/stores/pingStore.js
import { defineStore } from 'pinia'

export const usePiniaStore = defineStore('data', {
  state: () => ({
    coinData: null,  // API data storage
    loading: false,  // to monitor the status of the download
    error: null,     // to track errors
  }),

  actions: {
    async fetchCoinsData() {
      // check if the data already exists in the storage, then return it
      if (this.coinData) {
        return this.coinData
      }

      this.loading = true
      this.error = null

      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', {
          headers: {
            'x_cg_demo_api_key': import.meta.env.VITE_API_KEY,
          },
        })


        // check if the request is successful
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const data = await response.json()

        this.coinData = data   // saving the data to the Pinia store
        return this.coinData

      } catch (error) {
        this.error = error
        throw error  // throw an error for processing at the component level
      } finally {
        this.loading = false
      }
    },
  },
})
