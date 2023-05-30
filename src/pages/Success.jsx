import { useSelector } from "react-redux"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Loader } from '../components/Loader'
import { mobile } from "../responsive"

const Container = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    ${mobile({
        width: '100%',
        fontSize: '18px',
        padding: '2px',
        gap: '10px'
})}
`
const OrderInfoContainer = styled.div`
    

`
const OrderTitle = styled.h2`
    text-align: center;
    padding: 15px;
`
const OrderDetail = styled.span`
    font-weight: bold;
    text-decoration: underline;
`
const OrderId = styled.span`

`
const OrderStatus = styled.p`

`
const Button = styled.button`
    cursor: pointer;
    padding: 10px;
    margin-top: 20px;
    background-color: teal;
    color: white;
    border: none;
    &:hover {
        opacity: .8;
    }
`

export const Success = () => {
    const data = useSelector(state => state.cart.orderData)
    if (!data) {
        return (
            <Loader/>
        )
    }
    else return (
        <Container>
            <CheckCircleIcon style={{ fill: 'green', fontSize: '6rem' }} />
            <OrderInfoContainer>
                <OrderTitle style={{textAlign: 'center', padding: '15px'}}>Your order is on the way!</OrderTitle>
                <OrderId><OrderDetail>Order Id:</OrderDetail> {data.id}</OrderId>
                <OrderStatus><OrderDetail>Order Status:</OrderDetail> Pending</OrderStatus>
            </OrderInfoContainer>
            <Link to='/'><Button>Go to Homepage</Button></Link>
        </Container>
    );
};
