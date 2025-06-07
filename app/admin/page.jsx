export default function AdminHomePage() {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-black">
      <h2 className="text-lg font-semibold mb-4">Welcome back, Admin!</h2>
      <div className="bg-white rounded-lg shadow p-6">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { title: "Total Achievers", value: "124", change: "+12%" },
                { title: "Announcements", value: "24", change: "+3" },
                { title: "Gallery Items", value: "86", change: "Updated" },
                { title: "Team Members", value: "15", change: "2 New" }
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-[#bf213e] mt-1">{stat.change}</p>
                </div>
              ))}
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  "New achiever added - John Doe",
                  "Announcement updated - Holiday Schedule",
                  "Gallery image uploaded - Event 2023",
                  "Team member profile updated - Sarah Smith"
                ].map((activity, i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-2 w-2 mt-2 bg-[#bf213e] rounded-full mr-2"></div>
                    <p className="text-sm">{activity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
    </div>
  );
}
