import styled from "styled-components"
import { Navbar } from "../components/Navbar"
import { Announcement } from "../components/Announcement"
import { Footer } from "../components/Footer"
import { Add, Remove } from "@mui/icons-material"
import { mobile } from "../responsive"
import { useDispatch, useSelector } from "react-redux"
import StripeCheckout from "react-stripe-checkout"
import { cartActions, checkout } from "../store/cart"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

const KEY = 'pk_test_51MZOnQE2nCh4pQvl7tPaCvsrQ4WmbjJMfY9ZqZhXdicLrBHcnVPRTbLIAAMMhcgeKpcJrVyCzhXU8B96htccHeqB007URW6aHm'

const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({
    padding: '10px'
})}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    cursor: pointer;
    padding: 10px;
    font-weight: 600;
    border: ${props => props.type === 'filled' && 'none'};
    background-color: ${props => props.type === 'filled' ? 'black' : 'transparent'};
    color: ${props => props.type === 'filled' && 'white'};
`
const TopTexts = styled.div`
    ${mobile({
    display: 'none'
})}
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({
    flexDirection: 'column'
})}
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({
    flexDirection: 'column'
})}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span`

`
const ProductId = styled.span`

`
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    border: 1px solid #8f8e8e;
`
const ProductSize = styled.span`

`
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({
    margin: '5px 15px'
})}
`
const ProductPrice = styled.span`
    font-size: 30px;
    font-weight: 200;
    ${mobile({
    marginBottom: '20px'
})}
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === 'total' && '500'};
    font-size: ${props => props.type === 'total' && '24px'};
`
const SummaryItemText = styled.span`
    
`
const SummaryItemPrice = styled.span`
    
`
const SummaryButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    cursor: pointer;
    font-weight: 600;
    transition: all .2s ease-in-out;
    &:hover {
        opacity: .8;
    }
    &:disabled {
        cursor: not-allowed;
    }
`

export const Cart = () => {
    const cart = useSelector(state => state.cart)
    const order = useSelector(state => state.cart.orderData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const makeRequest = (token) => {
        dispatch(checkout({tokenId: token.id, amount: cart.total*100}))
        navigate('/success', { data: order })
    }
    const onToken = (token) => {
        makeRequest(token)
    }
    const addProductHandler = (productId) => {
        dispatch(cartActions.increaseProductQuantity(productId))
    }
    const removeProductHandler = (productId) => {
        dispatch(cartActions.removeProduct(productId))
    }
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>Your Bag</Title>
                <Top>
                    <Link to='/products'><TopButton>Continue Shopping</TopButton></Link>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map(product =>
                            <Product key={Math.random()}>
                                <ProductDetail>
                                    <Link to={`/product/${product._id}`}><Image src={product.img} /></Link>
                                    <Details>
                                        <ProductName><b>Product:</b>{product.title}</ProductName>
                                        <ProductId><b>ID:</b>{product._id}</ProductId>
                                        <ProductColor color={product.color} />
                                        <ProductSize><b>Size:</b>{product.size}</ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Add onClick={() => addProductHandler(product._id)} style={{cursor: 'pointer'}}/>
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Remove onClick={() => removeProductHandler(product._id)} style={{cursor: 'pointer'}}/>
                                    </ProductAmountContainer>
                                    <ProductPrice>${product.price * product.quantity}</ProductPrice>
                                </PriceDetail>
                            </Product>)}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>${cart.total> 50 ? '5.90' : '0.00'}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>${cart.total> 50 ? '-5.90' : '0.00'}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type='total'>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name='Style Shop'
                            billingAddress
                            shippingAddress
                            description={`Your total is ${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <SummaryButton disabled={cart.total <= 0}>CHECKOUT</SummaryButton>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}


