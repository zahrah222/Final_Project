import{ MapContainer, GeoJSON } from 'react-leaflet';
import countriesData from './countries.geo.json';
import 'leaflet/dist/leaflet.css';

function WorldMap({ readCountries}) {
    function getCountryName(feature) {
        return feature.properties.name || feature.properties.ADMIN 
    }

    function styleCountry(feature) {
      const name = getCountryName(feature)
      let fill = '#d9d3c7' 
      if (readCountries.includes(name)) {
        fill = '#4caf50' 
      }
      return { fillColor: fill, fillOpacity: 1, color: '#fff', weight: 1 }
    }

     return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
        <GeoJSON data={countriesData} style={styleCountry} />
    </MapContainer>
  )
}

export default WorldMap