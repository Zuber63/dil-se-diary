
const Hero = () => {
    return (
        <div className="bg-[#fdf6f0]">
              {/* Hero Section */}
      <section className="py-20 text-center  px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-[#3e2c2c] mb-6">
          Har Lafz Dil Se ❤️
        </h2>

        <p className="text-[#7a6c6c] text-lg max-w-2xl mx-auto mb-8">
          Yahan har kahani mehsoos ki jaati hai, sirf padhi nahi.
        </p>

        <button   onClick={() => {
    document.getElementById("blogs").scrollIntoView({ behavior: "smooth" });
  }} className="bg-[#e8a0a8] text-white px-8 py-3 rounded-full shadow-md hover:bg-[#d88c94] transition">
          Explore Stories
        </button>
      </section>

 
      </div>
    )
}



export default Hero;