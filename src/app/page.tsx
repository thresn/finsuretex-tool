"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import csvSplit from "../utils/csvSplit";
import DetailModal from "../components/DetailModal";
import exportToCSV from "../utils/exportToCsv";

export default function Page() {
  const [rows, setRows] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<Record<string, string> | null>(null);//modal için
  const [fileName, setFileName] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  function handleFile(e) {
    const file = e.target.files[0]//files arrayınden ilk seçilen file
    if (file) setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (ev) => {//kaydet,okununca buraya dön(onload)
      const fileText = ev.target.result as string;
      const data = csvSplit(fileText);
      setRows(data);
    };

    reader.readAsText(file);
  }

  function handleSave(updatedRow: Record<string, string>) {
    setRows(
      rows.map(r => {
        if (r.id === updatedRow.id) {
          return updatedRow;
        } else {
          return r;
        }
      })
    );
    setSelectedRow(null); // modal kapanır
  }

  return (
    <div className="table-wrapper">
      <div className="actions">
        <input id="csvFile" className="visuallyHidden" type="file" accept=".csv" onChange={handleFile} />
        <label htmlFor="csvFile" className="btn accent">Choose CSV</label>
        <span className="fileName" aria-live="polite">{fileName || "No file selected"}</span>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="searchInput"
        />
        <button className="primary push-right" onClick={() => exportToCSV(rows)}>
          Export CSV
        </button>
      </div>

      {rows.length > 0 && (
        <table className="table">

          <thead className="">
            <tr>
              {Object.keys(rows[0]).map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {(() => {
              let visibleRows = rows;
              if (query) {
                visibleRows = rows.filter((r) => {
                  const hay = Object.values(r)
                    .map((v) => String(v).toLowerCase())
                    .join(" ");
                  return hay.includes(query.toLowerCase());
                });
              }
              return visibleRows.map((row) => (
              <tr key={row.id ?? JSON.stringify(row)} onClick={() => setSelectedRow(row)}>
                {Object.entries(row).map(([colKey, val]) => (
                  <td key={colKey}>
                    <div className="cellClamp" title={String(val)}>{String(val)}</div>
                  </td>
                ))}
              </tr>
              ));
            })()}
          </tbody>

        </table>

      )}
      <DetailModal
        open={!!selectedRow}
        data={selectedRow}
        onClose={() => setSelectedRow(null)}
        onSave={handleSave}
      />
    </div>

  )
}