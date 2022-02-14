Vue.component('CoinDetail', {
  props: ['coin'],

  data() {
    return {
      showPrices: false,
      value: 0,
    }
  },

  methods: {
    toggleShowPrices() {
      this.showPrices = !this.showPrices;
      // this.coin.color = this.coin.color.split('').reverse().join('');

      this.$emit('change-color')
    }
  },

  computed: {
    title() {
      return `${this.coin.heading} - ${this.coin.symbol}`
    },

    convertedValue() {
      if (!this.value) {
        return 0
      }
      return this.value / this.coin.price
    }
  },

  template: `
  <div>
    <img
      v-on:mouseover="toggleShowPrices"
      v-on:mouseout="toggleShowPrices"
      v-bind:src="coin.img"
      v-bind:alt="coin.heading"
    />
    <h1 
      v-bind:class="coin.changePercent > 0 ? 'success' : 'danger'"
    >
      {{ coin.heading }}
      <!-- directivas condicionales - S -->
      <span v-if="coin.changePercent > 0">👍</span>
      <span v-else-if="coin.changePercent < 0">👎</span>
      <span v-else>🤞</span>
      <!-- directivas condicionales - E -->
      <span v-on:click="toggleShowPrices">{{ !showPrices ? '🐵' : '🙈 '}}</span>
    </h1>

    <input type="number" v-model="value" />
    <span> {{ convertedValue }} </span>

    <ul v-show="showPrices">
    <li
      class="uppercase"
      v-bind:class="{
          success: p.value > coin.price,
          danger: p.value < coin.price,
          stable: p.value === coin.price
      }"
      v-for="(p, i) in coin.pricesWithDays"
      v-bind:key="p.day"
    >
      {{ p.day }} - {{ p.value }}
    </li>
  </ul>

  </div>

  `
})

new Vue({
  el: "#app",
  data() {
    return {
      btc: {
        heading: "Bitcoin",
        symbol: 'BTC',
        img: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        changePercent: 0,
        price: 8400,

        pricesWithDays: [
          { day: 'Lunes', value: 8400 },
          { day: 'Martes', value: 7900 },
          { day: 'Miercoles', value: 8200 },
          { day: 'Jueves', value: 9000 },
          { day: 'Viernes', value: 9400 },
          { day: 'Sabado', value: 10000 },
          { day: 'Domingo', value: 10200 },
        ],
      },
      color: 'f4f4f4',
    };
  },

  methods: {
    updateColor() {
      this.color = this.color.split('').reverse().join('');
    }
  },
});
