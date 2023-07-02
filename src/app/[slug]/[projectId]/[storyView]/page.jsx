import React from "react";

export default function ViewStory({ params }) {
  const storyId = params.storyView;
  return <div>hello from {params.storyView}</div>;
}
