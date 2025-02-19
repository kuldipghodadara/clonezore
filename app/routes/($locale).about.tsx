export default function About() {
  return (
    <div className="bg-gray-50 text-gray-900">
      <header className="bg-blue-600 text-white py-6 dark-about">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-semibold">About Us</h1>
        </div>
      </header>

      <main className="py-16  ">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
          <p className="text-lg text-gray-700 mb-6">
            We are a team of passionate individuals dedicated to delivering
            high-quality products and exceptional customer service. Our mission
            is to provide the best shopping experience for our customers, making
            every transaction smooth and reliable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-600">
                Our Story
              </h3>
              <p className="text-lg text-gray-600">
                It all started with a simple idea: create a store that delivers
                quality products at affordable prices. We have grown over the
                years, but our core values remain the same—quality, reliability,
                and customer satisfaction.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-600">
                Our Vision
              </h3>
              <p className="text-lg text-gray-600">
                We aim to become the go-to place for all your shopping needs. We
                strive to innovate, grow, and adapt to provide the best products
                and services for our community.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
