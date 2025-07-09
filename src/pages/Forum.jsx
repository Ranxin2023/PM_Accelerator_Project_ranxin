import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown, Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForumPage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    setQuestions([
      { title: newQuestion, answers: 0, replies: [], likes: 0 },
      ...questions
    ]);
    setNewQuestion("");
    setShowModal(false);
  };

  const handleAddAnswer = () => {
    if (selectedPostIndex === null || !newAnswer.trim()) return;
    const updated = [...questions];
    updated[selectedPostIndex].replies.push({
      user: "anonymous",
      text: newAnswer,
      time: "just now"
    });
    updated[selectedPostIndex].answers++;
    setQuestions(updated);
    setNewAnswer("");
  };

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortOption === "popular") return b.answers - a.answers;
    return 0;
  });

  const selectedPost = selectedPostIndex !== null ? questions[selectedPostIndex] : null;

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto px-8 pt-6">
        <button
            onClick={() => navigate(-1)}
            className="text-sm text-black hover:text-gray-700 transition"
        >
            ← Back
        </button>
      </div>

      <div className="min-h-screen bg-white text-gray-800 text-[1.2rem]">
        <div className="max-w-screen-2xl mx-auto px-8 pt-10">
          <div className="flex items-center justify-between mb-8">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 max-w-md px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none"
            />
            <button
              onClick={() => setShowModal(true)}
              className="ml-6 px-6 py-3 bg-black text-white rounded-full text-[1.2rem]"
            >
              Ask question
            </button>
          </div>

          <div className="flex gap-10">
            <div className="w-1/3 space-y-6">
              <div className="flex space-x-6 text-gray-500 border-b pb-2 text-[1.2rem]">
                <button
                  className={`${sortOption === "newest" ? "text-black border-b-2 border-black font-semibold" : ""}`}
                  onClick={() => setSortOption("newest")}
                >
                  Newest
                </button>
                <button
                  className={`${sortOption === "popular" ? "text-black border-b-2 border-black font-semibold" : ""}`}
                  onClick={() => setSortOption("popular")}
                >
                  Popular
                </button>
                <button
                  className={`${sortOption === "unanswered" ? "text-black border-b-2 border-black font-semibold" : ""}`}
                  onClick={() => setSortOption("unanswered")}
                >
                  Unanswered
                </button>
              </div>

              {sortedQuestions
                .filter((q) => (sortOption === "unanswered" ? q.answers === 0 : true))
                .map((q, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-xl p-6 shadow hover:shadow-md transition bg-white cursor-pointer ${selectedPostIndex === idx ? "border-black" : "border-gray-200"}`}
                    onClick={() => setSelectedPostIndex(idx)}
                  >
                    <h3 className="text-[1.4rem] font-medium mb-2">{q.title}</h3>
                    <p className="text-gray-500 mb-4">{q.answers} answer{q.answers !== 1 ? "s" : ""}</p>
                    <button className="px-4 py-2 bg-black text-white rounded-full text-[1.1rem]">
                      View the post
                    </button>
                  </div>
                ))}
            </div>

            <div className="flex-1 space-y-6">
              {selectedPost ? (
                <>
                  <div className="flex justify-between items-center">
                    <h1 className="text-[1.6rem] font-bold leading-tight">
                      {selectedPost.title}
                    </h1>
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      placeholder="Share your thoughts"
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-full px-5 py-3 shadow-sm"
                    />
                    <button
                      onClick={handleAddAnswer}
                      className="px-5 py-2 bg-black text-white rounded-full text-[1.1rem]"
                    >
                      Post it!
                    </button>
                  </div>

                  <div>
                    <p className="text-[1.2rem] font-semibold mb-4">{selectedPost.answers} answer{selectedPost.answers !== 1 ? "s" : ""}</p>
                    <div className="space-y-6">
                      {selectedPost.replies.map((a, idx) => (
                        <div key={idx} className="border-b pb-6">
                          <div className="flex items-start gap-4">
                            <div className="rounded-full bg-gray-200 w-10 h-10" />
                            <div>
                              <p className="text-gray-800 mb-2">{a.text}</p>
                              <div className="text-sm text-gray-500 flex gap-4">
                                <span>{a.time}</span>
                                <span className="hover:underline cursor-pointer">Like</span>
                                <span className="hover:underline cursor-pointer">Reply</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {!selectedPost.replies.length && (
                        <div className="text-gray-500 text-[1rem] italic">No answers yet.</div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-gray-500 text-[1rem] italic">Select a question to view its answers.</div>
              )}
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter your question..."
                className="w-full px-4 py-2 border rounded mb-4"
              />
              <div className="flex justify-end gap-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded border">Cancel</button>
                <button onClick={handleAddQuestion} className="px-4 py-2 rounded bg-black text-white">Post</button>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default ForumPage;
