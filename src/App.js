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
  // ´data´ egenskapen håller koll på extra data som kan behövas. Se ´Home´, ´HomeProduct´ och ´Product´ komponenterna för ett exempel och mer information om detta.
  const [route, setRoute] = useState({ route: ROUTE_HOME, data: {} });

  // En state för att spara alla produkter som hämtas från API:et. Vi sparar det i en state så att vi kan rendera ut dem och potentiellt uppdatera deras innehåll.
  const [products, setProducts] = useState([]);

  // En state för att spara alla produkter som vi har lagt till i varukorgen. Vi sparar det i en state så att vi kan rendera ut dem.
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // En funktion för att lägga till en produkt i varukorgen. Märk att ´setCart´ används, som kommer från useState ovanför. Vi lägger till produkten i varukorgen genom spread operatorn (kopiera med [..., product]).
  const addItemToCart = (product) => {
    setCart([...cart, { product: product, amount: 1 }]);
  };

  // En funktion för att ta bort en produkt från varukorgen. Märk att ´setCart´ används, som kommer från useState ovanför. Vi tar bort en produkt från varukorgen genom att använda .filter, och detta gör vi eftersom alla setState funktioner kräver nya objekt och .filter är ett bra sätt att kopiera arrayen, ta bort ett element och skapa ett nytt objekt.
  const removeItemFromCart = (product) => {
    setCart(cart.filter((item) => item.product !== product));
  };

  // En funktion för att öka antalet av en viss produkt i varukorgen. Märk att ´setCart´ används, som kommer från useState ovanför. Vi ökar antalet genom att ändra på hela ´cart´ state, men vi fokuserar på att ändra på en specifik produkt genom den första if-satsen innanför .map funktionen. På så sätt kan vi ändra på en specifik produkt men lämna alla andra produkter ifred.
  const addItemCartAmount = (item) => {
    setCart(
      cart.map((all) => {
        if (all === item) {
          return { ...item, amount: item.amount + 1 };
        } else {
          return all;
        }
      }),
    );
  };

  // Denna funktion gör samma sak som funktionen ovan, men istället för att öka antalet så minskas antalet.
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
        }),
      );
    }
  };

  // En funktion för att kolla om en viss produkt är tillagd i varukorgen eller inte.
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
