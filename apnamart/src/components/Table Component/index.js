import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const DetailsTable = ({ title, tabledata, titlesize, titletopborder }) => {
    return (
        <>
            {
                title !== undefined &&

                <>
                    <TableContainer component={Paper} >
                        <Table>
                            <TableBody className={`${titletopborder === true && "border-top"}`} >
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: "none" } }}
                                >
                                    {
                                        titlesize === undefined &&
                                        <TableCell align="justify"><h3>{title}</h3></TableCell>
                                    }

                                    {
                                        titlesize === "h6" &&
                                        <TableCell  align="justify"><h6 className="fw-bold">{title}</h6></TableCell>
                                    }
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }


            <TableContainer component={Paper}>
                <Table>
                    <TableBody >
                        {
                            Array.isArray(tabledata) === true && typeof (tabledata[0]) === "object" &&
                            <>
                                {
                                    tabledata.map((data, index) => {
                                        return (
                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
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
                            </>
                        }

                        {
                            typeof tabledata === "string" &&
                            <>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell className="text-break" >
                                        {tabledata}
                                    </TableCell>
                                </TableRow>
                            </>
                        }

                        {
                            Array.isArray(tabledata) === false && typeof (tabledata) === "object" &&
                            <>
                                {
                                    Object.keys(tabledata).map((data, index) => {
                                        return (
                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                <TableCell className="text-break" component="th" scope="row">
                                                    {data}
                                                </TableCell>
                                                <TableCell className="text-break" >
                                                    {tabledata[data]}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </>
                        }

                        {
                            Array.isArray(tabledata) === true && typeof (tabledata[0]) === "string" &&
                            <>
                                {
                                    tabledata.map((data, index) => {
                                        return (
                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: "none" } }} >
                                                <TableCell style={{border:"none"}}  className="text-break" component="th" scope="row">
                                                    <li>{data}</li>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}