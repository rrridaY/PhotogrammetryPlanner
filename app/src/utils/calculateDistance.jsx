
function calculateDistance(lat1, lon1, lat2, lon2) {
    // 度をラジアンに変換
    const toRad = (deg) => deg * Math.PI / 180;
    
    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);
    const deltaLat = toRad(lat2 - lat1);
    const deltaLon = toRad(lon2 - lon1);
    
    // 平均緯度での補正
    const avgLat = (lat1Rad + lat2Rad) / 2;
    
    // 地球半径（メートル）
    const R = 6378137; // WGS84楕円体の赤道半径
    
    // 平面近似計算
    const x = deltaLon * Math.cos(avgLat) * R;
    const y = deltaLat * R;
    
    return Math.sqrt(x * x + y * y);
}   

export default calculateDistance;