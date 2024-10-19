import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

interface AccountProfileProps {
  avatar: string;
  name: string;
  email: string;
  logOut: () => void;
}

export const AccountProfile = ({
  avatar,
  name,
  email,
  logOut,
}: AccountProfileProps) => {
  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar size="sm" name={name} src={avatar} />
        </MenuButton>
        <MenuList>
          <MenuGroup title="Profile">
            <MenuItem>My Account</MenuItem>
            <MenuItem>{email} </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Help">
            <MenuItem onClick={logOut}>Log out</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </>
  );
};
