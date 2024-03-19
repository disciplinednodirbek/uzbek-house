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
import ConditionForm from "../ConditionForm";
import { useFetch } from "hooks/useFetch";
import DeleteModal from "components/core/DeleteModal";
import Loader from "components/core/Loader";

export default function ConditionsList() {
  const [formModal, setFormModal] = useState({
    type: null,
    isOpen: false,
    item: null,
  });
  const [deleteModal, setDeleteModal] = useState(null);
  const { data, isLoading } = useFetch({
    name: "conditions",
    url: "/conditions",
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
        <h1 className="text-2xl font-semibold">Conditions list</h1>
        <CreateButton
          label="Add condition"
          onClick={() => handleOpenModal("create")}
        />
      </div>
      <div className="mt-6">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Conditions</TableCell>
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
                data?.data?.map((region, index) => (
                  <TableRow key={region._id}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{region.name}</TableCell>
                    <TableCell>
                      <UpdateButton
                        onClick={() => handleOpenModal("edit", region)}
                      />
                      <DeleteButton
                        onClick={() => setDeleteModal(region._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {formModal.isOpen && (
        <ConditionForm
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
          name="conditions"
          id={deleteModal}
        />
      )}
    </div>
  );
}
