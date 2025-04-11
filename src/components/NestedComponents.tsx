import NestedComments from "./core/NestedComment/NestedComments";
import commentsData from "./data/comments.json";

interface CommentType {
  id: number;
  content: string;
  votes: number;
  timestamp: string;
  replies: CommentType[];
}

const NestedComponent = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded">
      <NestedComments
        comments={commentsData as CommentType[]}
        onSubmit={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </div>
  );
};

export default NestedComponent;
