"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

type DetailModalProps = {
  open: boolean;
  data: Record<string, string> | null;
  onClose: () => void;
  onSave: (updatedRow: Record<string, string>) => void;
};

export default function DetailModal({ open, data, onClose, onSave }: DetailModalProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

    useEffect(() => {
    if (data) setFormData(data);
    }, [data]);

    
  

  if (!open || !data) return null;

  const modal = (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="detail-title"

      onClick={onClose}
        style={{
            position: "fixed", inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000
        }}
    >
      <div
        ref={boxRef}
        // içerik kutusu
        onClick={(e) => e.stopPropagation()} // içerikte tıklayınca kapanmasın
        style={{
          background: "black",
          width: "min(800px, 92vw)",
          maxHeight: "80vh",
          overflow: "auto",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 10px 30px rgba(70, 80, 172, 0.2)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 id="detail-title" style={{ margin: 0 }}>Row Details</h2>
          <button onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* İçerik: şimdilik sadece okuma */}
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 8 }}>
          {Object.entries(data).map(([key, value]) => (

            <Fragment key={key}>
              <div style={{ fontWeight: 600 }}>{key}</div>

              <input //edit ve read
                value={formData[key] || ""}
                onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                }
                />

            </Fragment>
          ))}
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => onSave(formData)}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>

      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
