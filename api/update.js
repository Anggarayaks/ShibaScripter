export default async function handler(req, res) {
  // 1. Pastikan hanya metode POST yang bisa akses
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method tidak diizinkan' });
  }

  const { dataBaru } = req.body;
  const token = process.env.GITHUB_TOKEN; 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
  const repo = 'Anggarayaks/ShibaScripter';
  const path = 'database.json';

  try {
    // 2. Ambil informasi file database.json saat ini (termasuk SHA)
    const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const fileInfo = await getRes.json();

    // 3. Update file ke GitHub
    const updateRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: "Update database via admin panel",
        content: btoa(unescape(encodeURIComponent(JSON.stringify(dataBaru, null, 2)))),
        sha: fileInfo.sha // SHA ini wajib ada agar GitHub tahu file mana yang diupdate
      })
    });

    if (updateRes.ok) {
      res.status(200).json({ message: 'Database berhasil diupdate!' });
    } else {
      const errorData = await updateRes.json();
      res.status(500).json({ message: 'Gagal update ke GitHub', detail: errorData });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
