import Navbar from "../components/Navbar";
export default function PrivacyPolicy() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen flex items-center justify-center bg-white px-6 py-20 text-neutral-800">
      <div className="max-w-3xl text-center">
        <h1 className="mb-8 text-5xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-lg leading-relaxed mb-6">
          Your privacy matters to us. At Jobsy, all the data you enter — including job links, notes, and statuses —
          is stored securely on your device. We do not use remote servers or cloud storage by default, ensuring your
          information remains private and under your control.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          When you choose to export your data, it is saved locally as a file you control. Jobsy does not collect analytics,
          track your browsing, or store your personal information on any external systems.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          This policy applies to all users and may be updated from time to time to reflect feature changes or security
          enhancements. Any significant updates will be communicated through the app.
        </p>
        <p className="text-sm text-neutral-500">
          Last updated: August 15, 2025
        </p>
      </div>
    </main>
    </>
  );
}
