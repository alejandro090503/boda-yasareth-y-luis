# -*- coding: utf-8 -*-
"""Monograma S & A para boda-yasareth-y-luis.

Reusa el marco floral ovalado del logo original de boda-leilani-y-jose
(borra el centro, tine el marco a azul por luminancia) y compone dentro
las iniciales: S y A en serif capital con un ampersand script entre ellas.
"""
from PIL import Image, ImageDraw, ImageFont
import numpy as np

SRC = r"C:\Users\aleja\boda-yasareth-y-luis\logo-le.png"
OUT = r"C:\Users\aleja\boda-yasareth-y-luis\logo-sa.png"
FONTS = r"C:\Users\aleja\AppData\Local\Temp\scr"

im = Image.open(SRC).convert("RGBA")
W, H = im.size  # 912x1120

# 1) borrar la zona central de letras sin tocar el marco
ImageDraw.Draw(im).ellipse((190, 190, 726, 922), fill=(255, 255, 255, 255))
ImageDraw.Draw(im).rectangle((196, 620, 280, 820), fill=(255, 255, 255, 255))

# 2) tenir el marco a azul manteniendo el relieve original
a = np.array(im).astype(np.float32)
rgb = a[..., :3]
lum = (rgb.mean(axis=2) / 255.0)[..., None]
dark, mid, light = (np.array(c, np.float32) for c in
                    ((58, 84, 124), (133, 162, 203), (212, 237, 254)))
low = dark + (mid - dark) * np.clip(lum / 0.62, 0, 1)
high = mid + (light - mid) * np.clip((lum - 0.62) / 0.38, 0, 1)
new = np.where(lum < 0.62, low, high)
a[..., :3] = np.where(lum > 0.94, rgb, new)   # el fondo blanco se queda blanco
im = Image.fromarray(a.astype(np.uint8), "RGBA")

# 3) gradiente azul metalico (mismas paradas que --gold-grad del CSS)
GX = np.linspace(0, 1, W)[None, :]
GY = np.linspace(0, 1, H)[:, None]
G = np.clip((GX + GY) / 2, 0, 1)
STOPS = [(0.0, (29, 51, 88)), (0.28, (56, 89, 142)), (0.5, (125, 163, 210)),
         (0.72, (56, 89, 142)), (1.0, (29, 51, 88))]
_grad = np.zeros((H, W, 3), np.float32)
for (p0, c0), (p1, c1) in zip(STOPS, STOPS[1:]):
    m = (G >= p0) & (G <= p1)
    f = np.clip((G - p0) / (p1 - p0), 0, 1)
    for c in range(3):
        _grad[..., c] = np.where(m, c0[c] + (c1[c] - c0[c]) * f, _grad[..., c])
GRAD = Image.fromarray(_grad.astype(np.uint8), "RGB").convert("RGBA")


def draw(text, font, xy):
    """Pinta `text` centrado en xy con el gradiente azul."""
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).text(xy, text, font=font, fill=255, anchor="mm")
    layer = GRAD.copy()
    layer.putalpha(mask)
    im.alpha_composite(layer)


def serif(size, weight=600):
    f = ImageFont.truetype(FONTS + r"\cormorant.ttf", size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


# 4) S  &  A  — dos capitales serif con el ampersand script en medio
CY = 542                     # centro optico del ovalo
draw("S", serif(345), (312, CY))
draw("A", serif(345), (604, CY))
draw("&", ImageFont.truetype(FONTS + r"\pinyon.ttf", 148), (458, CY + 14))

im.save(OUT)
print("ok ->", OUT)
