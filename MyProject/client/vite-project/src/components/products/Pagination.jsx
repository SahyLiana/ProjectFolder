import React from "react";
import "./pagination.scss";

function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
  let pages = [];
  //   console.log(totalPosts, postsPerPage, currentPage);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
