import React from "react";

const CartItem = ({ item, onAdd, onRemove, onDelete }) => {
  return (
    <div className="flex items-center justify-between border-b py-3">
      {/* Product Info */}
      <div>
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-gray-600">${item.price}</p>
        <p className="text-gray-500">Quantity: {item.qty}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onAdd(item)}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          +
        </button>
        <button
          onClick={() => onRemove(item)}
          className="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          -
        </button>
        <button
          onClick={() => onDelete(item)}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default CartItem;
