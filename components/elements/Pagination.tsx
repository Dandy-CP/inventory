import React from 'react';

interface Props {
  page: number;
  totalPage: number;
  disabledNext: boolean;
  disabledPrev: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  page,
  totalPage,
  disabledNext,
  disabledPrev,
  setPage,
}: Props) => {
  return (
    <div className="join">
      <button
        disabled={disabledPrev}
        className="join-item btn"
        onClick={() => {
          setPage((prev) => (prev !== 1 ? prev - 1 : prev));
        }}
      >
        «
      </button>

      <button className="join-item btn">
        Page {page} / {totalPage}
      </button>

      <button
        disabled={disabledNext}
        className="join-item btn"
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
