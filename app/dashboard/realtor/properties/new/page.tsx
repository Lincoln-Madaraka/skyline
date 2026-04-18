import PropertyForm from "../PropertyForm";

export default function NewPropertyPage() {
  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Post a Property</h1>
          <p>Create a new listing. Uploads are stored locally and served from your site.</p>
        </div>
      </div>
      <PropertyForm />
    </>
  );
}
