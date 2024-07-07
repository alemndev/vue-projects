import pokemonApi from '@/api/pokemonApi'

const createPokemonsArr = () => {
  const pokemonsArr = Array.from(Array(650))
  return pokemonsArr.map((_, index) => index + 1)
}

const getPokemonsOptions = async () => {
  const mixedPokemons = createPokemonsArr().sort(() => Math.random() - 0.5)

  return await getPokemons(mixedPokemons.splice(0, 4))
}

const getPokemons = async (pokemons) => {
  const pokePromises = pokemons.map(async (pokeId) => await pokemonApi.get('/' + pokeId))

  return (await Promise.all(pokePromises)).map(
    (rsp) => new Object({ name: parsePokeName(rsp.data.name), id: rsp.data.id })
  )
}

const parsePokeName = (pokeName) => {
  return pokeName.charAt(0).toUpperCase() + pokeName.slice(1, -1)
}

export default getPokemonsOptions
