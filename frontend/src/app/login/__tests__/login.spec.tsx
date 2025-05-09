import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../page";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock next-auth
//이 떄의 모킹은 단순히 함수 모킹으로, 어떤 값을 반환할지 지정하지 않았음에 유의한다.
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginPage", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    //동기 함수는 mockReturnValue 사용
    //useRouter 호출 시 반환 값 (mockRouter) 지정
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    //beforeEach를 통해 새로운 테스트 시작 전 이전 테스트 내용 지우기 (clear)
    (signIn as jest.Mock).mockClear();
    mockRouter.push.mockClear();
    jest.useFakeTimers(); // 타이머 가짜 실행
  });

  afterEach(() => {
    jest.useRealTimers(); // 타이머 실제 실행 (시간 초기화 필요)
  });

  it("로그인 페이지가 올바르게 렌더링 되는가", () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText("아이디")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
  });

  it("사용자 input값이 적절히 입력되는가", () => {
    render(<LoginPage />);

    const userIdInput = screen.getByPlaceholderText("아이디");
    const passwordInput = screen.getByPlaceholderText("비밀번호");

    fireEvent.change(userIdInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(userIdInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("password123");
  });

  it("로그인 실패 시 오류 메시지가 표시되는가", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ ok: false }); //promise 반환은 mockResolvedValueOnce 사용

    render(<LoginPage />);

    const loginButton = screen.getByRole("button", { name: "로그인" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("아이디 또는 비밀번호를 확인해주세요.")).toBeInTheDocument();
    });
  });

  it("로그인 성공 시 홈(/) 페이지로 리다이렉트 되는가", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ ok: true }); //promise 반환은 mockResolvedValueOnce 사용

    render(<LoginPage />);

    const userIdInput = screen.getByPlaceholderText("아이디");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    fireEvent.change(userIdInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);
    ``;
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });

  it("로그인 진행중일 때 폼이 비활성화 되는가", async () => {
    (signIn as jest.Mock).mockImplementation(
      // 커스텀 Promise 구현
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<LoginPage />);

    const userIdInput = screen.getByPlaceholderText("아이디");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    fireEvent.click(loginButton);

    expect(userIdInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(loginButton).toBeDisabled();
    expect(loginButton).toHaveTextContent("로그인 중..."); // 로그인 진행중 버튼 텍스트 확인

    // 타이머를 즉시 실행
    jest.runAllTimers();
  });
});
