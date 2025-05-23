import type { Preview } from "@storybook/react";
import { Noto } from "../src/font";
import "../src/output.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={Noto.variable + " font"}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    a11y: {
      // Axe 옵션 설정
      config: {}, //특정한 사용자 설정 없이 모든 규칙 활성화
      options: {}, //특정한 사용자 옵션 없이 모든 기본 검사 수행
    },
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
