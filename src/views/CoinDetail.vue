<template>
  <div class="flex flex-col">
    <div>
      <grid-loader :loading="isLoading" :color="'#68d391'"> </grid-loader>
    </div>
    <template v-if="!isLoading">
      <div class="flex flex-col lg:flex-row justify-between">
        <div class="m-5">
          <img
            class="w-16 m-auto"
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            :alt="asset.name"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="m-5 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span># {{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ $filters.dollarFilter(asset.priceUsd) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ $filters.dollarFilter(min) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ $filters.dollarFilter(max) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ $filters.dollarFilter(avg) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ $filters.percentFilter(asset.changePercent24Hr) }}</span>
            </li>
          </ul>
        </div>

        <div class="m-5 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>
          <span class="text-xl"></span>
        </div>
      </div>

      <line-chart
        class="my-10"
        :colors="['#FB8B24']"
        :min="min"
        :max="max"
        :data="history.map((h) => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
      >
      </line-chart>
    </template>
  </div>
</template>
<script>
import api from "@/api";
import GridLoader from "vue-spinner/src/GridLoader.vue";

export default {
  name: "CoinDetail",
  components: {
    GridLoader,
  },
  data() {
    return {
      asset: {},
      history: [],
      isLoading: false,
    };
  },

  computed: {
    min() {
      return Math.min(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    max() {
      return Math.max(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      );
    },
    avg() {
      return Number(
        (
          this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) /
          this.history.length
        ).toFixed(2)
      );
    },
  },

  created() {
    this.getCoin();
    this.isLoading = true;
  },

  methods: {
    getCoin() {
      const id = this.$route.params.id;

      Promise.all([api.getAsset(id), api.getAssetHistory(id)])
        .then(([asset, history]) => {
          this.asset = asset;
          this.history = history;
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
