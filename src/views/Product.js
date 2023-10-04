export function ProductView({
  route,
  addItemToCart,
  removeItemFromCart,
  isItemInCart,
}) {
  return (
    <>
      <section>
        <div>
          {/* Här ser du att ´route.data´ används för att hämta en specifik produkt. */}
          {route.data.images.map((image) => (
            <img src={image} width={50} height={50} />
          ))}
        </div>
        <div>
          <img src={route.data.thumbnail} width={200} height={150} />
        </div>
        <h2>{route.data.title}</h2>
        <div>
          <div>{route.data.price}</div>
          <div>{route.data.brand}</div>
          <div>{route.data.rating}</div>
        </div>
        {isItemInCart(route.data) ? (
          <button onClick={() => removeItemFromCart(route.data)}>
            Remove from cart
          </button>
        ) : (
          <button onClick={() => addItemToCart(route.data)}>Add to cart</button>
        )}
      </section>
    </>
  );
}
