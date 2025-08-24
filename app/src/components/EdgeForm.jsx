import React, { useState } from "react";

const EdgeForm = ({ onAddEdge }) => {
    const [newEdge, setNewEdge] = useState({
        name: '', 
        start: '', 
        end: ''
    });

    const handleSubmit = () => {
        onAddEdge(newEdge);
        setNewEdge({ name: '', start: '', end: '' });
    };

    return (
        <div>
            <h2>Add Edge</h2>
            <input 
                type="text" 
                placeholder="Name" 
                value={newEdge.name} 
                onChange={(e) => setNewEdge({ ...newEdge, name: e.target.value })} 
            />
            <input 
                type="text" 
                placeholder="Start Node ID" 
                value={newEdge.start} 
                onChange={(e) => setNewEdge({ ...newEdge, start: e.target.value })} 
            />
            <input 
                type="text" 
                placeholder="End Node ID" 
                value={newEdge.end} 
                onChange={(e) => setNewEdge({ ...newEdge, end: e.target.value })} 
            />
            <button onClick={handleSubmit}>Add Edge</button>
        </div>
    );
};

export default EdgeForm;