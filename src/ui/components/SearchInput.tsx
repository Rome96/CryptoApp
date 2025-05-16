import { View, TextInput, StyleSheet } from "react-native";
import { useCryptoStore } from "../stores/useCryptoStore";
import { colors } from "../../utilities/color";

/**
 * SearchInput component provides a styled text input for filtering the list of cryptocurrencies.
 * It updates the global filter state in the crypto store as the user types.
 *
 * @component
 * @returns {JSX.Element} A styled input field to enter search queries.
 */

export const SearchInput = () => {
  const {  setFilter } = useCryptoStore();
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search crypto..."
        placeholderTextColor="#aaa"
        onChangeText={setFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.primary,
    color: colors.alto,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 10,
    fontSize: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
});
