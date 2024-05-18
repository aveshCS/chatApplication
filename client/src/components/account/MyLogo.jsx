
import React from 'react'
import {Typography, styled,Box } from "@mui/material";
const LogoText = styled(Typography)`
  font-size: 45px;
  color: #fff;  
  font-weight: bold;
  font-family: 'Your Font', sans-serif; 
`;

const LogoTe = styled(Typography)`
  position: absolute;
  margin-left: 200px;
  font-size: 45px;
  color: #fff;  
  font-weight: bold;
  font-family: 'Your Font', sans-serif; 
`;

const Logophtoto = styled("img")({
    position: "absolute",
    marginLeft: "130px",
    width: "80px",  
    height: "80px",  
  });

const Components = styled(Box)`
  display: flex;
  
`
function MyLogo() {
  return (
    <Components>
        <LogoText>Zenith</LogoText>
        <Logophtoto src="https://mailmeteor.com/logos/assets/PNG/Google_Chat_Logo_512px.png" alt="" />
        <LogoTe>Chat</LogoTe>
    </Components>
  )
}

export default MyLogo