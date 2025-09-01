import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router'
import { Pokemon } from '@/types/api'
import Badge from '@/components/badge'

export const Route = createFileRoute('/pokemon/$')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${params._splat}`)
    return { data: await pokemonData.json() as Pokemon }
  },
  errorComponent: ({ error }) => {
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-semibold text-red-500 mb-2">Kunne ikke hente Pokémon</h2>
      <p className="text-zinc-400 mb-4">{error.message}</p>
      <Link to="/" className="text-blue-400 hover:text-blue-300 underline">Tilbage til Pokédex</Link>
    </div>
  },
  pendingComponent: () => {
    <div className="p-6 max-w-2xl mx-auto text-center">
      <div className="text-zinc-400">Henter Pokémon...</div>
    </div>
  }
})

function RouteComponent() {
  const { data: pokemon } = useLoaderData({ from: Route.id })
  return (
    <main className="p-4 max-w-5xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="text-zinc-200 hover:text-zinc-300 underline">Tilbage til Pokédex</Link>
      </div>

      <section className='bg-zinc-900 rounded-lg p-6 md:p-8'>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className='text-3xl md:text-4xl font-bold capitalize'>
              {pokemon.name}
              <span className='text-zinc-500 text-lg font-normal ml-3'>
                #{String(pokemon.id).padStart(3, '0')}
              </span>
            </h1>
            <div className="flex flex-wrap gap-2 mt-3">
              {pokemon.types.map((type) => (
                <Badge key={type.type.name}>{type.type.name}</Badge>
              ))}
            </div>
          </div>
          
          <div className="">
            <img src={pokemon.sprites.front_default ?? ''} alt={pokemon.name} className="w-full h-auto md:max-w-64 rounded-lg" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="text-zinc-500">Base Exp</div>
          <div className="tabular-nums">{pokemon.base_experience ?? '—'}</div>
          <div className="text-zinc-500">Height</div>
          <div>{((pokemon.height ?? 0) / 10).toFixed(1)} m</div>
          <div className="text-zinc-500">Weight</div>
          <div>{((pokemon.weight ?? 0) / 10).toFixed(1)} kg</div>
        </div>
      </section>
    </main>
  )
}