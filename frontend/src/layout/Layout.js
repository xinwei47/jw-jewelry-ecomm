import MainNavi from './MainNavi';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <div>
      <MainNavi />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
