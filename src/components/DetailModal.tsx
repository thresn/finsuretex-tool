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

  useEffect(() => {//data değiştiğinde formData'yı güncelle
    if (data) setFormData(data);
  }, [data]);

  if (!open || !data) return null;

  const modal = (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="detail-title"
      onClick={onClose}
      className="modalOverlay"
    >
      <div
        ref={boxRef}
        onClick={(e) => e.stopPropagation()}
        className="modalBox"
      >
        <div className="modalHeader">
          <h2 id="detail-title">Row Details</h2>
          <button onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modalGrid">
          {Object.entries(data).map(([key, value]) => {
            const isCompact = ["id", "name", "company", "email"].includes(key.toLowerCase());
            return (
              <Fragment key={key}>
                <div className="modalLabel">{key}</div>

                {isCompact ? (
                  <input
                    className="modalInputCompact"
                    value={formData[key] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  />
                ) : (
                  <textarea
                    className="modalInput"
                    value={formData[key] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  />
                )}

              </Fragment>
            );
          })}
        </div>
        <div className="modalActions">
          <button className="accent" onClick={() => onSave(formData)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>

      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}


