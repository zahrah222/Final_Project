import{ MapContainer, GeoJSON } from 'react-leaflet';
import countriesData from './countries.geo.json';
import 'leaflet/dist/leaflet.css';

function WorldMap({ readCountries, selectedCountry, setSelectedCountry }) {
    function getCountryName(feature) {
        return feature.properties.name || feature.properties.ADMIN 
    }

    function styleCountry(feature) {
    const name = getCountryName(feature)
    let fill = '#d9d3c7' 
    if (readCountries.includes(name)) {
      fill = '#e74c3c' 
    }
    if (name === selectedCountry) {
      fill = '#3498db' 
    }
    return { fillColor: fill, fillOpacity: 1, color: '#fff', weight: 1 }
  }

  function onCountryClick(feature, layer) {
    layer.on('click', function() {
      setSelectedCountry(getCountryName(feature));
    })
}
     return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
        <GeoJSON data={countriesData} style={styleCountry} onEachFeature={onCountryClick} />
    </MapContainer>
  )
}

export default WorldMap