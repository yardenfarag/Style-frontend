import { useSelector } from "react-redux"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Loader } from '../components/Loader'

const Container = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 28px;
`
const OrderInfoContainer = styled.div`
    

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
                <h2 style={{textAlign: 'center', padding: '15px'}}>Your order is on the way!</h2>
                <span>Order Id: {data.id}</span>
                <p>Order Status: Pending</p>
            </OrderInfoContainer>
            <Link to='/'><Button>Go to Homepage</Button></Link>
        </Container>
    );
};
