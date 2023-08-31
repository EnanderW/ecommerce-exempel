import {
  ROUTE_FEATURED,
  ROUTE_HOME,
  ROUTE_RECOMMENDED,
  ROUTE_SHOP,
} from "../utils/constants";

export function Navigation({ setRoute, setShowCart }) {
  return (
    <nav>
      <span>PRODUCTS</span>
      <button onClick={() => setRoute({ route: ROUTE_HOME, data: {} })}>
        Home
      </button>
      <button onClick={() => setRoute({ route: ROUTE_SHOP, data: {} })}>
        Shop
      </button>
      <button onClick={() => setRoute({ route: ROUTE_FEATURED, data: {} })}>
        Featured
      </button>
      <button onClick={() => setRoute({ route: ROUTE_RECOMMENDED, data: {} })}>
        Recommended
      </button>
      <input />
      <button onClick={setShowCart}>Cart</button>
      <button>Signin</button>
      <button>Signup</button>
    </nav>
  );
}
