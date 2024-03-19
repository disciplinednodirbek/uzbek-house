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
import DeleteModal from "components/core/DeleteModal";
import Loader from "components/core/Loader";
import dayjs from "dayjs";
import { useFetch } from "hooks/useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NewsList() {
  const [deleteModal, setDeleteModal] = useState(null);
  const { data, isLoading } = useFetch({ url: "/blogs", name: "blogs" });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">News list</h1>

        <Link to="/news/news-form">
          <CreateButton label="Add news" />
        </Link>
      </div>
      <div className="mt-6">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Image</TableCell>

                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Like Count</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <div className="w-full flex items-center justify-center">
                      <Loader />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.map((blog, index) => (
                  <TableRow key={blog._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img src={blog.image} height={100} width={100} />
                    </TableCell>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell>{blog.likeCount}</TableCell>
                    <TableCell>
                      {dayjs(blog.createAt).format("DD.MM.YYYY")}
                    </TableCell>
                    <TableCell>{blog.user?.name}</TableCell>
                    <TableCell>
                      <UpdateButton />
                      <DeleteButton onClick={() => setDeleteModal(blog._id)} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {!!deleteModal && (
        <DeleteModal
          open={!!deleteModal}
          onClose={() => setDeleteModal(null)}
          name="blogs"
          id={deleteModal}
        />
      )}
    </div>
  );
}
