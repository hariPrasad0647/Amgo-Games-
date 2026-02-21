import { useState } from "react";
import { Upload, X, FileText, CheckCircle } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  progress: number;
  status: "uploading" | "complete";
}

export function AssetsTab() {
  const [files, setFiles] = useState<UploadedFile[]>([
    { id: "1", name: "banner-1200x628.png", progress: 100, status: "complete" },
    { id: "2", name: "logo-variant-dark.svg", progress: 100, status: "complete" },
  ]);
  const [dragOver, setDragOver] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingFile, setPendingFile] = useState<string>("");

  const simulateUpload = (fileName: string) => {
    setPendingFile(fileName);
    setShowConfirm(true);
  };

  const confirmUpload = () => {
    const id = Date.now().toString();
    const newFile: UploadedFile = { id, name: pendingFile, progress: 0, status: "uploading" };
    setFiles((prev) => [...prev, newFile]);
    setShowConfirm(false);

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress: 100, status: "complete" as const } : f))
        );
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress } : f))
        );
      }
    }, 300);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          simulateUpload("dropped-file.png");
        }}
        onClick={() => simulateUpload("uploaded-file.png")}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 transition-colors ${
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"
        }`}
      >
        <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Drop files here or click to upload</p>
        <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, SVG, PDF up to 10MB</p>
      </div>

      {/* File list */}
      <div className="space-y-2">
        {files.map((file) => (
          <div key={file.id} className="flex items-center gap-3 rounded-md border border-border bg-card p-3">
            <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
              {file.status === "uploading" && (
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              )}
            </div>
            {file.status === "complete" && <CheckCircle className="h-4 w-4 shrink-0 text-success" />}
            <button
              onClick={() => removeFile(file.id)}
              className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20">
          <div className="w-96 rounded-lg border border-border bg-card p-6 shadow-lg">
            <h3 className="text-base font-semibold text-foreground">Confirm Upload</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Upload "{pendingFile}" to this campaign?
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpload}
                className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 active:opacity-80 transition-opacity"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
