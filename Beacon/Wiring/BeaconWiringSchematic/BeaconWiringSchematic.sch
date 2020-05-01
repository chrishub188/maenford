EESchema Schematic File Version 4
EELAYER 29 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L maenford_components:ESP32 U6
U 1 1 5EA88EC5
P 2950 2600
F 0 "U6" H 2950 3775 50  0000 C CNN
F 1 "ESP32" H 2950 3684 50  0000 C CNN
F 2 "" H 2950 2600 50  0001 C CNN
F 3 "" H 2950 2600 50  0001 C CNN
	1    2950 2600
	1    0    0    -1  
$EndComp
$Comp
L Device:Battery_Cell BT1
U 1 1 5EA89C59
P 2950 4950
F 0 "BT1" H 3068 5046 50  0000 L CNN
F 1 "3.7V LiPo Battery" H 3068 4955 50  0000 L CNN
F 2 "" V 2950 5010 50  0001 C CNN
F 3 "~" V 2950 5010 50  0001 C CNN
	1    2950 4950
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR017
U 1 1 5EA8B729
P 2450 5050
F 0 "#PWR017" H 2450 4800 50  0001 C CNN
F 1 "GND" H 2455 4877 50  0000 C CNN
F 2 "" H 2450 5050 50  0001 C CNN
F 3 "" H 2450 5050 50  0001 C CNN
	1    2450 5050
	1    0    0    -1  
$EndComp
$Comp
L maenford_components:GPS U1
U 1 1 5EA8CE25
P 800 650
F 0 "U1" H 742 585 50  0000 C CNN
F 1 "GPS" H 742 676 50  0000 C CNN
F 2 "" H 800 650 50  0001 C CNN
F 3 "" H 800 650 50  0001 C CNN
	1    800  650 
	-1   0    0    1   
$EndComp
$Comp
L maenford_components:MPU6050 U4
U 1 1 5EA8D405
P 2350 1450
F 0 "U4" H 2678 1951 50  0000 L CNN
F 1 "MPU6050" H 2678 1860 50  0000 L CNN
F 2 "" H 2350 1450 50  0001 C CNN
F 3 "" H 2350 1450 50  0001 C CNN
	1    2350 1450
	1    0    0    -1  
$EndComp
$Comp
L Switch:SW_Push SW1
U 1 1 5EA8E867
P 1850 2650
F 0 "SW1" V 1804 2798 50  0000 L CNN
F 1 "SW_Push" V 1895 2798 50  0000 L CNN
F 2 "" H 1850 2850 50  0001 C CNN
F 3 "~" H 1850 2850 50  0001 C CNN
	1    1850 2650
	0    1    1    0   
$EndComp
$Comp
L Switch:SW_DIP_x01 SW2
U 1 1 5EA8EFF5
P 2450 4450
F 0 "SW2" V 2496 4320 50  0000 R CNN
F 1 "SW_DIP_x01" V 2405 4320 50  0000 R CNN
F 2 "" H 2450 4450 50  0001 C CNN
F 3 "~" H 2450 4450 50  0001 C CNN
	1    2450 4450
	0    -1   -1   0   
$EndComp
$Comp
L maenford_components:TTLAdaptor U2
U 1 1 5EA931CD
P 950 2700
F 0 "U2" H 842 2585 50  0000 C CNN
F 1 "TTLAdaptor" H 842 2676 50  0000 C CNN
F 2 "" H 950 2700 50  0001 C CNN
F 3 "" H 950 2700 50  0001 C CNN
	1    950  2700
	-1   0    0    1   
$EndComp
$Comp
L Connector:Conn_01x01_Male J1
U 1 1 5EA9A5D4
P 1250 2150
F 0 "J1" H 1358 2331 50  0000 C CNN
F 1 "Header Pin" H 1358 2240 50  0000 C CNN
F 2 "" H 1250 2150 50  0001 C CNN
F 3 "~" H 1250 2150 50  0001 C CNN
	1    1250 2150
	1    0    0    -1  
$EndComp
$Comp
L power:+5V #PWR06
U 1 1 5EA9D32C
P 1350 3050
F 0 "#PWR06" H 1350 2900 50  0001 C CNN
F 1 "+5V" V 1365 3178 50  0000 L CNN
F 2 "" H 1350 3050 50  0001 C CNN
F 3 "" H 1350 3050 50  0001 C CNN
	1    1350 3050
	0    1    1    0   
