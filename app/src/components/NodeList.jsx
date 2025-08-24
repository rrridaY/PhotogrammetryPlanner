import React from "react";
import NodeItem from "./NodeItem";
import { useState } from "react";

const NodeList = ({ nodes, onDeleteNode }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <h3 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ cursor: 'pointer' }}
            >
                {isExpanded ? '▼' : '▶'} Nodes ({Object.keys(nodes).length})
            </h3>
            
            {isExpanded && (
                <div>
                    {Object.keys(nodes).map(nodeId => (
                        <NodeItem 
                            key={nodeId}
                            nodeId={nodeId}
                            node={nodes[nodeId]}
                            onDelete={onDeleteNode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NodeList;