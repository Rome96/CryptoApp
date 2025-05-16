import { View, StyleSheet, Animated } from "react-native";
import React from "react";
import { CryptoCard } from "../../components/CryptoCard";
import CryptoListPresenter from "./CryptoList.Presenter";
import { SearchInput } from "../../components/SearchInput";

export const CryptoListScreen = () => {
  const { filtered, scrollY } = CryptoListPresenter();

  return (
    <View style={styles.container}>
      <SearchInput  />
      <Animated.FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item, index }) => (
          <CryptoCard crypto={item} index={index} scrollY={scrollY} />
        )}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
});
