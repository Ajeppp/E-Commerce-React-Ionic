import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { cartOutline, chevronBackOutline } from "ionicons/icons";

//import profile styles
import './Profile.css';
import { useContext, useEffect, useState } from "react";
import ProductsContext from "../data/product-context";

const Profile: React.FC = () => {
    const productsData = useContext(ProductsContext);
    const [cartCounter, setCartCounter] = useState(0);

    useEffect(() => {
        let total = 0;
        productsData.carts.forEach((cart) => {
            total += cart.qty;
        });
        setCartCounter(total);
    }, [productsData.carts]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton color="primary" />
                    </IonButtons>
                    <IonTitle>Profile</IonTitle>
                    <IonButton id="btnCart" fill="clear" size="small" routerLink="/cart" slot="end">
                        <IonFab vertical="top" horizontal="start" edge={true}>
                            <IonBadge color="danger" id="cartCounter">{cartCounter}</IonBadge>
                        </IonFab>
                        <IonIcon size="large" icon={cartOutline} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonButton id="btnBack" fill="clear" routerLink="/home">
                        <IonIcon slot="start" icon={chevronBackOutline} />
                        <h1>Back</h1>
                    </IonButton>
                    <IonRow>
                        <IonCol>
                            <IonCard id="cardProfile">
                                <img src="./profile.jpg" alt="profile" />
                                <IonCardHeader>
                                    <IonCardTitle>
                                        <h1>Jefer Setiawan</h1>
                                    </IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>00000059297</IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    )
}

export default Profile;