import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type AppParamList = {
  Home: undefined;
  Search: undefined;
};

// T extends keyof AuthParamList ==> means it is either login or register
export type AuthNavProps<T extends keyof AppParamList> = {
  navigation: StackNavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};
