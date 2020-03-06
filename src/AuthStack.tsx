import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList, AuthNavProps } from "./AuthParamList";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { AuthContext } from "./AuthProvider";
import { Center } from "./Center";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation, route }: AuthNavProps<"Login">) {
  const { login } = useContext(AuthContext);
  return (
    <Center>
      <Text>Login Screen</Text>
      <Button title="Log me in" onPress={() => login()} />
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </Center>
  );
}

function Register({ navigation, route }: AuthNavProps<"Register">) {
  return (
    <Center>
      <Text>Register Screen, {route.name}</Text>
      <Button
        title="go to Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </Center>
  );
}

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        header: () => null
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
