import useCartStore from '../../store/cartStore';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Корзина пуста</h2>
        <p>Добавьте товары из каталога</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Корзина</h1>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-item-price">{item.price} ₽</p>
            </div>
            <div className="cart-item-quantity">
              <button
                onClick={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="cart-item-remove"
              onClick={() => removeFromCart(item.id)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Итого: {totalPrice} ₽</h3>
        <button className="clear-cart" onClick={clearCart}>
          Очистить корзину
        </button>
      </div>
    </div>
  );
};

export default Cart;