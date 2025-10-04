import React from "react";

interface InstagramPostProps {
  username: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: { username: string; text: string }[];
}

export const InstagramPost: React.FC<InstagramPostProps> = ({
  username,
  imageUrl,
  caption,
  likes,
  comments,
}) => {
  let [liked, setLiked] = React.useState(false);
  let [likeCount, setLikeCount] = React.useState(likes);

  return (
    <div
      className={
        "rounded overflow-hidden border w-full md:w-128 bg-white mx-auto my-4"
      }
    >
      <div className={"w-full flex justify-between p-3"}>
        <div className={"flex"}>
          <div
            className={
              "rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden"
            }
          >
            <img
              src="https://avatars0.githubusercontent.com/u/38799309?v=4"
              alt="profilepic"
            />
          </div>
          <span className={"pt-1 ml-2 font-bold text-sm"}>{username}</span>
        </div>
        <span className={"px-2 hover:bg-gray-300 cursor-pointer rounded"}>
          <i className={"fas fa-ellipsis-h pt-2 text-lg"}></i>
        </span>
      </div>
      <img className={"w-full bg-cover"} src={imageUrl} />
      <div className={"px-3 pb-2"}>
        <div className={"pt-2"}>
          <i className={"far fa-heart cursor-pointer"}></i>
          <span className={"text-sm text-gray-400 font-medium"}>
            {likeCount} likes
          </span>
        </div>
        <a
          onClick={() => {
            setLiked(!liked);
            setLikeCount(liked ? likeCount - 1 : likeCount + 1);
          }}
          className={"cursor-pointer"}
        >
          {liked ? (
            <span className={"icon-[tabler--heart-filled] size-6"}></span>
          ) : (
            <span className={"icon-[tabler--heart] size-6"}></span>
          )}
        </a>
        <div className={"pt-1"}>
          <div className={"mb-2 text-sm"}>
            <span className={"font-medium mr-2"}>{username}</span>
            {caption}
          </div>
        </div>
        <div
          className={`text-sm mb-2 text-gray-400 cursor-pointer font-medium ${comments.length === 0 ? "hidden" : ""}`}
        >
          View all {comments.length} comments
        </div>
        <div className={"mb-2"}>
          {comments.slice(0, 1).map((comment, index) => (
            <div key={index} className={"mb-2 text-sm"}>
              <span className={"font-medium mr-2"}>{comment.username}</span>
              {comment.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
