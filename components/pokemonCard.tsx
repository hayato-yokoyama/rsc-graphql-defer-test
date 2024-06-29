import { PokemonCardFragment } from "@/gpl/graphql";
import Image from "next/image";
import Link from "next/link";
import { gql } from "urql";

gql`
  fragment PokemonCard on Pokemon {
    image
    name
    number
    types
  }
`;

type PokemonCardProps = {
  fragmentData: PokemonCardFragment;
};

export const PokemonCard = ({ fragmentData }: PokemonCardProps) => {
  const { name, image, number, types } = fragmentData;
  return (
    <Link href={`/pokemon/${name}`}>
      <div className="aspect-square relative w-full">
        <Image
          className="object-fit"
          src={image ?? ""}
          fill
          sizes="(max-width: 425px) 100vw, (max-width: 610px) 50vw, (max-width: 800px) 33vw, 25vw"
          alt=""
        />
      </div>
      <h2>{name}</h2>
      <span>#{number}</span>
      <div className="flex gap-2">
        {types &&
          types.map((type) => {
            return <span key={type}>{type}</span>;
          })}
      </div>
    </Link>
  );
};
