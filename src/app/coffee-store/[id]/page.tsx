'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "./coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import { getCoffeeStores } from "@/app/lib/coffee-stores-data";
import { useAppContext } from "@/app/context";
import useSWR from "swr";

interface CoffeeStoreProps {
    params: {
        id: string; // Adjust type based on your route parameters
    };
}

interface CoffeeStoreDataProps {
fsq_id:string|undefined|null;
    id: string|null |undefined; // Adjust type based on your route parameters
    name: string|null |undefined;
    recordId: string|null |undefined;
    location: {
        address: string | null |undefined;
        neighborhood: string | null | undefined;
        cross_street: string | null |undefined
    },
    imgUrl: string |null| undefined;
    rating:number|null|undefined;
}



const CoffeeStore: React.FC<CoffeeStoreProps> = ({ params }) => {

    const [coffeeStoreData, setCoffeeStoreData] = useState<CoffeeStoreDataProps>();
    const [ratingCount, setRatingCount] = useState(0);

    const { state: { coffeeStores } } = useAppContext()

    const handleUpvoteButton = async () => {
        try {


            const response = await fetch(`/api/coffee-store`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: params.id }),

            });

            const dbCoffeeStore = await response.json();

            if (dbCoffeeStore && dbCoffeeStore.length) {
                const rating = ratingCount + 1
                setRatingCount(rating)
            }


        } catch (error) {
            console.log("Error while updating coffee store", error)
        }

    };

    const getCoffeeStoreList = async () => {
        const coffeeStoreDataList = await getCoffeeStores();
        let store = coffeeStoreDataList.find((store:CoffeeStoreDataProps) => store.fsq_id === params.id);
        if (!store) {
            store = coffeeStores.find((store) => store.fsq_id === params.id);
        }

        setCoffeeStoreData(store);
        handleCreateCoffeeStore(store);
    }

    useEffect(() => {
        if (params.id) {
            getCoffeeStoreList()
        }
    }, [params.id])

  

    const handleCreateCoffeeStore = async (coffeeStore:CoffeeStoreDataProps) => {
        try {
            const { fsq_id, name, location, rating, imgUrl } = coffeeStore;

            const response = await fetch("/api/coffee-store", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: fsq_id, name, address: location.address, neighbourhood: location.neighborhood || location.cross_street, rating: 0, imgUrl }),

            });

            const dbCoffeeStore = await response.json();
            return { dbCoffeeStore }

        } catch (error) {
            console.log("Error while creating coffee store", error)
        }
    }

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data } = useSWR(`/api/coffee-store?id=${params.id}`, fetcher);

    useEffect(() => {

        if (data && data.result.length) {

            setCoffeeStoreData(data.result[0]);
            setRatingCount(data.result[0].rating);
        }

    }, [data])




    if (!coffeeStoreData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.layout}>
            <Head>
                <title>{coffeeStoreData?.name}</title>
            </Head>
            <div className={styles.container}>
                <div className="col1">
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                            ← Back to home</Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{coffeeStoreData?.name}</h1>
                    </div>
                    <div className={styles.storeImgWrapper}>
                        <Image
                            src={coffeeStoreData?.imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}
                            width={600}
                            height={360}
                            alt={coffeeStoreData?.name||"img"}
                            className={styles.storeImg}
                        />
                    </div>
                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/places.svg" height={24} width={24} alt="location" />
                        <p className={styles.text}>{coffeeStoreData?.location?.address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/nearMe.svg" height={24} width={24} alt="neighbourhood" />
                        <p className={styles.text}>{coffeeStoreData?.location?.neighborhood || coffeeStoreData?.location?.cross_street}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" height={24} width={24} alt="rating" />
                        <p className={styles.text}>{ratingCount}</p>
                    </div>

                    <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up Vote!</button>

                </div>
            </div>
        </div>
    );
};

// export const getCoffeeStoreData = async(params: { id: string }): any => {
//     const  coffeeStoreData=await getCoffeeStores();
//     const store = coffeeStoreData.find((store) => store.id === Number(params.id));
//     return store;
// };

// export async function generateStaticParams() {
//     const  coffeeStoreData=await getCoffeeStores();

//     return coffeeStoreData.map((store) => {
//         return { id: store.id.toString() };
//     });
// }

export default CoffeeStore;
