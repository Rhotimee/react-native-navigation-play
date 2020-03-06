import React, { useRef, useEffect, Props } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, Button } from "react-native";
import { HomeStackNavProps, HomeParamList } from "./HomeParamList";
import { Center } from "./Center";
import { TypedNavigator, StackNavigationState } from "@react-navigation/native";
import { SearchParamList } from "./SearchParamList";
import { StackNavigationOptions } from "@react-navigation/stack";
import { StackNavigationEventMap } from "@react-navigation/stack/lib/typescript/src/types";

function Product({ route, navigation }: HomeStackNavProps<"Product">) {
  return (
    <Center>
      <Text>{route.params.name}</Text>
      <Button
        title="Edit this product"
        onPress={() =>
          navigation.navigate("EditProduct", {
            name: route.params.name
          })
        }
      />
    </Center>
  );
}

function EditProduct({ route, navigation }: HomeStackNavProps<"EditProduct">) {
  const submit = useRef(() => {});

  submit.current = () => {
    // api call to save form
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setParams({ submit });
  }, []);

  return (
    <Center>
      <Text>Editing {route.params.name}</Text>
    </Center>
  );
}

export const addProductRoutes = (
  Stack: TypedNavigator<
    SearchParamList | HomeParamList,
    StackNavigationState,
    StackNavigationOptions,
    StackNavigationEventMap,
    ({ initialRouteName, children, screenOptions, ...rest }: any) => JSX.Element
  >
) => {
  return (
    <>
      <Stack.Screen
        name="Product"
        component={Product}
        options={({ route }) => ({
          headerTitle: `Product: ${route.params.name}`
        })}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={({ route }) => ({
          headerTitle: `Edit: ${route.params.name}`,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // submit form
                route.params.submit?.current();
              }}
              style={{ paddingRight: 8 }}
            >
              <Text style={{ color: "red" }}>Done</Text>
            </TouchableOpacity>
          )
        })}
      />
    </>
  );
};
