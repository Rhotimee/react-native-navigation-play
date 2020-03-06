import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ProductParamList } from "./ProductParamList";

export type HomeParamList = {
  Feed: undefined;
} & ProductParamList;

// T extends keyof AuthParamList ==> means it is either login or register
export type HomeStackNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
