import React from "react";

const EdgeItem = ({ edgeId, edge, onDelete }) => {
    return (
        <div>
            {edgeId}: {edge.name} (Start: {edge.start}, End: {edge.end})
            <button onClick={() => onDelete(edgeId)}>Delete Edge</button>
        </div>
    );
};

export default EdgeItem;