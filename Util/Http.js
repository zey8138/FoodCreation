import axios from "axios";

const Base_URL = "https://food-creation-85669-default-rtdb.firebaseio.com/";
export function storeFood(foodData) {
  console.log("storeFood");
  console.log(foodData);
  axios.post(`${Base_URL}/foods.json`, foodData);
}
export async function fetchFoods() {
  var response = await axios.get(Base_URL + "/foods.json");
  const foods = [];
  for (var key in response.data) {
    food = {
      key: key,
      foodName: response.data[key].foodName,
      foodDescription: response.data[key].foodDescription,
      foodPrice: response.data[key].foodPrice,
    };
    foods.push(food);
  }
  return foods;
}
export async function removeFood(foodId) {
  return axios.delete(Base_URL + `/foods/${foodId}.json`);
}
