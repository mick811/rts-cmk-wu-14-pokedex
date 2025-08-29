import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Pokemon } from "@/types/api";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})
function RouteComponent() {
  const { data, error } = useQuery<Pokemon>({
    queryKey: ['pokemon'],
    queryFn: () => fetch('https://pokeapi.co/api/v2/pokemon/1').then(res => res.json()) as Promise<Pokemon>
  });

  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>Loading...</div>
  
  return <img src={data.sprites.front_default ?? ""} alt="" />
}