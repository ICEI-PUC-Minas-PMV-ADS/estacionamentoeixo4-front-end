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
import moment from 'moment'
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useQuery } from "react-query";
import AxiosRequest from "@src/services/axiosRequests/axiosRequests";
// import { set } from "react-hook-form";

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
  fieldType?: string;
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
    <TableHead className="text-white bg-white dark:bg-boxdark-2 dark:text-white">
      <TableRow className="bg-white text-white4 dark:bg-boxdark-2 dark:text-white">
        <TableCell
          padding="checkbox"
          className="bg-white text-boxdark dark:bg-boxdark-2 dark:text-white"
        >
          <Checkbox
            color="info"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            className="bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {columnsData?.map((headCell) => (
          <TableCell
            className="bg-white text-boxdark-2 dark:bg-boxdark-2 dark:text-white"
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              className="bg-white text-boxdark-2 dark:bg-boxdark-2 dark:text-white"
              active={orderBy === headCell.id}
              sx={{
                color: `##1C2434`,
              }}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box
                  component="span"
                  sx={visuallyHidden}
                  className="bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white"
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
      className="bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white"
      sx={{
        color: `##1C2434`,
      }}
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
          className="bg-white text-black-2 dark:bg-boxdark-2 dark:text-white"
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
          className="bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white"
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
    _event: React.MouseEvent<unknown>,
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
    _event: React.MouseEvent<HTMLTableRowElement>,
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

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (n: number) => {
    return selected.indexOf(n) !== -1;
  };
  const currencyFormat = (num) => {
    return parseFloat(num).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).split('');
  }
  const formatarCampo = (row, options) => {

    if (options.fieldType === 'price') {
      return currencyFormat(row[options.id]);
      // return `R$${row[options.id].replace(".", ",")}`
    }

    if (options.fieldType === 'date') {
      return `${new Date(row[options.id]).toLocaleDateString()}`
    }
    if (options.fieldType === 'time') {
      return `${row[options.id]}H`
    }
    if (options.fieldType === 'datetime') {

      return moment(row[options.id]).locale('pt-br').format('lll');  // 22 de junho de 2023 às 20:44
      // return moment(row[options.id]).format('MMMM Do YYYY, h:mm:ss a');
    }
    return row[options.id];

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
      className="px-2 bg-gray text-meta-4 dark:bg-boxdark-2 dark:text-white"
    >
      <Paper
        sx={{ width: "100%", mb: 2 }}
        className="bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white"
      >
        <EnhancedTableToolbar numSelected={selected.length} title={title} />
        <TableContainer className="bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white">
          <Table
            className="bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white"
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
            <TableBody className="bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white">
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(Number(row.id));
                const labelId = `enhanced - table - checkbox - ${index} `;

                return (
                  <TableRow
                    className="bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white"
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
                      className="bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white"
                    >
                      <Checkbox
                        className="bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white"
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
                        className="bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white text-start"
                      >
                        {formatarCampo(row, item)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  className="bg-body text-body dark:bg-boxdark-2 dark:text-white "
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell
                    colSpan={6}
                    className="bg-white text-body dark:bg-boxdark-2 dark:text-white"
                  />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="bg-white text-body dark:bg-boxdark-2 dark:text-white"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsFetch.length}
          labelRowsPerPage="Items por página"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

    </Box>
  );
}
