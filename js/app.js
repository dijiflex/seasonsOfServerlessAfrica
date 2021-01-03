
import axios from 'axios';
import { async } from 'q';

var map;

const addMarkers = async ()=>{
    try {
        const res = await axios.get('https://africarecipefinder.azurewebsites.net/api/recipes');
        console.log(res.status);
        console.log(res.data);
    } catch (error) {
        console.log(error.response.data.message);
    }
}

function initMap() {
     map = new atlas.Map('myMap', {
        center: [36.817223 ,-1.286389],
        zoom: 12,
        language: 'en-US',
        authOptions: {
            authType: 'subscriptionKey',
            subscriptionKey: '5Og9orBviOwprjzLr6PsmIJ50WzziX5ZYKnceLGnWLQ'
        }
    });

    //Wait until the map resources are ready.
    map.events.add('ready', function () {
        //Add zoom controls to bottom right of map.
        map.controls.add(new atlas.control.ZoomControl(), {
            position: 'bottom-right'
        });

        //Add map style control in top left corner of map.
        map.controls.add(new atlas.control.StyleControl(), {
            position: 'top-left'
        });
    });

    addMarkers();
    
}
const searchForm = document

export const getSearch = ()=> {
  const searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', e =>{
    e.preventDefault()
   
    map.setCamera({
    center: [-111.0225, 35.0272],
    zoom: 12
   
}, 6000);
  })

}






window.onload = initMap();