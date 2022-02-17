<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th>
          <span>Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block"></td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in assets"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
        :key="item.id"
      >
        <td>
          <img
            class="w-8"
            :src="`https://static.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`"
            :alt="item.name"
          />
        </td>
        <td>
          <b># {{ item.rank }}</b>
        </td>
        <td>
          <router-link
            class="underline hover:no-underline text-green-600 font-semibold"
            :to="{ name: 'coin-detail', params: { id: item.id } }"
          >
            {{ item.name }}
          </router-link>
          <span
            class="ml-1 rounded-full text-sm text-white bg-gray-400 px-2 mr-2"
            >{{ item.symbol }}</span
          >
        </td>
        <td>{{ $filters.dollarFilter(item.priceUsd) }}</td>
        <td>{{ $filters.dollarFilter(item.marketCapUsd) }}</td>
        <td
          :class="
            item.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ $filters.percentFilter(item.changePercent24Hr) }}
        </td>
        <td class="hidden sm:block">
          <px-button @custom-click="goToCoin(item.id)"
            ><span>Ver Detalle</span></px-button
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import PxButton from "@/components/PxButton";
export default {
  name: "PxAssetsTable",
  components: { PxButton },
  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goToCoin(id) {
      this.$router.push({ name: "coin-detail", params: { id } });
    },
  },
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
