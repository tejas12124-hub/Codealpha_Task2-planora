function Home() {
  return (
    <>
      <section className="hero">
        <h1>
          Plan projects.
          <br />
          Collaborate better.
        </h1>

        <p>
          Planora helps students and teams manage tasks,
          track progress, and collaborate in real time.
          <br/>
          everything lives in one place, so work moves faster and nothing slips through the cracks.
        </p>

        <div className="hero-buttons">
          <button className="primary">Get Started</button>
          <button className="secondary">Learn More</button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>📌 Project Planning</h3>
          <p>Create and manage group projects easily.</p>
        </div>

        <div className="feature-card">
          <h3>✅ Task Tracking</h3>
          <p>Track progress with clear task statuses.</p>
        </div>

        <div className="feature-card">
          <h3>👥 Team Collaboration</h3>
          <p>Work together with live updates.</p>
        </div>
      </section>

      

      <footer className="footer">
        © 2026 Planora — Built for real productivity
      </footer>
    </>
  );
}

export default Home;
