import styled from "styled-components";
import {
  BasicInput,
  BasicInValidFeedback,
  BasicBtn,
  BasicTextarea,
} from "components/BasicElements";

export const Container = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  /* padding: 0 24px; */
  min-height: calc(100vh - ${({ theme }) => theme.navbar.height});

  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  /* grid-auto-columns: minmax(1fr, auto); */
  grid-template-areas: "colMenu colMenu colMenu colCart colCart";

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-areas: "colMenu colMenu" "colCart colCart";
  }
`;

// 菜单
export const MenuContainer = styled.section`
  grid-area: colMenu;
  margin-bottom: 5rem;
`;

export const MenuNavbar = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
`;

export const MenuItem = styled.li`
  /* margin-right: 4rem; */
  font-size: 1.2rem;
  color: #7c7c7c;
  padding: 10px 1rem;
  transition: color 300ms ease, border-bottom 300ms ease;
  cursor: pointer;

  &.active,
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:first-of-type {
    color: black;
  }
`;

// 左侧菜单
const CARD_WIDTH = "23ch";
const CARD_IMG_HEIGHT = CARD_WIDTH;
export const MenuBody = styled.div`
  /* border: 1px solid black; */

  // 1
  /* display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around; */
  // 2
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(${CARD_WIDTH}, max-content)); */
  grid-template-columns: repeat(auto-fit, ${CARD_WIDTH});
  grid-gap: 16px;
  justify-content: center;
  padding: initial;
`;

export const MenuCart = styled.div`
  position: relative;
  /* border: 1px solid black; */
  border-radius: 10px;
  overflow: hidden;
  /* width: 25ch; */
  width: 100%;
  /* height: 100%; */
  margin-top: 1.2rem;
  box-shadow: 1px 1px 10px 0.5px rgba(0, 0, 0, 0.5);

  /* flex-grow: 1;
  flex-basis: 0; */
  flex-grow: 0;
  flex-basis: 30%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-grow: 0;
    flex-basis: 45%;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-grow: 0;
    flex-basis: 80%;
  }
`;
export const MenuCartImg = styled.div`
  /* height: 150px; */
  height: ${CARD_IMG_HEIGHT};
  /* height: minmax(${CARD_IMG_HEIGHT}, 35px); */

  position: relative;
  overflow: hidden;
  /* display: grid;
  align-items: center; */

  /* 测试 */
  & img {
    /* background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */
    /* width: 50%; */
    /* width: 100%; */
    /* height: auto; */
    /* display: block; */
  }
`;
export const MenuCartBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
export const MenuCartTitle = styled.h3`
  display: block;
  width: 100%;
  overflow: hidden;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
`;
export const MenuCartPrice = styled.span`
  margin-left: 0.5rem;
`;
export const MenuCartBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  /* margin-left: 1rem; */
`;
export const _MenuCartBtn = styled.div`
  padding: 0 10px;
  cursor: pointer;
`;
export const MenuCartMinusBtn = styled(_MenuCartBtn)`
  &::after {
    content: "-";
  }
`;
export const MenuCartPlusBtn = styled(_MenuCartBtn)`
  &::after {
    content: "+";
  }
`;
export const MenuCartNumber = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 1px 1rem;

  &.empty {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.light};
    border: none;
    margin-right: 1rem;
    cursor: pointer;
  }
`;

// 购物车
export const CartContainer = styled.section`
  grid-area: colCart;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  align-items: flex-start;
  padding: 0 25px;

  background-color: #fafafa;
`;
export const CartBody = styled.div`
  width: 100%;
`;

export const CartTitle = styled.h2`
  display: inline-block;
  width: 100%;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const CartMenu = styled.ul`
  list-style: none;
  position: relative;
  margin-bottom: 50px;
`;
export const CartItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;
export const ItemImg = styled.div`
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
`;

export const ItemTitle = styled.h3`
  min-width: 4.5rem;
`;

export const ItemBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  /* border: 1px solid ${({ theme }) => theme.colors.light}; */
`;

const _ItemBtn = styled.div`
  font-size: 1.6rem;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

export const ItemMinusBtn = styled(_ItemBtn)``;

export const ItemNumber = styled.span`
  /* color: ${({ theme }) => theme.colors.light}; */
  border-radius: 10px;
  display: inline-block;
  text-align: center;
  padding: 0.3rem 1.5rem;
  background-color: white;

  border: 1px solid ${({ theme }) => theme.colors.light};
`;
export const ItemAddBtn = styled(_ItemBtn)``;

export const ItemPrice = styled.span`
  font-size: 1.3rem;
`;

export const ItemDelBtn = styled.div`
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
`;

// 表单

export const CartForm = styled.div`
  margin-top: 2rem;
`;
export const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin-bottom: 15px;
  /* width: 100%; */

  position: relative;
`;
export const InputLabel = styled.span`
  font-size: 1.2rem;

  &::after {
    content: "：";
  }
`;
// export const Input = styled.input`
export const Input = styled(BasicInput)`
  display: inline;
  flex: 1 1 auto;

  font-size: 1.2rem;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  background-color: #fff;
  border: 1px solid #ced4da;
`;
// export const InputTextarea = styled.textarea`
export const InputTextarea = styled(BasicTextarea)`
  flex: 1 1 auto;
  display: inline;
  font-size: 1.2rem;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  background-color: #fff;
  border: 1px solid #ced4da;
`;
export const InValidFeedback = styled(BasicInValidFeedback)`
  /* width: max-content; */
  display: inline-block;
  text-align: end;
`;
// 底部

export const CartFooter = styled.div`
  /* margin-top: auto; */
  margin-top: 100px;
  width: 100%;
  margin-bottom: 30px;
`;

export const CartFooterBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
`;
export const TotalPriceLabel = styled.span`
  font-size: 1.4rem;
  color: #7c7c7c;
`;
export const TotalPriceText = styled.span`
  font-size: 1.4rem;
`;

// export const CheckoutBtn = styled.button`
export const CheckoutBtn = styled(BasicBtn)`
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  width: 100%;
  height: 3.3rem;

  border-radius: 5px;
  border: solid 1px #e25a46;
`;
