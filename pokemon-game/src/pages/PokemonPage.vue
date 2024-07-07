<template>
  <h1 v-if="!pokemon">Cargando...</h1>

  <div v-if="pokemon">
    <h1>¿Quién es este Pokemon?</h1>

    <PokemonPictureVue :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
    <PokemonOptionsVue :pokemon-arr="pokemonArr" @select:poke="checkAnswer" />

    <template v-if="showAnswer">
      <h2>{{ message }}</h2>
      <button @click="newGame">Nuevo juego</button>
    </template>
  </div>
</template>

<script>
import PokemonPictureVue from '@/components/PokemonPicture.vue'
import PokemonOptionsVue from '@/components/PokemonOptions.vue'

import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
  components: {
    PokemonPictureVue,
    PokemonOptionsVue
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    async mixPokemonArr() {
      this.pokemonArr = await getPokemonOptions()
      this.pokemon = this.pokemonArr[Math.floor(Math.random() * 4)]
    },
    checkAnswer(pokeId) {
      if (pokeId !== this.pokemon.id) {
        this.message = `Incorrecto, el pokemon correcto era: ${this.pokemon.name}`
        this.showAnswer = true;
        return
      }

      this.showPokemon = true
      this.message = `Correcto, el pokemon es: ${this.pokemon.name}`
      this.showAnswer = true;
    },
    newGame() {
      this.pokemon = null
      this.pokemonArr = []
      this.showPokemon = false
      this.showAnswer = false
      this.mixPokemonArr()
    }
  },
  mounted() {
    this.mixPokemonArr()
  }
}
</script>

<style></style>