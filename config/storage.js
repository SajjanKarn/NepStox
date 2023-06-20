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

export { storeStock, getStock, removeStock, removeSingleStock };
