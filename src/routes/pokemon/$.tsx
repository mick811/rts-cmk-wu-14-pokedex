import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { Pokemon } from '@/types/api'

export const Route = createFileRoute('/pokemon/$')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${params._splat}`)
    return { data: await pokemonData.json() as Pokemon }
  },
})

function RouteComponent() {
  const { data: pokemon } = useLoaderData({ from: Route.id })
  return <div>{pokemon.name}</div>
}