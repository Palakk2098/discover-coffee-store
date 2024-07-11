'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Banner from "./components/banner";
import Card from "./components/card";
import { useContext, useEffect, useState } from "react";
import { getCoffeeStores } from "./lib/coffee-stores-data"
import useTrackLocation from "./hooks/use-track-location"
import { ACTION_TYPES, useAppContext } from "./context";

export default function Home(props: any) {

  const [coffeeStoreData, setCoffeeStoreData] = useState([]);
  const [nearByCoffeeStore, setNearByCoffeeStore] = useState([])
  const {dispatch,state}=useAppContext();
  const {latLong,coffeeStores}=state;

  const { handleTrackLocation,  errorMessage, isFindingLocation } = useTrackLocation();

  const getCoffeeStoreData = async () => {

    const data = await getCoffeeStores();
    setCoffeeStoreData(data)
  }

  const getNearByCoffeeStore = async () => {

    const data = await getCoffeeStores(latLong);
    setNearByCoffeeStore(data)
    dispatch({type:ACTION_TYPES.SET_COFFEE_STORES,payload:{coffeeStores:data}})
  }

  useEffect(() => {
    getCoffeeStoreData()
  }, [])

  useEffect(() => {
    if(latLong){
    getNearByCoffeeStore()
    }
  }, [latLong])

  const loaderProp = ({ src }: any) => {
    return src;
  }

  const handleOnClick = () => {
    
    handleTrackLocation()
  }
 


  return (
    <main className={styles.main} >

      <Banner buttonText={isFindingLocation ? "Locating..." : "View shops nearby"} handleOnClick={handleOnClick} />
      {errorMessage && <p> Something went wrong : {errorMessage}</p>}
      <div className={styles.heroImage}>
        <Image src="/static/hero-image.png" width={700} height={400} alt="hero-image" loader={loaderProp} />
      </div>

      {coffeeStores?.length > 0 && <><h2 className={styles.heading2}>Stores near me</h2>
        <div className={styles.cardLayout}>
          {coffeeStores.map((store: any) => {
            return <Card title={store.name} imgUrl={store.imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'} href={`coffee-store/${store.fsq_id}`} className={styles.card} key={store.fsq_id} />
          })}
        </div>
      </>
      }
      {coffeeStoreData?.length > 0 && <><h2 className={styles.heading2}>Toronto Stores</h2>
        <div className={styles.cardLayout}>
          {coffeeStoreData.map((store: any) => {
            return <Card title={store.name} imgUrl={store.imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'} href={`coffee-store/${store.fsq_id}`} className={styles.card} key={store.fsq_id} />
          })}
        </div>
      </>
      }
    </main>
  );
}







