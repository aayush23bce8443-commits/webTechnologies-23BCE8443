import React, { useState } from "react";

function ItemList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  
  const addItem = () => {
    if (input.trim() === "") return;

    const newItem = {
      id: Date.now(), 
      text: input
    };

    setItems([...items, newItem]);
    setInput("");
  };

  
  const removeItem = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
  };

  return (
    <div style={styles.container}>
      <h2>Item List Manager</h2>

      
      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Enter item..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={addItem} style={styles.addBtn}>
          Add
        </button>
      </div>

      
      {items.length === 0 ? (
        <p style={styles.empty}>No items available</p>
      ) : (
        <ul style={styles.list}>
          {items.map((item) => (
            <li key={item.id} style={styles.item}>
              {item.text}
              <button
                onClick={() => removeItem(item.id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "40px auto",
    padding: "20px",
    border: "2px solid #333",
    borderRadius: "10px",
    backgroundColor: "#f4f4f4",
    textAlign: "center"
  },
  inputBox: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px"
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  addBtn: {
    marginLeft: "10px",
    padding: "8px 12px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  item: {
    backgroundColor: "white",
    margin: "8px 0",
    padding: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  empty: {
    color: "gray",
    fontStyle: "italic"
  }
};

export default ItemList;