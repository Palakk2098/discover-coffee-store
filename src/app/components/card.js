import Link from "next/link";
import Image from "next/image";
import styles from "./card.module.css"
import cls from "classnames"
const Card = (props) => {

    return (

        <Link href={props.href} className={styles.cardLink}>
            <div className={cls("glass", styles.container)}>
                <div className={styles.cardHeaderWrapper}>
                    <h2 className={styles.cardHeader}>{props.title}</h2>
                </div>
                <div className={styles.cardImageWrapper}>
                    <Image
                        src={props.imgUrl}
                        width={340}
                        height={280}
                        alt="Unsplash Image"
                        className={styles.cardImage} />

                </div>
            </div>
        </Link>
    );

}

export default Card;