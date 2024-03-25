import React from "react";

import { TreeItem } from "@mui/x-tree-view/TreeItem";

function RenderTree({ nested: { name, children } }) {

  return (
    // <TreeItem key={nested.name} nodeId={nested.name} label={nested.name}>
    //   {Array.isArray(nested.children) ? nested.children.map((child) => (
    //     <RenderTree key={child.name} nested={child} />
    //   )) : null}
    // </TreeItem>
    <TreeItem key={name} nodeId={name} label={name}>
      {children && children.length > 0 && children.map((child) => (
        <RenderTree key={child.name} nested={child} />
      ))}
    </TreeItem>
  );
}

export default RenderTree