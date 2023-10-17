import { IonAlert, IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import { cartOutline, chevronBackOutline, trash } from "ionicons/icons";

//import wishlist styles
import './Wishlist.css'
import ProductsContext from "../data/product-context";
import { useContext, useRef, useState } from "react";

const Wishlist: React.FC = () => {
    const productsData = useContext(ProductsContext);
    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
    const [selectedProduct, setSelectedProduct] = useState<{ id: string, name: string, price: number, src: string } | null>(null);
    const [toastMessage, setToastMessage] = useState('');
    const [startAddToCart, setStartAddToCart] = useState(false);
    const [deleteWishlist, setDeleteWishlist] = useState(false);

    const startAddToCartHandler = (productId: string) => {
        setStartAddToCart(true);
        slidingOptionsRef.current?.closeOpened();
        const product = productsData.products.find(p => p.id === productId);
        setSelectedProduct(product!);
    }

    const addToCartHandler = () => {
        if (!selectedProduct) {
            return;
        } else {
            const cartProduct = productsData.carts.find(p => p.id === selectedProduct.id);
            if (cartProduct) {
                productsData.addQty(cartProduct);
                setStartAddToCart(false);
            } else {
                setToastMessage('Added to cart!');
                productsData.addToCart(selectedProduct);
                setStartAddToCart(false);
            }
            productsData.removeWishlist(selectedProduct!);
        }
    }

    const startDeleteWishlist = (productId: string) => {
        setDeleteWishlist(true);
        slidingOptionsRef.current?.closeOpened();
        const product = productsData.products.find(p => p.id === productId);
        setSelectedProduct(product!);
    }

    const deleteWishlistHandler = () => {
        if (!selectedProduct) {
            return;
        } else {
            productsData.removeWishlist(selectedProduct!);
            setDeleteWishlist(false);
            setToastMessage('Removed from wishlist!');
        }
    }

    return (
        <IonPage>
            <IonToast isOpen={!!toastMessage}
                message={toastMessage}
                duration={2000}
                onDidDismiss={() => { setToastMessage('') }} />
            <IonAlert isOpen={startAddToCart}
                header="Are you sure?"
                message="Do you want to add this item to cart?"
                buttons={[
                    { text: 'No', role: 'cancel', handler: () => { setStartAddToCart(false) } },
                    { text: 'Yes', handler: addToCartHandler }
                ]} />
            <IonAlert isOpen={deleteWishlist}
                header="Are you sure?"
                message="Do you want to remove this item from wishlist?"
                buttons={[
                    { text: 'No', role: 'cancel', handler: () => { setDeleteWishlist(false) } },
                    { text: 'Yes', handler: deleteWishlistHandler }
                ]} />
            <IonHeader>
                <IonToolbar>
                    <IonButton size="small" routerLink="/home" id="btnBack" fill="clear" slot="start">
                        <IonIcon color="primary" icon={chevronBackOutline} />
                    </IonButton>
                    <IonTitle>Wishlist</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList lines="full">
                    {productsData.wishlist.map((product) => (
                        <IonItemSliding>
                            <IonItemOptions side="end">
                                <IonItemOption color="success" onClick={startAddToCartHandler.bind(null, product.id)}>
                                    <IonIcon slot="icon-only" icon={cartOutline} />
                                </IonItemOption>
                            </IonItemOptions>
                            <IonItemOptions side="start">
                                <IonItemOption color="danger" onClick={startDeleteWishlist.bind(null, product.id)}>
                                    <IonIcon slot="icon-only" icon={trash} />
                                </IonItemOption>
                            </IonItemOptions>
                            <IonItem id="wishlistItems">
                                <IonImg slot="start" src={product.src} />
                                <IonLabel>
                                    <h1>{product.name}</h1>
                                    <IonText slot="start">${product.price}</IonText>
                                </IonLabel>
                            </IonItem>
                        </IonItemSliding>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Wishlist;