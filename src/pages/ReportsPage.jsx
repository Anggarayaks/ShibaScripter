import { Icon } from '../utils/icons';

export const ReportsPage = ({ reports = [], onBack }) => {
  const unreadReports = reports.filter((r) => r.status === 'pending').length;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 flex-grow">
      <button onClick={onBack} className="text-blue-500 mb-6 font-bold">
        ← Kembali
      </button>

      <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-2xl mb-8">
        <h1 className="text-3xl font-black text-white flex gap-2 items-center">
          <Icon name="bell" size={28} />
          Laporan Script
        </h1>
        <p className="text-[#8B949E] mt-2">
          Total Laporan: {reports.length} | Menunggu: {unreadReports}
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12 bg-[#161B22] border border-[#30363D] p-8 rounded-2xl">
          <p className="text-[#8B949E] text-lg">✅ Tidak ada laporan baru</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className={`bg-[#161B22] border p-6 rounded-2xl ${
                report.status === 'pending'
                  ? 'border-yellow-500/50 bg-yellow-500/5'
                  : 'border-[#30363D]'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    🚩 {report.reason.replace(/-/g, ' ').toUpperCase()}
                  </h3>
                  <p className="text-sm text-[#8B949E] mt-1">Script: {report.scriptTitle}</p>
                  <p className="text-sm text-white mt-3 bg-[#0D1117] p-3 rounded border border-[#30363D]">
                    {report.description}
                  </p>
                  <p className="text-xs text-[#8B949E] mt-3">
                    Dilaporkan: {new Date(report.createdAt).toLocaleString('id-ID')}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-xs font-bold ${
                    report.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {report.status === 'pending' ? 'MENUNGGU' : 'SELESAI'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
