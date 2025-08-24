import React, { useState, useEffect } from "react";

const EditModal = ({ isOpen, type, data, onClose, onUpdate, onDelete, onStartLinking }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (isOpen && data) {
            if (type === 'node') {
                setFormData({
                    name: data.name || '',
                    latitude: data.latitude || '',
                    longitude: data.longitude || '',
                    entrance: data.entrance || false
                });
            } else if (type === 'edge') {
                setFormData({
                    name: data.name || '',
                    start: data.start || '',
                    end: data.end || ''
                });
            }
        }
    }, [isOpen, data, type]);

    const handleSave = () => {
        if (type === 'node') {
            const updatedNode = {
                name: formData.name,
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
                entrance: formData.entrance
            };
            onUpdate(data.id, updatedNode);
        } else if (type === 'edge') {
            const updatedEdge = {
                name: formData.name,
                start: formData.start,
                end: formData.end
            };
            onUpdate(data.id, updatedEdge);
        }
        onClose();
    };

    const handleStartLinking = () => {
        if (onStartLinking) {
            onStartLinking(data.id);
        }
    };

    const handleDelete = () => {
        if (window.confirm(`${type === 'node' ? 'ノード' : 'エッジ'}を削除しますか？`)) {
            onDelete(data.id);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                minWidth: '300px',
                maxWidth: '500px'
            }}>
                <h3>{type === 'node' ? 'ノード編集' : 'エッジ編集'}</h3>
                
                {type === 'node' && (
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>名前:</label>
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '5px', marginTop: '2px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>緯度:</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.latitude || ''}
                                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                                style={{ width: '100%', padding: '5px', marginTop: '2px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>経度:</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.longitude || ''}
                                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                                style={{ width: '100%', padding: '5px', marginTop: '2px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={formData.entrance || false}
                                    onChange={(e) => setFormData({ ...formData, entrance: e.target.checked })}
                                />
                                入口ノード
                            </label>
                        </div>
                    </div>
                )}

                {type === 'edge' && (
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>名前:</label>
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '5px', marginTop: '2px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>開始ノードID:</label>
                            <input
                                type="text"
                                value={formData.start || ''}
                                onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                                style={{ width: '100%', padding: '5px', marginTop: '2px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>終了ノードID:</label>
                            <input
                                type="text"
                                value={formData.end || ''}
                                onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                                style={{ width: '100%', padding: '5px', marginTop: '2px' }}
                            />
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button onClick={onClose}>キャンセル</button>
                    {type === 'node' && onStartLinking && (
                        <button 
                            onClick={handleStartLinking} 
                            style={{ backgroundColor: '#28a745', color: 'white' }}
                        >
                            リンク作成
                        </button>
                    )}
                    <button onClick={handleSave} style={{ backgroundColor: '#007bff', color: 'white' }}>
                        保存
                    </button>
                    <button onClick={handleDelete} style={{ backgroundColor: '#dc3545', color: 'white' }}>
                        削除
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;