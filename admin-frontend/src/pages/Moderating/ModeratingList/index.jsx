import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ModeratingList() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Moderating list</h1>
      <div className="mt-6">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="!font-bold">#</TableCell>
                <TableCell className="!font-bold">Username</TableCell>
                <TableCell className="!font-bold">Phone</TableCell>
                <TableCell className="!font-bold">Email</TableCell>
                <TableCell className="!font-bold">Address</TableCell>
                <TableCell className="!font-bold">
                  Maintenance description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                className="cursor-pointer"
                onClick={() => navigate(`/moderating/moderating-detail/${1}`)}
              >
                <TableCell>1</TableCell>
                <TableCell>username</TableCell>
                <TableCell>phone</TableCell>
                <TableCell>email</TableCell>
                <TableCell>address</TableCell>
                <TableCell>maintenance description</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
