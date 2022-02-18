import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native-gesture-handler";
import { useColorScheme } from "react-native";
import { Movie, TV } from "../api";
import VMedia from "./VMedia";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
  width: 10px;
`;

interface HListProps {
  title: string;
  data: Movie[] | TV[];
}

const HList: React.FC<HListProps> = ({ title, data }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <ListContainer>
      <ListTitle isDark={isDark}>{title}</ListTitle>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item: Movie | TV) => item.id + ""}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HListSeparator}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }: { item: Movie | TV }) => (
          <VMedia
            posterPath={item.poster_path || ""}
            originalTitle={
              "original_title" in item
                ? item.original_title
                : item.original_name
            }
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

export default HList;
