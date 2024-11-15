#!/usr/bin/env python3
import sys
from PIL import Image, ImageDraw, ImageFont
import traceback

try:
    import epaper
except ImportError:
    print("Erro: Biblioteca waveshare-epaper não encontrada no ambiente virtual.")
    sys.exit(1)

try:
    temperature = sys.argv[1]
    humidity = sys.argv[2]

    epd = epaper.epaper('epd2in13_V4').EPD()
    epd.init()
    epd.Clear()

    # Crie uma nova imagem com fundo branco
    image = Image.new('1', (epd.height, epd.width), 255)  # 1: 1-bit pixels, black and white
    draw = ImageDraw.Draw(image)

    # Carregue fontes
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 16)
    icon_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 24)

    # Desenhe o texto e ícones na imagem
    draw.text((10, 10), "☁️", font=icon_font, fill=0)  # Ícone de nuvem
    draw.text((40, 10), f"Temperatura:", font=font, fill=0)
    draw.text((40, 30), f"{temperature}°C", font=font, fill=0)

    draw.text((10, 60), "💧", font=icon_font, fill=0)  # Ícone de gota d'água
    draw.text((40, 60), f"Umidade:", font=font, fill=0)
    draw.text((40, 80), f"{humidity}%", font=font, fill=0)

    # Rotacione a imagem
    image = image.rotate(90, expand=True)

    # Exiba a imagem na tela eInk
    epd.display(epd.getbuffer(image))

    epd.sleep()

except Exception as e:
    print(f"Erro: {e}")
    print(traceback.format_exc())