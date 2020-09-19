# Making a bootable macOS usb in Windows and Linux (legally)

## Windows
In this tutorial, you will be shown how to install make a macOS usb on Windows (tested on Windows 10, might work on Windows 7)

Prerequisites:
- 7zip, the command-line utility
- TransMac
- Command prompt or Powershell

Steps:
Get a macOS dmg. You can obtain a copy from another macOS or you can download older versions from Apple's official website.
For example you can download *Yosemite* from [here](https://support.apple.com/en-us/HT210717)

It is recommended that you make a folder so as not to make a mess. You can make one anywhere, and move the downloaded ``.dmg`` file in there.
Open the command prompt (or powershell) in that directory.
Extract the files using 7z, by typing

$ ``7z e <macOS DMG file>``

and then wait for a while, after that you'll get a file named (or similar to) ``InstallMacOS.pkg``. We will also extract it, type in your commandline:

$ ``7z e -xtar <InstallMacOS.pkg file> *.dmg``

You'll result a ``InstallESD.dmg``, or something similarly named. You guessed it, we will also extract it. We can do so using:

$ ``7z e <InstallESD.dmg> */Base*``

You will then get a file named ``BaseSystem.dmg`` or something also similarly named. This is the last time we will do an extraction. We can that by using:

$ ``7z e -tdmg BaseSystem.dmg *.hfs``

After so, a file starting with a number and ending with ``.hfs`` will appear (for example 3.hfs, 4.hfs, etc). Keep in mind where it is in stored, it is time to leave the terminal.

Plug your USB in, and then start TransMac as admin. Find your USB device. Most likely it will have a (USB-Drive) on the end of the device. Make sure though. The USB i use shows ``SMI USB DISK (USB-Disk)``, yours might be similarly named.

And then right click on the device > Restore with Disk Image. A window will appear, click on the `...` near the ``select file`` text, then a window file manager window will appear, on the right bottom click on "Disk Image files (\*.dmg)" and change it to "All files (\*)." Find your ``.hfs`` file and then read the dialogs carefully, be aware that the files will be now erased. If says that it is not a compressed DMG, but will be written as raw image, that's what we want. 

After that, wait for around 20 minutes. Then viola! You have a working macOS bootable usb. To make sure it worked, click on your USB device on TransMac and see if it will show a folder named ``OS X Base System``.

### Issues:
- If you have made a bootable usb lower that your last installed macOS, you will have a *no entry* sign which means prohibited. Try downloading another DMG with a higher version.

### Credits
notthebee for his ``macos_usb`` script from which I derived the commands to use. 
https://github.com/notthebee/macos_usb/
