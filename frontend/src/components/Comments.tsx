import React, { useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Reply } from "lucide-react";
import { makeRequest } from "@/useful/ApiContext";

interface Comment {
  _id: string;
  message: string;
  parent?: string;
}

interface CommentsProps {
  aid: string;
  cid:string
}

function Comments({ aid ,cid}: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currReplyId, setCurrReplyId] = useState<string | null>(null);
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchComments() {
      const { data } = await makeRequest({ url: `comments/${aid}` });
      setComments(data?.messages || []);
    }
    fetchComments();
  }, [aid]);

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>, parentId?: string) => {
    e.preventDefault();
    const fmdata = new FormData(e.currentTarget);
    const input = fmdata.get("input") as string;
    e.currentTarget.reset();

    const { data } = await makeRequest({
      url: "comments/",
      type: "post",
      data: { msg: input, aid,cid, parentid: parentId || null },
    });

    setComments((prev) => [...prev, data?.msg]);
    setCurrReplyId(null);
  };

  const groupReplies = useMemo(() => {
    const group: Record<string, Comment[]> = {};
    comments.forEach((comment) => {
      const parentKey = comment.parent || "root";
      if (!group[parentKey]) group[parentKey] = [];
      group[parentKey].push(comment);
    });
    return group;
  }, [comments]);

  function getReplies(parentId?: string) {
    return groupReplies[parentId || "root"] || [];
  }

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className=" w-full mx-auto p-4 bg-background shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* Comment Input */}
      <form onSubmit={(e) => handleAddComment(e)}>
        <div className="flex gap-2 mb-4">
          <Input type="text" name="input" placeholder="Write a comment..." className="flex-1 p-2 border rounded-md" />
          <Button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add</Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {getReplies().map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            getReplies={getReplies}
            currReplyId={currReplyId}
            setCurrReplyId={setCurrReplyId}
            toggleReplies={toggleReplies}
            expandedReplies={expandedReplies}
            handleAddComment={handleAddComment}
          />
        ))}
      </div>
    </div>
  );
}

interface CommentItemProps {
  comment: Comment;
  getReplies: (parentId?: string) => Comment[];
  currReplyId: string | null;
  setCurrReplyId: (id: string | null) => void;
  toggleReplies: (id: string) => void;
  expandedReplies: Record<string, boolean>;
  handleAddComment: (e: React.FormEvent<HTMLFormElement>, parentId?: string) => void;
}

function CommentItem({
  comment,
  getReplies,
  currReplyId,
  setCurrReplyId,
  toggleReplies,
  expandedReplies,
  handleAddComment,
}: CommentItemProps) {
  return (
    <div className="p-3 border rounded-md bg-background">
      <div className="flex justify-between">
        <span>{comment.message}</span>
        <button onClick={() => setCurrReplyId(comment._id)}>
          <Reply />
        </button>
      </div>

      {currReplyId === comment._id && (
        <CommentForm onSubmit={(e) => handleAddComment(e, comment._id)} closeForm={() => setCurrReplyId(null)} />
      )}

      {getReplies(comment._id).length > 0 && (
        <button onClick={() => toggleReplies(comment._id)} className="text-blue-400 mt-2">
          {expandedReplies[comment._id] ? "Hide Replies" : `View ${getReplies(comment._id).length} Replies`}
        </button>
      )}

      {expandedReplies[comment._id] && (
        <div className="ml-4 border-l-2 pl-2">
          {getReplies(comment._id).map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              getReplies={getReplies}
              currReplyId={currReplyId}
              setCurrReplyId={setCurrReplyId}
              toggleReplies={toggleReplies}
              expandedReplies={expandedReplies}
              handleAddComment={handleAddComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface CommentFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  closeForm: () => void;
}

function CommentForm({ onSubmit, closeForm }: CommentFormProps) {
  return (
    <form className="flex mt-2" onSubmit={onSubmit}>
      <Input name="input" placeholder="Reply..." />
      <Button className="ml-2">Reply</Button>
      <span onClick={closeForm} className="font-bold m-1 text-xl bg-red-900 p-1 rounded-2xl cursor-pointer">
        X
      </span>
    </form>
  );
}

export default Comments;
