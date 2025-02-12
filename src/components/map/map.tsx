/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
'use client'

//Map component Component from library
import { GoogleMap, Marker, MarkerF, Polygon } from "@react-google-maps/api";
import { TypeBlocks, TypePolygon } from "@/types/map";
import { v4 as uuidv4 } from 'uuid';

//Map's styling
const defaultMapContainerStyle = {
    width: '100%',
    height: '100vh',
    borderRadius: '15px 0px 0px 15px',
};

//K2's coordinates
const defaultMapCenter = {
    lat: -12.097353220684404,
    lng: -77.02731327736967
}

//Default zoom level, can be adjusted
const defaultMapZoom = 18

export enum IMAPTYPE {
    SATELLITE = 'satellite',
    TERRAIN = 'terrain',
    ROADMAP = 'roadmap',
 }

//Map options
const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: IMAPTYPE.ROADMAP,
};

const polygonCoords = [
    { lat: -12.091075, lng: -77.036369 },
    { lat: -12.092542, lng: -77.036140 },
    { lat: -12.092644, lng: -77.036891 },
    { lat: -12.091175, lng: -77.037110 },
];

const polygonCoords2 = [
    { lat: -12.091180, lng: -77.037179 },
    { lat: -12.092662, lng: -77.036960 },
    { lat: -12.092755, lng: -77.037708 },
    { lat: -12.091279, lng: -77.037922 },
];

const polygonCoords3 = [
    { lat: -12.091272, lng: -77.037974 },
    { lat: -12.092774, lng: -77.037769 },
    { lat: -12.092874, lng: -77.038611 },
    { lat: -12.091413, lng: -77.038831 },
];

// interface Coordinate {
//     id: String,
//     via: String,
// }
// interface Polygon {
//     id: String,
//     via: String,
//     cuadra: String,
//     estacionamiento: String,
//     blocks: {
//         name: String,
//         cuadras: Coordinate[],
//     },
// }
interface Props {
    polygon?: TypePolygon
}

const MapComponent = (props: Props) => {

    const handlerPolygon = () => {

        if (props.polygon?.blocks !== undefined) {
            return props.polygon.blocks.map((item: TypeBlocks) => {
                return <>
                    <Polygon
                        key={uuidv4()}
                        paths={item.cuadras}
                        options={{
                            fillColor: "gray",
                            fillOpacity: 0.5,
                            strokeColor: "red",
                            strokeOpacity: 1,
                            strokeWeight: 2,
                        }}
                    >
                        
                    </Polygon>
                </>
            })
        }
        else return null
        // return (
        //     <Polygon
        //         paths={polygonCoords}
        //         options={{
        //             fillColor: "gray",
        //             fillOpacity: 0.5,
        //             strokeColor: "red",
        //             strokeOpacity: 1,
        //             strokeWeight: 2,
        //         }}
        //     />
        // )

    }

    return (
        <div className="w-full">
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
                {/* Dibuja el perímetro */}
                {
                    //(props.polygon != null) ? handlerPolygon() : null
                    handlerPolygon()
                }

                {/* <Polygon
                    paths={polygonCoords}
                    options={{
                        fillColor: "gray",
                        fillOpacity: 0.5,
                        strokeColor: "red",
                        strokeOpacity: 1,
                        strokeWeight: 2,
                    }}
                /> */}

                {/* Coloca los marcadores */}
                {/* {polygonCoords.map((coord, index) => (
                    <Marker key={index} position={coord} />
                ))} */}
            </GoogleMap>
        </div>
    )
};

export { MapComponent };