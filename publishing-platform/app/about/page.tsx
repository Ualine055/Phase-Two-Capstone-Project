import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={false} />

      <div className="flex-1 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">About Publish</h1>

          <div className="space-y-6 text-foreground/80 leading-relaxed prose">
            <p>
              Publish is a modern publishing platform designed for writers, creators, and thinkers who want to share their stories with the world. Founded in 2024, we believe in democratizing content creation and building a community of passionate storytellers.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Mission</h2>
            <p>
              To empower writers and creators by providing them with a beautiful, intuitive platform to share their voice and connect with readers globally.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Values</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Quality content creation</li>
              <li>Community-driven engagement</li>
              <li>Privacy and security</li>
              <li>Accessible technology for all</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4 ">Get Started</h2>
            <p>
              Ready to share your story?{" "}
              <Link href="/auth/signup" className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 font-semibold inline-block">
                Create an account
              </Link>
              {" "}and start writing today.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
