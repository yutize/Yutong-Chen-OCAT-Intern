
/* eslint-disable sort-keys */

/* eslint-disable arrow-body-style */

import React, { useEffect, useState } from 'react';
import { useAsyncDebounce, useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

function Table({ columns, data = [] }) {

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div>
      <h1 style={{ textAlign: `center` }}>OCAT Record System</h1>
      <table {...getTableProps()} style={{
        border: `solid 1px black`, borderWidth: `1px`, borderRadius: `10px`,
        marginLeft: `auto`, marginRight: `auto`, borderStyle: `solid`,
      }}>
        <thead>
          {headerGroups.map((headerGroup) =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    border: `solid 1px black`,
                    padding: `10px`,
                    textAlign: `center`,
                  }}
                >{column.render(`Header`)}
                  <span>
                    {columns.isSorted ?
                      columns.isSortedDesc ?
                        ` 🔽` :
                        ` 🔼` :
                      ``}
                  </span>
                </th>)}
            </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}
                    style={{
                      border: `solid 1px black`,
                      padding: `5px`,
                      textAlign: `center`,
                    }}
                  >{
                      cell.render(`Cell`)
                    }
                  </td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const handleDelete = async (row) => {
  console.log(row, `inside of delete`);
  await AssessmentService.delete(row.original.id);
};

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, [ ]);

  console.log(`test`);
  console.log(assessments);

  const columns = React.useMemo((data) => [
    {
      Header: `Cat Information`,
      columns: [
        {
          Header: `ID`,
          accessor: `id`,
        },
        {
          Header: `Instrument Type`,
          accessor: `instrumentType`,
        },
        {
          Header: `Cat Name`,
          accessor: `catName`,
        },
        {
          Header: `Date of Birth`,
          accessor: `catDateOfBirth`,
        },
      ],
    },
    {
      Header: `Risk Assessment Results`,
      columns: [
        {
          Header: `Risk Score`,
          accessor: `score`,
        },
        {
          Header: `Risk Assessment Level`,
          accessor: `riskLevel`,
        },
      ],
    },
    {
      Header: `Case Information`,
      columns: [
        {
          Header: `Date Created`,
          accessor: `createdAt`,
        },
        {
          Header: `Date Updated`,
          accessor: `updatedAt`,
        },

      ],
    },
    {
      Header: `Functions`,
      columns: [
        {
          Cell: ({ row }) =>
            <button onClick={() => handleDelete(row)}>Delete</button>,
          Header: `Delete`,

        },
      ],
    },
  ],
  []);

  return (
    <div >
      <h1>Assessment List</h1>
      <hr />
      <div className="tableContainer">
        <Table columns={columns} data={assessments} />
      </div>
    </div>
  );

  // console.log(assessments);

};
