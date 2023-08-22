import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

import { Facebook, Instagram, LocationCity, LocationOn, Mail, MailOutlined, Phone, Twitter } from '@mui/icons-material'
import styled from 'styled-components'


const Logo = styled.h1`
`

const Desc = styled.p`
`

const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: White;
    background-color: #${props => props.color};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`

const Title = styled.h2`
  margin-bottom:5px;
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
`

const Link = styled.a`
  color:white;
  decoration:none;
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <Logo>Apni Smart Dukan.</Logo>
        <Desc>
          Its is the first Store where you can buy NFTs and also your normal stuffs and many more other things
        </Desc>
        <SocialContainer>
          <SocialIcon color='3B5999' >
            <Facebook />
          </SocialIcon>
          <SocialIcon color='E4405F'>
            <Instagram />
          </SocialIcon>
          <SocialIcon color='55ACEE'>
            <Twitter />
          </SocialIcon>
        </SocialContainer>
      </div>

      <div className="midFooter">
        <Title>Useful Link</Title>
        <List>
          <ListItem><Link href="/">Home</Link></ListItem>
          <ListItem><Link href="/profile">My Account</Link></ListItem>
          <ListItem><Link href="/products">Product</Link></ListItem>
          <ListItem><Link href="/cart">Cart</Link></ListItem>
          <ListItem><Link href="https://nft-gallery-6c5a9.web.app/">Gallery</Link></ListItem>
          <ListItem><Link href="/3004">MarketPlace</Link></ListItem>
        </List>
      </div>

      <div className="rightFooter">
        <Title>Contact</Title>
        <ContactItem><LocationOn style={{ marginRight: '10px' }} /> 420 Shaitan gali , jahanum road 999</ContactItem>
        <ContactItem><Phone style={{ marginRight: '10px' }} /> 4201207200</ContactItem>
        <ContactItem><MailOutlined style={{ marginRight: '10px' }} /> Momo69@gmail.com</ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </div>
    </footer>
  );
};

export default Footer;