Vue.component('CoinDetail', {
  props: ['heading', 'changePercent', 'img', 'price'],

  data() {
    return {
      showPrices: false,
      value: 0,
    }
  },

  methods: {
    toggleShowPrices() {
      this.showPrices = !this.showPrices;
      this.color = this.color.split('').reverse().join('');
    }
  },

  computed: {
    convertedValue() {
      if (!this.value) {
        return 0
      }
      return this.value / this.price
    }
  },

  template: `
  <div>
    <img
      v-on:mouseover="toggleShowPrices"
      v-on:mouseout="toggleShowPrices"
      v-bind:src="img"
      v-bind:alt="heading"
    />
    <h1 
      v-bind:class="changePercent > 0 ? 'success' : 'danger'"
    >
      {{ heading }}
      <!-- directivas condicionales - S -->
      <span v-if="changePercent > 0">👍</span>
      <span v-else-if="changePercent < 0">👎</span>
      <span v-else>🤞</span>
      <!-- directivas condicionales - E -->
      <span v-on:click="toggleShowPrices">{{ !showPrices ? '🐵' : '🙈 '}}</span>
    </h1>

    <input type="number" v-model="value" />
    <span> {{ convertedValue }} </span>

  </div>

  `
})

new Vue({
  el: "#app",
  data() {
    return {
      heading: "Bitcoin",
      symbol: 'BTC',
      img: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      changePercent: 0,
      price: 8400,
      color: 'f4f4f4',
      value: 0,
      pricesWithDays: [
        { day: 'Lunes', value: 8400 },
        { day: 'Martes', value: 7900 },
        { day: 'Miercoles', value: 8200 },
        { day: 'Jueves', value: 9000 },
        { day: 'Viernes', value: 9400 },
        { day: 'Sabado', value: 10000 },
        { day: 'Domingo', value: 10200 },
      ],
      showPrices: false
    };
  },

  computed: {
    title() {
      return `${this.heading} - ${this.symbol}`
    },

    convertedValue() {
      if (!this.value) {
        return 0
      }
      return this.value / this.price
    }
  },

  watch: {
    showPrices(newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  },

  methods: {
    toggleShowPrices() {
      this.showPrices = !this.showPrices;
      this.color = this.color.split('').reverse().join('');
    }


  },
});
