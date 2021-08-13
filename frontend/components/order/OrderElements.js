import styled from "styled-components";

export const Container = styled.section`
  margin-bottom: 100px;
`;

export const Wrapper = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-top: ${({ theme }) => theme.navbar.height};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* flex-wrap: wrap;
   */
`;

export const Orders = styled.ul`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.lg};
`;

export const Order = styled.li`
  list-style: none;
  margin-bottom: 2rem;
  border: 1px solid #ececec;
`;

export const OrderHeader = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.light};
  border-bottom: 1px solid #ececec;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

export const OrderDate = styled.span`
  font-weight: bolder;
  margin-right: 1rem;
`;

export const OrderId = styled.span`
  display: block;
  max-width: 100%;
  white-space: pre-wrap; // preserve whitespace, the text is wrapped
  overflow-wrap: break-word;
`;

export const OrderBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export const CardBoxWrapper = styled.div`
  flex: 4 1 auto;
  border-right: 1px solid #ececec;
`;
export const CardBox = styled.div`
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 1px solid #ececec;
  &:last-child {
    border-bottom: 0;
  }
`;
export const CardImg = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
`;
export const CardTitle = styled.div`
  min-width: 100px;
`;
export const CardPrice = styled.div`
  min-width: 100px;
`;
export const CardCount = styled.div`
  min-width: 100px;
`;
export const OrderTotalPrice = styled.div`
  border-right: 1px solid #ececec;
  text-align: center;
  flex: 1 1 auto;
  padding: 1rem;
  font-weight: bolder;
`;
export const OrderState = styled.div`
  text-align: center;
  flex: 1 1 auto;
  padding: 1rem;
`;
