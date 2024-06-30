import { PokemonCard } from "@/components/pokemonCard";
import { PokemonsDocument, PokemonsQuery } from "@/gpl/graphql";
import { urqlClient } from "@/lib/urql";
import { registerUrql } from "@urql/next/rsc";
import { gql } from "urql";
import { Suspense } from "react";

// deferでPokemonCardで使うデータを遅延読み込みしたいんだけど、 API側がdeferが有効じゃないとそもそもdeferが使えない（使ってもスルーされる）
gql`
  query Pokemons {
    pokemons(first: 151) {
      id
      ...PokemonCard @defer
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
              <Suspense fallback={<div>Loading...</div>}>
                <PokemonCard fragmentData={pokemon} />
              </Suspense>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
