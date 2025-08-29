import { Pokemon } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

const fetchPokemonDetails = async (url: string): Promise<Pokemon> => {
  const response = await fetch(url);
  if (!response.ok) {
      throw new Error('failed to fetch pokemon details');
  }
  return response.json() as Promise<Pokemon>;
};

export function Card({ 
  pokemon,
}: { 
  pokemon: { name: string; url: string },
}) {

    const { data: pokemonDetails, isLoading } = useQuery<Pokemon>({
      queryKey: ['pokemon', pokemon.name],
      queryFn: () => fetchPokemonDetails(pokemon.url),
    });
  
    if(isLoading) return <div>Loading...</div>
    if (!pokemonDetails) return null;
  
    return (
      <div className="bg-zinc-900 rounded-lg p-4 hover:bg-zinc-800 transition-colors">
        <img
          src={pokemonDetails.sprites.front_default ?? "https://placehold.co/100"}
          alt={pokemonDetails.name}
          className="w-24 h-24 mx-auto mb-2 rounded-full"
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