import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SearchInput } from "../../../ui/components/SearchInput";

// Mock del store
const mockSetFilter = jest.fn();

jest.mock("../../../ui/stores/useCryptoStore", () => ({
  useCryptoStore: () => ({
    setFilter: mockSetFilter,
  }),
}));

describe("SearchInput", () => {
  beforeEach(() => {
    mockSetFilter.mockClear();
  });

  it("should render the input with the correct placeholder", () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    expect(getByPlaceholderText("Search crypto...")).toBeTruthy();
  });

  it("should call setFilter when the text is changed", () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    const input = getByPlaceholderText("Search crypto...");

    fireEvent.changeText(input, "bitcoin");

    expect(mockSetFilter).toHaveBeenCalledWith("bitcoin");
  });
});
