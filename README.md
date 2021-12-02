# Raster to TSPL in JavaScript

This simple library turns raster images into TSPL files for sending to a TSPL printer, like the inexpensive [Polono PL60](https://www.amazon.com/Polono-Thermal-Label-Printer-Commercial/dp/B08RBG6QYX).

## Why?
The PL60 does not ship with a arm64 linux driver, meaning it cannot run on a low cost Raspberry Pi. This bypasses that by reading any image format, resizing it to 4x6 and converting it, then sending the raw data directly to the printer.
