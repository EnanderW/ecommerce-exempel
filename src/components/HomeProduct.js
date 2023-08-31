import { ROUTE_PRODUCT } from "../utils/constants";

export function HomeProduct({ product, setRoute }) {
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
