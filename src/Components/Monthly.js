import React, { useEffect } from "react";
import { Dashboard } from "./Dashboard";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Container,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { API } from "../global";

export function Monthly({ color }) {
  const [data, setData] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const loadData = async () => {
      var response = await axios.get(`${API}/transaction`);
      setData(response.data);
    };
    loadData();
  }, []);
  //table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //sort by income
  const [incomeSort, setIncomeSort] = useState(true);
  const handleSortByIncome = () => {
    setIncomeSort(!incomeSort);
  };
  const [expenseSort, setExpenseSort] = useState(true);
  const handleExpenseByIncome = () => {
    setExpenseSort(!expenseSort);
  };
  //sort by type
  const [type, setType] = useState("office");
  const handleType = (e) => {
    setType(e.target.value);
  };
  console.log(type);
  return (
    <>
      <Dashboard color={color} />
      <Container>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "22px",
            textAlign: "center",
            mb: 3,
          }}
        >
          Monthly Transactions
        </Typography>
        {/* <Button sx={{float:'right'}}>Sort by</Button> */}
        <Box sx={{ textAlign: "center" }}>
          <Box>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  sx={{ mx: 3, mb: 1 }}
                  value="office"
                  name="type"
                  control={<Radio />}
                  label="Office"
                  onChange={handleType}
                />
                <FormControlLabel
                  sx={{ mb: 1 }}
                  value="personal"
                  name="type"
                  control={<Radio />}
                  label="Personal"
                  onChange={handleType}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "600", textAlign: "center" }}>
                    S.No
                  </TableCell>
                  <TableCell
                    onClick={handleSortByIncome}
                    sx={{
                      cursor: "pointer",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {incomeSort ? <>Income&#8595;</> : <>Income&#8593;</>}
                  </TableCell>
                  <TableCell
                    onClick={handleExpenseByIncome}
                    sx={{
                      cursor: "pointer",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {expenseSort ? <>Expense&#8595;</> : <>Expense&#8593;</>}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", textAlign: "center" }}>
                    Description
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", textAlign: "center" }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", textAlign: "center" }}>
                    Time
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", textAlign: "center" }}>
                    Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", textAlign: "center" }}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incomeSort && expenseSort && type === "office" ? (
                  data

                    .sort((a, b) =>
                      parseInt(a.income) > parseInt(b.income) ? 1 : -1
                    )
                    .sort((a, b) =>
                      parseInt(a.expense) > parseInt(b.expense) ? 1 : -1
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((i) => i.type === "office")
                    .map((row, i) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                        >
                          <TableCell sx={{ textAlign: "center" }}>
                            {i + 1}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {row.income}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {row.expense}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {row.desc.charAt(0).toUpperCase() +
                              row.desc.slice(1)}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {row.date.split(" ").slice(1).join(" ")}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <>
                              {
                                new Date(row.time)
                                  .toLocaleString("en-US", {
                                    timeZone: "Asia/Kolkata",
                                  })
                                  .split(",")[1]
                              }
                            </>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {row.type.charAt(0).toUpperCase() +
                              row.type.slice(1)}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {
                              <Tooltip title="Delete">
                                <IconButton
                                  aria-label="delete button"
                                  color="secondary"
                                  onClick={() => {
                                    fetch(`${API}/transaction/${row._id}`, {
                                      method: "DELETE",
                                    }).then(() => history.push("/dashboard"));
                                  }}
                                >
                                  <DeleteForeverIcon />
                                </IconButton>
                              </Tooltip>
                            }
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  <>
                    {data

                      .sort((a, b) =>
                        parseInt(a.income) < parseInt(b.income) ? 1 : -1
                      )
                      .sort((a, b) =>
                        parseInt(a.expense) < parseInt(b.expense) ? 1 : -1
                      )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .filter((i) => i.type === "personal")
                      .map((row, i) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row._id}
                          >
                            <TableCell sx={{ textAlign: "center" }}>
                              {i + 1}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {row.income}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {row.expense}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {row.desc.charAt(0).toUpperCase() +
                                row.desc.slice(1)}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {row.date.split(" ").slice(1).join(" ")}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <>
                                {
                                  new Date(row.time)
                                    .toLocaleString("en-US", {
                                      timeZone: "Asia/Kolkata",
                                    })
                                    .split(",")[1]
                                }
                              </>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {row.type.charAt(0).toUpperCase() +
                                row.type.slice(1)}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {
                                <Tooltip title="Delete">
                                  <IconButton
                                    aria-label="delete button"
                                    color="secondary"
                                    onClick={() => {
                                      fetch(`${API}/transaction/${row._id}`, {
                                        method: "DELETE",
                                      }).then(() => history.push("/dashboard"));
                                    }}
                                  >
                                    <DeleteForeverIcon />
                                  </IconButton>
                                </Tooltip>
                              }
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </>
  );
}