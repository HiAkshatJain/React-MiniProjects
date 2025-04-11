import { useState } from "react";
import useCommentTree from "./useCommentTree";
import Comment from "./comment";

interface CommentType {
  id: number;
  content: string;
  votes: number;
  timestamp: string;
  replies: CommentType[];
}

interface Props {
  comments: CommentType[];
  onSubmit: (content: string) => void;
  onEdit: (content: string) => void;
  onDelete: (id: number) => void;
}

const NestedComments = ({ comments, onSubmit, onEdit, onDelete }: Props) => {
  const [comment, setComment] = useState("");

  const {
    comments: commentsData,
    insertComment,
    editComment,
    deleteComment,
  } = useCommentTree(comments);

  const handleReply = (commentId: number | undefined, content: string) => {
    insertComment(commentId, content);
    onSubmit(content);
  };

  const handleEdit = (commentId: number, content: string) => {
    editComment(commentId, content);
    onEdit(content);
  };

  const handleDelete = (commentId: number) => {
    deleteComment(commentId);
    onDelete(commentId);
  };

  return (
    <>
      <div className="mb-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 p-2 rounded resize-none"
          placeholder="Add a new comment..."
        />
        <button
          onClick={() => {
            if (comment.trim()) {
              handleReply(undefined, comment.trim());
              setComment("");
            }
          }}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Comment
        </button>
      </div>

      {commentsData.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onSubmitComment={handleReply}
          onEditComment={handleEdit}
          onDeleteComment={handleDelete}
        />
      ))}
    </>
  );
};

export default NestedComments;
