import { useCallback, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  Node,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import TextNode, { NodeData } from "./TextNode";

interface FlowCanvasProps {
  selectedNode: Node<NodeData> | null;
  onNodeClick: (event: React.MouseEvent, node: Node<NodeData>) => void;
  onPaneClick: () => void;
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: any;
  onEdgesChange: any;
  setNodes: any;
  setEdges: any;
}

export default function FlowCanvas({
  selectedNode,
  onNodeClick,
  onPaneClick,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  setNodes,
  setEdges,
}: FlowCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // Handle node text updates
  const handleNodeTextUpdate = useCallback(
    (nodeId: string, text: string) => {
      setNodes((nds: Node<NodeData>[]) =>
        nds.map((node: Node<NodeData>) =>
          node.id === nodeId ? { ...node, data: { ...node.data, text } } : node
        )
      );
    },
    [setNodes]
  );

  // Create custom node types with update function
  const customNodeTypes = useMemo(() => {
    const TextNodeWithUpdate = (props: any) => (
      <TextNode {...props} onUpdateText={handleNodeTextUpdate} />
    );

    return {
      textNode: TextNodeWithUpdate,
    };
  }, [handleNodeTextUpdate]);

  // Handle edge connections
  const onConnect = useCallback(
    (params: Connection) => {
      // Check if source handle already has an edge
      const sourceHandleExists = edges.some(
        (edge: Edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle
      );

      if (sourceHandleExists) {
        toast.error("Source handle can only have one edge");
        return;
      }

      setEdges((eds: Edge[]) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  // Handle drag over
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle drop
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node<NodeData> = {
        id: `node-${Date.now()}`,
        type: type as string,
        position,
        data: { text: "New message" },
      };

      setNodes((nds: Node<NodeData>[]) => [...nds, newNode]);
    },
    [reactFlowInstance, setNodes]
  );

  const onInit = useCallback((instance: any) => {
    setReactFlowInstance(instance);
  }, []);

  return (
    <div className="flex-1" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onInit={onInit}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={customNodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
