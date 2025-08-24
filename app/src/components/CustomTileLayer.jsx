import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const CustomTileLayer = () => {
    const map = useMap();

    useEffect(() => {
        // 直接L.tileLayerを使用（検索結果のコードと同じ）
        const tileLayer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
            maxZoom: 24, // 地図としてユーザーにズームを許可する限界値
            maxNativeZoom: 18, // 提供されるズームレベルの max
            attribution: '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>'
        }).addTo(map);

        // クリーンアップ
        return () => {
            map.removeLayer(tileLayer);
        };
    }, [map]);

    return null; // レンダリングするものはない
};

export default CustomTileLayer;