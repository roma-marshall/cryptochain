// src/stores/pingStore.js
import { defineStore } from 'pinia'

export const usePiniaStore = defineStore('data', {
  state: () => ({
    coinData: null,  // API data storage
    globalData: null,  // API data storage
    loading: false,  // to monitor the status of the download
    error: null,     // to track errors
    hourlyTimestamps: [],
    firstTimestamp: null,
    lastTimestamp: null,
    btcD: null
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
            'x_cg_demo_api_key': import.meta.env.VITE_API_KEY,
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

    async generateHourlyTimestamps() {
      const timestamps = []
      const now = new Date()

      // set the date to the beginning of the current day (midnight)
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)

      // function for formatting timestamp in the format dd.mm.YY, HH:MM
      const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = String(date.getFullYear()).slice(-2)
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${day}.${month}.${year}, ${hours}:${minutes}`
      }

      // generating timestamps for each hour
      for (let i = 0; i < 24; i++) {
        const timestamp = Math.floor(new Date(startOfDay.getTime() + i * 60 * 60 * 1000).getTime() / 1000)
        // timestamps.push(formatTimestamp(timestamp))
        timestamps.push(timestamp)
      }

      this.firstTimestamp = timestamps[0]
      this.lastTimestamp = timestamps[timestamps.length - 1]

      this.hourlyTimestamps = timestamps   // saving the data to the Pinia store
      return this.hourlyTimestamps
    },

    async fetchBTCD() {
      // check if the data already exists in the storage, then return it
      if (this.btcD) {
        return this.btcD
      }

      this.loading = true
      this.error = null

      const from = 1729202400
      const to = 1729285200

      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${from}&to=${to}`, {
          headers: {
            'x_cg_demo_api_key': import.meta.env.VITE_API_KEY,
          },
        })


        // check if the request is successful
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const data = await response.json()

        this.btcD = data   // saving the data to the Pinia store
        return this.btcD

      } catch (error) {
        this.error = error
        throw error  // throw an error for processing at the component level
      } finally {
        this.loading = false
      }
    },
  },
})
