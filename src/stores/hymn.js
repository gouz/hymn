import { defineStore } from "pinia";

import axios from "axios";

export const useStore = defineStore("hymn", {
  state: () => ({
    ranges: {},
    rhythms: {},
    sentence: "",
  }),
  actions: {
    async fetchRanges() {
      const data = await axios.get(`/json/ranges.json`);
      this.ranges = data.data;
    },
    async fetchRhythms() {
      const data = await axios.get(`/json/rhythms.json`);
      this.rhythms = data.data;
    },
  },
});
