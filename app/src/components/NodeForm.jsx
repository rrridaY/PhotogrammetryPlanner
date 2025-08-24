import React, { useState } from "react";

const NodeForm = ({ onAddNode }) => {
    const [newNode, setNewNode] = useState({
        name: '', 
        latitude: '', 
        longitude: '', 
        entrance: false
    });

    const handleSubmit = () => {
        onAddNode(newNode);
        setNewNode({ name: '', latitude: '', longitude: '', entrance: false });
    };

    return (
        <div>
            <h2>Add Node</h2>
            <input 
                type="text" 
                placeholder="Name" 
                value={newNode.name} 
                onChange={(e) => setNewNode({ ...newNode, name: e.target.value })} 
            />
            <input 
                type="number" 
                placeholder="Latitude" 
                value={newNode.latitude} 
                onChange={(e) => setNewNode({ ...newNode, latitude: e.target.value })} 
            />
            <input 
                type="number" 
                placeholder="Longitude" 
                value={newNode.longitude} 
                onChange={(e) => setNewNode({ ...newNode, longitude: e.target.value })} 
            />
            <label>
                Entrance:
                <input 
                    type="checkbox" 
                    checked={newNode.entrance} 
                    onChange={(e) => setNewNode({ ...newNode, entrance: e.target.checked })} 
                />
            </label>
            <button onClick={handleSubmit}>Add Node</button>
        </div>
    );
};

export default NodeForm;