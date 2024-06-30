import { PokemonCard } from "@/components/pokemonCard";
import { PokemonsDocument, PokemonsQuery, Query } from "@/gpl/graphql";
import { urqlClient } from "@/lib/urql";
import { registerUrql } from "@urql/next/rsc";
import { gql } from "urql";

gql`
  query Pokemons {
    pokemons(first: 151) {
      id
      ...PokemonCard
    }
  }
`;

const { getClient } = registerUrql(urqlClient);

export default async function Home() {
  const result = await getClient().query<PokemonsQuery>(PokemonsDocument, {});

  if (!result.data?.pokemons) {
    return (
      <main>
        <p>データが取得できませんでした</p>
      </main>
    );
  }

  return (
    <main>
      <ul className="grid grid-cols-4 gap-4">
        {result.data.pokemons.map((pokemon) => {
          if (!pokemon) {
            return null;
          }
          return (
            <li key={pokemon.id} className="p-4 bg-slate-100 rounded">
              <PokemonCard fragmentData={pokemon} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
