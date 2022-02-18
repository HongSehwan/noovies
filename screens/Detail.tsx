import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Detail = () => (
  <View>
    <Text>Detail</Text>
  </View>
);

export default Detail;
