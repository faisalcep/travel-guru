import React, { useContext } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Nav,
  Navbar,
} from 'react-bootstrap';
import logo from '../../assets/logo.png';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import * as firebase from 'firebase/app';
import 'firebase/auth';

// ============================================================================================

// Handle Home Button
const Header = () => {
let history = useHistory();
  function handleClickHome() {
    history.push('/home');
  }

  // Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  // console.log('from header', loggedInUser);

  // Handle sign out button
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          error: '',
          success: false,
        };
        setLoggedInUser(signedOutUser);
      })
      .catch((err) => {
        const errorMessage = err.message;
        console.log(errorMessage);
      });
  };

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='light'
      variant='light'
      sticky='top'
    >
      <Container>
        <Navbar.Brand>
          {/* Home Button handle */}
          <img onClick={handleClickHome} src={logo} alt='Travel Guru' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />

        <Navbar.Collapse id='responsive-navbar-nav'>
          <InputGroup className='search-box mr-3'>
            <InputGroup.Prepend>
              <Button>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </InputGroup.Prepend>
            <FormControl placeholder='Search your destination' />
          </InputGroup>
          <Nav className='d-flex justify-content-between nav-link ml-auto align-items-md-center '>
            {/* <Nav.Link href='#features'>News</Nav.Link> */}
            <Nav.Link> <Link style={{color: '#333'}} to='/'>Home</Link></Nav.Link>
            <Nav.Link href='#blog'>Blog</Nav.Link>
            <Nav.Link href='#contact'>Contact</Nav.Link>
            {/* Switch login and sign out button and display user name */}
            <Nav.Link>
              {loggedInUser.email ? (
                <Link to='/hotel-details' className='user-name'>
                  {loggedInUser.name}
                </Link>
              ) : (
                <Link to='/login'>
                  <Button className='w-100' variant='warning'>
                    Login
                  </Button>
                </Link>
              )}
            </Nav.Link>
            {/* Sign Out button handle */}
            <Nav.Link>
              {loggedInUser.email && (
                <Link to='/'>
                  <Button
                    onClick={handleSignOut}
                    className='w-100'
                    variant='danger'
                  >
                    Sign Out
                  </Button>
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
