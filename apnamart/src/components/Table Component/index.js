import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export const DetailsTable = ({ title, tabledata }) => {
    return (
        <>
            <TableContainer component={Paper} >
                <Table>
                    <TableBody >
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: "none" } }}
                        >
                            <TableCell align="justify"><h3>{title}</h3></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>


            <TableContainer component={Paper}>
                <Table>
                    <TableBody >
                        {
                            Array.isArray(tabledata) === true ? <>
                                {
                                    tabledata.map((data, index) => {
                                        return (
                                            <TableRow key={index}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                <TableCell className="text-break" component="th" scope="row">
                                                    {Object.keys(data)[0]}
                                                </TableCell>
                                                <TableCell className="text-break" align="right">
                                                    {Object.values(data)[0]}  
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                                {/* {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                       
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))} */}

                            </> :
                                <>
                                </>

                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}