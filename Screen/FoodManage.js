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
import { fetchFoods, storeFood } from "../Util/Http";

function FoodManage() {
  const [food, setFood] = useState({
    foodName: "",
    foodDescription: "",
    foodPrice: 0,
  });
  const [foodList, setFoodList] = useState([]);
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
  }
  const handleCreateFood = () => {
    storeFood(food);
  };
  const handleFoodClick = (foodId) => {
    console.log("handleFoodClick");
    console.log(foodId);
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Food Name"
            onChangeText={(value) => inputChangeHandler("foodName", value)}
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Food Description"
            onChangeText={(value) =>
              inputChangeHandler("foodDescription", value)
            }
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Food Price"
            onChangeText={(value) => inputChangeHandler("foodPrice", value)}
            keyboardType="numeric"
          ></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleCreateFood}></Button>
        </View>
      </View>
      <View style={styles.grid}>
        <FlatList
          data={foodList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Pressable onPress={() => handleFoodClick(item.key)}>
                <View>
                  <Text style={styles.text}> {item.foodName} </Text>
                  <Text style={styles.text}> {item.foodDescription} </Text>
                  <Text style={styles.text}> {item.foodPrice} </Text>
                </View>
                <View>
                  <Button title="Remove"></Button>
                </View>
              </Pressable>
            </Card>
          )}
          numColumns={2}
        ></FlatList>
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
