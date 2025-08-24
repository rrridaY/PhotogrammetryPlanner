import React from "react";

const NodeItem = ({ nodeId, node, onDelete }) => {
    return (
        <div>
            {nodeId}: {node.name} ({node.latitude}, {node.longitude})
            {node.entrance && " (Entrance)"}
            <button onClick={() => onDelete(nodeId)}>Delete Node</button>
        </div>
    );
};

export default NodeItem;