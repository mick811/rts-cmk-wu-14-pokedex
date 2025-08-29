import { PokemonListResponse } from "@/types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})
function RouteComponent() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: async ({ pageParam }: { pageParam: string }): Promise<PokemonListResponse> => {
      const response = await fetch(pageParam)
      if(!response.ok) {
        throw new Error('failed to fetch pokemon list')
      }
      return response.json()
    },
    initialPageParam: 'https://pokeapi.co/api/v2/pokemon?limit=20',
    getNextPageParam: (lastPage) => lastPage.next,
  })
}