import { createApi } from 'unsplash-js';

//  in the server
const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,

    //...other fetch options
});

const getCoffeeStorePhotos=async()=>{
    const photos = await unsplashApi.search.getPhotos({
        query: 'coffee store',
        page: 1,
        perPage: 10,
        color: 'green',
        orientation: 'portrait',
    });
   

    const unsplashResults = photos.response.results.map((result) => result.urls['small']);

    return unsplashResults;
}

export const getCoffeeStores = async (latLong='43.65,-79.39') => {

    try {

        const photos=await getCoffeeStorePhotos();
        
        const searchParams = new URLSearchParams({
            query: 'coffee store',
            ll: latLong,
            open_now: 'true',
            sort: 'DISTANCE'
        });

        const results = await fetch(
            `https://api.foursquare.com/v3/places/search?${searchParams}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_TOKEN,
                }
            }
        );
       
        const data = await results.json();
      
        return data.results.map((result,index)=> {return {...result,imgUrl:photos[index]}});
    } catch (err) {
        console.error(err);
    }

}