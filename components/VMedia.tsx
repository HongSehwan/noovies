import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { useColorScheme, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const Img = styled.Image`
  width: 91px;
  height: 160px;
  border-radius: 5px;
`;

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        originalTitle,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        {posterPath ? (
          <Poster path={posterPath} />
        ) : (
          <Img source={require("../assets/image/sample_img.png")} />
        )}
        <Title isDark={isDark}>
          {originalTitle.slice(0, 10)}
          {originalTitle.length > 10 ? "..." : null}
        </Title>
        <Votes votes={voteAverage} />
      </Movie>
    </TouchableOpacity>
  );
};

export default VMedia;
