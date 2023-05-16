import * as React from "react";
// import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useQuery, useQueryClient } from "react-query";
import AxiosRequest from "@src/services/axiosRequests/axiosRequests";
import { set } from "react-hook-form";

export interface Data {
  [key: string]: string | number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  colunms: HeadCell[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    colunms,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  const [columnsData, setColuns] = React.useState<HeadCell[]>([]);

  React.useEffect(() => {
    setColuns(colunms);
  }, [colunms]);

  return (
    <TableHead className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4">
      <TableRow className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4">
        <TableCell
          padding="checkbox"
          className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
        >
          <Checkbox
            color="info"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {columnsData?.map((headCell) => (
          <TableCell
            className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box
                  component="span"
                  sx={visuallyHidden}
                  className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
                >
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  title: string;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, title } = props;

  return (
    <Toolbar
      className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
      // sx={{
      //   pl: { sm: 2 },
      //   pr: { xs: 1, sm: 1 },
      //   ...(numSelected > 0 && {
      //     bgcolor: (theme) =>
      //       alpha(
      //         theme.palette.primary.main,
      //         theme.palette.action.activatedOpacity
      //       ),
      //   }),
      // }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          component="div"
          color={"ButtonFace"}
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip
          title="Delete"
          className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
        >
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export interface IPorpsTable {
  title: string;
  colunms: HeadCell[];
  service: string;
  orderBy: string;
}

export default function EnhancedTable({
  title,
  colunms,
  service,
  orderBy,
}: IPorpsTable) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [columnsData, setColuns] = React.useState<HeadCell[]>([]);
  const [rowsFetch, setRows] = React.useState<Data[]>([]);
  const [orderByFetch, setOrderBy] = React.useState<keyof Data>("");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const axios = new AxiosRequest();

  React.useEffect(() => {
    setColuns(colunms);
    setOrderBy(orderBy);
  }, [colunms, orderBy, service]);

  //Faz a requisição
  useQuery<any, Error>({
    queryKey: [service],
    queryFn: async () => await axios.get({ url: service }),
    onSuccess: (response) => {
      setRows(response);
    },
    onError: (err: Error) => {
      setRows([]);
      throw new Error("Aconteceu algum erro inesperado" + err);
    },
  });

  //Mutations
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderByFetch === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rowsFetch.map((n) => {
        return n.id as number;
      });
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLTableRowElement>,
    n: number
  ) => {
    const selectedIndex = selected.indexOf(n);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, n);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected?.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (n: number) => {
    return selected.indexOf(n) !== -1;
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsFetch.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rowsFetch, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rowsFetch]
  );

  return (
    <Box
      sx={{ width: "100%" }}
      className="dark:bg-boxdark-2 dark:text-white bg-gray text-meta-4 px-2"
    >
      <Paper
        sx={{ width: "100%", mb: 2 }}
        className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
      >
        <EnhancedTableToolbar numSelected={selected.length} title={title} />
        <TableContainer className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4">
          <Table
            className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              colunms={columnsData}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsFetch.length}
            />
            <TableBody className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4">
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(Number(row.id));
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
                    hover
                    onClick={(event) => handleClick(event, Number(row.id))}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      padding="checkbox"
                      className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
                    >
                      <Checkbox
                        className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
                        color="info"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>

                    {columnsData.map((item, index) => (
                      <TableCell
                        key={index}
                        align="right"
                        className="dark:bg-boxdark-2 dark:text-white bg-white text-meta-4"
                      >
                        {row[item.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  className="dark:bg-boxdark-2 dark:text-white bg-body text-body  "
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell
                    colSpan={6}
                    className="dark:bg-boxdark-2 dark:text-white bg-white text-body"
                  />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="dark:bg-boxdark-2 dark:text-white bg-white text-body"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsFetch.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        className="dark:bg-boxdark-2 dark:text-white bg-gray text-body px-3"
        control={
          <Switch
            color="default"
            checked={dense}
            onChange={handleChangeDense}
            className="dark:bg-boxdark-2 dark:text-white bg-gray text-body"
          />
        }
        label="Dense padding"
      />
    </Box>
  );
}
