import React from "react";
import { act, render, fireEvent } from "@testing-library/react-native";
import { CryptoCard } from "../../../ui/components/CryptoCard";
import { useRouter } from "expo-router";
import { Animated } from "react-native";

// Mock de navegación
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@expo/vector-icons/AntDesign", () => {
  return (props: any) => {
    return null; // o un View vacío <View {...props} />
  };
});


const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

describe("CryptoCard", () => {
  const crypto = {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    price_usd: 68000.123,
  };

  const scrollY = new Animated.Value(0);

  it("should render the name, symbol and price", () => {
    const { getByText } = render(<CryptoCard crypto={crypto} index={0} scrollY={scrollY} />);

    expect(getByText("Bitcoin")).toBeTruthy();
    expect(getByText("(BTC)")).toBeTruthy();
    expect(getByText("$68000.12 USD")).toBeTruthy();
  });

  it("should navigate when pressings", () => {
    const { getByText } = render(<CryptoCard crypto={crypto} index={0} scrollY={scrollY} />);
    const touchable = getByText("Bitcoin").parent.parent.parent;

    act(() => {
      fireEvent.press(touchable);
    });

    expect(mockPush).toHaveBeenCalledWith("/details?id=bitcoin");
  });
  
  it("scale interpolation should work without errors", () => {
    const { getByText } = render(<CryptoCard crypto={crypto} index={1} scrollY={scrollY} />);

    expect(getByText("Bitcoin")).toBeTruthy();
  });
});
