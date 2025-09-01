import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router'
import { Pokemon } from '@/types/api'
import Badge from '@/components/badge'
import StatBar from '@/components/statbar'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

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
  const [checked, setChecked] = useState(true)
  // retrieve offical art from the sprites object
  const officialArtwork =
    pokemon.sprites.other?.['official-artwork'].front_default
    ?? pokemon.sprites.front_default
    ?? ''

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <section className='bg-zinc-900 rounded-lg p-6 md:p-8'>
        <div className="flex flex-col md:flex-row gap-8 mb-6">
          {/* Left side - Pokemon info */}
          <div className="flex-1">
            <div className="mb-4">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Tilbage til Pokédex
              </Link>
            </div>
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

          {/* Right side - Image and switch */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center">
              <img 
                src={checked ? officialArtwork : pokemon.sprites.front_default ?? ''} 
                alt={pokemon.name} 
                className="w-32 h-32 md:w-48 md:h-48 object-contain" 
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="sprites" checked={checked} onCheckedChange={setChecked} />
              <Label htmlFor='sprites' className="text-sm text-zinc-300">Official Art</Label>
            </div>
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

        {/* Base Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Base Stats</h2>
          <div className="space-y-3">
            {pokemon.stats.map((s) => (
              <StatBar
                key={s.stat.name}
                label={s.stat.name}
                value={s.base_stat}
              />
            ))}
          </div>
        </div>

        {/* Abilities */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Abilities</h2>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((a) => (
                <Badge key={a.ability.name}>
                  {a.ability.name.replace('-', ' ')}{a.is_hidden ? ' (hidden)' : ''}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}