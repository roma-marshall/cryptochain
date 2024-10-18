// src/stores/pingStore.js
import { defineStore } from 'pinia'
import secret from './secret.js'

export const usePiniaStore = defineStore('data', {
  state: () => ({
    coinData: null,  // API data storage
    globalData: null,  // API data storage
    exchangeData: null,  // API data storage
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
            'x_cg_demo_api_key': secret.apiKey,
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

    async fetchGlobalData() {
      // check if the data already exists in the storage, then return it
      if (this.globalData) {
        return this.globalData
      }

      this.loading = true
      this.error = null

      try {
        const response = await fetch('https://api.coingecko.com/api/v3/global', {
          headers: {
            'x_cg_demo_api_key': secret.apiKey,
          },
        })

        // check if the request is successful
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const data = await response.json()

        this.globalData = data   // saving the data to the Pinia store
        return this.globalData

      } catch (error) {
        this.error = error
        throw error  // throw an error for processing at the component level
      } finally {
        this.loading = false
      }
    },

    async fetchExchangeData() {
      // check if the data already exists in the storage, then return it
      if (this.exchangeData) {
        return this.exchangeData
      }

      this.loading = true
      this.error = null

      try {
        const response = await fetch('https://api.coingecko.com/api/v3/exchanges?per_page=5&page=1', {
          headers: {
            'x_cg_demo_api_key': secret.apiKey,
          },
        })

        // check if the request is successful
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const data = await response.json()

        this.exchangeData = data   // saving the data to the Pinia store
        return this.exchangeData

      } catch (error) {
        this.error = error
        throw error  // throw an error for processing at the component level
      } finally {
        this.loading = false
      }
    },
  },
})
