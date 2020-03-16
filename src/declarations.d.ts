declare namespace NodeJS  {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    FEATURE?: boolean;
  }
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34237
// Define a singular something (static typing)
type RF<P = {}> = ReactFunction<P>;

// Define the shape of something (duck typing)
interface ReactFunction<P = {}> {
  (props: P): React.ReactElement;
}
