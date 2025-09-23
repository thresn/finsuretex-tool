export default function exportToCSV(rows: Record<string, string>[]) {

    const header = Object.keys(rows[0]).join(",");

    const csvRows = rows.map(row =>
        Object.values(row).map(val => `"${val}"`).join(",")
    );

    const csvString = [header, ...csvRows].join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();

    URL.revokeObjectURL(url); // memory cleanup

}