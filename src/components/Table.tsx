"use client";

import { FunctionComponent } from "react";
import {
  GridColumnHeaderParams,
  type GridColDef,
  DataGrid,
} from "@mui/x-data-grid";
import { ApiRequest } from "@prisma/client";
import { useTheme } from "next-themes";
import { ThemeProvider, createTheme } from "@mui/material";
import { colorModes } from "@src/lib/enum";
import { isSystemThemeDark } from "@src/lib/utils";

type ModifiedRequestType<K extends keyof ApiRequest> = Omit<ApiRequest, K> & {
  timestamp: string;
};

interface TableProps {
  userRequests: ModifiedRequestType<"timestamp">[];
}

const columnsDraft: GridColDef[] = [
  {
    field: "col1",
    headerName: "API key used",
    width: 400,
    renderHeader(params) {
      return (
        <strong className="font-semibold">
          {params.colDef.headerName} 🔑{" "}
        </strong>
      );
    },
  },
  { field: "col2", headerName: "Path", width: 250 },
  { field: "col3", headerName: "Recency", width: 250 },
  { field: "col4", headerName: "Duration", width: 150 },
  { field: "col5", headerName: "Status", width: 150 },
];

const columns = columnsDraft.map((col) => {
  if (col.field === "col1") {
    return col;
  }

  return {
    ...col,
    renderHeader(params: GridColumnHeaderParams<any, any, any>) {
      return (
        <strong className="font-semibold">{params.colDef.headerName}</strong>
      );
    },
  };
});

const Table: FunctionComponent<TableProps> = ({ userRequests }) => {
  const { theme: appTheme, setTheme } = useTheme();

  if (appTheme === colorModes.SYSTEM) {
    const isDark = isSystemThemeDark();
    setTheme(isDark ? colorModes.DARK : colorModes.LIGHT);
  }

  const theme = createTheme({
    palette: {
      mode: appTheme === colorModes.LIGHT ? colorModes.LIGHT : colorModes.DARK,
    },
  });

  const rows = userRequests.map((req) => ({
    id: req.id,
    col1: req.usedApiKey,
    col2: req.path,
    col3: `${req.timestamp} ago`,
    col4: `${req.duration} ms`,
    col5: req.status,
  }));

  const dataGridStyles = {
    backgroundColor: appTheme === colorModes.LIGHT ? "#fff" : "#152238",
    fontSize: "1rem",
  };

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        rows={rows}
        columns={columns}
        style={dataGridStyles}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
      />
    </ThemeProvider>
  );
};

export default Table;
