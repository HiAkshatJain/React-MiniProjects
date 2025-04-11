import { useState } from "react";

interface CommentType {
  id: number;
  content: string;
  votes: number;
  timestamp: string;
  replies: CommentType[];
}

interface Props {
  comment: CommentType;
  onSubmitComment: (commentId: number, content: string) => void;
  onEditComment: (commentId: number, content: string) => void;
  onDeleteComment: (commentId: number) => void;
}

const Comment = ({
  comment,
  onSubmitComment,
  onEditComment,
  onDeleteComment,
}: Props) => {
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onSubmitComment(comment.id, replyContent.trim());
      setReplyContent("");
    }
  };

  const handleEditSubmit = () => {
    if (editedContent.trim()) {
      onEditComment(comment.id, editedContent.trim());
      setEditMode(false);
    }
  };

  return (
    <div className="mb-4 ml-4 border-l-2 border-gray-300 pl-4">
      {!editMode ? (
        <>
          <p className="text-gray-800">{comment.content}</p>
          <p className="text-sm text-gray-500">Votes: {comment.votes}</p>
          <p className="text-xs text-gray-400">
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </>
      ) : (
        <div className="mb-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={3}
            className="w-full border p-2 rounded"
          />
          <div className="space-x-2 mt-2">
            <button
              onClick={handleEditSubmit}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => setExpand((prev) => !prev)}
          className="text-blue-600 hover:underline"
        >
          {expand ? "Hide Replies" : "Reply"}
        </button>
        <button
          onClick={() => setEditMode(true)}
          className="text-yellow-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDeleteComment(comment.id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>

      {expand && (
        <div className="mt-3">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={2}
            className="w-full border p-2 rounded"
            placeholder="Write a reply..."
          />
          <button
            onClick={handleReplySubmit}
            className="mt-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Submit Reply
          </button>

          <div className="mt-2">
            {comment.replies?.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                onSubmitComment={onSubmitComment}
                onEditComment={onEditComment}
                onDeleteComment={onDeleteComment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
