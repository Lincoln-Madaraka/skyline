"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

type Props = {
  initial?: {
    id: string;
    title: string;
    area: string;
    propertyType: string;
    status: string;
    saleStatus: string;
    priceLabel: string;
    beds: number;
    baths: number;
    parking: number | null;
    plotSize: string | null;
    yearBuilt: number | null;
    summary: string;
    quickFact: string | null;
    about: string | null;
    amenities: string | null;
    highlights: string | null;
    coverImage: string | null;
    images: { id: string; url: string; alt: string | null }[];
  };
};

export default function PropertyForm({ initial }: Props) {
  const router = useRouter();
  const editMode = !!initial;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [area, setArea] = useState(initial?.area ?? "");
  const [propertyType, setPropertyType] = useState(initial?.propertyType ?? "Apartment");
  const [saleStatus, setSaleStatus] = useState(initial?.saleStatus ?? "For Sale");
  const [status, setStatus] = useState(initial?.status ?? "PUBLISHED");
  const [priceLabel, setPriceLabel] = useState(initial?.priceLabel ?? "");
  const [beds, setBeds] = useState(initial?.beds ?? 3);
  const [baths, setBaths] = useState(initial?.baths ?? 2);
  const [parking, setParking] = useState<number | "">(initial?.parking ?? "");
  const [plotSize, setPlotSize] = useState(initial?.plotSize ?? "");
  const [yearBuilt, setYearBuilt] = useState<number | "">(initial?.yearBuilt ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [quickFact, setQuickFact] = useState(initial?.quickFact ?? "");
  const [about, setAbout] = useState(initial?.about ? JSON.parse(initial.about).join("\n\n") : "");
  const [amenities, setAmenities] = useState(initial?.amenities ? JSON.parse(initial.amenities).join(", ") : "");

  const [existingImages, setExistingImages] = useState(initial?.images ?? []);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const arr = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setFiles((p) => [...p, ...arr]);
    setPreviews((p) => [...p, ...arr.map((f) => URL.createObjectURL(f))]);
  }

  function removeNewFile(i: number) {
    setFiles((p) => p.filter((_, idx) => idx !== i));
    setPreviews((p) => p.filter((_, idx) => idx !== i));
  }

  async function removeExisting(id: string) {
    if (!initial) return;
    if (!confirm("Remove this image?")) return;
    const res = await fetch(`/api/properties/${initial.id}/images/${id}`, { method: "DELETE" });
    if (res.ok) setExistingImages((p) => p.filter((im) => im.id !== id));
  }

  async function uploadImages(propertyId: string) {
    if (files.length === 0) return;
    const fd = new FormData();
    files.forEach((f) => fd.append("files", f));
    const res = await fetch(`/api/properties/${propertyId}/images`, {
      method: "POST",
      body: fd,
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Image upload failed");
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        title,
        area,
        propertyType,
        saleStatus,
        status,
        priceLabel,
        beds: Number(beds),
        baths: Number(baths),
        parking: parking === "" ? null : Number(parking),
        plotSize: plotSize || null,
        yearBuilt: yearBuilt === "" ? null : Number(yearBuilt),
        summary,
        quickFact: quickFact || null,
        about: about
          ? about
              .split(/\n{2,}/)
              .map((s: string) => s.trim())
              .filter(Boolean)
          : null,
        amenities: amenities
          ? amenities.split(",").map((s: string) => s.trim()).filter(Boolean)
          : null,
      };

      let propertyId = initial?.id;
      if (editMode && propertyId) {
        const res = await fetch(`/api/properties/${propertyId}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.error || "Update failed");
        }
      } else {
        const res = await fetch("/api/properties", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        const d = await res.json();
        if (!res.ok) throw new Error(d.error || "Create failed");
        propertyId = d.property.id;
      }

      if (propertyId && files.length > 0) await uploadImages(propertyId);

      router.push("/dashboard/realtor/properties");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel">
      <div className="form-grid">
        <label className="auth-field full">
          <span>Title</span>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Family Home with Chef's Kitchen" />
        </label>
        <label className="auth-field">
          <span>Area</span>
          <input required value={area} onChange={(e) => setArea(e.target.value)} placeholder="Karen, Kilimani…" />
        </label>
        <label className="auth-field">
          <span>Property Type</span>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Townhouse</option>
            <option>Family Home</option>
            <option>Serviced Residence</option>
            <option>Land</option>
            <option>Commercial</option>
          </select>
        </label>
        <label className="auth-field">
          <span>Sale Status</span>
          <select value={saleStatus} onChange={(e) => setSaleStatus(e.target.value)}>
            <option>For Sale</option>
            <option>For Rent</option>
            <option>Sold</option>
            <option>Leased</option>
          </select>
        </label>
        <label className="auth-field">
          <span>Visibility</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="SOLD">Sold</option>
            <option value="HIDDEN">Hidden</option>
          </select>
        </label>
        <label className="auth-field">
          <span>Price Label</span>
          <input required value={priceLabel} onChange={(e) => setPriceLabel(e.target.value)} placeholder="KES 62M" />
        </label>
        <label className="auth-field">
          <span>Bedrooms</span>
          <input type="number" min={0} required value={beds} onChange={(e) => setBeds(Number(e.target.value))} />
        </label>
        <label className="auth-field">
          <span>Bathrooms</span>
          <input type="number" min={0} required value={baths} onChange={(e) => setBaths(Number(e.target.value))} />
        </label>
        <label className="auth-field">
          <span>Parking</span>
          <input type="number" min={0} value={parking} onChange={(e) => setParking(e.target.value === "" ? "" : Number(e.target.value))} />
        </label>
        <label className="auth-field">
          <span>Plot Size</span>
          <input value={plotSize} onChange={(e) => setPlotSize(e.target.value)} placeholder="0.5 acre / 142 sqm" />
        </label>
        <label className="auth-field">
          <span>Year Built</span>
          <input type="number" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value === "" ? "" : Number(e.target.value))} />
        </label>
        <label className="auth-field full">
          <span>Summary</span>
          <textarea required rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="A short one-paragraph pitch for this property." />
        </label>
        <label className="auth-field full">
          <span>Quick Fact (optional)</span>
          <input value={quickFact} onChange={(e) => setQuickFact(e.target.value)} placeholder="Best for buyers who want weekend hosting." />
        </label>
        <label className="auth-field full">
          <span>About (optional, separate paragraphs with a blank line)</span>
          <textarea rows={6} value={about} onChange={(e) => setAbout(e.target.value)} placeholder={`Paragraph 1…\n\nParagraph 2…`} />
        </label>
        <label className="auth-field full">
          <span>Amenities (comma-separated)</span>
          <input value={amenities} onChange={(e) => setAmenities(e.target.value)} placeholder="Pool, Garden, Backup Power" />
        </label>
      </div>

      <h3 className="section-title" style={{ marginTop: "1.6rem" }}>Images</h3>

      {existingImages.length > 0 && (
        <div className="image-previews" style={{ marginBottom: "1rem" }}>
          {existingImages.map((im) => (
            <div key={im.id} className="image-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.url} alt={im.alt || ""} />
              <button type="button" onClick={() => removeExisting(im.id)}>×</button>
            </div>
          ))}
        </div>
      )}

      <div
        className={`image-drop ${dragOver ? "over" : ""}`}
        onClick={() => fileInput.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
      >
        <strong>Drop images here or click to browse</strong>
        <span>JPG, PNG, or WEBP · up to 6MB each</span>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {previews.length > 0 && (
        <div className="image-previews">
          {previews.map((src, i) => (
            <div key={src} className="image-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
              <button type="button" onClick={() => removeNewFile(i)}>×</button>
            </div>
          ))}
        </div>
      )}

      {error && <div className="auth-error" style={{ marginTop: "1rem" }}>{error}</div>}

      <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.4rem", flexWrap: "wrap" }}>
        <button className="btn-sm" type="submit" disabled={loading}>
          {loading ? "Saving…" : editMode ? "Save changes" : "Publish listing"}
        </button>
        <button type="button" className="btn-sm ghost" onClick={() => router.back()} disabled={loading}>Cancel</button>
      </div>
    </form>
  );
}
