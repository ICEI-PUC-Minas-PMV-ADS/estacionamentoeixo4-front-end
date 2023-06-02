import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { useQuery } from "react-query";
import AxiosRequest from "@src/services/axiosRequests/axiosRequests";
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, colunms, } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const [columnsData, setColuns] = React.useState([]);
    React.useEffect(() => {
        setColuns(colunms);
    }, [colunms]);
    return (_jsx(TableHead, { className: "text-white bg-white dark:bg-boxdark-2 dark:text-white", children: _jsxs(TableRow, { className: "bg-white text-white4 dark:bg-boxdark-2 dark:text-white", children: [_jsx(TableCell, { padding: "checkbox", className: "bg-white text-boxdark dark:bg-boxdark-2 dark:text-white", children: _jsx(Checkbox, { color: "info", indeterminate: numSelected > 0 && numSelected < rowCount, className: "bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white", checked: rowCount > 0 && numSelected === rowCount, onChange: onSelectAllClick, inputProps: {
                            "aria-label": "select all desserts",
                        } }) }), columnsData?.map((headCell) => (_jsx(TableCell, { className: "bg-white text-boxdark-2 dark:bg-boxdark-2 dark:text-white", align: headCell.numeric ? "right" : "left", padding: headCell.disablePadding ? "none" : "normal", sortDirection: orderBy === headCell.id ? order : false, children: _jsxs(TableSortLabel, { className: "bg-white text-boxdark-2 dark:bg-boxdark-2 dark:text-white", active: orderBy === headCell.id, sx: {
                            color: `##1C2434`,
                        }, direction: orderBy === headCell.id ? order : "asc", onClick: createSortHandler(headCell.id), children: [headCell.label, orderBy === headCell.id ? (_jsx(Box, { component: "span", sx: visuallyHidden, className: "bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white", children: order === "desc" ? "sorted descending" : "sorted ascending" })) : null] }) }, headCell.id)))] }) }));
}
function EnhancedTableToolbar(props) {
    const { numSelected, title } = props;
    return (_jsxs(Toolbar, { className: "bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white", sx: {
            color: `##1C2434`,
        }, children: [numSelected > 0 ? (_jsxs(Typography, { sx: { flex: "1 1 100%" }, variant: "subtitle1", component: "div", color: "ButtonFace", children: [numSelected, " selected"] })) : (_jsx(Typography, { className: "bg-white text-black-2 dark:bg-boxdark-2 dark:text-white", sx: { flex: "1 1 100%" }, variant: "h6", id: "tableTitle", component: "div", children: title })), numSelected > 0 ? (_jsx(Tooltip, { title: "Delete", className: "bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white", children: _jsx(IconButton, { children: _jsx(DeleteIcon, {}) }) })) : (_jsx(Tooltip, { title: "Filter list", children: _jsx(IconButton, { children: _jsx(FilterListIcon, {}) }) }))] }));
}
export default function EnhancedTable({ title, colunms, service, orderBy, }) {
    const [order, setOrder] = React.useState("asc");
    const [columnsData, setColuns] = React.useState([]);
    const [rowsFetch, setRows] = React.useState([]);
    const [orderByFetch, setOrderBy] = React.useState("");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const axios = new AxiosRequest();
    React.useEffect(() => {
        setColuns(colunms);
        setOrderBy(orderBy);
    }, [colunms, orderBy, service]);
    //Faz a requisição
    useQuery({
        queryKey: [service],
        queryFn: async () => await axios.get({ url: service }),
        onSuccess: (response) => {
            setRows(response);
        },
        onError: (err) => {
            setRows([]);
            throw new Error("Aconteceu algum erro inesperado" + err);
        },
    });
    //Mutations
    const handleRequestSort = (_event, property) => {
        const isAsc = orderByFetch === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rowsFetch.map((n) => {
                return n.id;
            });
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (_event, n) => {
        const selectedIndex = selected.indexOf(n);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, n);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected?.slice(1));
        }
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };
    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    const isSelected = (n) => {
        return selected.indexOf(n) !== -1;
    };
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsFetch.length) : 0;
    const visibleRows = React.useMemo(() => stableSort(rowsFetch, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [order, orderBy, page, rowsPerPage, rowsFetch]);
    return (_jsxs(Box, { sx: { width: "100%" }, className: "px-2 bg-gray text-meta-4 dark:bg-boxdark-2 dark:text-white", children: [_jsxs(Paper, { sx: { width: "100%", mb: 2 }, className: "bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white", children: [_jsx(EnhancedTableToolbar, { numSelected: selected.length, title: title }), _jsx(TableContainer, { className: "bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white", children: _jsxs(Table, { className: "bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white", sx: { minWidth: 750 }, "aria-labelledby": "tableTitle", size: dense ? "small" : "medium", children: [_jsx(EnhancedTableHead, { colunms: columnsData, numSelected: selected.length, order: order, orderBy: orderBy, onSelectAllClick: handleSelectAllClick, onRequestSort: handleRequestSort, rowCount: rowsFetch.length }), _jsxs(TableBody, { className: "bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white", children: [visibleRows.map((row, index) => {
                                            const isItemSelected = isSelected(Number(row.id));
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (_jsxs(TableRow, { className: "bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white", hover: true, onClick: (event) => handleClick(event, Number(row.id)), role: "checkbox", "aria-checked": isItemSelected, tabIndex: -1, selected: isItemSelected, sx: { cursor: "pointer" }, children: [_jsx(TableCell, { padding: "checkbox", className: "bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white", children: _jsx(Checkbox, { className: "bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white", color: "info", checked: isItemSelected, inputProps: {
                                                                "aria-labelledby": labelId,
                                                            } }) }), columnsData.map((item, index) => (_jsx(TableCell, { align: "right", className: "bg-white text-meta-4 dark:bg-boxdark-2 dark:text-white", children: row[item.id] }, index)))] }, index));
                                        }), emptyRows > 0 && (_jsx(TableRow, { className: "bg-body text-body dark:bg-boxdark-2 dark:text-white ", style: {
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }, children: _jsx(TableCell, { colSpan: 6, className: "bg-white text-body dark:bg-boxdark-2 dark:text-white" }) }))] })] }) }), _jsx(TablePagination, { className: "bg-white text-body dark:bg-boxdark-2 dark:text-white", rowsPerPageOptions: [5, 10, 25], component: "div", count: rowsFetch.length, rowsPerPage: rowsPerPage, page: page, onPageChange: handleChangePage, onRowsPerPageChange: handleChangeRowsPerPage })] }), _jsx(FormControlLabel, { className: "px-3 bg-gray text-body dark:bg-boxdark-2 dark:text-white", control: _jsx(Switch, { color: "default", checked: dense, onChange: handleChangeDense, className: "bg-gray text-body dark:bg-boxdark-2 dark:text-white" }), label: "Dense padding" })] }));
}
