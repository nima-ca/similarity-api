"use client";

import { CSSProperties, FunctionComponent, useEffect, useState } from "react";
import { colorModes } from "@src/lib/enum";
import { useTheme } from "next-themes";
import Highlight, { defaultProps, type Language } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import LightTheme from "prism-react-renderer/themes/nightOwlLight";

interface CodeProps {
  code: string;
  show: boolean;
  language: Language;
  animated?: boolean;
  animationDelay?: number;
}

const Code: FunctionComponent<CodeProps> = ({
  animated,
  animationDelay,
  code,
  language,
  show,
}) => {
  const { theme: appTheme } = useTheme();

  const [text, setText] = useState<string>(animated ? "" : code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;

      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i++));
          if (i > code.length) clearInterval(intervalId);
        }, 15);

        return () => clearInterval(intervalId);
      }, animationDelay || 150);
    }
  }, [code, show, animated, animationDelay]);

  const lines = text.split(/\r\n|\r|\n/).length;
  const theme = appTheme === colorModes.LIGHT ? LightTheme : darkTheme;

  const style: CSSProperties = {
    maxHeight: show ? lines * 24 : 0,
    opacity: show ? 1 : 0,
  };

  const highlightLineStyles: CSSProperties = {
    position: "relative",
  };

  return (
    <Highlight {...defaultProps} code={text} language={language} theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={style}
          className={
            className +
            "transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar"
          }
        >
          {tokens.map((line, i) => {
            const { key, ...rest } = getLineProps({ line, key: i });

            return (
              <div key={`lines-${i}`} style={highlightLineStyles} {...rest}>
                {line.map((token, index) => {
                  const { key, ...props } = getTokenProps({ token, key: i });

                  return <span key={index} {...props}></span>;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