$EndComp
$Comp
L power:GND #PWR021
U 1 1 5EA9EE4B
P 3550 2250
F 0 "#PWR021" H 3550 2000 50  0001 C CNN
F 1 "GND" V 3555 2122 50  0000 R CNN
F 2 "" H 3550 2250 50  0001 C CNN
F 3 "" H 3550 2250 50  0001 C CNN
	1    3550 2250
	0    -1   -1   0   
$EndComp
$Comp
L power:GND #PWR013
U 1 1 5EAA02F4
P 2350 1650
F 0 "#PWR013" H 2350 1400 50  0001 C CNN
F 1 "GND" V 2355 1522 50  0000 R CNN
F 2 "" H 2350 1650 50  0001 C CNN
F 3 "" H 2350 1650 50  0001 C CNN
	1    2350 1650
	0    1    1    0   
$EndComp
Wire Wire Line
	2350 1750 2050 1750
Wire Wire Line
	2350 1850 2050 1850
Text Label 2050 1750 2    50   ~ 0
Rx
Text Label 2050 1850 2    50   ~ 0
Tx
Text Label 1100 1000 0    50   ~ 0
Rx
Text Label 1100 900  0    50   ~ 0
Tx
$Comp
L power:GND #PWR01
U 1 1 5EAA30BB
P 1100 800
F 0 "#PWR01" H 1100 550 50  0001 C CNN
F 1 "GND" V 1105 672 50  0000 R CNN
F 2 "" H 1100 800 50  0001 C CNN
F 3 "" H 1100 800 50  0001 C CNN
	1    1100 800 
	0    -1   -1   0   
$EndComp
Text Label 1350 3150 0    50   ~ 0
Rx
Text Label 1350 3250 0    50   ~ 0
Tx
NoConn ~ 1350 2950
NoConn ~ 1350 3350
$Comp
L Device:R R1
U 1 1 5EAA498D
P 2850 3600
F 0 "R1" V 2950 3600 50  0000 C CNN
F 1 "300" V 2850 3600 50  0000 C CNN
F 2 "" V 2780 3600 50  0001 C CNN
F 3 "~" H 2850 3600 50  0001 C CNN
	1    2850 3600
	0    1    1    0   
$EndComp
$Comp
L Device:LED D1
U 1 1 5EAA53A9
P 3150 3600
F 0 "D1" H 3150 3700 50  0000 C CNN
F 1 "Red LED" H 3150 3450 50  0000 C CNN
F 2 "" H 3150 3600 50  0001 C CNN
F 3 "~" H 3150 3600 50  0001 C CNN
	1    3150 3600
	-1   0    0    1   
$EndComp
$Comp
L power:GND #PWR020
U 1 1 5EAA66BD
P 3300 3600
F 0 "#PWR020" H 3300 3350 50  0001 C CNN
F 1 "GND" V 3305 3472 50  0000 R CNN
F 2 "" H 3300 3600 50  0001 C CNN
F 3 "" H 3300 3600 50  0001 C CNN
	1    3300 3600
	0    -1   -1   0   
$EndComp
$Comp
L power:GND #PWR012
U 1 1 5EAA9B00
P 1950 750
F 0 "#PWR012" H 1950 500 50  0001 C CNN
F 1 "GND" V 1955 622 50  0000 R CNN
F 2 "" H 1950 750 50  0001 C CNN
F 3 "" H 1950 750 50  0001 C CNN
	1    1950 750 
	0    1    1    0   
$EndComp
$Comp
L maenford_components:Charger U3
U 1 1 5EAB02AE
P 1750 5150
F 0 "U3" H 1850 5775 50  0000 C CNN
F 1 "Charger" H 1850 5684 50  0000 C CNN
F 2 "" H 1750 5150 50  0001 C CNN
F 3 "" H 1750 5150 50  0001 C CNN
	1    1750 5150
	1    0    0    -1  
$EndComp
NoConn ~ 3550 2350
$Comp
L power:+5V #PWR03
U 1 1 5EAB7DFF
P 1250 4750
F 0 "#PWR03" H 1250 4600 50  0001 C CNN
F 1 "+5V" V 1265 4878 50  0000 L CNN
F 2 "" H 1250 4750 50  0001 C CNN
F 3 "" H 1250 4750 50  0001 C CNN
	1    1250 4750
	0    -1   -1   0   
$EndComp
Wire Wire Line
	2450 4850 2700 4850
