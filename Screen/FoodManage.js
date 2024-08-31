import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { Card } from "react-native-paper";
import { fetchFoods, removeFood, storeFood, updateFood } from "../Util/Http";

function FoodManage() {
  const [food, setFood] = useState({
    foodName: "",
    foodDescription: "",
    foodPrice: 0,
  });
  const [foodList, setFoodList] = useState([]);
  const [viewDetail, setViewDetail] = useState(false);
  const [detailFood, setDetailFood] = useState();
  useEffect(() => {
    async function GetFetchFoods() {
      var result = await fetchFoods();
      setFoodList(result);
    }
    GetFetchFoods();
  }, []);
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setFood((currentInputValue) => {
      return {
        ...currentInputValue,
        [inputIdentifier]: enteredValue,
      };
    });
    console.log(food);
  }
  const handleCreateFood = () => {
    storeFood(food);
  };
  const handleUpdateFood = (foodId) => {
    const foodModel = {
      foodId: food.key,
      food: {
        foodName: food.foodName,
        foodDescription: food.foodDescription,
        foodPrice: food.foodPrice,
      },
    };
    updateFood(foodModel.foodId, foodModel.food);
  };
  const handleRemoveFood = (foodId) => {
    removeFood(foodId);
  };
  const handleDetailFood = (foodId) => {
    for (var obj in foodList) {
      if (foodList[obj].key === foodId) {
        setFood(foodList[obj]);
      }
    }

    setViewDetail(!viewDetail);
  };
  const goBack = () => {
    setViewDetail(!viewDetail);
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Food Name"
            onChangeText={(value) => inputChangeHandler("foodName", value)}
            defaultValue={food ? food.foodName : ""}
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Food Description"
            onChangeText={(value) =>
              inputChangeHandler("foodDescription", value)
            }
            defaultValue={food ? food.foodDescription : ""}
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Food Price"
            onChangeText={(value) => inputChangeHandler("foodPrice", value)}
            keyboardType="numeric"
            defaultValue={food ? food.foodPrice : ""}
          ></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          {!viewDetail ? (
            <Button title="Save" onPress={handleCreateFood}></Button>
          ) : (
            <Button title="Update" onPress={handleUpdateFood}></Button>
          )}
        </View>
      </View>
      <View style={styles.grid}>
        {!viewDetail ? (
          <FlatList
            data={foodList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Pressable onPress={() => handleDetailFood(item.key)}>
                  <View>
                    <Text style={styles.text}> {item.foodName} </Text>
                    <Text style={styles.text}> {item.foodDescription} </Text>
                    <Text style={styles.text}> {item.foodPrice} </Text>
                  </View>
                  <View>
                    <Button
                      title="Remove"
                      onPress={() => handleRemoveFood(item.key)}
                    ></Button>
                  </View>
                </Pressable>
              </Card>
            )}
            numColumns={2}
          ></FlatList>
        ) : (
          <Card style={styles.card}>
            <View>
              <Text style={styles.text}> {food.foodName} </Text>
              <Text style={styles.text}> {food.foodDescription} </Text>
              <Text style={styles.text}> {food.foodPrice} </Text>
            </View>
            <View>
              <Button title="Go Back" onPress={goBack}></Button>
            </View>
          </Card>
        )}
      </View>
    </View>
  );
}
export default FoodManage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    paddingLeft: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
  grid: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  card: {
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 5,
  },
  text: {
    alignItems: "center",
  },
});
