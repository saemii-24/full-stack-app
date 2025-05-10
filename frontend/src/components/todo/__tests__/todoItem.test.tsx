import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../todoItem";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockTodo = {
  id: 1,
  title: "테스트 할일",
  description: "테스트 설명",
  completed: false,
  important: true,
  created_at: "2024-03-20T00:00:00.000Z",
};

// MSW 서버 설정
const server = setupServer(
  // 성공 (status 200)
  http.patch(`/todos/completed/${mockTodo.id}`, () => {
    return new HttpResponse(null, { status: 200 });
  })
);

// 테스트 시작 전 서버 시작
beforeAll(() => server.listen());
// 각 테스트 후 핸들러 초기화
afterEach(() => server.resetHandlers());
// 모든 테스트 후 서버 종료
afterAll(() => server.close());

describe("TodoItem", () => {
  it("todoItem 렌더링이 올바르게 되는가", () => {
    render(<TodoItem {...mockTodo} />);

    expect(screen.getByText("테스트 할일")).toBeInTheDocument();
    expect(screen.getByText("테스트 설명")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("체크박스 변경이 적절히 실행되는가", async () => {
    render(<TodoItem {...mockTodo} />);

    const checkbox = screen.getByRole("checkbox");

    // 체크박스 클릭
    fireEvent.click(checkbox);

    // 체크박스 상태 변경 확인
    expect(checkbox).toBeChecked();
  });

  it("체크박스 변경이 실패했을 때 올바르게 처리되는가", async () => {
    // 에러 (status 500)
    server.use(
      http.patch(`/todos/completed/${mockTodo.id}`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<TodoItem {...mockTodo} />);

    const checkbox = screen.getByRole("checkbox");

    // 체크박스 클릭
    fireEvent.click(checkbox);

    // 에러 메시지 확인
    expect(await screen.findByText("서버 업데이트 실패. 다시 시도해 주세요.")).toBeInTheDocument();
    // 체크박스 상태가 원래대로 돌아갔는지 확인
    expect(checkbox).not.toBeChecked();
  });
});
