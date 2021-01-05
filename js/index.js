

var map;

const addMarkers = async () => {
    let text;
    try {
        const res = await axios.get('http://localhost:7071/api/recipes');
        for (let i = 0; i < res.data.length; i++) {
            //Add a marker to the map in which to display a popup for.
            const marker = new atlas.HtmlMarker({
                label: res.data[i].id,
                position: res.data[i].geometry.coordinates
            });

            //Add the marker to the map.
            map.markers.add(marker);

            //Create a popup.
            let ingredients = '';
            let steps = '';
            res.data[i].ingredients.forEach(item => (ingredients += `<li>${item}</li>`));
            res.data[i].steps.forEach(item => (steps += `<li>${item}</li>`))
            const popup = new atlas.Popup({
                content: `<ul class="collection with-header" style="max-width: 400px;
                max-height: 400px;
                overflow-y: scroll;
                overflow-x: scroll;">
                <li class="collection-header active"><h6>Local Dish Name: ${res.data[i].localSoupName}</h6>
                <div class="col s12 m12 l12" style="max-height:100px;  padding-left:0; padding-right:0" >
                    <img loading="lazy" style="object-fit: cover" class="responsive-img"  src="${res.data[i].imageUrl}">
                </div>
                </li>
                <li class="collection-item">
                    <h6>Ingridients</h6>
                    <ol>
                        ${ingredients}
                    </ol>

                </li>
                <li class="collection-item">
                    <h6>Steps</h6>
                    <ol>
                        ${steps}
                    </ol>

                </li>
                
              </ul>`,
                position: res.data[i].geometry.coordinates,
                pixelOffset: [0, -35]
            });

            //Add a click event to the marker to open the popup.
            map.events.add('click', marker, function () {
                //Open the popup
                popup.open(map);
            });


        }

    } catch (error) {

    }

}

function initMap() {
    map = new atlas.Map('myMap', {
        center: [36.8226656016925, -1.2805002799939247],
        zoom: 10,
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

const getSearch = () => {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', async e => {
        e.preventDefault()

        const search = searchForm.search.value;
        let queryUrl = encodeURI(`http://localhost:7071/api/recipes?search=${search}`);
        try {
            const res = await axios.get(queryUrl);
            if (res.data.length > 0) {
                map.setCamera({
                    center: res.data[0].geometry.coordinates,
                    zoom: 14
                });
            }
            
        } catch (error) {

        }

    })
}

getSearch();






window.onload = initMap();