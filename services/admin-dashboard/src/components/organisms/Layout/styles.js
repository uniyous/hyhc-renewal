import styled from 'styled-components';

export const LayoutContainer = styled.div`
  min-height: 100vh;
`;

export const HeaderContainer = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: relative;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 16px;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

export const SidebarContainer = styled.div`
  .ant-layout-sider {
    border-right: 1px solid #f0f0f0;
  }
`;

export const Logo = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  margin: 16px;
  border-radius: 6px;
  transition: all 0.3s;
  
  ${props => props.collapsed && `
    margin: 16px 8px;
  `}
`;

export const FooterContainer = styled.div`
  background: #f0f2f5;
  
  .ant-layout-footer {
    color: #666;
    font-size: 14px;
  }
`;