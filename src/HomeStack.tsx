import React, { useContext, useRef, useEffect } from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { Center } from "./Center";
import { Text, TouchableOpacity, FlatList, Button } from "react-native";
import { AuthContext } from "./AuthProvider";
import faker from "faker";
import { HomeParamList, HomeStackNavProps } from "./HomeParamList";
import { addProductRoutes } from "./addProductRoutes";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

function Feed({ navigation }: HomeStackNavProps<"Feed">) {
  return (
    <Center>
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
    </Center>
  );
}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => logout()}>
              <Text style={{ paddingRight: 8 }}>Logout</Text>
            </TouchableOpacity>
          )
        }}
      />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};
