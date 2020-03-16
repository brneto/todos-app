declare namespace NodeJS  {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    FEATURE?: boolean;
  }
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34237
type RF<P = {}> = ReactFunction<P>;

interface ReactFunction<P = {}> {
  (props: P): React.ReactElement;
}
