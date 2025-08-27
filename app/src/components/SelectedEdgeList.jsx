const SelectedEdgeList = ({ selectedEdgeList ,ClearSelection}) => {
    return (
        <div>
            <h3>Selected Edges</h3>
            {selectedEdgeList.length === 0 && <p>No edges selected.</p>}
            {selectedEdgeList.length > 0 && (
                <div>
                    <ul>
                        {selectedEdgeList.map((edgeId) => (
                            <li key={edgeId}>Edge {edgeId}</li>
                        ))}
                    </ul>
                    <button onClick={ClearSelection}>Clear Selection</button>
                </div>
            )}
        </div>
    );
};

export default SelectedEdgeList;
