import { Animated } from "react-native";
import { renderHook, act } from "@testing-library/react-hooks";

import { CryptoApi } from "../../../../infrastructure/api/CryptoApi";
import CryptoDetailPresenter from "../../../../ui/screens/CryptoDetail/CryptoDetail.Presenter";

// Mock the CryptoApi class and its method getCryptoById
jest.mock("../../../../infrastructure/api/CryptoApi");

describe("CryptoDetailPresenter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock Animated.timing to call start immediately (to avoid dealing with animation timing)
  beforeAll(() => {
    jest.spyOn(Animated, "timing").mockImplementation(() => {
      return {
        start: (callback?: () => void) => {
          if (callback) callback();
        },
      } as any;
    });
  });

  it("should initialize with loading true and null crypto", () => {
    // Render the hook with no id initially
    const { result } = renderHook(() => CryptoDetailPresenter({ id: undefined }));

    expect(result.current.loading).toBe(true);
    expect(result.current.crypto).toBeNull();
  });

  it("does not fetch data if id is undefined", async () => {
    const { result } = renderHook(() => CryptoDetailPresenter({ id: undefined }));

    // No fetch is done so crypto remains null and loading remains true (or can be false after effect)
    expect(result.current.crypto).toBeNull();
    expect(result.current.loading).toBe(true);
  });
});
