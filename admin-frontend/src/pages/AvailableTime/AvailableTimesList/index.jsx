import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  CreateButton,
  DeleteButton,
  UpdateButton,
} from "components/core/Buttons";
import { useState } from "react";
import AvailableTimeForm from "../AvailableTimeForm";
import { useFetch } from "hooks/useFetch";
import Loader from "components/core/Loader";
import DeleteModal from "components/core/DeleteModal";

export default function AvailableTime() {
  const [deleteModal, setDeleteModal] = useState(null);
  const [formModal, setFormModal] = useState({
    type: null,
    isOpen: false,
    item: null,
  });
  const { data, isLoading } = useFetch({
    name: "available-times",
    url: "/available-times",
  });

  function handleOpenModal(type, item) {
    if (type === "create") {
      setFormModal((prev) => ({ ...prev, isOpen: true, type }));
    }

    if (type === "edit") {
      setFormModal((prev) => ({ ...prev, isOpen: true, type, item }));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Available times list</h1>
        <CreateButton
          label="Add available time"
          onClick={() => handleOpenModal("create")}
        />
      </div>
      <div className="mt-6">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Available time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <div className="flex items-center justify-center">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.map((time, index) => (
                  <TableRow key={time._id}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{time.name}</TableCell>
                    <TableCell>
                      <UpdateButton
                        onClick={() => handleOpenModal("edit", time)}
                      />
                      <DeleteButton onClick={() => setDeleteModal(time._id)} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {formModal.isOpen && (
        <AvailableTimeForm
          open={formModal.isOpen}
          onClose={() =>
            setFormModal((prev) => ({ ...prev, isOpen: false, item: null }))
          }
          formValues={formModal}
        />
      )}
      {!!deleteModal && (
        <DeleteModal
          open={!!deleteModal}
          onClose={() => setDeleteModal(null)}
          name="available-times"
          id={deleteModal}
        />
      )}
    </div>
  );
}
