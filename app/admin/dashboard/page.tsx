"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

// ── Types ────────────────────────────────────────────────────────────
type Category = {
  id: string;
  name: string;
  color: string;
};

type PhotoEntry = {
  id: string;
  file: File;
  preview: string;
  categoryId: string;
  caption: string;
  featured: boolean;
  status: "idle" | "uploading" | "done" | "error";
  progress: number;
};

// ── Colour palette for category picker ───────────────────────────────
const COLOR_OPTIONS = [
  { label: "Gold",     bg: "bg-[#C9A96E]", hex: "#C9A96E" },
  { label: "Blush",    bg: "bg-[#F4C2C2]", hex: "#F4C2C2" },
  { label: "Sage",     bg: "bg-[#A8D5A2]", hex: "#A8D5A2" },
  { label: "Sky",      bg: "bg-[#B8D4E8]", hex: "#B8D4E8" },
  { label: "Lavender", bg: "bg-[#D4B8E8]", hex: "#D4B8E8" },
  { label: "Peach",    bg: "bg-[#F2C9A0]", hex: "#F2C9A0" },
  { label: "Moss",     bg: "bg-[#B5C9A0]", hex: "#B5C9A0" },
  { label: "Clay",     bg: "bg-[#D4A89A]", hex: "#D4A89A" },
];

// ── Default starter categories ────────────────────────────────────────
const DEFAULT_CATEGORIES: Category[] = [
  { id: "wedding",   name: "Wedding",   color: "bg-[#F4C2C2]" },
  { id: "portrait",  name: "Portrait",  color: "bg-[#C9A96E]" },
  { id: "fashion",   name: "Fashion",   color: "bg-[#B8D4E8]" },
  { id: "landscape", name: "Landscape", color: "bg-[#A8D5A2]" },
  { id: "lifestyle", name: "Lifestyle", color: "bg-[#D4B8E8]" },
];

