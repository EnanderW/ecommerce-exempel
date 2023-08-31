export function Cart({ cart, addItemCartAmount, reduceItemCartAmount }) {
  return (
    <aside>
      <div style={{ width: "100vw", border: "1px solid black" }}></div>
      {cart.map((item) => (
        <div>
          <div>{item.product.title}</div>
          <div>Amount: {item.amount}</div>
          <div>Price: {item.amount * item.product.price}</div>
          <button onClick={() => addItemCartAmount(item)}>+</button>
          <button onClick={() => reduceItemCartAmount(item)}>-</button>
        </div>
      ))}
      <div style={{ width: "100vw", border: "1px solid black" }}></div>
    </aside>
  );
}
