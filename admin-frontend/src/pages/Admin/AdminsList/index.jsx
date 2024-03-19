import { CreateButton } from "components/core/Buttons";
import { useState } from "react";
import AdminForm from "../AdminForm";
import AdminCard from "components/Admin/AdminCard";

export default function AdminsList() {
  const [adminFormModal, setAdminFormModal] = useState(null);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admins list</h1>

        <CreateButton
          label="Add admin"
          onClick={() => setAdminFormModal(true)}
        />
      </div>

      {adminFormModal && (
        <AdminForm
          open={adminFormModal}
          onClose={() => setAdminFormModal(false)}
        />
      )}
      <div className="flex items-center justify-start gap-4 mt-6">
        <AdminCard />
      </div>
    </div>
  );
}
