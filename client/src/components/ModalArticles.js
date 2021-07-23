import React from "react";
import ModalComponent from "./modal";

function Articles() {
  const articles = [
    {
      id: 1,
      content: "Article 1"
    },
    {
      id: 2,
      content: "Article 2"
    }
  ];

  return (
    <div className="articles">
      {articles.map(article => (
        <ModalComponent article={article} />
      ))}
    </div>
  );
}

export default Articles;