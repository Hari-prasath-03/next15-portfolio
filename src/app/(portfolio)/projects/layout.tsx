import React from "react";

export default function Layout({
  model,
  children,
}: {
  model: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {model}
      {children}
    </>
  );
}
