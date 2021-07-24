from tkinter import *
import tkinter.font as font
from gpiozero import PWMLED 
from time import sleep 
led_17 = PWMLED(17)
led_3 = PWMLED(3)

window = Tk()

window.title("LARS")
window.geometry('1024x800')
#window.configure(bg='blue')

lbl = Label(window, text="LARS is awesome!")

lbl.grid(column=0, row=0)

def clicked_50():
	led_3.off()
	sleep(1) 
	led_17.toggle()
	
def clicked_70():
	led_17.off()
	sleep(1) 
	led_3.toggle()
	
myFont = font.Font(size=30)

btn_50 = Button(window, text="50 Graden", command=clicked_50)
btn_70 = Button(window, text="70 Graden", command=clicked_70)

btn_50['font'] = myFont
btn_70['font'] = myFont

btn_50.grid(column=1, row=2)
btn_70.grid(column=2, row=2)

window.mainloop()
