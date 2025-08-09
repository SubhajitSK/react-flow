"use client";

import { useCallback } from "react";
import { Edge, Node, useEdgesState, useNodesState } from "reactflow";
import FlowCanvas from "../components/FlowCanvas";
import NodesPanel from "../components/NodesPanel";
import { NodeData } from "../components/TextNode";
import ToastContainer from "../components/ToastContainer";
import TopBar from "../components/TopBar";
import { useFlowLogic } from "../hooks/useFlowLogic";

export default function ChatbotFlowBuilder() {
  const { selectedNode, onNodeClick, onPaneClick, handleSave } = useFlowLogic();
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const handleSaveClick = useCallback(() => {
    handleSave(nodes, edges);
  }, [nodes, edges, handleSave]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <ToastContainer />
      <TopBar onSave={handleSaveClick} />
      <div className="flex-1 flex">
        <FlowCanvas
          selectedNode={selectedNode}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          setNodes={setNodes}
          setEdges={setEdges}
        />
        <NodesPanel />
      </div>
    </div>
  );
}
