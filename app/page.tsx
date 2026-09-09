import Nav from "./components/marketing/Nav";
import Hero from "./components/marketing/Hero";
import HowItWorks from "./components/marketing/HowItWorks";
import FeatureSection from "./components/marketing/FeatureSection";
import DownloadCta from "./components/marketing/DownloadCta";
import Footer from "./components/marketing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <Hero />
      <HowItWorks />
      <FeatureSection
        id="features"
        title="Easy meal logging"
        body="Log meals your way — search our product database, scan a barcode, or describe your meal in plain text and let AI identify the ingredients. Every food is broken down into 30+ categories like gluten, dairy, and histamine."
        src="/screenshots/quick-meal.png"
        alt="Quick Meal screen identifying ingredients and category tags from a text description"
        imageSide="right"
        tone="cream"
      />
      <FeatureSection
        title="Real analysis, real evidence"
        body="My Tummi doesn't just guess. Every suspected sensitivity comes with a likelihood score and a breakdown of the exact episodes behind it — so you see the reasoning, not just the conclusion."
        src="/screenshots/sensitivity-detail.png"
        alt="Sensitivity detail screen with likelihood score and per-symptom evidence"
        imageSide="left"
        tone="peach"
      />
      <FeatureSection
        title="Check before you eat"
        body="Once you know your triggers, My Tummi watches out for them. Scan any product and get an instant alert when it contains something you're sensitive to."
        src="/screenshots/sensitivity-alert.png"
        alt="Product page showing a sensitivity alert for an ingredient you are sensitive to"
        imageSide="right"
        tone="cream"
      />
      <DownloadCta />
      <Footer />
    </div>
  );
}
