import { Pokemon } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

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

  const { data: pokemonDetails, isLoading, error, isError } = useQuery<Pokemon>({
    queryKey: ['pokemon', pokemon.url],
    queryFn: ({ signal }) => fetchPokemonDetails(pokemon.url, signal),
  });

  if (isLoading) return <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>
  if (isError) return <div className="text-red-500 text-sm">Fejl: {(error as Error).message}</div>
  if (!pokemonDetails) return null;

  return (
    <>
      <Link to={`/pokemon/$`} params={{ _splat: pokemonDetails.name }}>
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm border border-zinc-200 dark:border-zinc-800">
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
          <h3 className="text-lg font-semibold text-center capitalize text-zinc-900 dark:text-white">
            {pokemonDetails.name}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
            #{pokemonDetails.id.toString().padStart(3, '0')}
          </p>
          <div className="flex justify-center gap-1 mt-2">
            {pokemonDetails.types.map((type) => (
              <span
                key={type.type.name}
                className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-xs rounded-full capitalize text-zinc-700 dark:text-zinc-300"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </>
  );
}