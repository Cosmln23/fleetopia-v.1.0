import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import { fileTypeFromBuffer } from 'file-type';
import sharp from 'sharp';
import pLimit from 'p-limit';
import { z } from 'zod';

const router = Router();

const MAX_MB = Number(process.env.FILE_MAX_MB || 10);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_MB * 1024 * 1024 },
});

const allowMime = new Set(['image/jpeg', 'image/png', 'application/pdf']);
const limit = pLimit(Number(process.env.UPLOAD_MAX_CONCURRENCY || 5));

const querySchema = z.object({ sandbox: z.string().optional() });

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const parsed = querySchema.safeParse(req.query);
    if (!req.file) return res.status(400).json({ error: 'No file' });
    const buf = req.file.buffer;
    const sniff = await fileTypeFromBuffer(buf);
    const mime = sniff?.mime || req.file.mimetype || 'application/octet-stream';
    if (!allowMime.has(mime)) {
      return res.status(415).json({ error: 'Unsupported media type', mime });
    }

    const contentHash = crypto.createHash('sha256').update(buf).digest('hex');

    let processed = buf;
    if (mime.startsWith('image/')) {
      // strip metadata + clamp size
      processed = await limit(() => sharp(buf).rotate().resize({ width: 4096, height: 4096, fit: 'inside' }).toFormat(mime.endsWith('png') ? 'png' : 'jpeg', { quality: 90 }).toBuffer());
    }

    const safe = process.env.AV_SCAN_ENABLED === 'true' ? false : true;
    // TODO: integrate ClamAV when AV_SCAN_ENABLED=true

    return res.json({ success: true, size: processed.length, mime, contentHash, safe });
  } catch (err: any) {
    return res.status(500).json({ error: 'Upload failed', message: String(err?.message || err) });
  }
});

export default router;


