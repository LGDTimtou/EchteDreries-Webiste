import React, { useEffect, useState } from "react";

const catGifs = [
  "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
  "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
  "https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif",
  "https://media.giphy.com/media/13borq7Zo2kulO/giphy.gif",
  "https://media.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif",
  "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHgxdHhzNWtxbWQ3em56NGl4dW1qeWJ5b250YXc4NXVieWNxcnhwayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4KibK3JwaVo0CjDO/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3RvNndndTJwd3pndng5eTA4OXI4NjQzdW01cjJ6OHlubnlxOXkydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/q1MeAPDDMb43K/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3RvNndndTJwd3pndng5eTA4OXI4NjQzdW01cjJ6OHlubnlxOXkydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ND6xkVPaj8tHO/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3RvNndndTJwd3pndng5eTA4OXI4NjQzdW01cjJ6OHlubnlxOXkydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/v6aOjy0Qo1fIA/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3RvNndndTJwd3pndng5eTA4OXI4NjQzdW01cjJ6OHlubnlxOXkydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/12HZukMBlutpoQ/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3RvNndndTJwd3pndng5eTA4OXI4NjQzdW01cjJ6OHlubnlxOXkydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WXB88TeARFVvi/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3RvNndndTJwd3pndng5eTA4OXI4NjQzdW01cjJ6OHlubnlxOXkydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jTnGaiuxvvDNK/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3RvNndndTJwd3pndng5eTA4OXI4NjQzdW01cjJ6OHlubnlxOXkydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tBxyh2hbwMiqc/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3RvNndndTJwd3pndng5eTA4OXI4NjQzdW01cjJ6OHlubnlxOXkydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6bAZXey5wNzBC/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3RvNndndTJwd3pndng5eTA4OXI4NjQzdW01cjJ6OHlubnlxOXkydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tVmthN5Mf8lGg/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3RvNndndTJwd3pndng5eTA4OXI4NjQzdW01cjJ6OHlubnlxOXkydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xT77XHUkpCtKbmtuH6/giphy.gif",
  "https://media.giphy.com/media/PQ8mQ3hqLpF3z4mccQ/giphy.gif?cid=ecf05e47ohjkjlulg24r7n4psnw11sl3zzqr90biaugfvm7q&ep=v1_gifs_search&rid=giphy.gif&ct=g",
];

const LoadingDots = () => {
  const [dots, setDots] = useState("");
  const [gifUrl, setGifUrl] = useState(
    catGifs[Math.floor(Math.random() * catGifs.length)]
  );

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);

    const gifInterval = setInterval(() => {
      setGifUrl(catGifs[Math.floor(Math.random() * catGifs.length)]);
    }, 5000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(gifInterval);
    };
  }, []);

  return (
    <div>
      <p className="content-intro">Backend is loading{dots}</p>
      <p className="content-intro">Blame Render for these slow bootup times!</p>
      <p className="content-intro">Please enjoy these gifs in the meantime</p>
      <img
        src={gifUrl}
        alt="Loading gif"
        style={{ width: "100%", marginTop: "2rem", borderRadius: "10px" }}
      />
    </div>
  );
};

export default LoadingDots;
