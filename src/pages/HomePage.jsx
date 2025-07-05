import Navbar from "../components/Navbar";
import AuthLeftPanel from "../components/AuthLeftPanel";



export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <AuthLeftPanel />

        <div className="w-1/2 h-screen overflow-y-auto px-16 py-20">
          <h1 className="text-4xl font-bold mb-20">About Us</h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              When we started Job Assistant, we asked ourselves a simple question: <em>“What takes the joy out of job hunting?”</em>
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We realized it wasn’t the effort—it was the repetition, the silence, and the uncertainty.
              So we built a tool that understands the modern job seeker's frustration.
              Our platform doesn’t just automate—it listens, adapts, and helps you move forward with clarity and confidence.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              What began as a side project among friends has grown into a mission-driven product powered by empathy, design, and a lot of late-night debugging.
              <br />
              <strong>If you can dream the job, we’ll help you reach it.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We believe that applying for jobs shouldn't feel like a second job.
              Our mission is simple: to reduce friction, save time, and restore dignity to the job search process.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every resume upload, every application sent, every moment saved—we treat as an opportunity to bring relief, joy, and forward momentum to your journey.
              We’re not just building software. We’re building momentum, one job seeker at a time.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}