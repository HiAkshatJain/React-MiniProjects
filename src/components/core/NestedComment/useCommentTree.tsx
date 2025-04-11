import { useState } from "react";

interface CommentType {
  id: number;
  content: string;
  votes: number;
  timestamp: string;
  replies: CommentType[];
}

const useCommentTree = (initialComments: CommentType[]) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments);

  const insertNode = (
    tree: CommentType[],
    commentId: number,
    content: CommentType
  ): CommentType[] => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, content],
        };
      } else if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, content),
        };
      }
      return comment;
    });
  };

  const insertComment = (
    commentId: number | undefined,
    content: string
  ): void => {
    const newComment: CommentType = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId !== undefined) {
      setComments((prev) => insertNode(prev, commentId, newComment));
    } else {
      setComments((prev) => [newComment, ...prev]);
    }
  };

  const editNode = (
    tree: CommentType[],
    nodeId: number,
    content: string
  ): CommentType[] => {
    return tree.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          content,
          timestamp: new Date().toISOString(),
        };
      } else if (node.replies.length > 0) {
        return {
          ...node,
          replies: editNode(node.replies, nodeId, content),
        };
      }
      return node;
    });
  };

  const editComment = (commentId: number, content: string): void => {
    setComments((prev) => editNode(prev, commentId, content));
  };

  const deleteNode = (tree: CommentType[], nodeId: number): CommentType[] => {
    return tree.reduce<CommentType[]>((acc, node) => {
      if (node.id === nodeId) return acc;
      const newReplies = deleteNode(node.replies, nodeId);
      return [...acc, { ...node, replies: newReplies }];
    }, []);
  };

  const deleteComment = (commentId: number): void => {
    setComments((prev) => deleteNode(prev, commentId));
  };

  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
  };
};

export default useCommentTree;
