import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@mui/icons-material"
import styled from "styled-components"
import { mobile } from "../responsive"
import { Link } from "react-router-dom"

const Container = styled.div`
    display: flex;
    overflow: hidden;
    ${mobile({
        flexDirection: 'column'
    })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1`
    
`
const Description = styled.p`
    margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: ${props => props.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`
const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({
        display: 'none'
    })}
`
const Title = styled.h3`
    margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    &:hover {
        opacity: .7;
    }
`
const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({
        backgroundColor: '#fff8f8'
    })}
`
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`
    width: 50%;
`

export const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Style.</Logo>
                <Description>
                    There are many variations of passages of lorem ipsum available, but
                    the majority have suffered alteration in some form, by injected
                    humour, or randomised words which don't look even slightly believable.
                </Description>
                <SocialContainer>
                    <SocialIcon bg='#3b5999'>
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon bg='#e4405f'>
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon bg='#55acee'>
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon bg='#e60023'>
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <Link to='/' style={{ textDecoration: 'none', color: 'black', width: '50%', marginBottom: '10px' }}><ListItem>Home</ListItem></Link>
                    <Link to='/cart' style={{ textDecoration: 'none', color: 'black', width: '50%', marginBottom: '10px' }}><ListItem>Cart</ListItem></Link>
                    <Link to='/products' style={{ textDecoration: 'none', color: 'black', width: '50%', marginBottom: '10px' }}><ListItem>Clothes</ListItem></Link>
                    <Link to='/login' style={{ textDecoration: 'none', color: 'black', width: '50%', marginBottom: '10px' }}><ListItem>Log in</ListItem></Link>
                    <Link to='/register' style={{ textDecoration: 'none', color: 'black', width: '50%', marginBottom: '10px' }}><ListItem>Register</ListItem></Link>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{marginRight: '10px'}}/>
                    770 Washwood Heath Road, Birmingham
                </ContactItem>
                <ContactItem>
                    <Phone style={{marginRight: '10px'}}/>
                    +1 234 567 89
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{marginRight: '10px'}}/>
                    contact@style.com
                </ContactItem>
                <Payment src='https://i.ibb.co/Qfvn4z6/payment.png'/>
            </Right>
        </Container>
    )
}
