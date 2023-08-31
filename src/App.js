import { useEffect, useState } from "react";
import { getAllProducts } from "./api";
import "./App.css";
import { Cart } from "./components/Cart";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import {
  ROUTE_FEATURED,
  ROUTE_HOME,
  ROUTE_PRODUCT,
  ROUTE_RECOMMENDED,
  ROUTE_SHOP,
} from "./utils/constants";
import { FeaturedView } from "./views/Featured";
import { HomeView } from "./views/Home";
import { ProductView } from "./views/Product";
import { RecommendedView } from "./views/Recommended";
import { ShopView } from "./views/Shop";

function App() {
  const [route, setRoute] = useState({ route: ROUTE_HOME, data: {} });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addItemToCart = (product) => {
    setCart([...cart, { product: product, amount: 1 }]);
  };

  const removeItemFromCart = (product) => {
    setCart(cart.filter((item) => item.product !== product));
  };

  const addItemCartAmount = (item) => {
    setCart(
      cart.map((all) => {
        if (all === item) {
          return { ...item, amount: item.amount + 1 };
        } else {
          return all;
        }
      })
    );
  };

  const reduceItemCartAmount = (item) => {
    if (item.amount === 1) {
      setCart(cart.filter((all) => all !== item));
    } else {
      setCart(
        cart.map((all) => {
          if (all === item) {
            return { ...item, amount: item.amount - 1 };
          } else {
            return all;
          }
        })
      );
    }
  };

  const isItemInCart = (product) => {
    for (let item of cart) {
      if (item.product === product) {
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    getAllProducts().then((result) => setProducts(result.products));
  }, []);

  let content;
  if (route.route === ROUTE_HOME) {
    content = <HomeView products={products} setRoute={setRoute} />;
  } else if (route.route === ROUTE_SHOP) {
    content = <ShopView />;
  } else if (route.route === ROUTE_FEATURED) {
    content = <FeaturedView />;
  } else if (route.route === ROUTE_RECOMMENDED) {
    content = <RecommendedView />;
  } else if (route.route === ROUTE_PRODUCT) {
    content = (
      <ProductView
        route={route}
        addItemToCart={addItemToCart}
        removeItemFromCart={removeItemFromCart}
        isItemInCart={isItemInCart}
      />
    );
  }

  return (
    <>
      <Navigation
        setRoute={setRoute}
        setShowCart={() => setShowCart(!showCart)}
      />
      {showCart ? (
        <Cart
          cart={cart}
          addItemCartAmount={addItemCartAmount}
          reduceItemCartAmount={reduceItemCartAmount}
        />
      ) : null}
      {content}
      <Footer />
    </>
  );
}

export default App;
