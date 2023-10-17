import { IonAlert, IonButton, IonButtons, IonCard, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTabBar, IonTabs, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { addOutline, cart, chevronBackOutline, removeOutline } from "ionicons/icons";

//import cart styles
import './Cart.css';
import ProductsContext from "../data/product-context";
import { useContext, useEffect, useState } from "react";

const Cart: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<{ id: string, name: string, price: number, qty: number, src: string } | null>(null);
    const [arrCart, setArrCart] = useState<{ id: string, name: string, price: number, qty: number, src: string }[]>([]);
    const [removeProduct, setRemoveProduct] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const productsData = useContext(ProductsContext);

    const startAddQtyHandler = (productId: string) => {
        const cartIndex = productsData.carts.find(p => p.id === productId);
        if (!cartIndex) return;
        setSelectedProduct(cartIndex);
        productsData.addQty(cartIndex);
    }

    const startMinusQtyHandler = (productId: string) => {
        const cartIndex = productsData.carts.find(p => p.id === productId);
        if (!cartIndex) return;

        if (cartIndex.qty === 1) {
            setSelectedProduct(cartIndex);
            setRemoveProduct(true);
            return;
        }
        setSelectedProduct(cartIndex);
        productsData.removeQty(cartIndex);
    }

    const removeProductHandler = () => {
        if (!selectedProduct) return;
        productsData.removeProduct(selectedProduct);
        setRemoveProduct(false);
    }

    const addHistoryHandler = () => {
        // make handler to check if cart is empty
        if (productsData.carts.length === 0) return;
        productsData.addHistory(productsData.carts);
        productsData.clearCart();
    }

    useEffect(() => {
        let total = 0;
        productsData.carts.forEach((cart) => {
            total += cart.price * cart.qty;
        });

        setArrCart(productsData.carts);
        setTotalPrice(total);
    }, [productsData.carts]);

    return (
        <IonPage>
            <IonAlert isOpen={removeProduct}
                header="Are you sure?"
                message="Do you want to remove this product from your cart?"
                buttons={[
                    { text: 'Cancel', role: 'cancel', handler: () => { setRemoveProduct(false) } },
                    { text: 'Remove', handler: removeProductHandler }
                ]} />
            <IonHeader>
                <IonToolbar>
                    <IonButton size="small" routerLink="/home" id="btnBack" fill="clear" slot="start">
                        <IonIcon color="primary" icon={chevronBackOutline} />
                    </IonButton>
                    <IonTitle>Cart</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList lines="full">
                    {productsData.carts.map((cart) => (
                        <IonItem id="cartItems">
                            <IonImg slot="start" src={cart.src} />
                            <IonLabel>
                                <IonText id="productName"><h1>{cart.name}</h1></IonText>
                                <IonText id="productPrice1">${cart.price}</IonText>
                            </IonLabel>
                            <IonCard id="btnAdd">
                                <IonGrid id="gridProductList">
                                    <IonRow>
                                        <IonCol>
                                            <IonIcon color="dark" onClick={startMinusQtyHandler.bind(null, cart.id)} icon={removeOutline} />
                                        </IonCol>
                                        <IonCol>
                                            <IonText color="dark" id="textCounter">{cart.qty}</IonText>
                                        </IonCol>
                                        <IonCol>
                                            <IonIcon color="dark" onClick={startAddQtyHandler.bind(null, cart.id)} icon={addOutline} />
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCard>
                        </IonItem>
                    ))}
                </IonList>
                <IonCard id="cardSummary">
                    <IonGrid id="gridSummary">
                        {productsData.carts.map((cart) => (
                            <IonRow>
                                <IonCol>
                                    <IonText>{cart.name}</IonText>
                                </IonCol>
                                <IonCol>
                                    <IonText>({cart.qty}x)</IonText>
                                </IonCol>
                                <IonCol>
                                    <IonText color="dark">: ${cart.price * cart.qty}</IonText>
                                </IonCol>
                            </IonRow>
                        ))}
                        <IonRow>
                            <IonCol id="totalPrice">
                                <IonText color="dark">Total: ${totalPrice}</IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonButton size="small" color="success" fill="solid" onClick={addHistoryHandler}>Checkout</IonButton>
                </IonCard>
            </IonContent>
        </IonPage >
    )
}

export default Cart;