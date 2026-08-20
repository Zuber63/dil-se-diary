
const NewzLatter = () => {
    return (
        //  {/* Newsletter */}
      <section className="py-16 bg-[#fdf6f0]   px-4 md:px-16  text-center">
        <h2 className="text-3xl font-semibold mb-4">Join the Diary</h2>
        <p className="text-gray-700 mb-6">Subscribe to get the latest stories delivered to your inbox.</p>
        <form className="flex flex-col md:flex-row justify-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e8a0a8]  flex-1"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#e8a0a8]  text-white rounded-lg hover:bg-[#d88c94] transition"
          >
            Subscribe
          </button>
        </form>
      </section>

    )
}



export default NewzLatter;