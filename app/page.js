import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Small screens */}
          <div className="flex justify-between items-center py-4 sm:hidden">
            <h1 className="text-2xl font-extrabold tracking-tight">
              <span className="text-indigo-100">MySchool</span> Academy
            </h1>
            <Link
              href="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
            >
              Login
            </Link>
          </div>

          {/* Medium screens */}
          <div className="hidden sm:flex md:hidden flex-col py-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-center mb-4">
              <span className="text-indigo-100">MySchool</span> Academy
            </h1>
            <div className="flex justify-between items-center">
              <nav className="flex space-x-4 text-lg font-medium">
                <a href="#about" className="hover:text-indigo-200 transition">
                  About Us
                </a>
                <a
                  href="#programs"
                  className="hover:text-indigo-200 transition"
                >
                  Our Programs
                </a>
                <a href="#contact" className="hover:text-indigo-200 transition">
                  Contact
                </a>
              </nav>
              <Link
                href="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Large screens */}
          <div className="hidden md:flex justify-between items-center py-4">
            <h1 className="text-3xl font-extrabold tracking-tight">
              <span className="text-indigo-100">MySchool</span> Academy
            </h1>
            <div className="flex items-center">
              <nav className="flex space-x-6 text-lg font-medium mr-8">
                <a href="#about" className="hover:text-indigo-200 transition">
                  About Us
                </a>
                <a
                  href="#programs"
                  className="hover:text-indigo-200 transition"
                >
                  Our Programs
                </a>
                <a href="#contact" className="hover:text-indigo-200 transition">
                  Contact
                </a>
              </nav>
              <Link
                href="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="text-center py-16 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
          Welcome to <span className="text-blue-600">MySchool Academy</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
          Empowering Minds, Shaping Futures
        </p>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4 md:px-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 text-center">
            Our Story
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto text-center">
            At MySchool Academy, we believe that every child deserves a
            world-class education. Our dedicated team of educators is committed
            to providing a nurturing environment where students can thrive
            academically, socially, and emotionally.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <h4 className="text-2xl font-semibold mb-3 text-blue-600">
                Our Mission
              </h4>
              <p className="text-gray-600">
                To provide a comprehensive education that prepares students for
                success in an ever-changing world.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <h4 className="text-2xl font-semibold mb-3 text-blue-600">
                Our Vision
              </h4>
              <p className="text-gray-600">
                To be a leading educational institution that fosters a culture
                of excellence, innovation, and inclusivity.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <h4 className="text-2xl font-semibold mb-3 text-blue-600">
                Our Values
              </h4>
              <p className="text-gray-600">
                We value academic excellence, creativity, diversity, and
                community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 text-center">
            Our Programs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {["Elementary Education", "Middle School", "High School"].map(
              (program) => (
                <div
                  key={program}
                  className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                >
                  <h4 className="text-2xl font-semibold mb-3 text-blue-600">
                    {program}
                  </h4>
                  <p className="text-gray-600">
                    Comprehensive curriculum designed to challenge and inspire
                    students at every level.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-10 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
            Get in Touch
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;re here to answer your questions and help you learn more
            about MySchool Academy.
          </p>
          <a
            href="mailto:harshsojitra509@gmail.com"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 md:px-10 py-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MySchool Academy. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="hover:underline mx-4">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline mx-4">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
