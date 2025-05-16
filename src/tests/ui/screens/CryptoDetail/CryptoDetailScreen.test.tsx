// src/tests/ui/screens/CryptoDetailScreen.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react-native";
import CryptoDetailScreen from "../../../../ui/screens/CryptoDetail/CryptoDetailScreen";
import CryptoDetailPresenter from "../../../../ui/screens/CryptoDetail/CryptoDetail.Presenter";

// Mock de CryptoDetailPresenter
jest.mock("../../../../ui/screens/CryptoDetail/CryptoDetail.Presenter", () => {
  return jest.fn();
});

// Mock de expo-router
jest.mock("expo-router", () => ({
  Stack: {
    Screen: () => null,
  },
}));

describe("CryptoDetailScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show ActivityIndicator while loading", () => {
    (CryptoDetailPresenter as jest.Mock).mockReturnValue({
      crypto: null,
      loading: true,
      opacity: 1,
      translateY: 0,
    });

    render(<CryptoDetailScreen id="1" />);
    expect(screen.getByTestId("ActivityIndicator")).toBeTruthy();
  });

  it("should show message when there is no crypto", () => {
    (CryptoDetailPresenter as jest.Mock).mockReturnValue({
      crypto: null,
      loading: false,
      opacity: 1,
      translateY: 0,
    });

    render(<CryptoDetailScreen id="1" />);
    expect(screen.getByText("Crypto not found")).toBeTruthy();
  });

  it("should show crypto details when there is data", () => {
    const cryptoMock = {
      id: "1",
      name: "Bitcoin",
      symbol: "btc",
      price_usd: 42000,
    };

    (CryptoDetailPresenter as jest.Mock).mockReturnValue({
      crypto: cryptoMock,
      loading: false,
      opacity: 1,
      translateY: 0,
    });

    render(<CryptoDetailScreen id="1" />);
    expect(screen.getByText("Bitcoin")).toBeTruthy();
    expect(screen.getByText("(BTC)")).toBeTruthy();
    expect(screen.getByText("$42000.00 USD")).toBeTruthy();
  });
});
