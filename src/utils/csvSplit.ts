export default function csvSplit(csvString: string) {

    const lines = csvString.replace(/\r/g, "").split("\n").filter(line => line.trim() !== "");

    function parseCsvLine(line: string): string[] {
        const result: string[] = [];
        let current = "";
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    current += '"';
                    i++; // skip escaped quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = "";
            } else {
                current += char;
            }
        }
        result.push(current);
        return result;
    }

    function unquote(value: string): string {
        const trimmed = value;
        if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
            return trimmed.slice(1, -1).replace(/""/g, '"');
        }
        return trimmed;
    }
    
    const header = lines[0];
    const newHeader = parseCsvLine(header).map(unquote);
    const values = lines.slice(1);

    const rows = [];
    const rowVal = [];

    for (let i = 0; i < values.length; i++) {
        rowVal[i] = parseCsvLine(values[i]).map(unquote);
        const obj: any = {};
        for (let k = 0; k < newHeader.length; k++) {
            const cell = rowVal[i][k] ?? "";
            obj[newHeader[k]] = cell;
        }
        rows.push(obj);
    }

    return rows;
}