import { useState } from "react";

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Menu, MenuItem, styled } from "@mui/material";

const MenuOption = styled(MenuItem)`
  font-size: 14px;
  padding: 15px 60px 5px 24px;
  color: #4a4a4a;
`;
function AddNewUser({setopenAdduser}) {
    const [open, setOpen] = useState(null);

  const handleClose = () => {
    setOpen(null);
  };
  const handleClick = (e) => {
    setOpen(e.currentTarget);
  };

  return (
    <>
    <PersonAddIcon onClick={handleClick} />
    <Menu
      anchorEl={open}
      keepMounted
      open={open}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuOption
        onClick={() => {
          handleClose();
          setopenAdduser(true);
        }}
      >
        Add New user
      </MenuOption>
    </Menu>
  </>
  )
}

export default AddNewUser
