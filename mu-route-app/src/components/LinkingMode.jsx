import React from 'react';

const LinkingMode = ({ 
  linkingMode, 
  linkingFromNode, 
  cancelLinking 
}) => {
  if (!linkingMode) {
    return null;
  }

  return (
    <div style={{ color: 'blue' }}>
      リンクモード: ノード {linkingFromNode} から接続先を選択
      <button 
        onClick={cancelLinking} 
        style={{ marginLeft: '10px' }}
      >
        キャンセル
      </button>
    </div>
  );
};

export default LinkingMode;