import React, { useEffect, useState } from "react";

import {
  Container,
  Title,
  Wrapper,
  MenuWrapper,
  MenuBar,
  MenuItem,
  MenuIcon,
  MenuBody,
  Card,
  CardContent,
  CardTitle,
  CardBody,
} from "../../components/menu/MenuElements";

const MenuSection = ({ menuList }) => {
  const [filterMenuName, setFilterMenuName] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const temMenuItems = new Set();
    menuList.forEach((item) => {
      temMenuItems.add(item.product.unit_label);
    });
    setMenuItems(Array.from(temMenuItems));
  }, []);

  const changeFilterMenuName = (name) => {
    setFilterMenuName(name);
  };
  const filterMenus = (name, index) => {
    if (filterMenuName === "") {
      return true;
    }
    return name.product.unit_label === filterMenuName;
  };

  return (
    <Container id="menu-page">
      <Wrapper>
        <Title>热门美食</Title>
        <MenuWrapper>
          <MenuBar>
            <MenuIcon />
            <MenuItem
              onClick={() => changeFilterMenuName("")}
              className={`${filterMenuName === "" ? "active" : ""}`}
            >
              所有
            </MenuItem>
            {menuItems.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  onClick={() => changeFilterMenuName(`${item}`)}
                  className={`${filterMenuName === `${item}` ? "active" : ""}`}
                >
                  {item}
                </MenuItem>
              );
            })}
          </MenuBar>
          <MenuBody>
            {menuList &&
              menuList.filter(filterMenus).map((element, index) => {
                return (
                  <Card
                    style={{
                      backgroundImage: `url(${element.product.images[0]})`,
                    }}
                    key={element.product.id}
                  >
                    <CardContent>
                      <CardTitle>{element.product.name}</CardTitle>
                      <CardBody>￥${element.unit_amount}</CardBody>
                    </CardContent>
                  </Card>
                );
              })}
          </MenuBody>
        </MenuWrapper>
      </Wrapper>
    </Container>
  );
};

export default MenuSection;
