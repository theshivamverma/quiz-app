import store from "../store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type IconProps = {
  size?: number;
  className?: string;
  color?: string;
};

export type Question = {
  question: string;
  options: {
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
  };
  correctOption: string;
  correctPoint: number;
  negativePoint: number;
};
