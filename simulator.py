from tkinter import *
import tkinter.font as font

from time import sleep
import paho.mqtt.client as mqtt
from random import randrange, uniform

mqttBroker = "192.168.68.53"

client = mqtt.Client("mosquitto15678sdf")
client.connect(mqttBroker)


window = Tk()

window.title("LARS Dashboard simulator")
window.geometry('1024x800')


def boiler_50_clicked():
    pass


def boiler_70_clicked():
    pass


def waterpomp_clicked():
    pass


def relais4_clicked():
    pass


def water_level_changed(event):
    print(slider_water_level.get())

    payload = "{\"waterlevel\":" + str(slider_water_level.get()) + "}"
    print(payload)

    client.publish(
        "camper/sensors/watertanklevels/48:3f:da:c:74:fe/out", payload)


myFont = font.Font(size=30)

boiler_frame = LabelFrame(window, text='Boiler')
boiler_frame.grid(column=0, row=0, padx=20, pady=20)

other_frame = LabelFrame(window, text='Other')
other_frame.grid(column=0, row=1, padx=20, pady=20)

btn_50 = Button(boiler_frame, text="50 Graden", command=boiler_50_clicked)
btn_70 = Button(boiler_frame, text="70 Graden", command=boiler_70_clicked)
btn_waterpomp = Button(other_frame, text="Waterpomp",
                       command=waterpomp_clicked)
btn_relais4 = Button(other_frame, text="relais 4", command=relais4_clicked)

btn_50['font'] = myFont
btn_70['font'] = myFont
btn_waterpomp['font'] = myFont
btn_relais4['font'] = myFont


btn_50.grid(column=0, row=0, padx=20, pady=20)
btn_70.grid(column=1, row=0, padx=20, pady=20)
btn_waterpomp.grid(column=0, row=0, padx=20, pady=20)
btn_relais4.grid(column=1, row=0, padx=20, pady=20)


canvas = Canvas(window, width=60, height=60, borderwidth=0,
                highlightthickness=0)  # , bg="red")
canvas.grid(column=3, row=2)

water_level_frame = LabelFrame(window, text='Water tank level')
water_level_frame.grid(column=0, row=2, padx=20, pady=20)

slider_water_level = Scale(
    water_level_frame, from_=100, to=0, command=water_level_changed)
slider_water_level['font'] = font.Font(size=20)
slider_water_level.grid(column=2, row=0, padx=20, pady=20)


def on_closing():
    if messagebox.askokcancel("Quit", "Do you want to quit?"):
        boiler_50.off()
        boiler_70.off()
        waterpomp.off()
        relais_4.off()
        window.destroy()


window.protocol("WM_DELETE_WINDOW", on_closing)
window.mainloop()
