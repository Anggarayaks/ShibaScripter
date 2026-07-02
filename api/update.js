export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method tidak diizinkan' });

  const { dataBaru } = req.body;
  const token = process.env.GITHUB_TOKEN; // jan di apa apain ya
  const repo = 'Anggarayaks/ShibaScripter';
  const path = 'database.json';

  try {
    const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!getRes.ok) throw new Error('Gagal ambil data dari GitHub');
    const fileInfo = await getRes.json();
    
    const contentLama = JSON.parse(decodeURIComponent(escape(atob(fileInfo.content))));
    contentLama.scripts.push(dataBaru);

    const updateRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: "Tambah script baru",
        content: btoa(unescape(encodeURIComponent(JSON.stringify(contentLama, null, 2)))),
        sha: fileInfo.sha
      })
    });

    const result = await updateRes.json();
    if (updateRes.ok) {
      res.status(200).json({ message: 'Script berhasil ditambahkan!' });
    } else {
      res.status(500).json({ message: 'Gagal update ke GitHub: ' + JSON.stringify(result) });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
