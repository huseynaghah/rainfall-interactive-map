import {store, useStore} from "../store/store.config.ts";
import {useMap} from "react-leaflet";
import {useEffect} from "react";
import {featureLayer} from "esri-leaflet";
import {
    renderMap, setChartLoader,
    setChartRainfalls,
    setChartYears,
    setDistricts, setLeftLoader,
    setLeftMinMax, setRightLoader,
    setRightMinMax,
} from "../store/store.reducer.ts";
import {control} from "leaflet";
import {layersUrl, token} from "../plugins/variables.ts";
import "esri-leaflet-vector";
import {vectorBasemapLayer} from "esri-leaflet-vector";
import {Id, toast} from "react-toastify";
import 'leaflet.bigimage/dist/Leaflet.BigImage.min.js';

const LayersComponent = () => {

    const currentCity = useStore('currentDistrict');
    const leftYear = useStore('leftYear');
    const rightYear = useStore('rightYear');
    const basemap = useStore('basemap') as string;
    const showBorders = useStore('showBorders') as boolean;

    let leftToastId : undefined | Id = undefined;
    let rightToastId : undefined | Id = undefined;
    let districtsToastId: undefined | Id = undefined;

    const map = useMap();
    useEffect(() => {
        map.createPane("districts");
        map.createPane("rainfallLeft");
        map.createPane("rainfallRight");


       vectorBasemapLayer(basemap, {
           token: token
       }).addTo(map);

        const rainfallLeftLayer = featureLayer({
            url: layersUrl + '0',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            pane: 'rainfallLeft',
            where: currentCity === 'all' ? `year='${leftYear}' ` : `name='${currentCity}' AND year='${leftYear}'`,
            onEachFeature: (feature, layer) =>{
                    const popupContent = `
                        <b>Name (EN): </b><span>${feature.properties.name}</span> <br>
                        <b>Name (AZ): </b><span>${feature.properties.name_az}</span> <br>
                        <b>Name (RU): </b><span>${feature.properties.name_ru}</span> <br>
                        <b>Rainfall mm: </b><span>${feature.properties.rainfall_m}</span> <br>
                        <b>Region: </b><span>${feature.properties.region}</span>
                    `
                    layer.bindPopup(popupContent);
                    layer.on('click', ()=>{
                        layer.openPopup();
                    })
            }
        })

        const rainfallRightLayer = featureLayer({
            url: layersUrl + '0',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            pane: 'rainfallRight',
            where: currentCity === 'all' ? `year='${rightYear}' ` : `name='${currentCity}' AND year='${rightYear}'`,
            onEachFeature: (feature, layer) =>{
                const popupContent = `
                        <b>Name (EN): </b><span>${feature.properties.name}</span> <br>
                        <b>Name (AZ): </b><span>${feature.properties.name_az}</span> <br>
                        <b>Name (RU): </b><span>${feature.properties.name_ru}</span> <br>
                        <b>Rainfall mm: </b><span>${feature.properties.rainfall_m}</span> <br>
                        <b>Region: </b><span>${feature.properties.region}</span>
                    `
                layer.bindPopup(popupContent);
                layer.on('click', ()=>{
                    layer.openPopup();
                })
            }

        })

        const districtsLayer = featureLayer({
            url: layersUrl + '1',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            pane: 'districts',
            where: currentCity === 'all' ? `1=1` : `'name='${currentCity}'`,
        });

        districtsLayer
            .query()
            .run((error, featureCollection) => {
                if (error) {
                    console.log('Xəta')
                    return;
                }
                const districts: string[] = featureCollection?.features?.map((feature: any) => (feature.properties.name));
                store.dispatch(setDistricts([...new Set(districts)]));
            })


        const getCalculateLeftMinMax = () =>{

            store.dispatch(setLeftLoader(true));

            rainfallLeftLayer
                .query()
                .where(currentCity === 'all' ? `year='${leftYear}' ` : `name='${currentCity}' AND year='${leftYear}'`)
                .run((error, featureCollection) => {

                    store.dispatch(setLeftLoader(true));

                    if (error) {
                        console.log(error);
                        return;
                    }

                    console.log(featureCollection);

                    const dataSet = featureCollection.features.map((feature: any) => {
                        return { r: feature.properties.rainfall_m, n: feature.properties.name };
                    })

                    store.dispatch(setLeftMinMax(dataSet));
                    store.dispatch(setLeftLoader(false));
                });
        }
        const getCalculateRightMinMax = () => {

            store.dispatch(setRightLoader(true));

            rainfallRightLayer
                .query()
                .where(currentCity === 'all' ? `year='${rightYear}' ` : `name='${currentCity}' AND year='${rightYear}'`)
                .run((error, featureCollection) => {

                    if (error) {
                        console.log(error);
                        return;
                    }

                    const dataSet = featureCollection.features.map((feature: any) => {
                        return { r: feature.properties.rainfall_m, n: feature.properties.name };
                    })

                    store.dispatch(setRightMinMax(dataSet));
                    store.dispatch(setRightLoader(false));
                });
        }
        const getChartFeatures = () => {

            const id = toast.loading("Fetching chart data...")
            store.dispatch(setChartLoader(true));

            const allFeatures = {
                type: "FeatureCollection",
                features: []
            };

            rainfallLeftLayer.query()
                .where(currentCity !== 'all'
                    ? `name='${currentCity}' AND year BETWEEN '${leftYear}' AND '${rightYear}'`
                    : `year BETWEEN '${leftYear}' AND '${rightYear}'`)
                .count(function (error, totalCount) {
                if (error) {
                    toast.update(id!, {
                        render : 'Error occured when fetching count!',
                        type  : 'error',
                        isLoading: false,
                        autoClose : 1000,
                    })
                    return;
                }

                if (totalCount === 0) {
                    toast.update(id!, {
                        render : 'There are no data in this layer...',
                        type  : 'info',
                        isLoading: false,
                        autoClose : 1000,
                    })
                    return;
                }

                    toast.update(id!, {
                        render : `Total ${totalCount} object found...`,
                        type  : 'info',
                        isLoading: true,
                    })

                const serverMaxRecordCount = 2000; // Serverin limiti

                function getPage(offset: any) {
                   rainfallLeftLayer.query()
                       .where(currentCity !== 'all'
                           ? `name='${currentCity}' AND year BETWEEN '${leftYear}' AND '${rightYear}'`
                           : `year BETWEEN '${leftYear}' AND '${rightYear}'`)
                       .offset(offset).limit(serverMaxRecordCount).run(function (error, featureCollection) {
                        if (error) {
                            toast.update(id!, {
                                render : `Fetching zamanı xəta!`,
                                type  : 'error',
                                isLoading: false,
                            })
                            ;
                            return;
                        }

                        const features = featureCollection.features;
                        allFeatures.features = allFeatures.features.concat(features);

                        const featuresFetchedSoFar = allFeatures.features.length;

                       toast.update(id!, {
                           render : `Fetched: ${featuresFetchedSoFar} / ${totalCount}`,
                           type  : 'info',
                           isLoading: true,
                       })

                        if (featuresFetchedSoFar < totalCount) {
                            getPage(featuresFetchedSoFar);
                        } else {
                            toast.update(id!, {
                                render : `Chart data are fetched successfully!`,
                                type  : 'success',
                                isLoading: false,
                                autoClose : 1000,
                            })


                            const yearStats = new Map<string, { sum: number, count: number }>();

                            allFeatures.features.forEach((feature: any) => {

                                const year = feature.properties.year;
                                const rain = feature.properties.rainfall_m;
                                if (year && typeof rain === "number") {
                                    if (yearStats.has(year)) {
                                        const existing = yearStats.get(year)!;
                                        existing.sum += rain;
                                        existing.count += 1;
                                    } else {
                                        yearStats.set(year, {sum: rain, count: 1});
                                    }
                                }
                            });

                            const sortedYears = Array.from(yearStats.keys()).sort();
                            const averages = sortedYears.map((year) => {
                                const {sum, count} = yearStats.get(year)!;
                                return parseFloat((sum / count).toFixed(2)); // 2 onluğa qədər
                            });

                            store.dispatch(setChartYears(sortedYears));
                            store.dispatch(setChartRainfalls(averages));
                            store.dispatch(setChartLoader(false));
                        }
                    });
                }
                getPage(0);
            });
        }


        getChartFeatures();
        getCalculateLeftMinMax();
        getCalculateRightMinMax();


        rainfallLeftLayer.on('load', () => {
            toast.update(leftToastId!, {
                render : 'Left rainfall layer fetched successfully!',
                type  : 'success',
                isLoading: false,
                autoClose : 1000,
            })
        });
        rainfallRightLayer.on('load', () => {
            toast.update(rightToastId!, {
                render : 'Right rainfall layer fetched successfully!',
                type  : 'success',
                isLoading: false,
                autoClose : 1000,
            })
        });
        rainfallLeftLayer.on('loading', () => {
            leftToastId = toast.loading("Left rainfall layer is fetching!...");
        })
        rainfallRightLayer.on('loading', () => {
            rightToastId = toast.loading("Right rainfall layer is fetching!...");
        })
        districtsLayer.on('loading', () => {
            districtsToastId = toast.loading("Districts layer is fetching!...");
        })
        districtsLayer.on('load', () => {
            toast.update(districtsToastId!, {
                render : 'Districts layer fetched successfully!',
                type  : 'success',
                isLoading: false,
                autoClose : 1000,
            })
        })

        if (currentCity !== 'all') {
            districtsLayer
                .query()
                .where(`name='${currentCity}'`)
                .bounds((error, bounds) => {
                    if (error) {
                        return;
                    }
                    map.flyToBounds(bounds);
                })
        }

        if(showBorders) map.addLayer(districtsLayer);
        map.addLayer(rainfallLeftLayer);
        map.addLayer(rainfallRightLayer);

        const sides = control.sideBySide(rainfallLeftLayer, rainfallRightLayer);
        map.addControl(sides);

        return () => {
            store.dispatch(renderMap());
        }


    }, [currentCity, leftYear, rightYear, basemap, showBorders]);

    return null;
}

export default LayersComponent;