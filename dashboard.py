from tkinter import *
import tkinter.font as font
from gpiozero import PWMLED 
from time import sleep
import requests
boiler_50 = PWMLED(18) # relais_1
boiler_70 = PWMLED(10) # relais_2
waterpomp = PWMLED(4) # relais_3
relais_4 = PWMLED(17) # relais_4

ip_water_tank = "http://192.168.68.64"

window = Tk()

window.title("LARS Dashboard")
window.geometry('1024x800')

lbl = Label(window, text="Boiler")
lbl.grid(column=0, row=0)

def boiler_50_clicked():
    boiler_70.off()
    sleep(1) 
    boiler_50.toggle()
    
def boiler_70_clicked():
    boiler_50.off()
    sleep(1) 
    boiler_70.toggle()
    
def waterpomp_clicked():
    sleep(1)
    waterpomp.toggle()
    
def relais4_clicked():
    sleep(1)
    relais_4.toggle()
    
def get_water_level():
    response = requests.get(ip_water_tank)
    water_level_value_lbl["text"] = str(response.json()["waterTankLevel"]) + " %"
    
def create_circle(x, y, r, canvasName): #center coordinates, radius
    x0 = x - r
    y0 = y - r
    x1 = x + r
    y1 = y + r
    return canvasName.create_oval(x0, y0, x1, y1, fill="red", outline="#DDD")
    
myFont = font.Font(size=30)

btn_50 = Button(window, text="50 Graden", command=boiler_50_clicked)
btn_70 = Button(window, text="70 Graden", command=boiler_70_clicked)
btn_waterpomp = Button(window, text="Waterpomp", command=waterpomp_clicked)
btn_relais4 = Button(window, text="relais 4", command=relais4_clicked)


btn_50['font'] = myFont
btn_70['font'] = myFont
btn_waterpomp['font'] = myFont
btn_relais4['font'] = myFont

btn_50.grid(column=1, row=2)
btn_70.grid(column=2, row=2)
btn_waterpomp.grid(column=1, row=3)
btn_relais4.grid(column=2, row=3)


canvas = Canvas(window, width=60, height=60, borderwidth=0, highlightthickness=0)#, bg="red")
canvas.grid(column=3, row=2)

water_level_text_lbl = Label(window, text="Water level")
water_level_text_lbl.grid(column=0, row=4)

water_level_value_lbl = Label(window)
water_level_value_lbl.grid(column=1, row=4)

btn_water_level = Button(window, text="Update water level", command=get_water_level)
btn_water_level.grid(column=2, row=4)


if False:
    create_circle(30, 30, 25, canvas)

def on_closing():
    if messagebox.askokcancel("Quit", "Do you want to quit?"):
        boiler_50.off()
        boiler_70.off()
        waterpomp.off()
        relais_4.off()
        window.destroy()
    
window.protocol("WM_DELETE_WINDOW", on_closing)
window.mainloop()
