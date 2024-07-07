<template>
  <div class="options-container">
    <ul v-if="!pokeSelected">
      <li v-for="poke in pokemonArr" :key="poke.id" @click="setPokeSelected(poke.id)">{{ poke.name
        }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokeSelected: false
    }
  },
  methods: {
    setPokeSelected(pokeId) {
      this.$emit('select:poke', pokeId)
      this.pokeSelected = true
    }
  },
  props: {
    pokemonArr: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 20px 0 0 0;
  padding: 0;
}

li {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  width: 250px;
  padding: 10px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
  display: flex;
  justify-content: center;
}
</style>