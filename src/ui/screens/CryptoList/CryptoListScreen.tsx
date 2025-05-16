import { View, TextInput, FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useCryptoStore } from "../../stores/useCryptoStore";
import { CryptoCard } from "../../components/CryptoCard";
import CryptoListPresenter from "./CryptoList.Presenter";

export const CryptoListScreen = () => {
  const { setFilter, filtered } = CryptoListPresenter();


  return (
    <View style={styles.container}>
      <TextInput placeholder="Search" onChangeText={setFilter} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CryptoCard crypto={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  }
})
