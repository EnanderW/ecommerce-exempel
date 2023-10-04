import { ROUTE_PRODUCT } from "../utils/constants";

export function HomeProduct({ product, setRoute }) {
  // När vi trycker på en produkt så lägger vi till ´data´ egenskapen.
  // Den är till för att vi ska veta vilken produkt vi har tryckt på.
  // Om du kollar i ´Product´ komponenten så ser du där att ´data´ används för att referera till produkten som användaren har tryckt på.
  return (
    <article onClick={() => setRoute({ route: ROUTE_PRODUCT, data: product })}>
      <div>
        <img src={product.thumbnail} width={100} height={50} />
      </div>
      <div>
        <span>{product.title}</span>
        <br />
        <span>{product.price}</span>
      </div>
    </article>
  );
}
