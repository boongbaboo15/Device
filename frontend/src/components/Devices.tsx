import React, { useEffect } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DevicesInterface } from "../interfaces/IDevice";
import { Link as RouterLink } from "react-router-dom";

function Devices() {
  const [devices, setDevices] = React.useState<DevicesInterface[]>([]);
  const getDevices = async () => {
  const apiUrl = "http://localhost:8080/devices";
  const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setDevices(res.data);
        }
      });
  };

useEffect(() => {
  getDevices();
}, []);
console.log(devices);


const columns: GridColDef[] = [
    { field: "ID", headerName: "ID"},
    { field: "Type", headerName: "ประเภทอุปกรณ์", width: 150, valueFormatter: (params) => params.value.Name},
    { field: "Brand", headerName: "ยี่ห้อ", width: 150, valueFormatter: (params) => params.value.Name },
    { field: "Distributor", headerName: "ร้าน", width: 200, valueFormatter: (params) => params.value.Name },
];

return (
  <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              อุปกรณ์คอมพิวเตอร์
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/device/create"
              variant="contained"
              color="success"
            >
              ลงทะเบียนอุปกรณ์คอมพิวเตอร์
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={devices}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Devices;
