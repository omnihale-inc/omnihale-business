import { isUserComingFromAddAppointmentPage } from "../utils/isUserComingFromAddAppointmentPage";

describe("isUserComingFromAddAppointmentPage", () => {
  let Url: string;

  beforeAll(() => {
    Url = "add-appointment";
  });

  it("should open the modal and update the history and localStorage when coming from add-appointment page", () => {
    const setModal = jest.fn();
    const historyMock = {
      pushState: jest.fn(),
    } as unknown as History;

    const localStorageMock = {
      getItem: jest.fn().mockReturnValue("true"),
      setItem: jest.fn(),
    } as unknown as Storage;

    isUserComingFromAddAppointmentPage(
      setModal,
      historyMock,
      localStorageMock,
      Url
    );

    expect(setModal).toHaveBeenCalledWith(true);
    expect(historyMock.pushState).toHaveBeenCalledWith({}, "", `/${Url}`);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(Url, "false");
  });

  it("should not open the modal and update the history and localStorage when not coming from add-appointment page", () => {
    const setModal = jest.fn();
    const historyMock = {
      pushState: jest.fn(),
    } as unknown as History;

    const localStorageMock = {
      getItem: jest.fn().mockReturnValue("false"),
      setItem: jest.fn(),
    } as unknown as Storage;

    isUserComingFromAddAppointmentPage(
      setModal,
      historyMock,
      localStorageMock,
      Url
    );

    expect(setModal).not.toHaveBeenCalled();
    expect(historyMock.pushState).not.toHaveBeenCalled();
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });
});
