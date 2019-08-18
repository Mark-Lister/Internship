import React from "react";
import Pagination from 'react-bootstrap/Pagination';



function TablePages(props){
    var items = [];
    for (let page = 1; page <= props.pageCount; page++) {
      items.push(
        <Pagination.Item onClick={() => props.loadPage(page)} key={page} active={page === props.active}>
          {page}
        </Pagination.Item>,
      );
    }
    return(
    <div>
        <Pagination>{items}</Pagination>
        <br />
  </div>
    );

}




export default TablePages;
