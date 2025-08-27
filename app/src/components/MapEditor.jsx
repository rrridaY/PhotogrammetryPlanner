import React, { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet";
import CustomTileLayer from "./CustomTileLayer";
import { fetchData, saveData } from "../services/api";
import NodeForm from "./NodeForm";
import EdgeForm from "./EdgeForm";
import NodeList from "./NodeList";
import EdgeList from "./EdgeList";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import MapNodes from "./MapNodes";
import MapEdges from "./MapEdges";
import MapEvents from "./MapEvents";
import EditModal from "./EditModal";
import LinkingMode from "./LinkingMode";
import SelectedEdgeList from "./SelectedEdgeList";
import "leaflet/dist/leaflet.css";

const MapEditor = () => {
    // data
    const [nodes, setNodes] = useState({});
    const [edges, setEdges] = useState({});
    const [metadata, setMetadata] = useState({ nextnodeid: 1, nextedgeid: 1 });

    // loading and error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // map interaction states
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedEdge, setSelectedEdge] = useState(null);
    const [isLinkingMode, setisLinkingMode] = useState(false);
    const [linkingFromNode, setLinkingFromNode] = useState(null);
    const [editModal, setEditModal] = useState({ isOpen: false, type: null, data: null });
    const [selectedEdgeList, setSelectedEdgeList] = useState([]); //選択されているedgeのリスト

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetcheddata = await fetchData();
                console.log('Fetched data:', fetcheddata);
                setNodes(fetcheddata.nodes || {});
                setEdges(fetcheddata.edges || {});
                setMetadata(fetcheddata.metadata || { nextnodeid: 1, nextedgeid: 1 });
                setLoading(false);
            } catch (error) {
                console.error('Error loading data:', error);
                setError(error);
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleSave = async () => {
        try {
            const dataToSave = { nodes: nodes, edges: edges, metadata: metadata };
            console.log('Data to save:', dataToSave);
            const response = await saveData(dataToSave);
            console.log('Save response:', response);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleAddNode = (newNode) => {
        if (isNaN(parseFloat(newNode.latitude)) || isNaN(parseFloat(newNode.longitude))) {
            console.error("Invalid latitude or longitude");
            return;
        }
        
        const tempNode = {
            name: newNode.name,
            latitude: parseFloat(newNode.latitude),
            longitude: parseFloat(newNode.longitude),
            entrance: newNode.entrance,
        };
        setNodes((prevNodes) => ({ ...prevNodes, [metadata.nextnodeid]: tempNode }));
        setMetadata((prevMetadata) => ({ ...prevMetadata, nextnodeid: prevMetadata.nextnodeid + 1 }));
    };

    const handleMapRightClick = (lat, lng) => {
        const newNodeName = `Node ${metadata.nextnodeid}`;
        const tempNode = {
            name: newNodeName,
            latitude: lat,
            longitude: lng,
            entrance: false,
        };
        setNodes((prevNodes) => ({ ...prevNodes, [metadata.nextnodeid]: tempNode }));
        setMetadata((prevMetadata) => ({ ...prevMetadata, nextnodeid: prevMetadata.nextnodeid + 1 }));
    };

    const handleAddEdge = (newEdge) => {
        if (!newEdge.start || !newEdge.end) {
            console.error("Start and end nodes must be specified");
            return;
        }
        if (newEdge.start === newEdge.end) {
            console.error("Start and end nodes cannot be the same");
            return;
        }
        if (Object.values(edges).some(edge =>
            (edge.start === newEdge.start && edge.end === newEdge.end) ||
            (edge.start === newEdge.end && edge.end === newEdge.start)
        )) {
            console.error("Edge already exists between these nodes");
            return;
        }
        
        const tempEdge = {
            name: newEdge.name || `Edge ${metadata.nextedgeid}`,
            start: newEdge.start,
            end: newEdge.end,
        };
        setEdges((prevEdges) => ({ ...prevEdges, [metadata.nextedgeid]: tempEdge }));
        setMetadata((prevMetadata) => ({ ...prevMetadata, nextedgeid: prevMetadata.nextedgeid + 1 }));
    };

    const handleNodeDrag = (nodeId, newLat, newLng) => {
        setNodes((prevNodes) => ({
            ...prevNodes,
            [nodeId]: {
                ...prevNodes[nodeId],
                latitude: newLat,
                longitude: newLng
            }
        }));
    };

    const startLinking = (nodeId) => {
        setisLinkingMode(true);
        setLinkingFromNode(nodeId);
        setEditModal({ isOpen: false, type: null, data: null });
    };

    const handleNodeClick = (nodeId) => {
        if (isLinkingMode) {
            if (linkingFromNode && linkingFromNode !== nodeId) {
                const newEdge = {
                    name: `Edge ${metadata.nextedgeid}`,
                    start: linkingFromNode,
                    end: nodeId
                };
                handleAddEdge(newEdge);
            }
            setisLinkingMode(false);
            setLinkingFromNode(null);
        } else {
            setSelectedNode(nodeId);
            setSelectedEdge(null);
            setEditModal({
                isOpen: true,
                type: 'node',
                data: { id: nodeId, ...nodes[nodeId] }
            });
        }
    };

    const handleEdgeClick = (edgeId) => {
        setSelectedEdge(edgeId);
        setSelectedNode(null);
        // setEditModal({
        //     isOpen: true,
        //     type: 'edge',
        //     data: { id: edgeId, ...edges[edgeId] }
        // });

        // selectedEdgeListにedgeIdを追加または削除
        setSelectedEdgeList((prevList) => {
            if (prevList.includes(edgeId)) {
                return prevList.filter((id) => id !== edgeId);
            } else {
                return [...prevList, edgeId];
            }
        });
    };

    const handleUpdateNode = (nodeId, updatedNode) => {
        setNodes((prevNodes) => ({
            ...prevNodes,
            [nodeId]: updatedNode
        }));
    };

    const handleUpdateEdge = (edgeId, updatedEdge) => {
        setEdges((prevEdges) => ({
            ...prevEdges,
            [edgeId]: updatedEdge
        }));
    };

    const handleDeleteNode = (nodeId) => {
        if (!nodes[nodeId]) {
            console.warn(`Node ${nodeId} does not exist.`);
            return;
        }
        console.log(`Deleting node ${nodeId} and its connected edges...`);
        
        // Delete node
        setNodes((prevNodes) => {
            const newNodes = { ...prevNodes };
            delete newNodes[nodeId];
            return newNodes;
        });
        
        // Delete connected edges
        setEdges((prevEdges) => {
            const newEdges = { ...prevEdges };
            Object.keys(newEdges).forEach(edgeId => {
                if (newEdges[edgeId].start === nodeId || newEdges[edgeId].end === nodeId) {
                    delete newEdges[edgeId];
                    console.log(`Edge ${edgeId} deleted (connection: ${nodeId})`);
                }
            });
            return newEdges;
        });

        setEditModal({ isOpen: false, type: null, data: null });
        setSelectedNode(null);
    };

    const handleDeleteEdge = (edgeId) => {
        if (!edges[edgeId]) {
            console.warn(`Edge ${edgeId} does not exist.`);
            return;
        }
        console.log(`Deleting edge ${edgeId}...`);
        setEdges((prevEdges) => {
            const newEdges = { ...prevEdges };
            delete newEdges[edgeId];
            return newEdges;
        });

        setEditModal({ isOpen: false, type: null, data: null });
        setSelectedEdge(null);
    };

    const cancelLinking = () => {
        setisLinkingMode(false);
        setLinkingFromNode(null);
    };

    if (loading) {
        return <LoadingSpinner />;
    }
    
    if (error) {
        return <ErrorMessage error={error} />;
    }

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '100%', width: '100%', display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <MapContainer
                        center={[34.7432, 136.5243]} 
                        zoom={16}
                        minZoom={5}
                        maxZoom={24}
                        zoomControl={true}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}>
                            <button onClick={handleSave} style={{ marginBottom: '10px',marginLeft: '40px' }}>変更を適用</button>
                            <LinkingMode 
                                linkingMode={isLinkingMode}
                                linkingFromNode={linkingFromNode}
                                cancelLinking={cancelLinking}
                            />
                        </div>
                        <CustomTileLayer />
                        
                        <MapEvents onRightClick={handleMapRightClick} />
                        
                        <MapEdges 
                            edges={edges}
                            nodes={nodes}
                            selectedEdge={selectedEdge}
                            onEdgeClick={handleEdgeClick}
                        />
                        
                        <MapNodes 
                            nodes={nodes}
                            selectedNode={selectedNode}
                            linkingFromNode={linkingFromNode}
                            onNodeClick={handleNodeClick}
                            onNodeDrag={handleNodeDrag}
                        />
                    </MapContainer>
                </div>
                
                <div style={{ width: '300px', padding: '10px', borderLeft: '1px solid #ccc', overflow: 'auto' }}>
                    <NodeForm onAddNode={handleAddNode} />
                    <EdgeForm onAddEdge={handleAddEdge} />
                    <SelectedEdgeList selectedEdgeList={selectedEdgeList} ClearSelection={() => setSelectedEdgeList([])} />
                    <NodeList nodes={nodes} onDeleteNode={handleDeleteNode} />
                    <EdgeList edges={edges} onDeleteEdge={handleDeleteEdge} />
                </div>
            </div>

            <EditModal
                isOpen={editModal.isOpen}
                type={editModal.type}
                data={editModal.data}
                onClose={() => setEditModal({ isOpen: false, type: null, data: null })}
                onUpdate={editModal.type === 'node' ? handleUpdateNode : handleUpdateEdge}
                onDelete={editModal.type === 'node' ? handleDeleteNode : handleDeleteEdge}
                onStartLinking={editModal.type === 'node' ? startLinking : null}
            />
        </div>
    );
};

export default MapEditor;