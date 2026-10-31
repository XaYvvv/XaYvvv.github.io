"""Generate small display assets; retain original files for full-size viewing.
Usage: python scripts/optimize-media.py --ffmpeg PATH_TO_FFMPEG
Requires Pillow. Assets are committed; deployment does not run this script.
"""
import argparse, json, subprocess, tempfile
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
OUT = PUBLIC / 'research/optimized'
parser = argparse.ArgumentParser()
parser.add_argument('--ffmpeg', required=True)
args = parser.parse_args()
FFMPEG = str(Path(args.ffmpeg).resolve())
OUT.mkdir(parents=True, exist_ok=True)
report = []

def record(source, target):
    report.append({'source': str(source.relative_to(PUBLIC)), 'output': str(target.relative_to(PUBLIC)), 'before': source.stat().st_size, 'after': target.stat().st_size})

def preview(source, name, width=1600, quality=86):
    target = OUT / name
    with Image.open(source) as im:
        im = ImageOps.exif_transpose(im).convert('RGB')
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.Resampling.LANCZOS)
        im.save(target, 'WEBP', quality=quality, method=6)
    record(source, target)

def encode(source, name, width=None, crf=24):
    target = OUT / name
    filters = ['fps=25']
    if width: filters.append(f'scale={width}:-2')
    subprocess.run([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error', '-i', str(source), '-an', '-vf', ','.join(filters), '-c:v', 'libx264', '-preset', 'slow', '-threads', '2', '-crf', str(crf), '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(target)], check=True)
    record(source, target)

def animation(source, name):
    target = OUT / (name + '.mp4')
    with tempfile.TemporaryDirectory(dir=ROOT / 'tmp') as directory:
        directory = Path(directory)
        lines = []
        with Image.open(source) as im:
            for i in range(im.n_frames):
                im.seek(i); im.load()
                frame = im.convert('RGB')
                if i == 0: frame.save(OUT / (name + '-poster.webp'), 'WEBP', quality=88, method=6)
                filename = f'{i:04d}.png'
                frame.save(directory / filename)
                lines += [f"file '{filename}'", f"duration {im.info.get('duration', 50) / 1000:.6f}"]
            lines += [f"file '{filename}'"]
        (directory / 'frames.txt').write_text('\n'.join(lines), encoding='utf8')
        subprocess.run([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', str(directory / 'frames.txt'), '-an', '-vf', 'fps=30,pad=ceil(iw/2)*2:ceil(ih/2)*2:color=white', '-c:v', 'libx264', '-preset', 'slow', '-threads', '2', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(target)], check=True)
    record(source, target)

for source, name in [('covers/formula-student.webp','formula-cover'), ('covers/insect-grasping.webp','insect-cover'), ('covers/origami-body.webp','origami-cover'), ('parallel-waist/motion-cover-axes.webp','waist-cover'), ('parallel-waist/motion.gif','waist-demo')]:
    animation(PUBLIC / 'research' / source, name)
video = PUBLIC / 'research/gallery/PPT-media2.mp4'
encode(video, 'honeybee-cover.mp4', width=640, crf=26)
encode(video, 'honeybee-full.mp4', crf=23)
subprocess.run([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error', '-i', str(video), '-frames:v', '1', '-vf', 'scale=640:-2', str(OUT / 'honeybee-poster.webp')], check=True)
photos = json.loads((ROOT / 'app/formula-photos.json').read_text(encoding='utf8'))
for name in photos: preview(PUBLIC / 'research/formula-student' / (name + '.png'), 'formula-' + name + '.webp')
for name in ['xpeng-iron-reference', 'agibot-x2-reference']:
    preview(PUBLIC / 'research/parallel-waist' / (name + '.png'), name + '.webp', width=1200, quality=90)
for name in ['patch-architecture', 'hybrid-adhesive-design']:
    preview(PUBLIC / 'research/ppt' / (name + '.png'), name + '.webp', width=960, quality=92)
(ROOT / 'tmp/typography/media-optimization.json').write_text(json.dumps(report, indent=2), encoding='utf8')
for item in report: print(item['output'], round(item['before']/1024), '->', round(item['after']/1024), 'KiB')