Wire Wire Line
	2700 4850 2700 4750
Wire Wire Line
	2700 4750 2950 4750
Wire Wire Line
	2950 5050 2700 5050
Wire Wire Line
	2700 5050 2700 4950
Wire Wire Line
	2700 4950 2450 4950
$Comp
L power:+3.3V #PWR016
U 1 1 5EABB363
P 2450 3400
F 0 "#PWR016" H 2450 3250 50  0001 C CNN
F 1 "+3.3V" H 2465 3573 50  0000 C CNN
F 2 "" H 2450 3400 50  0001 C CNN
F 3 "" H 2450 3400 50  0001 C CNN
	1    2450 3400
	1    0    0    -1  
$EndComp
$Comp
L power:+3.3V #PWR015
U 1 1 5EABBC12
P 2350 2350
F 0 "#PWR015" H 2350 2200 50  0001 C CNN
F 1 "+3.3V" V 2365 2478 50  0000 L CNN
F 2 "" H 2350 2350 50  0001 C CNN
F 3 "" H 2350 2350 50  0001 C CNN
	1    2350 2350
	0    -1   -1   0   
$EndComp
$Comp
L power:+3.3V #PWR018
U 1 1 5EABC3FE
P 2700 3600
F 0 "#PWR018" H 2700 3450 50  0001 C CNN
F 1 "+3.3V" H 2715 3773 50  0000 C CNN
F 2 "" H 2700 3600 50  0001 C CNN
F 3 "" H 2700 3600 50  0001 C CNN
	1    2700 3600
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR019
U 1 1 5EAC393F
P 2750 3850
F 0 "#PWR019" H 2750 3600 50  0001 C CNN
F 1 "GND" V 2755 3722 50  0000 R CNN
F 2 "" H 2750 3850 50  0001 C CNN
F 3 "" H 2750 3850 50  0001 C CNN
	1    2750 3850
	0    -1   -1   0   
$EndComp
$Comp
L Device:C C3
U 1 1 5EAC4A68
P 2000 3550
F 0 "C3" H 2115 3596 50  0000 L CNN
F 1 "1u" H 2115 3505 50  0000 L CNN
F 2 "" H 2038 3400 50  0001 C CNN
F 3 "~" H 2000 3550 50  0001 C CNN
	1    2000 3550
	1    0    0    -1  
$EndComp
Wire Wire Line
	2450 3550 2450 3400
Wire Wire Line
	2450 3400 2000 3400
Connection ~ 2450 3400
Wire Wire Line
	1600 3400 2000 3400
Connection ~ 2000 3400
Wire Wire Line
	1600 3700 2000 3700
$Comp
L power:GND #PWR08
U 1 1 5EAC84D8
P 1600 3700
F 0 "#PWR08" H 1600 3450 50  0001 C CNN
F 1 "GND" H 1605 3527 50  0000 C CNN
F 2 "" H 1600 3700 50  0001 C CNN
F 3 "" H 1600 3700 50  0001 C CNN
	1    1600 3700
	1    0    0    -1  
$EndComp
$Comp
L Device:R R2
U 1 1 5EACA4CB
P 3450 4600
F 0 "R2" V 3350 4600 50  0000 C CNN
F 1 "27k" V 3450 4600 50  0000 C CNN
F 2 "" V 3380 4600 50  0001 C CNN
F 3 "~" H 3450 4600 50  0001 C CNN
	1    3450 4600
	0    1    1    0   
$EndComp
$Comp
L Device:R R3
U 1 1 5EACACEC
P 3750 4600
F 0 "R3" V 3650 4600 50  0000 C CNN
F 1 "100k" V 3750 4600 50  0000 C CNN
F 2 "" V 3680 4600 50  0001 C CNN
F 3 "~" H 3750 4600 50  0001 C CNN
	1    3750 4600
	0    1    1    0   
$EndComp
$Comp
L power:GND #PWR022
U 1 1 5EACAF53
P 4000 4600
F 0 "#PWR022" H 4000 4350 50  0001 C CNN
F 1 "GND" H 4005 4427 50  0000 C CNN
F 2 "" H 4000 4600 50  0001 C CNN
F 3 "" H 4000 4600 50  0001 C CNN
	1    4000 4600
	1    0    0    -1  
$EndComp
Wire Wire Line
	3600 4600 3600 4250
Connection ~ 3600 4600
Wire Wire Line
	3300 4600 2950 4600
Wire Wire Line
	2950 4600 2950 4750
