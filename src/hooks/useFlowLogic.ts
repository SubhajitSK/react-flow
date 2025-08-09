import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Edge, Node, NodeTypes } from "reactflow";
import { NodeData } from "../components/TextNode";

export function useFlowLogic() {
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node<NodeData>) => {
      setSelectedNode(node);
    },
    []
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleSave = useCallback(
    async (nodes: Node<NodeData>[], edges: Edge[]) => {
      if (nodes.length < 2) {
        toast.error("Cannot save Flow - at least two nodes are required");
        return;
      }

      const nodesWithEmptyTargets = nodes.filter((node) => {
        const incomingEdges = edges.filter(
          (edge: Edge) => edge.target === node.id
        );
        return incomingEdges.length === 0;
      });

      if (nodesWithEmptyTargets.length > 1) {
        toast.error("Cannot save Flow - multiple entry points detected");
        return;
      }
      toast.success("Flow saved successfully!");
    },
    []
  );

  return {
    selectedNode,
    onNodeClick,
    onPaneClick,
    handleSave,
  };
}
