import Link from 'next/link';
import Footer from "./footer";
import { Container, Nav, Button } from "./../node_modules/react-bootstrap";


export default function Layout({ children }) {
  return (

    <div>
        <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Container>
                <Link href="/" className="navbar-brand">Blog</Link>
                <Button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></Button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link href="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                    </ul>
                </div>
            </Container>
        </Nav> 
        <div className='container'>                
          { children }       
        </div>
        <Footer />
    </div>
    
  );
};