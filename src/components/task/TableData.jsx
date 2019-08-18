import React from "react";
import {
    TableCell,
    TableRow,
    TableBody,
} from "@material-ui/core";


function TableData(props){
    return(
    <TableBody> 
        {   
        props.companies.map((data, ind) =>  <TableRow key={`row_${ind}`}>
        {
        <>
        {props.columns.map((column, cell) => 
            <TableCell key={`cell_${ind+'-'+cell}`} >{data[column]}</TableCell>)
        }
        </>
        }
        </TableRow>)
    }
    </TableBody>
    );

}




export default TableData;
