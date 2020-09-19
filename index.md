# Making a bootable macOS usb in Windows and Linux (legally)

## Windows
In this tutorial, you will be shown how to install make a macOS usb on Windows (tested on Windows 10, might work on Windows 7)

Prerequisites:
- 7zip, the command-line utility
- TransMac
- Command prompt or Powershell

Steps:
Get a macOS dmg. You can obtain a copy from another macOS or you can download older versions from Apple's official website.
For example you can download *Yosemite* from !(here)[https://support.apple.com/en-us/HT210717]

It is recommended that you make a folder so as not to make a mess. You can make one anywhere, and move the downloaded .dmg file in there.
Open the command prompt (or powershell) in that directory.
Extract the files using 7z, by typing

$ 7z e <macOS DMG file>

and then wait for a while, after that you'll get a file named (or similar to) InstallMacOS.pkg. We will also extract it, type in your commandline:

$ 7z e -xtar <InstallMacOS.pkg file> *.dmg

You'll result a InstallESD.dmg, or something similarly named. You guessed it, we will also extract it. We can do so using:

$ 7z e <InstallESD.dmg> */Base*

You will then get a file named BaseSystem.dmg or something also similarly named. This is the last time we will do an extraction. We can that by using:

$ 7z e -tdmg BaseSystem.dmg *.hfs

After so, a file starting with a number and ending with .hfs. will appear. Keep in mind where it is in stored, it is time to leave the terminal.
