import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { TouchableOpacity, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HMovie = styled.View`
  padding: 0px 10px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 82%;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  opacity: 0.8;
  width: 85%;
`;

const Release = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  font-size: 12px;
  margin-vertical: 10px;
  font-weight: 500;
  opacity: 0.6;
`;

const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Img = styled.Image`
  width: 91px;
  height: 160px;
  border-radius: 5px;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
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
      <HMovie>
        {posterPath.length > 0 ? (
          <Poster path={posterPath} />
        ) : (
          <Img source={require("../assets/image/sample_img.png")} />
        )}
        <HColumn>
          <Title isDark={isDark}>
            {originalTitle.length > 30
              ? `${originalTitle.slice(0, 30)}...`
              : originalTitle}
          </Title>
          {releaseDate ? (
            <Release isDark={isDark}>
              {new Date(releaseDate).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
          ) : null}
          {voteAverage ? <Votes votes={voteAverage} /> : null}
          <Overview isDark={isDark}>
            {overview === ""
              ? "No Summary"
              : overview !== "" && overview.length > 140
              ? overview.slice(0, 140) + "..."
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

export default HMedia;
