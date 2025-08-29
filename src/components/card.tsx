import { Pokemon } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

const fetchPokemonDetails = async (url: string, signal?: AbortSignal): Promise<Pokemon> => {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon details (${response.status} ${response.statusText})`);
  }
  return response.json() as Promise<Pokemon>;
};

export function Card({
  pokemon,
}: {
  pokemon: { name: string; url: string },
}) {

  const { data: pokemonDetails, isLoading } = useQuery<Pokemon>({
    queryKey: ['pokemon', pokemon.url],
    queryFn: ({ signal }) => fetchPokemonDetails(pokemon.url, signal),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>
  if (!pokemonDetails) return null;

  return (
    <div className="bg-zinc-900 rounded-lg p-4 hover:bg-zinc-800 transition-colors">
      <img
        src={
          pokemonDetails.sprites.other?.['official-artwork']?.front_default
            ?? pokemonDetails.sprites.front_default
            ?? 'https://placehold.co/100'
        }
        alt={pokemonDetails.name}
        className="w-24 h-24 mx-auto mb-2 rounded-full"
        loading="lazy"
        decoding="async"
        width={96}
        height={96}
         />
      <h3 className="text-lg font-semibold text-center capitalize">
        {pokemonDetails.name}
      </h3>
      <p className="text-sm text-zinc-400 text-center">
        #{pokemonDetails.id.toString().padStart(3, '0')}
      </p>
      <div className="flex justify-center gap-1 mt-2">
        {pokemonDetails.types.map((type) => (
          <span
            key={type.type.name}
            className="px-2 py-1 bg-zinc-800 text-xs rounded-full capitalize text-zinc-400"
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}