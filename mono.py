from PIL import Image, ImageDraw, ImageFont, ImageChops
import numpy as np

SRC = r"C:\Users\aleja\boda-yasareth-y-luis\logo-le.png"
im = Image.open(SRC).convert("RGBA")
W, H = im.size  # 912x1120

# 1) borrar zona central de letras (dentro del ovalo, sin tocar el marco)
d = ImageDraw.Draw(im)
d.ellipse((198, 200, 718, 912), fill=(255, 255, 255, 255))

# 2) tenir el marco a azul (#85a2cb / acento) manteniendo el relieve
a = np.array(im).astype(np.float32)
rgb = a[..., :3]
lum = rgb.mean(axis=2) / 255.0
# rampa azul: sombra -> medio -> luz
dark = np.array([58, 84, 124], dtype=np.float32)
mid = np.array([133, 162, 203], dtype=np.float32)
light = np.array([212, 237, 254], dtype=np.float32)
t = lum[..., None]
low = dark + (mid - dark) * np.clip(t / 0.62, 0, 1)
high = mid + (light - mid) * np.clip((t - 0.62) / 0.38, 0, 1)
new = np.where(t < 0.62, low, high)
# pixeles casi blancos se quedan blancos (fondo)
white = (lum > 0.94)[..., None]
new = np.where(white, rgb, new)
a[..., :3] = new
im = Image.fromarray(a.astype(np.uint8), "RGBA")

# 3) letras S (serif) + A (script) con el mismo gradiente azul metalico
def grad_text(text, font, box, angle_light=True):
    """devuelve capa RGBA con el texto pintado con gradiente azul"""
    layer = Image.new("L", (W, H), 0)
    dd = ImageDraw.Draw(layer)
    dd.text(box, text, font=font, fill=255, anchor="mm")
    bbox = layer.getbbox()
    # gradiente diagonal
    gx = np.linspace(0, 1, W)[None, :]
    gy = np.linspace(0, 1, H)[:, None]
    g = np.clip((gx + gy) / 2, 0, 1)
    # 5 paradas: oscuro-medio-claro-medio-oscuro
    stops = [(0.0, (40, 62, 98)), (0.26, (88, 120, 170)), (0.5, (176, 208, 240)),
             (0.74, (88, 120, 170)), (1.0, (40, 62, 98))]
    out = np.zeros((H, W, 3), dtype=np.float32)
    for i in range(len(stops) - 1):
        p0, c0 = stops[i]
        p1, c1 = stops[i + 1]
        m = (g >= p0) & (g <= p1)
        f = np.clip((g - p0) / (p1 - p0), 0, 1)
        for c in range(3):
            out[..., c] = np.where(m, c0[c] + (c1[c] - c0[c]) * f, out[..., c])
    col = Image.fromarray(out.astype(np.uint8), "RGB").convert("RGBA")
    col.putalpha(layer)
    return col, bbox

def serif(sz):
    f = ImageFont.truetype("cormorant.ttf", sz)
    try: f.set_variation_by_axes([600])
    except Exception: pass
    return f

f_script = ImageFont.truetype("pinyon.ttf", 520)

# S y A serif (como L y E del original), script S cruzando en diagonal
im.alpha_composite(grad_text("S", serif(400), (352, 400))[0])
im.alpha_composite(grad_text("A", serif(400), (548, 700))[0])
im.alpha_composite(grad_text("S", f_script, (440, 555))[0])
d2 = ImageDraw.Draw(im)
d2.rectangle((205, 640, 268, 800), fill=(255,255,255,255))
im.save(r"C:\Users\aleja\boda-yasareth-y-luis\logo-sa.png")
print("ok")
