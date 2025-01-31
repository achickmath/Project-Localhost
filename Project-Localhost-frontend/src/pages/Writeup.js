import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Writeup() {
    const[title, setTitle] = useState('');
    const[category,setCategory] = useState('');
    const[content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const userLoginId = localStorage.getItem("userLoginId");
      console.log("🟢 Submitting writeup:", { title, category, content, userLoginId });
  
      try {
          const response = await fetch("http://localhost:5000/writeup/add", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ title, category, content, userLoginId }),
          });
  
          const data = await response.json();
          console.log("📨 Server response:", data);
  
          if (data.success) {
              alert("Your writeup was posted successfully!");
              navigate("/WriteupZone");
          } else {
              alert("❌ Error: " + data.message);
          }
      } catch (error) {
          console.error("❌ Fetch error:", error);
          alert("Something went wrong. Please try again.");
      }
  };
  
  

return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-50 pt-20 px-10">
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8 h-[85vh] w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Post a Writeup</h1>

        <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
          {/* Title Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter writeup title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Category</option>
              <option value="THM">THM</option>
              <option value="HTB">HTB</option>
            </select>
          </div>

          {/* Content Box (Expands to Fill Space) */}
          <div className="flex-grow">
            <label className="block text-lg font-medium text-gray-600">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your detailed solution here..."
              className="w-full h-4/5 px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 leading-relaxed text-lg"
              required
            />
          </div>

          {/* Submit Button */}
          <div class = "py-14">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Writeup
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}