Connection ~ 2950 4750
Wire Wire Line
	4000 4600 3900 4600
$Comp
L power:+3.3V #PWR011
U 1 1 5EACD8C5
P 1950 650
F 0 "#PWR011" H 1950 500 50  0001 C CNN
F 1 "+3.3V" V 1965 778 50  0000 L CNN
F 2 "" H 1950 650 50  0001 C CNN
F 3 "" H 1950 650 50  0001 C CNN
	1    1950 650 
	0    -1   -1   0   
$EndComp
$Comp
L power:+3.3V #PWR02
U 1 1 5EACE28D
P 1100 1100
F 0 "#PWR02" H 1100 950 50  0001 C CNN
F 1 "+3.3V" V 1115 1228 50  0000 L CNN
F 2 "" H 1100 1100 50  0001 C CNN
F 3 "" H 1100 1100 50  0001 C CNN
	1    1100 1100
	0    1    1    0   
$EndComp
$Comp
L Connector:Conn_01x01_Male J2
U 1 1 5EAD98B8
P 1250 2400
F 0 "J2" H 1358 2581 50  0000 C CNN
F 1 "Header Pin" H 1358 2490 50  0000 C CNN
F 2 "" H 1250 2400 50  0001 C CNN
F 3 "~" H 1250 2400 50  0001 C CNN
	1    1250 2400
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR07
U 1 1 5EAD9C7A
P 1450 2400
F 0 "#PWR07" H 1450 2150 50  0001 C CNN
F 1 "GND" H 1455 2227 50  0000 C CNN
F 2 "" H 1450 2400 50  0001 C CNN
F 3 "" H 1450 2400 50  0001 C CNN
	1    1450 2400
	1    0    0    -1  
$EndComp
Wire Wire Line
	1450 2150 2350 2150
$Comp
L power:GND #PWR014
U 1 1 5EADABC3
P 2350 2050
F 0 "#PWR014" H 2350 1800 50  0001 C CNN
F 1 "GND" V 2355 1922 50  0000 R CNN
F 2 "" H 2350 2050 50  0001 C CNN
F 3 "" H 2350 2050 50  0001 C CNN
	1    2350 2050
	0    1    1    0   
$EndComp
NoConn ~ 2350 1950
Text Label 3550 1650 0    50   ~ 0
ADC2_CH1
Text Label 3600 4250 0    50   ~ 0
ADC2_CH1
Text Label 3550 1750 0    50   ~ 0
SCL
Text Label 3550 1850 0    50   ~ 0
SDA
Text Label 1700 850  2    50   ~ 0
SCL
Text Label 1700 950  2    50   ~ 0
SDA
Wire Wire Line
	1700 850  1950 850 
Wire Wire Line
	1950 950  1700 950 
Text Label 3550 1950 0    50   ~ 0
INT
Text Label 1950 1350 2    50   ~ 0
INT
Wire Wire Line
	1850 2450 1850 2250
Wire Wire Line
	1850 2250 2350 2250
$Comp
L power:GND #PWR010
U 1 1 5EAE3521
P 1850 2850
F 0 "#PWR010" H 1850 2600 50  0001 C CNN
F 1 "GND" H 1855 2677 50  0000 C CNN
F 2 "" H 1850 2850 50  0001 C CNN
F 3 "" H 1850 2850 50  0001 C CNN
	1    1850 2850
	1    0    0    -1  
$EndComp
$Comp
L Device:LED D3
U 1 1 5EAE4623
P 4600 2150
F 0 "D3" H 4600 2050 50  0000 C CNN
F 1 "LED" H 4600 2250 50  0000 C CNN
F 2 "" H 4600 2150 50  0001 C CNN
F 3 "~" H 4600 2150 50  0001 C CNN
	1    4600 2150
	-1   0    0    1   
$EndComp
$Comp
L Device:LED D2
U 1 1 5EAE4A31
P 4600 1800
F 0 "D2" H 4650 1700 50  0000 C CNN
F 1 "LED" H 4600 1900 50  0000 C CNN
F 2 "" H 4600 1800 50  0001 C CNN
F 3 "~" H 4600 1800 50  0001 C CNN
	1    4600 1800
	-1   0    0    1   
$EndComp
$Comp
L Device:R R4
U 1 1 5EAE57AF
P 4300 1800
F 0 "R4" V 4400 1800 50  0000 C CNN
F 1 "300" V 4300 1800 50  0000 C CNN
F 2 "" V 4230 1800 50  0001 C CNN
F 3 "~" H 4300 1800 50  0001 C CNN
	1    4300 1800
	0    1    1    0   
