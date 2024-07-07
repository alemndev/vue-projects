<template>
  <h1 v-if="!pokemon">Cargando...</h1>

  <div v-if="pokemon">
    <h1>¿Quién es este Pokemon?</h1>

    <PokemonPictureVue :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
    <PokemonOptionsVue :pokemon-arr="pokemonArr" @select:poke="checkAnswer" />

    <div v-if="showAnswer" class="answer-container">
      <h2 :class="correctAnswer ? 'correct' : 'incorrect'">{{ message }}</h2>
      <button @click="newGame">Nuevo juego</button>
    </div>
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
      message: '',
      correctAnswer: false
    }
  },
  methods: {
    async mixPokemonArr() {
      this.pokemonArr = await getPokemonOptions()
      this.pokemon = this.pokemonArr[Math.floor(Math.random() * 4)]
    },
    checkAnswer(pokeId) {
      if (pokeId !== this.pokemon.id) {
        this.showPokemon = true
        this.message = `Incorrecto, el pokemon correcto era: ${this.pokemon.name}`
        this.showAnswer = true;
        return
      }

      this.correctAnswer = true;
      this.showPokemon = true
      this.message = `Correcto, el pokemon es: ${this.pokemon.name}`
      this.showAnswer = true;
    },
    newGame() {
      this.pokemon = null
      this.pokemonArr = []
      this.showPokemon = false
      this.showAnswer = false
      this.message = ''
      this.mixPokemonArr()
    }
  },
  mounted() {
    this.mixPokemonArr()
  }
}
</script>

<style scoped>
button {
  padding: 15px 25px;
  border-radius: 7px;
  background: rgb(250, 250, 250);
  border: 1px solid rgb(145, 145, 145);
}

button:hover {
  background: rgb(235, 235, 235);
}

.answer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  width: max-content;
  padding: 20px;
  color: white;
  border-radius: 10px;
}

.correct {
  background-color: rgb(161, 221, 161);
}

.incorrect {
  background-color: rgb(226, 163, 163);
}
</style>