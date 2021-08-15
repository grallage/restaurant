import React from "react";
import Header from "next/head";

interface Props {
  title?: string;
}

const Head = ({ title }: Props) => {
  return (
    <Header>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Lynn餐馆 - {title && `${title} - `}demo</title>
    </Header>
  );
};

export default Head;
