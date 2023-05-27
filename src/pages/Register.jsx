import styled from "styled-components"
import { mobile } from "../responsive"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../store/auth"
import { Navigate } from "react-router-dom"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;
    ${mobile({
        width: '75%'
    })}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;    
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    cursor: pointer;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    transition: all 0.2s ease-in-out;
    &:hover {
        opacity: .8;
    }
`
const emptyUser = {name: '', lastName: '', username: '', email: '', password: ''}

export const Register = () => {
    const dispatch = useDispatch()
    const [newUser, setNewUser] = useState(emptyUser)
    const [confirmPassword, setConfirmPassword] = useState('')
    const user = useSelector(state => state.auth.user)
    const error = useSelector(state => state.auth.error)
    const handleSignup = (ev) => {
        ev.preventDefault()
        console.log(confirmPassword);
        console.log(newUser)
        const isConfirmedPassword = (confirmPassword === newUser.password)
        console.log(isConfirmedPassword);
        if(!isConfirmedPassword || !newUser.name || !newUser.password || !newUser.email || !newUser.username || !newUser.lastName) {
            return
        }
        dispatch(signup(newUser))
    }
    useEffect(() => {
        if (user) {
            Navigate('/')
        }
    }, [user])
  return (
    <Container>
        <Wrapper>
            <Title>Create an account</Title>
            <Form>
                <Input placeholder='name' onChange={(ev) => setNewUser((prev) => ({ ...prev, name: ev.target.value }))}/>
                <Input placeholder='last name' onChange={(ev)=>setNewUser((prev) => ({ ...prev, lastName: ev.target.value }))}/>
                <Input placeholder='username' onChange={(ev)=>setNewUser((prev) => ({ ...prev, username: ev.target.value }))}/>
                <Input type='email' placeholder='email' onChange={(ev)=>setNewUser((prev) => ({ ...prev, email: ev.target.value }))}/>
                <Input type='password' placeholder='password' onChange={(ev)=>setNewUser((prev) => ({ ...prev, password: ev.target.value }))}/>
                <Input type='password' placeholder='confirm password' onChange={(ev) => setConfirmPassword(ev.target.value)}/>
                <Agreement>
                    By creating an account, I consent to the
                    processing of my personal data in accordance
                    with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button onClick={handleSignup}>CREATE</Button>
                {error && <span>{error}</span>}
            </Form>
        </Wrapper>
    </Container>
  )
}
