import { IonAlert, IonBadge, IonBreadcrumb, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar } from "@ionic/react"
import { cartOutline, cart, heart } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductsContext from "../data/product-context";


import Carousel from "../components/Carousel";
import './Home.css'
import { useContext, useEffect, useState } from "react";


const Home: React.FC = () => {
    const [toastMessage, setToastMessage] = useState('');
    const [addWishlist, setAddWishlist] = useState(false);
    const [addToCart, setAddToCart] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{ id: string, name: string, price: number, src: string } | null>(null);
    const [cartCounter, setCartCounter] = useState(0);
    const productsData = useContext(ProductsContext);

    const startAddWishlistHandler = (productId: string) => {
        const product = productsData.products.find(p => p.id === productId);
        setSelectedProduct(product!);
        setAddWishlist(true);
    }

    const addWishlisthandler = () => {
        if (!selectedProduct) {
            return;
        } else if (productsData.wishlist.find(p => p.id === selectedProduct.id)?.id) {
            setToastMessage('This product is already in your wishlist!');
            setAddWishlist(false);
        } else {
            setToastMessage('Added to wishlist!');
            productsData.addWishlist(selectedProduct);
            setAddWishlist(false);
        }
    }

    const startAddToCartHandler = (productId: string) => {
        const product = productsData.products.find(p => p.id === productId);
        setSelectedProduct(product!);
        setAddToCart(true);
    }

    const addToCartHandler = () => {
        if (!selectedProduct) {
            return;
        } else {
            const cartProduct = productsData.carts.find(p => p.id === selectedProduct.id);
            if (cartProduct) {
                productsData.addQty(cartProduct);
                setAddToCart(false);
            } else {
                setToastMessage('Added to cart!');
                productsData.addToCart(selectedProduct);
                setAddToCart(false);
            }
        }
    }

    useEffect(() => {
        let total = 0;
        productsData.carts.forEach((cart) => {
            total += cart.qty;
        });
        setCartCounter(total);
    }, [productsData.carts]);


    return (
        <IonPage>
            <IonToast isOpen={!!toastMessage}
                message={toastMessage}
                duration={2000}
                onDidDismiss={() => { setToastMessage('') }} />
            <IonAlert isOpen={addWishlist}
                header="Are you sure?"
                message="Do you want to add this product to your wishlist?"
                buttons={[
                    { text: 'No', role: 'cancel', handler: () => { setAddWishlist(false) } },
                    { text: 'Yes', handler: addWishlisthandler }
                ]} />
            <IonAlert isOpen={addToCart}
                header="Are you sure?"
                message="Do you want to add this product to your cart?"
                buttons={[
                    { text: 'No', role: 'cancel', handler: () => { setAddToCart(false) } },
                    { text: 'Yes', handler: addToCartHandler }
                ]} />
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton color="primary" />
                    </IonButtons>
                    <IonTitle>SneakersHere</IonTitle>
                    <IonButton id="btnCart" fill="clear" size="small" routerLink="/cart" slot="end">
                        <IonFab vertical="top" horizontal="start" edge={true}>
                            <IonBadge color="danger" id="cartCounter">{cartCounter}</IonBadge>
                        </IonFab>
                        <IonIcon size="large" icon={cartOutline} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Carousel />
                <IonGrid>
                    <IonRow>
                        <IonCol id="section">
                            <IonText>Featured</IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        {productsData.products.map(product => (
                            <IonCol className="ion-no-padding">
                                <IonCard id="cardProduct" key={product.id}>
                                    <IonImg src={product.src} alt="" />
                                    <IonCardHeader>
                                        <IonCardSubtitle>
                                            <IonText>${product.price}</IonText>
                                        </IonCardSubtitle>
                                        <IonCardSubtitle>
                                            <IonText color="dark" id="productName">{product.name}</IonText>
                                        </IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonGrid>
                                        <IonRow id="btnProduct" className="ion-text-center ion-justify-content-between">
                                            <IonButton size="small" color="danger" onClick={startAddWishlistHandler.bind(null, product.id)} fill="clear">
                                                <IonIcon icon={heart} />
                                            </IonButton>
                                            <IonButton size="small" color="success" onClick={startAddToCartHandler.bind(null, product.id)} fill="clear">
                                                <IonIcon icon={cart} />
                                            </IonButton>
                                        </IonRow>
                                    </IonGrid>
                                </IonCard>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent >
        </IonPage >
    )
}

export default Home;