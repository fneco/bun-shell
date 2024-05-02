import HtmlToJsx from "htmltojsx";

export const htmlToJsx = async (value: string): Promise<string> => {
  const converter = new HtmlToJsx({
    createClass: false,
  });

  return converter.convert(value);
};
