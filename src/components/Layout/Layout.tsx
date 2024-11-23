import Nav from '../Nav/Nav';
import './Layout.scss';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <>
            <Nav />
            <main className="main">{children}</main>
        </>
    );
};

export default Layout;
