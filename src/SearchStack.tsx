import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchParamList } from "./SearchParamList";
import { Center } from "./Center";
import { Text, Button, FlatList } from "react-native";
import faker from "faker";
import { addProductRoutes } from "./addProductRoutes";

interface SearchStackProps {}

const Stack = createStackNavigator<SearchParamList>();

function Search({ navigation }) {
  const [show, setshow] = useState(false);
  return (
    <Center>
      <Button
        title="Search Products"
        onPress={() => {
          setshow(true);
        }}
      />
      {show && (
        <FlatList
          style={{ width: "100%" }}
          keyExtractor={(product, idx) => product + idx}
          data={Array.from(Array(50), () => faker.commerce.product())}
          renderItem={({ item }) => (
            <Button
              title={item}
              onPress={() => {
                navigation.navigate("Product", {
                  name: item
                });
              }}
            />
          )}
        />
      )}
    </Center>
  );
}

export const SearchStack: React.FC<SearchStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};
