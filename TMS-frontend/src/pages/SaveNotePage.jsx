import React, { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import {
  FaEye,
  FaTrash,
  FaRegCopy,
  FaShareAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SaveNotePage = () => {
  const [notesEntries, setNotesEntries] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pasteId, setPasteId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/create/notes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setNotesEntries(data.notes || []);
          setFilterData(data.notes || []);
        } else {
          console.error("Error fetching Notes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching Notes:", error);
        toast.error("Error fetching Notes");
      }
    };

    fetchNotes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (note) => {
    setFormData({
      title: note.title,
      text: note.text,
    });
    setPasteId(note._id);
    setEditMode(true);
    setViewMode(false); // make sure we’re not in view mode
  };

  const handleView = (note) => {
    setFormData({
      title: note.title,
      text: note.text,
    });
    setViewMode(true);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = notesEntries.filter(
      (note) =>
        note.title.toLowerCase().includes(term) ||
        note.text.toLowerCase().includes(term)
    );
    setFilterData(filtered);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/create/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Note deleted");
        setNotesEntries((prev) => prev.filter((note) => note._id !== id));
        setFilterData((prev) => prev.filter((note) => note._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Error deleting note");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, text } = formData;
    if (!title || !text) {
      return toast.error("All fields are required");
    }

    try {
      const token = localStorage.getItem("token");
      const url = editMode
        ? `http://localhost:8080/create/notes/${pasteId}`
        : "http://localhost:8080/create/notes";
      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setFormData({ title: "", text: "" });
        setPasteId(null);
        setEditMode(false);

        // Refresh notes list
        setNotesEntries((prev) =>
          editMode
            ? prev.map((note) => (note._id === pasteId ? result.data : note))
            : [...prev, result.data]
        );
        setFilterData((prev) =>
          editMode
            ? prev.map((note) => (note._id === pasteId ? result.data : note))
            : [...prev, result.data]
        );
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 gap-4">
  {/* Left Column - Take a Note */}
  <div className="flex-1 bg-white rounded-3xl shadow-2xl p-6 flex flex-col justify-start gap-4 overflow-hidden">
    <h2 className="text-2xl font-bold text-gray-800">📝 Take a Note</h2>

    <div className="flex flex-col gap-3">
      {/* Title Input */}
      <input
        type="text"
        placeholder="Enter your Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        disabled={viewMode}
        className="p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-base"
      />

      {/* Content Textarea */}
      <textarea
        placeholder="Start writing your note..."
        rows="12"
        name="text"
        value={formData.text}
        onChange={handleChange}
        disabled={viewMode}
        className="p-3 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm"
      ></textarea>

      {/* Save Button */}
      {!viewMode && (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 !rounded-xl font-semibold transition"
        >
          {editMode ? "Update Note" : "+ Save Note"}
        </button>
      )}
      {(viewMode || editMode) && (
        <button
          onClick={() => {
            setViewMode(false);
            setEditMode(false);
            setPasteId(null);
            setFormData({ title: "", text: "" });
          }}
          className="mt-1 px-4 py-2 bg-gray-300 rounded-xl text-gray-800 hover:bg-gray-400 transition"
        >
          {viewMode ? "Close View" : "Cancel Edit"}
        </button>
      )}
    </div>
  </div>

  {/* Right Column - View Notes */}
  <div className="flex-1 bg-white rounded-3xl shadow-2xl p-6 flex flex-col gap-4 overflow-y-auto max-h-[85vh]">
    <h2 className="text-2xl font-bold text-gray-800">📚 Your Saved Notes</h2>

    {/* Search Bar */}
    <input
      className="p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 text-base"
      type="text"
      value={searchTerm}
      placeholder="Search notes by title or content..."
      onChange={handleSearch}
    />

{/* Notes List */}
<div className="flex flex-col gap-4">
  {Array.isArray(filterData) && filterData.length > 0 ? (
    filterData.map((paste) => (
      <div
        className="border border-gray-200 rounded-2xl shadow-sm p-4 bg-gray-50 hover:shadow-md transition duration-300"
        key={paste?._id}
      >
        {/* Top Row: Title on left, Icons on right */}
        <div className="flex justify-between items-start">
          {/* Title */}
          <div className="text-lg font-semibold text-gray-800">{paste.title}</div>

          {/* Action Buttons */}
          <div className="flex gap-3 text-lg text-gray-600">
            <button onClick={() => handleEdit(paste)}>
              <FiEdit2 className="hover:text-blue-600 hover:scale-110 transition" />
            </button>
            <button onClick={() => handleView(paste)}>
              <FaEye className="hover:text-green-600 hover:scale-110 transition" />
            </button>
            <button onClick={() => handleDelete(paste?._id)}>
              <FaTrash className="hover:text-red-600 hover:scale-110 transition" />
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(paste?.text);
                toast.success("Note copied to clipboard");
              }}
            >
              <FaRegCopy className="hover:text-indigo-600 hover:scale-110 transition" />
            </button>
            <button
              onClick={() => {
                const shareData = {
                  title: paste.title,
                  text: paste.text,
                  url: window.location.href,
                }
                if (navigator.share) {
                  navigator.share(shareData).catch(() =>
                    toast.error("Share failed")
                  );
                } else {
                  navigator.clipboard
                    .writeText(paste.text)
                    .then(() => toast.success("Content copied"))
                    .catch(() => toast.error("Failed to copy"));
                }
              }}
            >
              <FaShareAlt className="hover:text-purple-600 hover:scale-110 transition" />
            </button>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-gray-700 text-sm mt-1 line-clamp-3">{paste.text}</div>

        {/* Date Row: Right aligned below icons */}
        <div className="flex justify-end items-center text-gray-600 text-sm italic mt-2">
          <FaCalendarAlt className="mr-1" />
          <span>
            {new Date(paste.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    ))
  ) : (
    <div className="text-gray-500 italic">No notes found.</div>
  )}
</div>

  </div>
</div>

  );
};

export default SaveNotePage;
