import MainNavi from './MainNavi';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <>
      <MainNavi />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
