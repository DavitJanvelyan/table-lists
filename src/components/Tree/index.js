import React from 'react';

import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';

import RenderTree from "./components/RenderTree";

function Tree() {

  const data = {
    "name": "Root Node",
    "children": [
      {
        "name": "Child Node 1",
        "children": [
          {
            "name": "Grandchild Node 1.1",
            "children": [
              {
                "name": "Grandchild Node 1.1.1",
                "children": [
                  {
                    "name": "Grandchild Node 1.1.2",
                    "children": [
                      {
                        "name": "Grandchild Node 1.1.3",
                        "children": []
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "name": "Grandchild Node 1.2",
            "children": [
              {
                "name": "Grandchild Node 1.2.1",
                "children": [
                  {
                    "name": "Grandchild Node 1.2.2",
                    "children": [
                      {
                        "name": "Grandchild Node 1.2.3",
                        "children": []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Child Node 2",
        "children": [
          {
            "name": "Grandchild Node 2.1",
            "children": [
              {
                "name": "Grandchild Node 2.2.1",
                "children": []
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div className="tree">
      <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <RenderTree nested={data} />
        </TreeView>
      </Box>
    </div>
  );
}

export default Tree;
