import { checkToken } from "../utils/checkToken";

describe("checkToken", () => {
  it("should set isTokenOk to true if token exists in localStorage", () => {
    const setIsTokenOk = jest.fn();
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue("dummyToken"),
    } as unknown as Storage;

    checkToken(setIsTokenOk, localStorageMock);

    expect(setIsTokenOk).toHaveBeenCalledWith(true);
  });

  it("should not set isTokenOk if token does not exist in localStorage", () => {
    const setIsTokenOk = jest.fn();
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(null),
    } as unknown as Storage;

    checkToken(setIsTokenOk, localStorageMock);

    expect(setIsTokenOk).not.toHaveBeenCalled();
  });
});
