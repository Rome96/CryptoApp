import React from "react";
import { render } from "@testing-library/react-native";

import { Animated } from "react-native";
import CryptoListPresenter from "../../../../ui/screens/CryptoList/CryptoList.Presenter";
import { CryptoListScreen } from "../../../../ui/screens/CryptoList/CryptoListScreen";

// Mock CryptoListPresenter hook
jest.mock("../../../../ui/screens/CryptoList/CryptoList.Presenter");

// Mock CryptoCard and SearchInput components (simplify testing)
jest.mock("../../../../ui/components/CryptoCard", () => ({
  CryptoCard: ({ crypto }: any) => <FakeCryptoCard crypto={crypto} />,
}));
jest.mock("../../../../ui/components/SearchInput", () => ({
  SearchInput: () => <FakeSearchInput />,
}));

const FakeCryptoCard = ({ crypto }: any) => <Animated.Text>{crypto.name}</Animated.Text>;
const FakeSearchInput = () => <Animated.Text>SearchInputMock</Animated.Text>;

describe("CryptoListScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading indicator when loading", () => {
    (CryptoListPresenter as jest.Mock).mockReturnValue({
      filtered: [],
      scrollY: new Animated.Value(0),
      isLoading: true,
    });

    const { getByTestId, queryByText } = render(<CryptoListScreen />);
    expect(queryByText("SearchInputMock")).toBeNull();
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("renders list with data and SearchInput when not loading", async () => {
    const fakeData = [
      { id: "1", name: "Bitcoin", symbol: "btc", price_usd: 40000 },
      { id: "2", name: "Ethereum", symbol: "eth", price_usd: 3000 },
    ];

    (CryptoListPresenter as jest.Mock).mockReturnValue({
      filtered: fakeData,
      scrollY: new Animated.Value(0),
      isLoading: false,
    });

    const { getByText, queryByTestId } = render(<CryptoListScreen />);

    // SearchInput should be rendered
    expect(getByText("SearchInputMock")).toBeTruthy();

    // Loading indicator should not be shown
    expect(queryByTestId("loading-indicator")).toBeNull();

    // Render CryptoCard items with correct crypto names
    expect(getByText("Bitcoin")).toBeTruthy();
    expect(getByText("Ethereum")).toBeTruthy();
  });
});
