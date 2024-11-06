import Nav from "../Nav/Nav";
import "./Layout.scss";


const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Nav handleAddNote={() => {}} handleRemoveAll={() => {}} />
      <main className="main">{children}</main>
    </>
  );
};

export default Layout;
