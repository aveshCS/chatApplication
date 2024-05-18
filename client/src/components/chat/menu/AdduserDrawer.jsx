import { Drawer, Box, Typography, styled } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import {addUser} from '../../../service/api'

const Header = styled(Box)`
  background: #008069;
  height: 107px;
  color: #ffffff;
  display: flex;
  align-items: center;
  & > svg,
  & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
  }
`;

const Text = styled(Typography)`
  font-size: 18px;
`;

const drawerStyle = {
  left: 20,
  top: 17,
  height: "95%",
  width: "30%",
  boxShadow: "none",
};
const AdduserDrawer = ({ open, setopens }) => {
  const [emails, setemail] = useState('');
  const [names, setname] = useState('');

  const generateSub = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let sub = '';
    for (let i = 0; i < 10; i++) {
      sub += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return sub;
  };

  const Mysub = generateSub();

  const handleClose = () => {
    setopens(false);
  };

  const addUsertoDataBase = async () => {
    const data = {
      name: names,
      email: emails,
      picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png',
      sub: Mysub
    };
    const userAddedVerfication = await addUser(data);
    console.log('user added successfully',userAddedVerfication);

    // useEffect(()=>{
      
    // },[]);


  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: drawerStyle }}
      style={{ zIndex: 1500 }}
    >
      <Header>
        <ArrowBack onClick={() => setopens(false)} />
        <Text>Add New User</Text>
      </Header>
      <Box>
        <input
          type="email"
          placeholder="Enter the gmail Account"
          style={{
            width: "70%",
            padding: "20px",
            margin: "40px 20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the Name"
          style={{
            width: "70%",
            padding: "20px",
            margin: "20px 20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
          onChange={(e) => setname(e.target.value)}
        />
        <button
          style={{
            background: "#008069",
            color: "#ffffff",
            padding: "20px 40px",
            border: "none",
            borderRadius: "9px",
            cursor: "pointer",
            marginLeft: '4cm',
            marginTop: '1cm'
          }}
          onClick={addUsertoDataBase}
        >
          Add User
        </button>
      </Box>
    </Drawer>
  );
};

export default AdduserDrawer;
