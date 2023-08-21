import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import { Container, Row, Col, Card } from 'react-bootstrap'; // Import React-Bootstrap components
import SvgItem from './SvgItem';


function App() {
  const [items, setItems] = useState([]);
  const [sortByDate, setSortByDate] = useState(false);


  const handleSortByDate = (data) => {
    const sortedItems = data.sort((a, b) => {
      const aDate = new Date(a.currentDate);
      const bDate = new Date(b.currentDate);
      return(aDate > bDate?-1:1);
    });
    return(sortedItems);
  };

  useEffect(() => {
    // Function to fetch items from the server
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/items', {
          method: 'GET',
          headers: { 'Content-type': 'application/json' }
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
    
        if (sortByDate) {
          const sortedData = handleSortByDate(data);
          setItems(sortedData);
        } else {
          setItems(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch items initially
    fetchItems();

    // Set up polling interval (e.g., every 1 seconds)
    const interval = setInterval(fetchItems, 1000);

    // Clean up interval when component unmounts
    return () => clearInterval(interval);
  }, [sortByDate]);

  return (
    <Container>
      <Sidebar
        setSortByDate={setSortByDate}
      />
      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <h1>Supervisor Dashboard</h1>
            <Row>
              {items.map((item) => {
                const itemDate = new Date(item.currentDate);
                const maxRow = Math.ceil(item.cellContent.length / 16);
                const maxRowPh = Math.ceil(item.phCellMapping.length / 16);
                const rsCellContent = [];
                for (var k = 0; k < maxRow; k++) {
                  rsCellContent.push(item.cellContent.slice(k*16, (k+1)*16));
                }
                const rsPhCellMapping = [];
                const rsPhCellUsage = [];
                for (var k = 0; k < maxRowPh; k++) {
                  rsPhCellMapping.push(item.phCellMapping.slice(k*16, (k+1)*16));
                  rsPhCellUsage.push(item.phCellUsage.slice(k*16, (k+1)*16));
                }
                return(
                <Col md={4} key={item._id}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>{DOMPurify.sanitize(item.nickname)} @ {DOMPurify.sanitize(itemDate.toString())}</Card.Title>
                      <SvgItem
                        maxRow={maxRow} 
                        cellContent={rsCellContent}
                        phCellMapping={rsPhCellMapping}
                        phCellUsage={rsPhCellUsage}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              )})}
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
