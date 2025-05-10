import { http, HttpResponse } from "msw";

export const handlers = [
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
  }),

  http.patch("/todos/completed/:id", ({ params }) => {
    const { id } = params;
    return new HttpResponse(null, { status: 200 });
  }),
];
