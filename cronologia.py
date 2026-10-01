# -*- coding: utf-8 -*-
"""Galeria en orden cronologico: de novios jovenes a la sesion de compromiso.

ORDEN es la propuesta que se le manda a la clienta para que la confirme; cada
entrada lleva el numero de la foto original del formulario y el punto focal
vertical del recorte 4:5 (0 = arriba, 1 = abajo), para no cortar caras.
"""
from PIL import Image, ImageDraw, ImageOps
import os

CLI = r"C:\Users\aleja\boda-yasareth-y-luis\_cliente"
GAL = r"C:\Users\aleja\boda-yasareth-y-luis\public\galeria"

#        (foto, foco_y, foco_x)
ORDEN = [
    (1,  0.30, 0.50),   # los dos de adolescentes
    (2,  0.42, 0.50),   # selfie de noche
    (3,  0.40, 0.50),   # con el bebe, en una fiesta
    (4,  0.42, 0.50),   # el bautizo
    (5,  0.50, 0.50),   # retrato de estudio, los tres
    (6,  0.52, 0.50),   # en la iglesia, de blanco
    (7,  0.40, 0.55),   # sudaderas lilas
    (8,  0.40, 0.50),   # selfie en casa
    (9,  0.55, 0.50),   # en el puerto
    (20, 0.55, 0.50),   # sesion: caminando los tres
    (19, 0.50, 0.50),   # sesion: con el nino en brazos
    (18, 0.62, 0.50),   # sesion: bajo el arco
    (17, 0.50, 0.42),   # sesion: junto a la torre
    (11, 0.55, 0.50),   # sesion: frente a la capilla
    (12, 0.45, 0.50),   # sesion: en el jardin
    (14, 0.62, 0.50),   # sesion: ante el altar
    (15, 0.55, 0.50),   # sesion: en el pasillo
    (10, 0.55, 0.50),   # el anillo
    (21, 0.45, 0.60),   # el abrazo con el anillo
]
W, H = 1000, 1250


def recorta(n, fy, fx):
    im = ImageOps.exif_transpose(Image.open(os.path.join(CLI, "cliente-%02d.jpg" % n))).convert("RGB")
    sw, sh = im.size
    s = max(W / sw, H / sh)
    im = im.resize((round(sw * s), round(sh * s)), Image.LANCZOS)
    left = max(0, min(im.width - W, round(im.width * fx - W / 2)))
    top = max(0, min(im.height - H, round(im.height * fy - H / 2)))
    return im.crop((left, top, left + W, top + H))


# limpiar la galeria anterior
for f in os.listdir(GAL):
    if f.startswith("g") and f.endswith(".jpg"):
        os.remove(os.path.join(GAL, f))

cw, ch = 150, 188
cols = 7
filas = (len(ORDEN) + cols - 1) // cols
hoja = Image.new("RGB", (cw * cols, ch * filas), "white")
d = ImageDraw.Draw(hoja)
for i, (n, fy, fx) in enumerate(ORDEN, 1):
    im = recorta(n, fy, fx)
    im.save(os.path.join(GAL, "g%d.jpg" % i), quality=86)
    x, y = cw * ((i - 1) % cols), ch * ((i - 1) // cols)
    hoja.paste(im.resize((cw, ch), Image.LANCZOS), (x, y))
    d.rectangle((x + 2, y + 2, x + 30, y + 20), fill="black")
    d.text((x + 7, y + 6), "%d" % i, fill="yellow")
hoja.save(r"C:\Users\aleja\AppData\Local\Temp\scr\crono.jpg", quality=84)
print("fotos en la galeria:", len(ORDEN))
