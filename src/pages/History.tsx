import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonModal, IonPage, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";

// import history styles
import './History.css'
import { useContext, useEffect, useState } from "react";
import ProductsContext from "../data/product-context";

const History: React.FC = () => {
    const productsData = useContext(ProductsContext);
    const [isDetail, setIsDetail] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState<{ id: string, cart: { id: string, name: string, qty: number, price: number }[], total: number } | null>(null);

    const detailsHandler = (historyId: string) => {
        const historySelect = productsData.history.find((history) => { return history.id === historyId });
        setSelectedHistory(historySelect!);
        setIsDetail(true);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton size="small" routerLink="/home" id="btnBack" fill="clear" slot="start">
                        <IonIcon color="primary" icon={chevronBackOutline} />
                    </IonButton>
                    <IonTitle>History</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid id="btnFilter">
                    <IonRow>
                        <IonCol>
                            <IonButton size="small" color="success">Filter</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {productsData.history.map((history) => (
                    <IonCard id="history">
                        <IonGrid>
                            <IonRow>
                                <IonCol id="idTrx">
                                    <h1>ID Transaction</h1>
                                </IonCol>
                                <IonCol>
                                    <h1>: {history.id}</h1>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <h1>Total</h1>
                                </IonCol>
                                <IonCol>
                                    <h1>: ${history.total}</h1>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonButton onClick={detailsHandler.bind(null, history.id)} size="small" color="primary" fill="solid">Detail</IonButton>
                    </IonCard>
                ))}
                <IonModal isOpen={isDetail}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Detail Transaction</IonTitle>
                            <IonButton size="small" onClick={() => setIsDetail(false)} slot="start" fill="clear">
                                <IonIcon size="small" icon={chevronBackOutline} />
                            </IonButton>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonText>Transaction ID: {selectedHistory?.id}</IonText>
                                </IonCol>
                            </IonRow>
                            <IonRow className="ion-padding">
                                <IonText>Product: </IonText>
                            </IonRow>
                            <IonRow id="rowTitle">
                                <IonCol>
                                    <IonText>Name</IonText>
                                </IonCol>
                                <IonCol>
                                    <IonText>Qty</IonText>
                                </IonCol>
                                <IonCol>
                                    <IonText>Price</IonText>
                                </IonCol>
                            </IonRow>
                            {selectedHistory?.cart.map((items) => (
                                <IonRow id="rowItems">
                                    <IonCol id="rowItemName">
                                        <IonText >{items.name}</IonText>
                                    </IonCol>
                                    <IonCol id="rowItemQty">
                                        <IonText>{items.qty}</IonText>
                                    </IonCol>
                                    <IonCol>
                                        <IonText>${items.price * items.qty}</IonText>
                                    </IonCol>
                                </IonRow>
                            ))}
                            <IonRow className="ion-padding">
                                <IonCol id="colPrice">
                                    <IonText>Total</IonText>
                                </IonCol>
                                <IonCol id="colTotal">
                                    <IonText>${selectedHistory?.total}</IonText>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    )
}

export default History;