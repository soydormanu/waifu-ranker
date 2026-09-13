export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send('Falta la URL');

  try {
    const response = await fetch(decodeURIComponent(url), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', contentType);
    res.send(buffer);
  } catch (error) {
    res.status(500).send('Error al descargar la imagen');
  }
}