export default function Dashboard() {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [photos, setPhotos]         = useState<PhotoEntry[]>([]);
  const [dragging, setDragging]     = useState(false);
  const fileInputRef                = useRef<HTMLInputElement>(null);

  // new-category form
  const [newCatName,  setNewCatName]  = useState("");
  const [newCatColor, setNewCatColor] = useState(COLOR_OPTIONS[0]);
  const [catError,    setCatError]    = useState("");

  // inline rename
  const [editingCat, setEditingCat] = useState<string | null>(null);
  const [editName,   setEditName]   = useState("");

  // ── Category helpers ─────────────────────────────────────────────
  const addCategory = () => {
    const trimmed = newCatName.trim();
    if (!trimmed) {
      setCatError("Please enter a category name.");
      return;
    }
    if (categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setCatError("That category already exists.");
      return;
    }
    setCategories((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: trimmed, color: newCatColor.bg },
    ]);
    setNewCatName("");
    setCatError("");
  };

  const deleteCategory = (id: string) => {
    const remaining = categories.filter((c) => c.id !== id);
    const fallback  = remaining[0]?.id ?? "";
    setPhotos((prev) =>
      prev.map((p) => (p.categoryId === id ? { ...p, categoryId: fallback } : p))
    );
    setCategories(remaining);
  };

  const saveEdit = (id: string) => {
    const trimmed = editName.trim();
    if (trimmed) {
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name: trimmed } : c))
      );
    }
    setEditingCat(null);
  };

  // ── Photo helpers ─────────────────────────────────────────────────
  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const defaultId = categories[0]?.id ?? "";
    const entries: PhotoEntry[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        categoryId: defaultId,
        caption: "",
        featured: false,
        status: "idle",
        progress: 0,
      }));
    setPhotos((prev) => [...prev, ...entries]);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [categories]
  );

  const updatePhoto = (id: string, patch: Partial<PhotoEntry>) =>
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const photo = prev.find((p) => p.id === id);
      if (photo) URL.revokeObjectURL(photo.preview);
      return prev.filter((p) => p.id !== id);
    });
  };

  // ── Simulated upload ─────────────────────────────────────────────
  const simulateUpload = (id: string) => {
    updatePhoto(id, { status: "uploading", progress: 0 });
    let progress = 0;
    const iv = setInterval(() => {
      progress += Math.floor(Math.random() * 18) + 8;
      if (progress >= 100) {
        clearInterval(iv);
        updatePhoto(id, { status: "done", progress: 100 });
      } else {
        updatePhoto(id, { progress });
      }
    }, 200);
  };

  const handleUploadAll = () =>
    photos.filter((p) => p.status === "idle").forEach((p) => simulateUpload(p.id));

  const idleCount = photos.filter((p) => p.status === "idle").length;
  const doneCount = photos.filter((p) => p.status === "done").length;
  const getCat    = (id: string) => categories.find((c) => c.id === id);

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="bg-[#F5F0E8] min-h-screen">

      {/* ── TOP BAR ── */}
      <header className="sticky top-0 z-40 bg-[#3B2F1E] px-6 sm:px-10 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="font-display text-lg tracking-[0.15em] text-[#F5F0E8] uppercase">
            Lumière<span className="text-[#C9A96E]">.</span>
          </a>
          <span className="text-[#6B5744] text-lg">/</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A0907A]">Photo Manager</span>
        </div>
        <div className="flex items-center gap-4">
          {doneCount > 0 && (
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]">
              {doneCount} uploaded
            </span>
          )}
          <a
            href="/gallery"
            target="_blank"
            className="text-[10px] uppercase tracking-[0.15em] text-[#A0907A] hover:text-[#F5F0E8] transition-colors flex items-center gap-1.5"
          >
            View Gallery
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10">

        {/* ── PAGE HEADING ── */}
        <div className="mb-10">
          <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-2">Admin</p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#3B2F1E] leading-tight">Upload Photos</h1>
          <p className="text-[#6B5744] text-sm mt-2 font-light">
            Build your categories, select your photos, then tag and publish — all in one place.
          </p>
        </div>

        {/* ══════════════════════════════════════════════
            STEP 1 — CATEGORY MANAGER
        ══════════════════════════════════════════════ */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-0.5">Step 1</p>
              <h2 className="font-display text-2xl text-[#3B2F1E]">Manage Categories</h2>
            </div>
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#A0907A]">
              {categories.length} {categories.length === 1 ? "category" : "categories"}
            </span>
          </div>

          <div className="bg-[#FAF7F2] border border-[#D9C9B0] p-6 flex flex-col gap-6">

            {/* ── Existing category pills ── */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#6B5744] mb-3">Your Categories</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center gap-2 bg-[#F5F0E8] border border-[#D9C9B0] px-3 py-2 group"
                  >
                    {/* Colour dot */}
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cat.color}`} />

                    {/* Inline rename */}
                    {editingCat === cat.id ? (
                      <input
                        autoFocus
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")  saveEdit(cat.id);
                          if (e.key === "Escape") setEditingCat(null);
                        }}
                        className="text-[12px] text-[#3B2F1E] bg-transparent border-b border-[#A0785A] outline-none w-24"
                      />
                    ) : (
                      <span className="text-[12px] text-[#3B2F1E] uppercase tracking-[0.1em]">
                        {cat.name}
                      </span>
                    )}

                    {/* Photo count badge */}
                    <span className="text-[10px] text-[#A0907A] bg-[#EDE5D8] px-1.5 py-0.5 rounded-sm">
                      {photos.filter((p) => p.categoryId === cat.id).length}
                    </span>

                    {/* Edit / Save button */}
                    {editingCat === cat.id ? (
                      <button
                        onClick={() => saveEdit(cat.id)}
                        title="Save"
                        className="text-[#A0785A] hover:text-[#3B2F1E] transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => { setEditingCat(cat.id); setEditName(cat.name); }}
                        title="Rename"
                        className="text-[#D9C9B0] hover:text-[#A0785A] transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                    )}

                    {/* Delete button */}
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      disabled={categories.length <= 1}
                      title="Delete"
                      className="text-[#D9C9B0] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#D9C9B0]" />

            {/* ── Add new category ── */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#6B5744] mb-3">Add New Category</p>
              <div className="flex flex-col sm:flex-row gap-3 items-start">

                {/* Name */}
                <div className="flex flex-col gap-1 flex-1 w-full">
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => { setNewCatName(e.target.value); setCatError(""); }}
                    onKeyDown={(e) => { if (e.key === "Enter") addCategory(); }}
                    placeholder="e.g. Maternity, Newborn, Street..."
                    className={`bg-transparent border px-4 py-2.5 text-[13px] text-[#3B2F1E] placeholder-[#B8A898] focus:outline-none transition-colors w-full ${
                      catError
                        ? "border-red-300 focus:border-red-400"
                        : "border-[#D9C9B0] focus:border-[#A0785A]"
                    }`}
                  />
                  {catError && (
                    <p className="text-[11px] text-red-400">{catError}</p>
                  )}
                </div>

                {/* Colour picker */}
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#A0907A]">Pick a colour</p>
                  <div className="flex gap-2 flex-wrap">
                    {COLOR_OPTIONS.map((col) => (
                      <button
                        key={col.label}
                        type="button"
                        title={col.label}
                        onClick={() => setNewCatColor(col)}
                        className={`w-6 h-6 rounded-full transition-all duration-150 ${col.bg} ${
                          newCatColor.hex === col.hex
                            ? "ring-2 ring-offset-2 ring-[#3B2F1E] scale-110"
                            : "hover:scale-110"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Add button */}
                <button
                  onClick={addCategory}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#3B2F1E] text-[#F5F0E8] text-[11px] uppercase tracking-[0.2em] hover:bg-[#A0785A] transition-colors duration-200 whitespace-nowrap self-start sm:mt-5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            STEP 2 — DROP ZONE
        ══════════════════════════════════════════════ */}
        <section className="mb-4">
          <div className="mb-5">
            <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-0.5">Step 2</p>
            <h2 className="font-display text-2xl text-[#3B2F1E]">Select Photos</h2>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed cursor-pointer transition-all duration-300 flex flex-col items-center justify-center py-14 px-6 text-center ${
              dragging
                ? "border-[#A0785A] bg-[#A0785A]/10"
                : "border-[#D9C9B0] bg-[#FAF7F2] hover:border-[#A0785A] hover:bg-[#EDE5D8]/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
            <div className={`w-14 h-14 flex items-center justify-center mb-4 transition-colors duration-300 ${dragging ? "bg-[#A0785A]" : "bg-[#EDE5D8]"}`}>
              <svg
                className={`w-6 h-6 transition-colors duration-300 ${dragging ? "text-[#F5F0E8]" : "text-[#A0785A]"}`}
                fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="font-display text-xl text-[#3B2F1E] mb-1">
              {dragging ? "Release to drop" : "Drag & drop your photos here"}
            </p>
            <p className="text-[#A0907A] text-sm font-light">or click to browse files</p>
            <p className="text-[#B8A898] text-[11px] uppercase tracking-[0.15em] mt-3">
              JPG · PNG · WEBP · Multiple files supported
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            STEP 3 — PHOTO QUEUE
        ══════════════════════════════════════════════ */}
        {photos.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[#A0785A] text-[10px] uppercase tracking-[0.25em] mb-0.5">Step 3</p>
                <h2 className="font-display text-2xl text-[#3B2F1E]">
                  Tag & Upload
                  <span className="font-body text-base text-[#A0907A] font-light ml-3">
                    {photos.length} photo{photos.length !== 1 ? "s" : ""}
                  </span>
                </h2>
              </div>
              <button
                onClick={() => { photos.forEach((p) => URL.revokeObjectURL(p.preview)); setPhotos([]); }}
                className="text-[11px] uppercase tracking-[0.15em] text-[#A0907A] hover:text-[#3B2F1E] transition-colors border-b border-[#D9C9B0] pb-0.5"
              >
                Clear All
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-10">
              {photos.map((photo) => {
                const cat = getCat(photo.categoryId);
                return (
                  <div
                    key={photo.id}
                    className={`border transition-colors duration-300 ${
                      photo.status === "done"
                        ? "border-[#A0785A]/40 bg-[#F5F0E8]"
                        : "border-[#D9C9B0] bg-[#FAF7F2] hover:border-[#B8A898]"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row">

                      {/* ── Thumbnail ── */}
                      <div className="relative w-full sm:w-44 h-44 flex-shrink-0 overflow-hidden bg-[#EDE5D8]">
                        <Image src={photo.preview} alt="Preview" fill className="object-cover" />

                        {/* Category ribbon — always visible when idle */}
                        {photo.status === "idle" && cat && (
                          <div className="absolute bottom-0 left-0 right-0 bg-[#1C140D]/70 backdrop-blur-sm px-3 py-2 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cat.color}`} />
                            <span className="text-[9px] uppercase tracking-[0.2em] text-[#F5F0E8] font-medium truncate">
                              {cat.name}
                            </span>
                          </div>
                        )}

                        {/* Uploading overlay */}
                        {photo.status === "uploading" && (
                          <div className="absolute inset-0 bg-[#1C140D]/65 flex flex-col items-center justify-center gap-2">
                            <svg className="w-6 h-6 text-[#C9A96E] animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            <span className="text-[#F5F0E8] text-[11px]">{photo.progress}%</span>
                            {cat && (
                              <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${cat.color}`} />
                                <span className="text-[9px] uppercase tracking-[0.15em] text-[#D9C9B0]">{cat.name}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Done overlay */}
                        {photo.status === "done" && (
                          <div className="absolute inset-0 bg-[#1C140D]/55 flex flex-col items-center justify-center gap-2">
                            <div className="w-9 h-9 bg-[#A0785A] flex items-center justify-center">
                              <svg className="w-4 h-4 text-[#F5F0E8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            {cat && (
                              <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${cat.color}`} />
                                <span className="text-[9px] uppercase tracking-[0.15em] text-[#D9C9B0]">{cat.name}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Featured badge */}
                        {photo.featured && (
                          <div className="absolute top-2 left-2 bg-[#C9A96E] text-[#1C140D] text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold">
                            Featured
                          </div>
                        )}
                      </div>

                      {/* ── Form fields ── */}
                      <div className="flex-1 p-5 flex flex-col gap-4">

                        {/* Filename + remove */}
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[12px] text-[#3B2F1E] font-medium truncate max-w-xs">{photo.file.name}</p>
                            <p className="text-[11px] text-[#A0907A] mt-0.5">
                              {(photo.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          {photo.status !== "uploading" && (
                            <button
                              onClick={() => removePhoto(photo.id)}
                              title="Remove photo"
                              className="text-[#D9C9B0] hover:text-red-400 transition-colors flex-shrink-0"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                <path d="M10 11v6M14 11v6" />
                                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                              </svg>
                            </button>
                          )}
                        </div>

                        {/* ── Category selector — visual pill buttons ── */}
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.15em] text-[#6B5744] block mb-2">
                            Category
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {categories.map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                disabled={photo.status === "done" || photo.status === "uploading"}
                                onClick={() => updatePhoto(photo.id, { categoryId: c.id })}
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] border transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${
                                  photo.categoryId === c.id
                                    ? "border-[#3B2F1E] bg-[#3B2F1E] text-[#F5F0E8]"
                                    : "border-[#D9C9B0] text-[#6B5744] bg-transparent hover:border-[#A0785A] hover:text-[#3B2F1E]"
                                }`}
                              >
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.color}`} />
                                {c.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Caption + Featured */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2 flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase tracking-[0.15em] text-[#6B5744]">Caption (optional)</label>
                            <input
                              type="text"
                              value={photo.caption}
                              disabled={photo.status === "done" || photo.status === "uploading"}
                              onChange={(e) => updatePhoto(photo.id, { caption: e.target.value })}
                              placeholder="A short description for this photo..."
                              className="bg-transparent border border-[#D9C9B0] px-3 py-2 text-[12px] text-[#3B2F1E] placeholder-[#B8A898] focus:outline-none focus:border-[#A0785A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase tracking-[0.15em] text-[#6B5744]">Featured</label>
                            <button
                              type="button"
                              disabled={photo.status === "done" || photo.status === "uploading"}
                              onClick={() => updatePhoto(photo.id, { featured: !photo.featured })}
                              className={`w-12 h-6 rounded-full relative transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                                photo.featured ? "bg-[#A0785A]" : "bg-[#D9C9B0]"
                              }`}
                            >
                              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                                photo.featured ? "translate-x-6" : "translate-x-0.5"
                              }`} />
                            </button>
                          </div>
                        </div>

                        {/* Progress bar */}
                        {(photo.status === "uploading" || photo.status === "done") && (
                          <div className="w-full bg-[#EDE5D8] h-0.5 overflow-hidden">
                            <div
                              className="h-full bg-[#A0785A] transition-all duration-300"
                              style={{ width: `${photo.progress}%` }}
                            />
                          </div>
                        )}

                        {/* Action */}
                        <div className="pt-1">
                          {photo.status === "idle" && (
                            <button
                              onClick={() => simulateUpload(photo.id)}
                              className="text-[11px] uppercase tracking-[0.15em] px-5 py-2 bg-[#3B2F1E] text-[#F5F0E8] hover:bg-[#A0785A] transition-colors duration-200"
                            >
                              Upload Photo
                            </button>
                          )}
                          {photo.status === "uploading" && (
                            <span className="text-[11px] uppercase tracking-[0.15em] text-[#A0907A]">
                              Uploading… {photo.progress}%
                            </span>
                          )}
                          {photo.status === "done" && (
                            <span className="text-[11px] uppercase tracking-[0.15em] text-[#A0785A] flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              Uploaded Successfully
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky upload-all bar */}
            {idleCount > 0 && (
              <div className="sticky bottom-0 bg-[#3B2F1E]/95 backdrop-blur-sm border-t border-[#6B5744]/40 py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 -mx-6 sm:-mx-10">
                <p className="text-[#A0907A] text-[12px] font-light">
                  <span className="text-[#F5F0E8] font-medium">
                    {idleCount} photo{idleCount > 1 ? "s" : ""}
                  </span>{" "}
                  ready to upload
                  {doneCount > 0 && (
                    <span className="ml-2 text-[#C9A96E]">· {doneCount} done</span>
                  )}
                </p>
                <button
                  onClick={handleUploadAll}
                  className="px-8 py-3 bg-[#C9A96E] text-[#1C140D] text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[#F5F0E8] transition-colors duration-300 flex items-center gap-2 whitespace-nowrap"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                  Upload All {idleCount} Photos
                </button>
              </div>
            )}
          </section>
        )}

        {/* Empty state */}
        {photos.length === 0 && (
          <p className="text-center py-6 text-[#B8A898] text-[12px] uppercase tracking-[0.2em]">
            No photos selected yet — drag some in above.
          </p>
        )}

        {/* ── Tips ── */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "🖼", title: "Best Dimensions",   tip: "Upload at 2000px or wider for crisp display on all screens." },
            { icon: "✦", title: "Featured Photos",    tip: "Mark up to 3 photos as Featured — they'll appear on your homepage." },
            { icon: "🏷", title: "Custom Categories", tip: "Create, colour-code, and rename categories any time to keep your gallery organised." },
          ].map((tip, i) => (
            <div key={i} className="bg-[#EDE5D8] border border-[#D9C9B0] px-5 py-5">
              <span className="text-xl block mb-3">{tip.icon}</span>
              <p className="text-[#3B2F1E] text-sm font-semibold mb-1">{tip.title}</p>
              <p className="text-[#6B5744] text-[12px] font-light leading-relaxed">{tip.tip}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}