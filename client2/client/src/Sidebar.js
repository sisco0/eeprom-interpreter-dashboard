import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Sidebar = ({ setSortByDate }) => {
  return (
    <div className="sidebar">
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="sidebar-nav" />
        <Navbar.Collapse id="sidebar-nav">
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link onClick={() => setSortByDate(true)}>Sort by Date</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Sidebar;

