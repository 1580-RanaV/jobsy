import Navbar from "../components/Navbar";
export default function SystemStatus() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen flex items-center justify-center bg-white px-6 py-20 text-neutral-800">
      <div className="max-w-4xl text-center">
        <h1 className="mb-8 text-5xl font-bold tracking-tight">System Status</h1>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">✅ Live & Operational</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Job link parsing from ATS & career pages</li>
            <li>AI-powered extraction for missing fields</li>
            <li>Deadline alerts and overdue warnings</li>
            <li>Local storage with import/export</li>
            <li>Responsive UI across devices</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">🛠 In Development</h2>
          <ul className="list-disc list-inside text-lg space-y-2 text-neutral-600">
            <li>Browser extension for instant job saving</li>
            <li>Cloud sync for multi-device access</li>
            <li>Custom fields and tags</li>
            <li>Advanced AI-powered salary insights</li>
            <li>Integration with calendars for interview reminders</li>
          </ul>
        </section>

        <p className="mt-12 text-sm text-neutral-500">
          Last updated: August 15, 2025
        </p>
      </div>
    </main>
    </>
  );
}
