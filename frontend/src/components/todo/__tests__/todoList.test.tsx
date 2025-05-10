import { render } from "@testing-library/react";
import TodoList from "../todoList";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// MSW 서버 설정
const server = setupServer(
  // 성공 (status 200)
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`, () => {
    return HttpResponse.json([
      {
        id: 1,
        title: "테스트 할일",
        description: "테스트 설명",
        completed: false,
        important: true,
        created_at: "2024-03-20T00:00:00.000Z",
      },
      {
        id: 2,
        title: "두 번째 할일",
        description: "두 번째 설명",
        completed: true,
        important: false,
        created_at: "2024-03-20T00:00:00.000Z",
      },
    ]);
  })
);

// 테스트 시작 전 서버 시작
beforeAll(() => server.listen());
// 각 테스트 후 핸들러 초기화
afterEach(() => server.resetHandlers());
// 모든 테스트 후 서버 종료
afterAll(() => server.close());

describe("TodoList", () => {
  it("todos가 올바르게 렌더링 되는가", async () => {
    const { container } = await render(<TodoList />);

    // 데이터 로드 후 할일 목록 확인
    expect(container).toHaveTextContent("테스트 할일");
    expect(container).toHaveTextContent("두 번째 할일");
  });

  it("에러 상황에서 적절히 에러 메세지가 출력되는가가", async () => {
    // 에러 (status 500)
    server.use(
      http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { container } = await render(<TodoList />);

    // 에러 메시지 확인
    expect(container).toHaveTextContent("할일을 불러오는데 실패했습니다.");
  });
});
