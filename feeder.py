import RPi.GPIO as GPIO
import time

A = 5
B = 6
C = 13
D = 19

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(A, GPIO.OUT)
GPIO.setup(B, GPIO.OUT)
GPIO.setup(C, GPIO.OUT)
GPIO.setup(D, GPIO.OUT)

def GPIO_SETUP(a,b,c,d):
    GPIO.output(A, a)
    GPIO.output(B, b)
    GPIO.output(C, c)
    GPIO.output(D, d)
    time.sleep(0.001)

def Fish_Feeder_RTURN(deg):

    full_circle = 510.0
    degree = full_circle/360*deg
    GPIO_SETUP(0,0,0,0)

    while degree > 0.0:
        GPIO_SETUP(1,0,0,0)
        GPIO_SETUP(1,1,0,0)
        GPIO_SETUP(0,1,0,0)
        GPIO_SETUP(0,1,1,0)
        GPIO_SETUP(0,0,1,1)
        GPIO_SETUP(0,0,0,1)
        GPIO_SETUP(1,0,0,1)
        degree -= 1
    GPIO_SETUP(0,0,0,0)

while True:
    Fish_Feeder_RTURN(360)
    time.sleep(2)
    

    
