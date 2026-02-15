export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-900 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gold-400">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
            Total Projects
          </h3>
          <p className="text-3xl font-bold text-navy-900 mt-2">12</p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-navy-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
            Active Brochures
          </h3>
          <p className="text-3xl font-bold text-navy-900 mt-2">8</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
            Total Inquiries
          </h3>
          <p className="text-3xl font-bold text-navy-900 mt-2">145</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-navy-900 mb-4">
          Recent Residential Projects
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-900">
                  The Golden Heights
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  City Center
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Under Construction
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                  Edit
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-900">
                  Rupali Villa Estate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Green Valley
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                  Edit
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
