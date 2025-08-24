// draw edges on the map
import React from "react";
import { Polyline, Tooltip } from "react-leaflet";

import calculateDistance from "../utils/calculateDistance";

const MapEdges = ({ edges, nodes, selectedEdge, onEdgeClick }) => {
    const getEdgeColor = (edgeId) => {
        return edgeId === selectedEdge ? "#ff0000" : "#000000";
    };

    const getEdgeWeight = (edgeId) => {
        return edgeId === selectedEdge ? 4 : 2;
    };

    return (
        <>
            {Object.entries(edges).map(([edgeId, edge]) => {
                const startNode = nodes[edge.start];
                const endNode = nodes[edge.end];
                
                // Skip if nodes don't exist
                if (!startNode || !endNode) return null;
                
                const positions = [
                    [startNode.latitude, startNode.longitude],
                    [endNode.latitude, endNode.longitude]
                ];

                const distance = calculateDistance(
                    startNode.latitude,
                    startNode.longitude,
                    endNode.latitude,
                    endNode.longitude
                );

                return (
                    <Polyline
                        key={edgeId}
                        positions={positions}
                        color={getEdgeColor(edgeId)}
                        weight={getEdgeWeight(edgeId)}
                        opacity={edgeId === selectedEdge ? 1 : 0.7}
                        eventHandlers={{
                            click: (e) => {
                                e.originalEvent.stopPropagation();
                                onEdgeClick(edgeId);
                            }
                        }}
                    >
                        <Tooltip>
                            <div>
                                <strong>{edge.name}</strong><br />
                                ID: {edgeId}<br />
                                開始: {startNode.name} (ID: {edge.start})<br />
                                終了: {endNode.name} (ID: {edge.end})<br />
                                メートル: {distance.toFixed(2)}
                            </div>
                        </Tooltip>
                    </Polyline>
                );
            })}
        </>
    );
};

export default MapEdges;