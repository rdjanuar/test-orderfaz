import { Portal, Progress, VStack } from "@chakra-ui/react";
import { Router } from "next/router";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  children: ReactElement | ReactElement[];
};

type Progress = {
  value: number;
  start: () => void;
  done: () => void;
};

// 1. Creating a context
const LoadingProgressContext = createContext<Progress>({
  value: 0,
  start: () => {},
  done: () => {},
});

// 2. useLoadingProgress hook
export const useLoadingProgress = (): Progress => {
  return useContext<Progress>(LoadingProgressContext);
};

// 3. LoadingProgress component
const LoadingProgress = () => {
  const { value } = useLoadingProgress();

  return (
    <Portal>
      <VStack
        zIndex="9999"
        align="flex-end"
        w="100%"
        position="absolute"
        top={0}
        left={0}
        right={0}
      >
        <Progress
          value={value}
          size="xs"
          width="100%"
          colorScheme="button.primary"
        />
      </VStack>
    </Portal>
  );
};

// 4. LoadingProgressProvider
export const LoadingProgressProvider = ({ children }: Props): ReactElement => {
  // 5. Variables
  const step = useRef(5);
  const [value, setValue] = useState(0);
  const [isOn, setOn] = useState(false);

  // 6. useEffect
  useEffect(() => {
    if (isOn) {
      let timeout: number | NodeJS.Timeout = 0;

      if (value < 20) {
        step.current = 5;
      } else if (value < 40) {
        step.current = 4;
      } else if (value < 60) {
        step.current = 3;
      } else if (value < 80) {
        step.current = 2;
      } else {
        step.current = 1;
      }

      if (value <= 98) {
        timeout = setTimeout(() => {
          setValue(value + step.current);
        }, 500);
      }

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [value, isOn]);

  // 7. start
  const start = () => {
    setValue(0);
    setOn(true);
  };

  // 8. done
  const done = () => {
    setValue(100);
    setTimeout(() => {
      setOn(false);
    }, 200);
  };

  // 2. onRouterChangeStart
  const onRouteChangeStart = () => {
    start();
  };

  // 3. onRouterChangeComplete
  const onRouteChangeComplete = () => {
    setTimeout(() => {
      done();
    }, 1);
  };

  // 4. Subscribe to router events
  useEffect(() => {
    Router.events.on("routeChangeStart", onRouteChangeStart);
    Router.events.on("routeChangeComplete", onRouteChangeComplete);
    Router.events.on("routeChangeError", onRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", onRouteChangeStart);
      Router.events.off("routeChangeComplete", onRouteChangeComplete);
      Router.events.off("routeChangeError", onRouteChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoadingProgressContext.Provider
      value={{
        value,
        start,
        done,
      }}
    >
      {isOn ? <LoadingProgress /> : <></>}
      {children}
    </LoadingProgressContext.Provider>
  );
};
