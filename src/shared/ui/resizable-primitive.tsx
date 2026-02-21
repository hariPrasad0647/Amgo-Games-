import * as React from "react";

// Mock implementation of ResizablePrimitive.PanelGroup
export const PanelGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>;
};

// Mock implementation of ResizablePrimitive.Panel
export const Panel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>;
};

// Mock implementation of ResizablePrimitive.PanelResizeHandle
export const PanelResizeHandle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>;
};

// Export as ResizablePrimitive namespace
export const ResizablePrimitive = {
  PanelGroup,
  Panel,
  PanelResizeHandle,
};