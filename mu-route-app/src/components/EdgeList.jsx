import React from "react";
import EdgeItem from "./EdgeItem";
import { useState } from "react";

const EdgeList = ({ edges, onDeleteEdge }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
        <div>
            <h3 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ cursor: 'pointer' }}
            >
                {isExpanded ? '▼' : '▶'} Edges ({Object.keys(edges).length})
            </h3>
            
            {isExpanded && (
                <div>
                    {Object.keys(edges).map(edgeId => (
                        <EdgeItem 
                            key={edgeId}
                            edgeId={edgeId}
                            edge={edges[edgeId]}
                            onDelete={onDeleteEdge}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EdgeList;