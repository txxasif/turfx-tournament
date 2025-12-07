"use client";

import { useEffect, useState } from "react";
import { Navbar } from "../components";
import { Trash2, Phone, Search } from "lucide-react";

interface Team {
  _id: string;
  name: string;
  mobile: string;
  teamName: string;
  address: string;
  managerName: string;
  registeredAt: string;
  status: "pending" | "confirmed" | "rejected";
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/teams");
      const data = await response.json();

      if (response.ok) {
        setTeams(data.teams);
      } else {
        setError(data.error || "টিম লোড করতে সমস্যা হয়েছে");
      }
    } catch {
      setError("সার্ভারে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, teamName: string) => {
    if (!confirm(`"${teamName}" টিম মুছে ফেলতে চান?`)) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/teams/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTeams((prev) => prev.filter((team) => team._id !== id));
      } else {
        const data = await response.json();
        alert(data.error || "মুছতে সমস্যা হয়েছে");
      }
    } catch {
      alert("সার্ভারে সমস্যা হয়েছে");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTeams = teams.filter(
    (team) =>
      team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.mobile.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 pt-24 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              রেজিস্টার্ড টিম
            </h1>
            <p className="text-slate-500 mt-1">
              মোট {teams.length} টি টিম রেজিস্টার করেছে
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="টিম খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        ) : filteredTeams.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500">
              {searchQuery ? "কোনো টিম পাওয়া যায়নি" : "এখনো কোনো টিম রেজিস্টার করেনি"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    দল
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">
                    যোগাযোগ
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                    ম্যানেজার
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    স্ট্যাটাস
                  </th>
                  <th className="text-right py-4 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    অ্যাকশন
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTeams.map((team, index) => (
                  <tr
                    key={team._id}
                    className="hover:bg-white/2 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="text-slate-600 text-sm">{index + 1}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-white">{team.teamName}</p>
                        <p className="text-sm text-slate-500">{team.address}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${team.mobile}`}
                          className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                          <Phone size={14} />
                          <span className="text-sm">{team.mobile}</span>
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell">
                      <span className="text-sm text-slate-400">
                        {team.managerName}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          team.status === "confirmed"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : team.status === "rejected"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {team.status === "confirmed"
                          ? "নিশ্চিত"
                          : team.status === "rejected"
                          ? "বাতিল"
                          : "পেন্ডিং"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleDelete(team._id, team.teamName)}
                        disabled={deletingId === team._id}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                        title="মুছে ফেলুন"
                      >
                        {deletingId === team._id ? (
                          <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
