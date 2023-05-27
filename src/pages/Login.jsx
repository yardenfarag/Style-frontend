import styled from "styled-components"
import { mobile } from "../responsive"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/auth"
import { Link, Navigate } from "react-router-dom"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 25%;
    background-color: white;
    ${mobile({
        width: '75%'
    })}
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;    
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    cursor: pointer;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    margin-bottom: 10px;
    transition: all 0.2s ease-in-out;
    &:hover {
        opacity: .8;
    }
    &:disabled {
        cursor: not-allowed;
    }
`
const Error = styled.span`
    color: #f46d6d;
`
const RegisterLink = styled.span`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`

export const Login = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const error = useSelector(state => state.auth.error)
    const user = useSelector(state => state.auth.user)
    const handleLogin = (ev) => {
        ev.preventDefault()
        dispatch(login({username, password}))
    }
    useEffect(() => {
        if (user) {
            Navigate('/')
        }
    }, [user])
    const buttonTitle = (!username || !password ? 'Please fill all fields' : 'Login')
  return (
    <Container>
        <Wrapper>
            <Title>Create an account</Title>
            <Form>
                <Input placeholder='username' onChange={(ev) => setUsername(ev.target.value)}/>
                <Input type='password' placeholder='password' onChange={(ev) => setPassword(ev.target.value)}/>
                <Button onClick={handleLogin} disabled={!username || !password} title={buttonTitle}>LOGIN</Button>
                {error && <Error>Username or password are wrong, please try again.</Error>}
                <Link to='/register' style={{ textDecoration: 'none', color: 'black' }}><RegisterLink>Create an account</RegisterLink></Link>
            </Form>
        </Wrapper>
    </Container>
  )
}
