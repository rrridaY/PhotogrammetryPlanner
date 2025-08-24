import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";

// カスタムアイコンを作成する関数
const createNodeIcon = (isSelected, isLinkingFrom, isEntrance) => {
    let color = "#808080"; // Default: gray
    if (isSelected) color = "#ff0000"; // Selected: red
    else if (isLinkingFrom) color = "#00ff00"; // Linking from: green
    else if (isEntrance) color = "#0000ff"; // Entrance: blue
    
    const radius = isSelected ? 8 : 6;
    const weight = isSelected ? 3 : 2;
    
    return L.divIcon({
        className: 'custom-node-icon',
        html: `<div style="
            width: ${radius * 2}px;
            height: ${radius * 2}px;
            border-radius: 50%;
            background-color: ${color};
            border: ${weight}px solid ${color};
            opacity: 0.8;
            cursor: grab;
        "></div>`,
        iconSize: [radius * 2, radius * 2],
        iconAnchor: [radius, radius]
    });
};

const MapNodes = ({ nodes, selectedNode, linkingFromNode, onNodeClick, onNodeDrag }) => {
    return (
        <>
            {Object.entries(nodes).map(([nodeId, node]) => (
                <Marker
                    key={nodeId}
                    position={[node.latitude, node.longitude]}
                    icon={createNodeIcon(
                        nodeId === selectedNode,
                        nodeId === linkingFromNode,
                        node.entrance
                    )}
                    draggable={true}
                    eventHandlers={{
                        click: (e) => {
                            e.originalEvent.stopPropagation();
                            onNodeClick(nodeId);
                        },
                        dragend: (e) => {
                            const { lat, lng } = e.target.getLatLng();
                            onNodeDrag(nodeId, lat, lng);
                        }
                    }}
                >
                    <Tooltip>
                        <div>
                            <strong>{node.name}</strong><br />
                            ID: {nodeId}<br />
                            座標: ({node.latitude.toFixed(6)}, {node.longitude.toFixed(6)})<br />
                            {node.entrance && <span style={{ color: 'blue' }}>入口ノード</span>}<br />
                            <small>ドラッグで移動、クリックで編集</small>
                        </div>
                    </Tooltip>
                </Marker>
            ))}
        </>
    );
};

export default MapNodes;