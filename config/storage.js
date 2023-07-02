import * as SecureStore from "expo-secure-store";

const storeStock = async (value) => {
  try {
    // add the stock to the existing stock
    const stocks = await getStock();
    if (stocks) {
      // check if the value is array type
      if (value.constructor === Array) {
        await SecureStore.setItemAsync("stock", JSON.stringify(value));
        return;
      }
      // check if the stock already exists
      if (stocks.includes(value)) {
        return;
      }
      const newStocks = [...stocks, value];
      await SecureStore.setItemAsync("stock", JSON.stringify(newStocks));
    }
    // if there is no stock, create a new one
    else {
      await SecureStore.setItemAsync("stock", JSON.stringify([value]));
    }
  } catch (error) {
    console.log("Error storing the stock", error);
  }
};

const getStock = async () => {
  try {
    const data = await SecureStore.getItemAsync("stock");
    return JSON.parse(data);
  } catch (error) {
    console.log("Error getting the stock", error);
  }
};

const removeStock = async () => {
  try {
    await SecureStore.deleteItemAsync("stock");
  } catch (error) {
    console.log("Error removing the stock", error);
  }
};

const removeSingleStock = async (value) => {
  try {
    const stocks = await getStock();
    const newStocks = stocks.filter((stock) => stock !== value);
    await storeStock(newStocks);
    return newStocks;
  } catch (error) {
    console.log("Error removing single stock", error);
  }
};

// notes storage
const storeNote = async (value) => {
  try {
    // add the stock to the existing stock
    const notes = await getNote();
    if (notes) {
      // check if the stock already exists
      if (notes.includes(value)) {
        return;
      }
      // check if the value is array type
      if (value.constructor === Array) {
        await SecureStore.setItemAsync("notes", JSON.stringify(value));
        return;
      }

      const newNotes = [...notes, value];
      await SecureStore.setItemAsync("notes", JSON.stringify(newNotes));
    }
    // if there is no note, create a new one
    else {
      await SecureStore.setItemAsync("notes", JSON.stringify(value));
    }
  } catch (error) {
    console.log("Error storing the note", error);
  }
};

const getNote = async () => {
  try {
    const data = await SecureStore.getItemAsync("notes");
    return JSON.parse(data);
  } catch (error) {
    console.log("Error getting the note", error);
  }
};

const removeNote = async () => {
  try {
    await SecureStore.deleteItemAsync("notes");
  } catch (error) {
    console.log("Error removing the note", error);
  }
};

const removeSingleNote = async (value) => {
  try {
    const notes = await getNote();
    const newNotes = notes.filter((note) => note !== value);
    await storeNote(newNotes);
    return newNotes;
  } catch (error) {
    console.log("Error removing single note", error);
  }
};

// bulk ipo store format: [{boid: "123", username: "yaman"}, {boid: "456", username: "yaman"]
const storeBoid = async (value) => {
  try {
    const boids = await getBoid();
    // check if the value is array type
    if (value.constructor === Array) {
      await SecureStore.setItemAsync("boids", JSON.stringify(value));
      return;
    }

    // check if the boid already exists
    if (boids) {
      const boidExists = boids.find((boid) => boid.boid === value.boid);
      if (boidExists) return;
    }

    // now store the boid
    if (boids) {
      const newBoids = [...boids, value];
      await SecureStore.setItemAsync("boids", JSON.stringify(newBoids));
      return newBoids;
    }
    // if there is no boid, create a new one
    else {
      await SecureStore.setItemAsync("boids", JSON.stringify([value]));
      return [value];
    }
  } catch (error) {
    console.log("Error storing the boid", error);
  }
};

const getBoid = async () => {
  try {
    const data = await SecureStore.getItemAsync("boids");
    return JSON.parse(data);
  } catch (error) {
    console.log("Error getting the boid", error);
  }
};

const removeBoid = async (boid) => {
  try {
    const boids = await getBoid();
    const newBoids = boids.filter((b) => b.boid !== boid);
    await storeBoid(newBoids);
    return newBoids;
  } catch (error) {
    console.log("Error removing single boid", error);
  }
};

const removeAllBoid = async () => {
  try {
    await SecureStore.deleteItemAsync("boids");
  } catch (error) {
    console.log("Error removing the boid", error);
  }
};

export {
  storeStock,
  getStock,
  removeStock,
  removeSingleStock,
  // notes
  storeNote,
  getNote,
  removeNote,
  removeSingleNote,
  // boid
  storeBoid,
  getBoid,
  removeBoid,
  removeAllBoid,
};