$EndComp
$Comp
L Device:R R5
U 1 1 5EAE60E6
P 4300 2150
F 0 "R5" V 4400 2150 50  0000 C CNN
F 1 "300" V 4300 2150 50  0000 C CNN
F 2 "" V 4230 2150 50  0001 C CNN
F 3 "~" H 4300 2150 50  0001 C CNN
	1    4300 2150
	0    1    1    0   
$EndComp
$Comp
L power:GND #PWR024
U 1 1 5EAE700B
P 4750 2150
F 0 "#PWR024" H 4750 1900 50  0001 C CNN
F 1 "GND" V 4755 2022 50  0000 R CNN
F 2 "" H 4750 2150 50  0001 C CNN
F 3 "" H 4750 2150 50  0001 C CNN
	1    4750 2150
	0    -1   -1   0   
$EndComp
$Comp
L power:GND #PWR023
U 1 1 5EAE7601
P 4750 1800
F 0 "#PWR023" H 4750 1550 50  0001 C CNN
F 1 "GND" V 4755 1672 50  0000 R CNN
F 2 "" H 4750 1800 50  0001 C CNN
F 3 "" H 4750 1800 50  0001 C CNN
	1    4750 1800
	0    -1   -1   0   
$EndComp
Wire Wire Line
	4150 2150 3550 2150
Wire Wire Line
	3550 2050 4150 2050
Wire Wire Line
	4150 2050 4150 1800
$Comp
L Regulator_Linear:MCP1826S U5
U 1 1 5EAE89B6
P 2450 3850
F 0 "U5" V 2496 3955 50  0000 L CNN
F 1 "MCP1826S" V 2405 3955 50  0000 L CNN
F 2 "" H 2350 4000 50  0001 C CNN
F 3 "http://ww1.microchip.com/downloads/en/DeviceDoc/22057B.pdf" H 2450 4100 50  0001 C CNN
	1    2450 3850
	0    -1   -1   0   
$EndComp
$Comp
L Device:CP C1
U 1 1 5EAEE4D4
P 1600 3550
F 0 "C1" H 1718 3596 50  0000 L CNN
F 1 "10u" H 1718 3505 50  0000 L CNN
F 2 "" H 1638 3400 50  0001 C CNN
F 3 "~" H 1600 3550 50  0001 C CNN
	1    1600 3550
	1    0    0    -1  
$EndComp
Connection ~ 1600 3700
$Comp
L power:GND #PWR09
U 1 1 5EAEF2C2
P 1800 4200
F 0 "#PWR09" H 1800 3950 50  0001 C CNN
F 1 "GND" V 1805 4072 50  0000 R CNN
F 2 "" H 1800 4200 50  0001 C CNN
F 3 "" H 1800 4200 50  0001 C CNN
	1    1800 4200
	0    1    1    0   
$EndComp
Wire Wire Line
	2100 4200 2450 4200
Wire Wire Line
	2450 4200 2450 4150
Connection ~ 2450 4150
$Comp
L Device:CP C?
U 1 1 5EAF1F4A
P 1950 4200
F 0 "C?" V 1800 4200 50  0000 C CNN
F 1 "10u" V 2100 4200 50  0000 C CNN
F 2 "" H 1988 4050 50  0001 C CNN
F 3 "~" H 1950 4200 50  0001 C CNN
	1    1950 4200
	0    1    1    0   
$EndComp
$Comp
L power:GND #PWR04
U 1 1 5EAB7593
P 1250 5050
F 0 "#PWR04" H 1250 4800 50  0001 C CNN
F 1 "GND" V 1255 4922 50  0000 R CNN
F 2 "" H 1250 5050 50  0001 C CNN
F 3 "" H 1250 5050 50  0001 C CNN
	1    1250 5050
	0    1    1    0   
$EndComp
$Comp
L power:GND #PWR05
U 1 1 5EA9C666
P 1350 2850
F 0 "#PWR05" H 1350 2600 50  0001 C CNN
F 1 "GND" V 1355 2722 50  0000 R CNN
F 2 "" H 1350 2850 50  0001 C CNN
F 3 "" H 1350 2850 50  0001 C CNN
	1    1350 2850
	0    -1   -1   0   
$EndComp
$EndSCHEMATC
