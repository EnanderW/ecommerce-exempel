import { HomeProduct } from "../components/HomeProduct";

export function HomeView({ products, setRoute }) {
  return (
    <>
      <section>
        <h2>Featured Products</h2>
        <div id="home-featured-products">
          {products.map((product) => (
            <HomeProduct product={product} setRoute={setRoute} />
          ))}
        </div>
      </section>
      <section>
        <h2>Recommended Products</h2>
        <div id="home-recommended-products">
          {products.map((product) => (
            <HomeProduct product={product} setRoute={setRoute} />
          ))}
        </div>
      </section>
    </>
  );
}
