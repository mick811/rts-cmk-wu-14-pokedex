import { Card } from "@/components/card";
import { PokemonListResponse } from "@/types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})
function RouteComponent() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: async ({ pageParam }: { pageParam: string }): Promise<PokemonListResponse> => {
      const response = await fetch(pageParam)
      if (!response.ok) {
        throw new Error('failed to fetch pokemon list')
      }
      return response.json()
    },
    initialPageParam: 'https://pokeapi.co/api/v2/pokemon?limit=20',
    getNextPageParam: (lastPage) => lastPage.next,
  })

  // ref points to the "load more" sentinel div for infinite scroll
  // when it comes into view, fetchNextPage is triggered
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // here below is the infinite scroll implementation using intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }, { threshold: 0.1 }) // threshold triggers when 10% of the sentinel is visible

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (error) return <div className="p-4 text-red-500">Fejl: {error.message}</div>
  if (isLoading) return <div className="p-4 text-zinc-400">Loader...</div>

  const pokemonList = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <div className="p-4">
      <h1 className="text-6xl font-bold text-center mb-8">Pokédex</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}

        {/* if there is no more pokemon to load, show a message */}
        {!hasNextPage && (
          <div className="text-center py-8 text-zinc-400 col-span-full">
            Du har set alle {data?.pages[0]?.count} Pokémon!
          </div>
        )}
      </div>

      {/* sentinel div for infinite scroll */}
      <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="text-zinc-400">Loader flere...</div>
        )}
      </div>
    </div>
  )
}