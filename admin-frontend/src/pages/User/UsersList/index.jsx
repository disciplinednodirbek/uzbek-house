import {
  Avatar,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  CreateButton,
  DeleteButton,
  UpdateButton,
} from "components/core/Buttons";
import { useState } from "react";
import UserForm from "../UserForm";
import { useFetch } from "hooks/useFetch";
import Loader from "components/core/Loader";
import DeleteModal from "components/core/DeleteModal";
import { toast } from "react-toastify";
import { api } from "services/api";
import { useQueryClient } from "@tanstack/react-query";
import GlobalLoader from "components/core/GlobalLoader";

export default function UsersList() {
  const [formModal, setFormModal] = useState({
    type: null,
    isOpen: false,
    item: null,
  });
  const queryClient = useQueryClient();
  const [deleteModal, setDeleteModal] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusLoading, setStatusLoading] = useState(false);

  const { data, isLoading } = useFetch({
    name: "users",
    url: "/users",
    params: {
      limit: rowsPerPage,
      page: page,
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0 + 1);
  };

  function handleOpenModal(type, item) {
    if (type === "create") {
      setFormModal((prev) => ({ ...prev, isOpen: true, type }));
    }

    if (type === "edit") {
      setFormModal((prev) => ({ ...prev, isOpen: true, type, item }));
    }
  }

  async function handleUserStatus(id) {
    const findItem = data?.data?.find((item) => item._id === id);
    const newStatus = (findItem.status = !findItem?.status);
    setStatusLoading(true);
    try {
      const { data } = await api.put(`/users/${id}`, {
        status: newStatus,
      });
      await queryClient.invalidateQueries(["users"]);
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setStatusLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users list</h1>

        <CreateButton
          label="Add user"
          onClick={() => handleOpenModal("create")}
        />
      </div>
      <div className="rounded-md mt-6">
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell component="th" className="text-white !font-bold">
                  #
                </TableCell>
                <TableCell component="th" className="text-white !font-bold">
                  Image
                </TableCell>
                <TableCell component="th" className="text-white !font-bold">
                  Username
                </TableCell>
                <TableCell component="th" className="text-white !font-bold">
                  Email
                </TableCell>
                <TableCell component="th" className="text-white !font-bold">
                  Phone
                </TableCell>
                <TableCell component="th" className="text-white !font-bold">
                  Address
                </TableCell>
                <TableCell component="th" className="text-white !font-bold">
                  Role
                </TableCell>
                <TableCell component="th" className="text-white !font-bold">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ "& > tr > td": { border: 0 } }}>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <div className="flex items-center justify-center w-full">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell component="th">{index + 1}</TableCell>
                    <TableCell component="th">
                      <Avatar src={user.image} className="!w-50 !h-50" />
                    </TableCell>
                    <TableCell component="th">{user.name}</TableCell>
                    <TableCell component="th">{user.email}</TableCell>
                    <TableCell component="th">{user.phone_number}</TableCell>
                    <TableCell component="th">{user.address}</TableCell>
                    <TableCell component="th">{user.role}</TableCell>
                    <TableCell component="th">
                      <Switch
                        checked={user.status}
                        onChange={() => {
                          handleUserStatus(user._id, index);
                        }}
                      />
                      <UpdateButton
                        onClick={() => handleOpenModal("edit", user)}
                      />
                      <DeleteButton onClick={() => setDeleteModal(user._id)} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={data?.total || 0}
            page={page ? page - 1 : 0}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>

      {formModal.isOpen && (
        <UserForm
          open={formModal.isOpen}
          onClose={() =>
            setFormModal((prev) => ({ ...prev, isOpen: false, item: null }))
          }
          modal={formModal}
        />
      )}
      {!!deleteModal && (
        <DeleteModal
          open={!!deleteModal}
          onClose={() => setDeleteModal(null)}
          name="users"
          id={deleteModal}
        />
      )}
      {statusLoading && <GlobalLoader />}
    </div>
  );
}
