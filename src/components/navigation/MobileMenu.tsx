import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoHardwareChip } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { globalLinks } from "./nav.config";

export const MobileMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            display="flex"
            justifyContent="space-between"
          >
            <Link to="/" onClick={onClose}>
              <div className="flex items-center gap-2">
                <IoHardwareChip className="text-myPrimary" size={40} />
                <h2 className="text-xl font-bold">Frencho</h2>
              </div>
            </Link>
            <button onClick={onClose}>
              <RxCross2 size={25} />
            </button>
          </DrawerHeader>
          <DrawerBody>
            <ul className="flex flex-col gap-4">
              {globalLinks.map((item) => (
                <li className="myNavLink" key={item.to}>
                  <Link to={item.to} onClick={onClose}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <button className="flex items-center md:hidden" onClick={onOpen}>
        <HiOutlineMenu size={25} />
      </button>
    </>
  );
};
