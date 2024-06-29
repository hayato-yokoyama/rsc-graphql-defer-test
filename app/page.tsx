import { PokemonsDocument, PokemonsQuery, Query } from "@/gpl/graphql";
import { urqlClient } from "@/lib/urql";
import { registerUrql } from "@urql/next/rsc";
import Image from "next/image";
import Link from "next/link";
import { gql } from "urql";

gql`
  query Pokemons {
    pokemons(first: 151) {
      id
      number
      name
      types
      image
    }
  }
`;

const { getClient } = registerUrql(urqlClient);

export default async function Home() {
  const result = await getClient().query<PokemonsQuery>(PokemonsDocument, {});

  if (!result.data?.pokemons) {
    return <p>データが取得できませんでした</p>;
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
              <Link href={`/pokemon/${pokemon.id}`}>
                <div className="aspect-square relative w-full">
                  <Image
                    className="object-fit"
                    src={pokemon.image ?? ""}
                    fill
                    sizes="(max-width: 425px) 100vw, (max-width: 610px) 50vw, (max-width: 800px) 33vw, 25vw"
                    alt=""
                  />
                </div>
                <h2>{pokemon.name}</h2>
                <span>#{pokemon.number}</span>
                <div className="flex gap-2">
                  {pokemon.types &&
                    pokemon.types.map((type) => {
                      return <span key={type}>{type}</span>;
                    })}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
